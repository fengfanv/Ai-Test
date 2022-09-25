import numpy as np

def softmax(x):
    if x.ndim == 2:
        x = x.T
        x = x - np.max(x, axis=0)
        y = np.exp(x) / np.sum(np.exp(x), axis=0)
        return y.T

    x = x - np.max(x) # 溢出对策
    return np.exp(x) / np.sum(np.exp(x))

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

dW = numerical_gradient(f, net.W)

print(dW)