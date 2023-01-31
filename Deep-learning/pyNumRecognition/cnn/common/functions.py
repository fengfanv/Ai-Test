import numpy as np

#ReLU函数（这个方法已经支持numpy数组）
#详细请看，demo3/index.py
def relu(x):
    return np.maximum(0,x)

#激活函数sigmoid
#详细请看，demo3/index.py
def sigmoid(x):
    return 1/(1+np.exp(-x))

#输出层激活函数softmax
#详细请看，demo3/index5.py
def softmax(x):
    if x.ndim == 2:
        x = x.T
        x = x - np.max(x, axis=0)
        y = np.exp(x) / np.sum(np.exp(x), axis=0)
        return y.T

    x = x - np.max(x) # 溢出对策
    return np.exp(x) / np.sum(np.exp(x))

#求损失函数
#详细请看，demo4/index.py、demo4/index2.py
def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)

    # 监督数据是one-hot-vector的情况下，转换为正确解标签的索引
    if t.size == y.size:
        t = t.argmax(axis=1)

    batch_size = y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size

