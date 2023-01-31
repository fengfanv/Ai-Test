#这个是从multi_layer_net_1.py复制过来的
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定

import numpy as np

from collections import OrderedDict

from common.layers import *
from common.gradient import numerical_gradient

class MultiLayerNet:
    """全连接的多层神经网络

    仅具有 dropout 功能

    Parameters
    ----------
    input_size : 输入大小（MNIST的情况下为784）
    hidden_size_list : 隐藏层的神经元数量的列表（e.g. [100, 100, 100]）
    output_size : 输出大小（MNIST的情况下为10）
    activation : 激活函数 'relu' or 'sigmoid'
    weight_init_std : 指定权重的标准差（e.g. 0.01）
        指定'relu'或'he'的情况下设定“He的初始值”
        指定'sigmoid'或'xavier'的情况下设定“Xavier的初始值”
    use_dropout: 是否使用Dropout
    dropout_ration : Dropout的比例
    """
    def __init__(self, input_size, hidden_size_list, output_size, activation='relu', weight_init_std='relu',use_dropout = False, dropout_ration = 0.5):
        self.input_size = input_size
        self.output_size = output_size
        self.hidden_size_list = hidden_size_list
        self.hidden_layer_num = len(hidden_size_list)
        self.params = {}

        #dropout
        self.use_dropout = use_dropout

        # 初始化权重
        self.__init_weight(weight_init_std)

        # 生成层
        activation_layer = {'sigmoid': Sigmoid, 'relu': Relu}
        self.layers = OrderedDict()
        for idx in range(1, self.hidden_layer_num+1):
            '''
            这里 range(1, self.hidden_layer_num+1) 为什么要+1
            假如
            隐藏层有4层,hidden_size_list=[100, 100, 100, 100]
            在带上一个输出层，则这个神经网络，就是一共有5层，5层的神经网络
            因为len([100, 100, 100, 100])等于4
            但for循环时
            for index in range(1,4):
                print(index)
            1
            2
            3
            for循环时循环到3就结束了，还少一层，所以要+1，要是range(0,4)0到4，会输出0,1,2,3这四个，反正就是哪个意思，你肯定懂
            '''
            self.layers['Affine' + str(idx)] = Affine(self.params['W' + str(idx)],self.params['b' + str(idx)])
            self.layers['Activation_function' + str(idx)] = activation_layer[activation]()

            if self.use_dropout:
                self.layers['Dropout' + str(idx)] = Dropout(dropout_ration)

        #下面是输出层的Affine层，和，SoftmaxWithLoss层
        idx = self.hidden_layer_num + 1
        self.layers['Affine' + str(idx)] = Affine(self.params['W' + str(idx)],self.params['b' + str(idx)])
        self.last_layer = SoftmaxWithLoss()

    def __init_weight(self, weight_init_std):
        """设定权重的初始值

        Parameters
        ----------
        weight_init_std : 指定权重的标准差（e.g. 0.01）
            指定'relu'或'he'的情况下设定“He的初始值”
            指定'sigmoid'或'xavier'的情况下设定“Xavier的初始值”
        """
        all_size_list = [self.input_size] + self.hidden_size_list + [self.output_size]
        for idx in range(1, len(all_size_list)):
            scale = weight_init_std
            if str(weight_init_std).lower() in ('relu', 'he'):
                scale = np.sqrt(2.0 / all_size_list[idx - 1])  # 使用ReLU的情况下推荐的初始值
            elif str(weight_init_std).lower() in ('sigmoid', 'xavier'):
                scale = np.sqrt(1.0 / all_size_list[idx - 1])  # 使用sigmoid的情况下推荐的初始值
            
            '''
            输入层(第0层)是784
            求第一层的权重初始值
            all_size_list[idx - 1] = 784
            scale = np.sqrt(2.0 / 784)
            scale = 0.050507627227610534
            所以第一层权重值的标准差是0.050507627227610534
            每一层权重值的标准差都不一样，详细请看，/demo6/index2.py
            '''
            self.params['W' + str(idx)] = scale * np.random.randn(all_size_list[idx-1], all_size_list[idx])
            self.params['b' + str(idx)] = np.zeros(all_size_list[idx])
    
    def predict(self, x, train_flg=False):
        # train_flg dropout是否是训练阶段，详细看/demo6/index4.py
        for key, layer in self.layers.items():
            if "Dropout" in key:
                x = layer.forward(x, train_flg)
            else:
                x = layer.forward(x)
        return x

    
    def loss(self, x, t, train_flg=False):
        """求损失函数

        Parameters
        ----------
        x : 输入数据
        t : 教师标签
        train_flg : 是dropout需要的参数

        Returns
        -------
        损失函数的值
        """
        y = self.predict(x, train_flg)
        return self.last_layer.forward(y, t)

    # 用于获取，这个神经网络，对于x,t数据的识别精度
    def accuracy(self, x, t):
        y = self.predict(x, train_flg=False)#train_flg是dropout需要的参数，这里是测试模型阶段，所以是train_flg=false，详细看/demo6/index4.py
        y = np.argmax(y, axis=1)
        if t.ndim != 1 : t = np.argmax(t, axis=1)

        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy

    def numerical_gradient(self, x, t):
        """求梯度（数值微分）

        Parameters
        ----------
        x : 输入数据
        t : 教师标签

        Returns
        -------
        具有各层的梯度的字典变量
            grads['W1']、grads['W2']、...是各层的权重
            grads['b1']、grads['b2']、...是各层的偏置
        """
        def loss_W(value):
            lossValue = self.loss(x, t ,train_flg=True)#train_flg是dropout需要的参数
            return lossValue

        grads = {}
        for idx in range(1, self.hidden_layer_num+2):
            #加2，是为了把，输出层的权重也算上
            grads['W' + str(idx)] = numerical_gradient(loss_W, self.params['W' + str(idx)])
            grads['b' + str(idx)] = numerical_gradient(loss_W, self.params['b' + str(idx)])

        return grads
    
    def gradient(self, x, t):
        """求梯度（误差反向传播法）

        Parameters
        ----------
        x : 输入数据
        t : 教师标签

        Returns
        -------
        具有各层的梯度的字典变量
            grads['W1']、grads['W2']、...是各层的权重
            grads['b1']、grads['b2']、...是各层的偏置
        """
        # forward
        self.loss(x, t, train_flg=True)#train_flg是dropout需要的参数，这里是训练模型阶段，所以是train_flg=True，详细看/demo6/index4.py

        # backward
        dout = 1
        dout = self.last_layer.backward(dout)

        layers = list(self.layers.values())
        layers.reverse()
        for layer in layers:
            dout = layer.backward(dout)

        # 设定
        grads = {}
        for idx in range(1, self.hidden_layer_num+2):
            grads['W' + str(idx)] = self.layers['Affine' + str(idx)].dW
            grads['b' + str(idx)] = self.layers['Affine' + str(idx)].db

        return grads
