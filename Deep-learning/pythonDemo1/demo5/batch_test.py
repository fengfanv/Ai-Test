# 误差反向传播，批处理实验

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
    print('y.shape',y.shape)
    print('t.shape',t.shape)
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
        print('self.original_x_shape',self.original_x_shape)
        x = x.reshape(x.shape[0], -1)
        self.x = x

        out = np.dot(self.x, self.W) + self.b
        print('out.shape',out.shape)

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
        print('self.y.shape',self.y.shape)
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
        print('predict - x.shape',x.shape)
        a1 = self.layers['Affine1'].forward(x)
        print('a1.shape',a1.shape)
        z1 = self.layers['Relu1'].forward(a1)
        print('z1.shape',z1.shape)
        a2 = self.layers['Affine2'].forward(z1)
        print('a2.shape',a2.shape)
        # 这里与数值微分有点不一样，数值微分版本的，这里还有个，输出层激活函数，softmax方法
        # 误差反向传播法方式的，因为softmax 和 loss集成到一起了，所以softmax就和求损失函数的方法loss，一起放到下面的loss方法里了
        return a2
        
    # （求损失函数）x:输入数据, t:监督数据
    def loss(self, x, t):
        y = self.predict(x)
        print('y.shape',y.shape)
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
        print('x.shape：',x.shape)
        print('t.shape：',t.shape)
        res = self.loss(x, t)
        print('res',res)


        # backward
        dout = 1 #损失函数关于损失函数的导函数是1
        lastLayer_dout = self.lastLayer.backward(dout)
        print('lastLayer_dout.shape',lastLayer_dout.shape)
        Affine2_dout = self.layers['Affine2'].backward(lastLayer_dout)
        print('Affine2_dout.shape',Affine2_dout.shape)
        Relu1_dout = self.layers['Relu1'].backward(Affine2_dout)
        print('Relu1_dout.shape',Relu1_dout.shape)
        Affine1_dout = self.layers['Affine1'].backward(Relu1_dout)
        print('Affine1_dout.shape',Affine1_dout.shape)

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

# 读入mnist数据
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, one_hot_label=True)

network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

train_size = x_train.shape[0]
batch_size = 100 #mini-batch大小

# 获取mini-batch
batch_mask = np.random.choice(train_size, batch_size)
x_batch = x_train[batch_mask]
t_batch = t_train[batch_mask]
# 计算梯度
grad = network.gradient(x_batch, t_batch)