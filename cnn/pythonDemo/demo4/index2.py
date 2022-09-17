#mini-batch

#mini-batch学习，意思是从训练数据中抽取少量的训练数据，进行学习。如60000个训练数据太多了，60000个训练数据都学习的话，比较浪费时间。从60000个数据中随机抽取少量的数据，比如抽取100个数据，然后对这100个数据进行学习。学习后通过这个100个的学习结果，近似的估算60000个整体数据的结果（用小批量数据作为全体训练数据的近似值）


import sys,os
sys.path.append(os.pardir)
import numpy as np
from dataset.mnist import load_mnist

(x_train,t_train),(x_test,t_test) = load_mnist(normalize=True,one_hot_label=True)

print(x_train.shape) #(60000, 784)
print(t_train.shape) #(60000, 10)

#从60000个数据中，随机抽取出10比数据
train_size = x_train.shape[0] 
print(train_size)#60000
batch_size = 10
#np.random.choice(60000,10)的意思是，吃泡面和0-59999之间随机选择10个数字
batch_mask = np.random.choice(train_size,batch_size)
print(batch_mask)#[ 7332 30969 17855 10052 29022  1749  8964 15153 13252 44957]

x_batch = x_train[batch_mask]
t_batch = t_train[batch_mask]

print(x_batch.shape)#(10, 784)
print(t_batch.shape)#(10, 10)




#mini-batch版 交叉熵误差 的实现

def cross_entropy_error_1(y,t):
    if y.ndim == 1:
        t=t.reshape(1,t.size)
        y=y.reshape(1,y.size)
    batch_size=y.shape[0]
    return -np.sum(t*np.log(y+1e-7)) / batch_size

def cross_entropy_error(y,t):
    if y.ndim == 1:
        t=t.reshape(1,t.size)
        y=y.reshape(1,y.size)
    batch_size=y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size),t]+1e-7)) / batch_size


#对于上面的这两个函数，可能会遇到的问题
a = np.array([1,2,3,4,5,6,7,8,9])
print(a.shape)#(9,)
print(a.ndim)#1
print(a.size)#9

b = a.reshape(3,3)
print(b)
'''
array([[1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]])
'''
print(b.ndim)#2
print(b.shape)#(3, 3)

c = b.reshape(1,9)
print(c)#array([[1, 2, 3, 4, 5, 6, 7, 8, 9]])
print(c.ndim)#2
print(c.shape)#(1, 9)
print(c.shape[0])#1
print(c.shape[1])#9

d = a.reshape(1,a.size)
print(d)#array([[1, 2, 3, 4, 5, 6, 7, 8, 9]])


#关于第二函数，可能会遇到的问题
t = np.array([2,7])
print(t)#array([2, 7])
print(t.shape)#(2,)

y = np.array([[0,0.1,0.9,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0.9,0.1,0]])
print(y)
'''
array([[0. , 0.1, 0.9, 0. , 0. , 0. , 0. , 0. , 0. , 0. ],
        [0. , 0. , 0. , 0. , 0. , 0. , 0. , 0.9, 0.1, 0. ]])
'''
print(y.shape)#(2, 10)
print(y.shape[0])#2

batch_size = y.shape[0]
print(batch_size)#2

k = np.arange(5)
print(k)#array([0, 1, 2, 3, 4])

#注意下面的操作，结合书上讲的，再看这里，你就会明白
p = y[np.arange(batch_size),t]
print(p)#array([0.9, 0.9])






















