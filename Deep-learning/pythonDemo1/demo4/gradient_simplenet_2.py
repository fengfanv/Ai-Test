# 如果有什么不明白的，可以重新在看一下本章，神经网络的学习，看一下把，画不了多长时间
import numpy as np

# 输出层激活函数softmax
def softmax(x):
    if x.ndim == 2:
        x = x.T
        x = x - np.max(x, axis=0)
        y = np.exp(x) / np.sum(np.exp(x), axis=0)
        return y.T

    x = x - np.max(x) # 溢出对策
    return np.exp(x) / np.sum(np.exp(x))

# 求损失函数
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    # 监督数据是one-hot-vector的情况下，转换为正确解标签的索引
    if t.size == y.size:
        t = t.argmax(axis=1)

    batch_size = y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size

#----------------------------------------------------------------------------------------------------------

# 求梯度（求损失函数关于权重参数的梯度（或导数，或数值微分））
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


class simpleNet:
    def __init__(self):
        self.W = np.array([[0.47355232,0.9977393,0.84668094],
                           [0.85557411,0.03563661,0.69422093]])#这self.W是引用值，类型js里的array和object类型，在上边numerical_gradient方法内变了后，这里也跟着变
        print(self.W.shape)#(2, 3)   要把自己练成那种，一看W权重的形状，就知道这层神经元，有几个输入，会产生几个输出（几个输出，就是这层有几个神经元）。
                            #这里权重形状时，两行三列，根据np.dot的计算逻辑，两行说明有两个输入，三列说明会输出三个输出（3个神经元）

    def predict(self, x):
        return np.dot(x, self.W)

    def loss(self, x, t):
        z = self.predict(x)
        print("self.W--------------------start")
        print(self.W)
        print("self.W--------------------end")
        y = softmax(z)
        loss = cross_entropy_error(y, t)
        return loss


x = np.array([0.6, 0.9])
t = np.array([0, 0, 1])

net = simpleNet()
print('原始W--------------------start')
print(net.W)
print('原始W--------------------end')

def f(W):
    lossValue = net.loss(x, t)
    return lossValue

#求出来的 损失函数 关于 权重self.W，的梯度
grad_w = numerical_gradient(f, net.W)
print(grad_w)
'''
# 下面是损失函数关于权重参数的梯度
grad_w = [[ 0.21924757  0.14356243 -0.36281   ]
          [ 0.32887136  0.21534364 -0.544215  ]]
# 下面是权重参数
W = [[0.47355232 0.9977393  0.84668094]
     [0.85557411 0.03563661 0.69422093]]

#上边求出来的这个梯度的意思是， 权重内各个参数的变化，在多大程度上影响 损失函数的变化
#表达的意思，如，当权重W里第一行第一列的0.47355232，增加某个微小值时，损失函数的值会发生多少变化
#               更详细点，如果权重W里第一行第一列的0.47355232，增加某个微小值时，则最终的损失函数将增加那个微小值的0.21924757倍（0.21924757是grad_w第一行第一列的那个数据，这个数据对应权重W里第一行第一列的0.47355232）
'''