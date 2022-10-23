import numpy as np


#输出层激活函数softmax
def softmax(x):
    if x.ndim == 2:
        x = x.T
        x = x - np.max(x, axis=0)
        y = np.exp(x) / np.sum(np.exp(x), axis=0)
        return y.T

    x = x - np.max(x) # 溢出对策
    return np.exp(x) / np.sum(np.exp(x))

#求损失函数
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    # 监督数据是one-hot-vector的情况下，转换为正确解标签的索引
    if t.size == y.size:
        t = t.argmax(axis=1)

    batch_size = y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size

# 求梯度（求损失函数关于权重参数或偏置的梯度）
def numerical_gradient(f, x):
    h = 1e-4 # 0.0001
    grad = np.zeros_like(x)
    it = np.nditer(x, flags=['multi_index'], op_flags=['readwrite'])
    while not it.finished:
        idx = it.multi_index
        tmp_val = x[idx]
        x[idx] = float(tmp_val) + h
        fxh1 = f(0) # f(x+h)，因为x是引用类型，所以就算f(x)小括号里不是x也行，比如放个0也不影响运算
        x[idx] = tmp_val - h
        fxh2 = f(0) # f(x-h)
        grad[idx] = (fxh1 - fxh2) / (2*h)
        x[idx] = tmp_val # 还原值
        it.iternext()
    return grad

#---------------------------------------------------------------------------------------------------

# Relu层
class Relu:
    def __init__(self):
        self.mask = None

    def forward(self, x):
        self.mask = (x <= 0)
        out = x.copy()
        out[self.mask] = 0
        return out
    def backward(self, dout):
        dout[self.mask] = 0
        dx = dout

        return dx

# Affine层
class Affine:
    def __init__(self, W, b):
        self.W =W
        self.b = b
        
        self.x = None
        self.original_x_shape = None
        # 权重和偏置参数的导数
        self.dW = None
        self.db = None

    def forward(self, x):
        # 对应张量
        self.original_x_shape = x.shape
        x = x.reshape(x.shape[0], -1)
        self.x = x

        out = np.dot(self.x, self.W) + self.b

        return out

    def backward(self, dout):
        dx = np.dot(dout, self.W.T)
        self.dW = np.dot(self.x.T, dout)
        self.db = np.sum(dout, axis=0)
        
        dx = dx.reshape(*self.original_x_shape)  # 还原输入数据的形状（对应张量）
        return dx

# Softmax-with-Loss层
class SoftmaxWithLoss:
    def __init__(self):
        self.loss = None
        self.y = None # softmax的输出
        self.t = None # 监督数据

    def forward(self, x, t):
        self.t = t
        self.y = softmax(x)
        self.loss = cross_entropy_error(self.y, self.t)
        
        return self.loss

    def backward(self, dout=1):
        batch_size = self.t.shape[0]
        if self.t.size == self.y.size: # 监督数据是one-hot-vector的情况
            dx = (self.y - self.t) / batch_size
        else:
            dx = self.y.copy()
            dx[np.arange(batch_size), self.t] -= 1
            dx = dx / batch_size
        
        return dx

#---------------------------------------------------------------------------------------------------


class TwoLayerNet:
    def __init__(self, input_size, hidden_size, output_size, weight_init_std=0.01):
        # 初始化权重
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(input_size, hidden_size)#权重使用高斯分布的随机数进行初始化
        self.params['b1'] = np.zeros(hidden_size)#偏置使用0初始化
        self.params['W2'] = weight_init_std * np.random.randn(hidden_size, output_size)#权重使用高斯分布的随机数进行初始化
        self.params['b2'] = np.zeros(output_size)#偏置使用0初始化

        # 初始化层
        self.layers = {}
        self.layers['Affine1'] = Affine(self.params['W1'],self.params['b1'])
        self.layers['Relu1'] = Relu()
        self.layers['Affine2'] = Affine(self.params['W2'],self.params['b2'])
        self.lastLayer = SoftmaxWithLoss()

    def predict(self, x):
        a1 = self.layers['Affine1'].forward(x)
        z1 = self.layers['Relu1'].forward(a1)
        a2 = self.layers['Affine2'].forward(z1)
        # 这里与数值微分有点不一样，数值微分版本的，这里还有个，输出层激活函数，softmax方法
        # 误差反向传播法方式的，因为softmax 和 loss集成到一起了，所以softmax就和求损失函数的方法loss，一起放到下面的loss方法里了
        return a2
        
    # （求损失函数）x:输入数据, t:监督数据
    def loss(self, x, t):
        y = self.predict(x)
        return self.lastLayer.forward(y, t)
        
    # 数值微分求梯度，这个版本的 还存在数值微分求梯度，是为了梯度确认，什么是梯度确认，详细看书
    def numerical_gradient(self, x, t):

        def loss_W(value):
            lossValue = self.loss(x, t)
            return lossValue
        
        grads = {}
        grads['W1'] = numerical_gradient(loss_W, self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W, self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W, self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W, self.params['b2'])
        
        return grads
    
    # 误差反向传播法求梯度
    def gradient(self, x, t):
        # forward
        self.loss(x, t)

        # backward
        dout = 1 #损失函数关于损失函数的导函数是1
        lastLayer_dout = self.lastLayer.backward(dout)
        Affine2_dout = self.layers['Affine2'].backward(lastLayer_dout)
        Relu1_dout = self.layers['Relu1'].backward(Affine2_dout)
        Affine1_dout = self.layers['Affine1'].backward(Relu1_dout)

        grads = {}
        grads['W1'] = self.layers['Affine1'].dW
        grads['b1'] = self.layers['Affine1'].db
        grads['W2'] = self.layers['Affine2'].dW
        grads['b2'] = self.layers['Affine2'].db

        return grads

    # 用于获取，这个神经网络，对于x,t数据的识别精度
    def accuracy(self, x, t):
        y = self.predict(x)
        # self.predict这方法里没有 输出层激活函数softmax ，省一几个softmax计算
        y = np.argmax(y, axis=1)
        t = np.argmax(t, axis=1)
        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy

#---------------------------------------------------------------------------------------------------

#mini-batch学习

import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
from dataset.mnist import load_mnist

import matplotlib.pyplot as plt
#--------------------start
# 解决plt中文显示小方块，和，控制台报错问题
import matplotlib
matplotlib.rc("font", family='Microsoft YaHei')
#--------------------end

# 读入mnist数据
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

iters_num = 1000  # 循环次数（梯度法的更新次数）,书上这里写的是10000次，一万次时间有点长，我改成一千次了
train_loss_list = [] #用于记录，每次循环（每次梯度数据把权重偏置参数更新后，新损失函数的值）
train_size = x_train.shape[0] #一共有多少条图像数据
batch_size = 100 #循环每次mini-batch学习时，从全部数据中，随机抽取出多少条数据，作为mini-batch数据
learning_rate =  0.1#学习率，学习率决定在一次学习中，应该学习多少，以及在多大程度上更新参数
#-----------------
# 神经网络在训练时，不能光看，损失函数的值的变化，虽然损失函数的值在训练过程中逐渐变小，但是损失函数的值的变化只是对于训练数据的变化，不代表它对其它数据的也有同样良好的表现，所以在神经网络的学习过程中，要定期，记录神经网络对其它数据集的识别精度。
train_acc_list = []#每次epoch时，记录，当前这个神经网络，对于训练数据的识别精度
test_acc_list = []#每次epoch时，记录，当前这个神经网络，对于测试数据的识别精度
iter_per_epoch = max(train_size / batch_size, 1)# epoch就是一个数值。主要功能就是，在神经网络的学习过程中，会定期使用训练数据和测试数据，测试神经网络的识别精度，并记录识别精度。这里咱们的训练数据总数据是60000个，每次mini-batch会随机抽取100个，60000/100=600，意思是iters_num每循环到600次时，就记录一下识别精度。

for i in range(iters_num):
    # 获取mini-batch
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]
    # 计算梯度
    grad = network.gradient(x_batch, t_batch)
    # 更新参数
    for key in ('W1', 'b1', 'W2', 'b2'):
        #network.params[key] -= learning_rate * grad[key]
        item_data = network.params[key].copy()  #这个.copy()功能类似js里的“数据深拷贝”。以这种y=y-a这种形式更新数据，这种情况下必须得写，要不更新不了数据，哈哈
        network.params[key] = item_data - learning_rate * grad[key]

    # 记录学习过程（记录，每次循环后，新的损失函数的值）
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)

    # 记录每个epoch的识别精度
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)
        # print("对于训练数据的精度, 对于测试数据的精度 | " + str(train_acc) + ", " + str(test_acc))


# 绘制学习过程中损失函数值的变化图表
chart_x = np.arange(len(train_loss_list))#[1.0,2.0,3.0,4.0...]
plt.xlabel("第几次循环")
plt.ylabel("每次循环时，记录的损失函数的值")
plt.plot(chart_x,train_loss_list)
plt.show()

# 绘制识别精度变化表
# chart_x_2 = np.arange(len(train_acc_list))#[1.0,2.0,3.0,4.0...]
# plt.xlabel("第几次统计识别精度")
# plt.ylabel("识别精度")
# plt.plot(chart_x_2,train_acc_list)
# plt.show()

# 总结：误差反向传播法确实是快，误差反向传播法训练 2轮（10000次/每轮）的训练所耗费的时间，数值微分方式，才训练10次

# 梯度确认，也是一个用来给人看的数据，看误差多少，这个代码里没写，以后再说了