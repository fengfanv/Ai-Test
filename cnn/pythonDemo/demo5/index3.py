import numpy as np

# 误差反向传播法 - Affine层 和 Softmax层的实现

# Affine层，就是，正向传播中，计算加权信号的总和，也就是矩阵的乘积运算，就是 np.dot(x,w)+b 这个，这就叫Affine层
# 书上讲的也不是特别的细，也就讲了一下大概的计算流程，然后就代码实现，如果以后，对这里有疑问，重新看一下也行，
# 下面是，批版本的Affine层
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


# Softmax-with-Loss层，是softmax()和cross_entropy_error() 输出层激活函数softmax 和 交叉熵误差损失函数 的层
# 这层的正向传播，与第四章，所学习的运算流程是一样，所以就先不深究了。
# 但层这层的反向传播，有点特别之处，
# 这层的反向传播，最后得到的结果是，（y1 − t1, y2 − t2, y3 − t3）,其中（y1, y2, y3）是Softmax层的输出，（t1, t2, t3）是监督数据

# 这其中（y1 − t1, y2 − t2, y3 − t3）是 Softmax层的输出 和 教师标签（监督数据） 的差分，然后神经网络的反向传播会把这个“差分表示的误差”传递给 前面的层（反向传播时，这层前面的层，就是上面的Affine层。而这个差分的结果，就是Affine层反向传播时，书上的，图5-25（172），图5-27（173）里，∂L/∂Y的结果。哇塞，是不是很神奇，连上了），
# 差分的结果，就是反向传播时Affine层的，∂L/∂Y的结果。这句话说的比较片面，请看下面
# 我们知道的Affine层正向传播时，输出的结果，是还要交给不同类型的激活函数处理的（普通层激活函数Sigmoid，ReLU。输出层激活函数softmax），然后不知道怎么的，突然一下子Softmax-with-Loss层反向传播时的，差分结果，怎么突然直接就交给Affine层的反向传播了。Softmax-with-Loss层 和 Affine层 反向传播时，这俩中间是不是少个激活函数的反向传播，这里回答，没有少，这里Softmax-with-Loss层里包含softmax层，只不过刚刚说的“Softmax-with-Loss层的差分的结果，就是反向传播时Affine层的，∂L/∂Y的结果”，这句话说的有点片面，下面详细讲
# 如：一个三层的神经网络的运算流程
# a1 = np.dot(x, W1) + b1  #Affine层
# z1 = sigmoid(a1)         #Sigmoid层
# a2 = np.dot(z1, W2) + b2 #Affine层
# z2 = sigmoid(a2)         #Sigmoid层
# a3 = np.dot(z2, W3) + b3 #Affine层
# y = softmax(a3)          #Softmax-with-Loss层中的softmax层
# 刚才说的“差分的结果，就是反向传播时Affine层的，∂L/∂Y的结果”这句话有点片面，这句话的反向传播结果（差分结果）只适用于a3与y之间的反向传播，
# 然后 a3 - Affine层在反向传播时，所输出的，其中一个结果，∂L/∂X（书上，图5-27，173），会传给z2 - Sigmoid层的反向传播
# 然后 z2 - Sigmoid层的反向传播的结果，会传给，a2 - Affine层的反向传播
# 又然后 a2 - Affine层的反向传播 的结果（其中的一个结果，∂L/∂X），会传给z1 - Sigmoid层的反向传播
# 又又然后z1 - Sigmoid层的反向传播 的结果，会传给a1 - Affine层
# 就是通过类似这样的计算，通过反向传播，实现了和数值微分一样的功能

# 通过类似的反向传播的处理，神经网络把每层的结果传递给前面的层，然后调整与每层有关的权重参数，使神经网络的输出（Softmax的输出）接近教师标签（监督数据）

# （y1 − t1, y2 − t2, y3 − t3）Softmax层的输出 与 教师标签 的差，直截了当地表示了当前神经网络的输出与教师标签的误差
# 如1：考教师标签是（0, 1, 0），Softmax层的输出是(0.3, 0.2, 0.5)
# 此处正确解标签处的概率是0.2（20%）
# 这个时候的神经网络不能进行正确的识别
# 此时，Softmax层的反向传播传递的是(0.3, −0.8, 0.5)这样一个大的误差
# 这个大的误差会向前面的层传播，所以Softmax层 前面的层 会从这个大的误差中学习到“大（有很大的学习空间，很多的）”的内容

# 如2：考教师标签是(0, 1, 0)，Softmax层的输出是(0.01,0.99, 0)
# 这个时候神经网络识别得相当准确
# 此时Softmax层的反向传播传递的是(0.01, −0.01, 0)这样一个小的误差
# 这个小的误差也会向前面的层传播，但因为误差很小，所以Softmax层 前面的层 学到的内容也很“小（少）”


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