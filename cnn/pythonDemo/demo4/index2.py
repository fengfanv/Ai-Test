#mini-batch

#mini-batch学习，意思是从训练数据中抽取少量的训练数据，进行学习。如60000个训练数据太多了，60000个训练数据都学习的话，比较浪费时间。从60000个数据中随机抽取少量的数据，比如抽取100个数据，然后对这100个数据进行学习。学习后通过这个100个的学习结果，近似的估算60000个整体数据的结果（用小批量数据作为全体训练数据的近似值）
#从113页开始看，看“mini-batch学习”，这里说了，为什么要“计算损失函数时必须将所有的训练数据作为对象”等等


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
# 当数据的标签t为one-hot形式，使用如下方法 t = [[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0]]
def cross_entropy_error_1(y,t):
    if y.ndim == 1:
        t=t.reshape(1,t.size)
        y=y.reshape(1,y.size)
    batch_size=y.shape[0]
    return -np.sum(t*np.log(y+1e-7)) / batch_size

# 当数据的标签t为标签形式，使用如下方法 t = [1,7,8,9]
def cross_entropy_error(y,t):
    if y.ndim == 1:
        t=t.reshape(1,t.size)
        y=y.reshape(1,y.size)
    batch_size=y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size),t]+1e-7)) / batch_size


# 求单个数据的损失函数（单份数据）
y = np.array([0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0])#softmax函数输出的数据
t = np.array([2])#标签形式
print(cross_entropy_error(y,t))#0.510825457099338

# 求N份数据的损失函数（批量数据）
# y1是softmax函数输出的数据
y1 = np.array([
    [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0],
    [0.1, 0.05, 0.0, 0.0, 0.05, 0.1, 0.0, 0.1, 0.6, 0.0]
])
t1 = np.array([2,8])#标签形式
print(cross_entropy_error(y1,t1))
# 0.510825457099338 这个数据没有错，就是输出的这个数据
#（这里会将多份数据的各个损失函数值和(加)到在一块，然后求一个平均的损失函数的值。
# 所以这也就是为什么，这里只会输出一个损失函数的值，输出的这个损失函数的值，是多个数据损失函数值的"平均损失函数值"）
# 如果不信是，多条数据损失函数的平均损失函数，就看书，从113页开始看，看“mini-batch学习”
# y1[0]的损失函数值是0.510825457099338， y1[1]的损失函数值也是0.510825457099338，这俩损失函数值一相加，然后再除以2，所以还是0.510825457099338
# (0.510825457099338+0.510825457099338)/2=0.510825457099338，所以这也就是为什么结果又是0.510825457099338
# 下面是验证：
y_0 = cross_entropy_error(y1[0],np.array(t1[0]))
print('y_0',y_0)#0.510825457099338
y_1 = cross_entropy_error(y1[1],np.array(t1[1]))
print('y_1',y_1)#0.510825457099338
# 为啥y1[0]和y1[1]输出的损失函数的值，是一样的？因为y1[0]和y1[1]对应正解标签里的值都是一样的，如y1[0][2]的值是0.6，y1[1][8]的值也是0.6
# 假如y1[0][2]的值不是0.6，是0.7，那这时候y1[0]对应的损失函数的值就不是0.510825457099338了



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






















