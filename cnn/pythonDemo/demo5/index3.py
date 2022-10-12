import numpy as np
# 误差反向传播法 - Affine层 和 Softmax层的实现

# Affine层，就是，正向传播中，为了计算加权信号的总和，使用了矩阵的乘积运算，就是np.dot(x,w)+b 那块就叫Affine层
class Affine:
    def __init__(self,W,b):
        self.W = W
        self.b = b
        self.x = None
        self.dW = None
        self.db = None
    
    def forward(self,x):
        self.x = x
        out = np.dot(x,self.W)+self.b
        return out
    def backward(self,dout):
        dx = np.dot(dout,self.W.T)
        self.dW = np.dot(self.x.T,dout)
        self.db = np.sum(dout,axis=0)
        return dx

# Softmax-with-Loss层 softmax()和cross_entropy_error() 输出层激活函数 和 交叉熵误差损失函数
# 确实跟书上说的似的，比数值微分求导麻烦
# 等以后自己数学非常好了，在详细研究

class SoftmaxWithLoss:
    def __init__(self):
        self.loss = None #损失函数
        self.y = None #输出层激活函数softmax函数的输出
        self.t = None #监督数据（one-hot形式）
    def forward(self,x,t):
        self.t = t
        self.y = softmax(x)
        self.loss = cross_entropy_error(self.y, self.t)
        return self.loss
    def backward(self,dout=1):
        batch_size = self.t.shape[0]
        dx = (self.y - self.t) / batch_size
        return dx

#输出层激活函数softmax函数
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