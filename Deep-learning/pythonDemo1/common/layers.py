# 误差反向传播法 - 层的实现
# 详细请看/demo5/index2.py、/demo5/index3.py
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
from common.functions import *

import numpy as np

# 误差反向传播法 - 激活函数层的实现

# ReLU层
# 如果正向传播时，输入到ReLU函数内的x大于0，则在反向传播时会将上游的值原封不动地传给下游。反过来，如果正向传播时，输入到ReLU函数内的x小于等于0，则在反向传播中传给下游的信号将停在此处
# 反向传播时，y关于x的导数，x大于0时，y关于x的导数是1，这就是上面那个所谓的“在反向传播中会将上游传来的值原封不动地传给下游”，因为是乘1，被乘后，被乘的参数没有不变，所以也就给咱们一种错觉，以为是原封不动的传给下一个。
# 反向传播时，y关于x的导数，x小于等于0时，y关于x的导数是0，这就是上面所谓的“在反向传播中传给下游的信号将停在此处（传进来的参数将不会在往下传）”，因为是乘0，参数乘0后，也就变成0了，传给下一个参数，下一个参数也会变成0，也就给咱们一种错觉，以为停在此处了
# 不懂为啥 y关于x的导数，x大于0时，y关于x的导数是1 的话，看“导数那个文章”“为什么y=x²的导函数为y=2x”，它们也都是经过类似的处理，然后变成了（y关于x的导数，x大于0时，y关于x的导数是1）等等
class Relu:
    def __init__(self):
        self.mask = None

    def forward(self, x):
        self.mask = (x <= 0)
        out = x.copy()#因为是numpy数组，所以这个copy类似于js里的深拷贝
        out[self.mask] = 0
        return out
    def backward(self, dout):
        dout[self.mask] = 0
        dx = dout

        return dx

# Sigmoid层
# 正向传播，看那个，图5-19，的sigmoid层的计算图，虽然分了好几个小步骤，但你一看就会明白，很正常的计算流程，看不懂的话，多点耐心，别急于求成
# 反向传播：
# 但反向传播时，稍稍有点小复杂，分了好几个小步骤，这几个步骤就是，正向传播时的顺序，反过来的顺序
# 1、反向传播第一步，“/”除号节点，此步在正向传播时，公式是如下式子，z=1/x，此步是正向传播时的，最后一个步
# 此步z关于x的导函数为-z²
# 2、反向传播第二步，“+”加号节点，此步在正向传播时，公式是如下式子，z=1+exp(−x)，此步是正向传播时的，倒数第二步
# 此步z关于x的导数为1（因为“+”节点将上游的值原封不动地传给下游，所这步的，z关于x的导函数解析性为1，不懂看demo5/index.py）
# 3、反向传播第三步，“exp”节点，此步在正向传播时，公式是如下式子，z=exp(x)，此步是正向传播时的，倒数第三步
# 此步z关于x的导数为exp(x)，哈哈，还是exp(x)，和正向传播时一样
# 4、反向传播第四步，“*”乘号节点，此步在正向传播时，公式是如下式子，z=-1*x，此步是正向传播时的，倒数第四步
# 此步z关于x的导数为-1，还记得上一个文件里demo5/index.py 乘号节点反向传播时，翻转正向传播时的x与y，忘了的话，重新看一遍，看一遍你就会明白，真的，不骗你
# 正向传播时的公式，y=sigmoid(x)。那y关于x的导函数是啥，其实这个结果就是上面这四小步，融合在一块，就是Sigmoid函数的反向传播
# 最终，y=sigmoid(x)，y关于x的导函数是 y(1-y)

# 书上原话，可以不用在意Sigmoid层中琐碎的细节，而只需要专注它的输入和输出就行，不懂的话就多重温几遍，你肯定会明白的，相信你，康先生

class Sigmoid:
    def __init__(self):
        self.out = None
    def forward(self,x):
        out = 1/(1+np.exp(-x))
        self.out = out
        return out
    def backward(self,dout):
        dx = dout * (1.0-self.out) * self.out
        return dx

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


# BatchNormalization层，从源代码里copy的
class BatchNormalization:
    """
    http://arxiv.org/abs/1502.03167
    """
    def __init__(self, gamma, beta, momentum=0.9, running_mean=None, running_var=None):
        self.gamma = gamma
        self.beta = beta
        self.momentum = momentum
        self.input_shape = None # Conv层的情况下为4维，全连接层的情况下为2维  

        # 测试时使用的平均值和方差
        self.running_mean = running_mean
        self.running_var = running_var  
        
        # backward时使用的中间数据
        self.batch_size = None
        self.xc = None
        self.std = None
        self.dgamma = None
        self.dbeta = None

    def forward(self, x, train_flg=True):
        self.input_shape = x.shape
        if x.ndim != 2:
            N, C, H, W = x.shape
            x = x.reshape(N, -1)

        out = self.__forward(x, train_flg)
        
        return out.reshape(*self.input_shape)
            
    def __forward(self, x, train_flg):
        if self.running_mean is None:
            N, D = x.shape
            self.running_mean = np.zeros(D)
            self.running_var = np.zeros(D)
                        
        if train_flg:
            mu = x.mean(axis=0)
            xc = x - mu
            var = np.mean(xc**2, axis=0)
            std = np.sqrt(var + 10e-7)
            xn = xc / std
            
            self.batch_size = x.shape[0]
            self.xc = xc
            self.xn = xn
            self.std = std
            self.running_mean = self.momentum * self.running_mean + (1-self.momentum) * mu
            self.running_var = self.momentum * self.running_var + (1-self.momentum) * var            
        else:
            xc = x - self.running_mean
            xn = xc / ((np.sqrt(self.running_var + 10e-7)))
            
        out = self.gamma * xn + self.beta 
        return out

    def backward(self, dout):
        if dout.ndim != 2:
            N, C, H, W = dout.shape
            dout = dout.reshape(N, -1)

        dx = self.__backward(dout)

        dx = dx.reshape(*self.input_shape)
        return dx

    def __backward(self, dout):
        dbeta = dout.sum(axis=0)
        dgamma = np.sum(self.xn * dout, axis=0)
        dxn = self.gamma * dout
        dxc = dxn / self.std
        dstd = -np.sum((dxn * self.xc) / (self.std * self.std), axis=0)
        dvar = 0.5 * dstd / self.std
        dxc += (2.0 / self.batch_size) * self.xc * dvar
        dmu = np.sum(dxc, axis=0)
        dx = dxc - dmu / self.batch_size
        
        self.dgamma = dgamma
        self.dbeta = dbeta
        
        return dx