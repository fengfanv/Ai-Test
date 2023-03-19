

#定义一个类
class Man:
    def __init__(self,name):            #__init__就是js里constructor
        self.name = name
        print('初始化类！')
    
    def hello(self):
        print(self.name + ' said hello to you.')
    
    def goodbye(self):
        print(self.name + ' said good-bye to you.')

m = Man('XiaoKang') #类Man生成一个实例（对象）m
m.hello()
m.goodbye()

#安装numpy包 pip install numpy

import numpy as np                      #导入numpy库，并重命名为np
x = np.array([1.0,2.0,3.0])
print(type(x),x)                        #<class 'numpy.ndarray'> [1. 2. 3.]
y = np.array([1.0,2.0,3.0])
# print(x+y)
# print(x-y)
# print(x*y)
# print(x/y)
# print(x/2.0)

# z = np.array([[1,2],[3,4]])
# print(z)
# print(z.shape)
# print(z.dtype)

# k = np.array([[1,2],[3,4]])
# print(z+k)
# print(z*k)
# print(z*10)

# y = z.flatten()

# print(y[np.array([0,2,3])])

# print(y>2)

# print(y[y>2])

import matplotlib.pyplot as plt         #使用matplotlib库的pyplot模块，并重命名matplotlib.pyplot为plt

# x = np.arange(0,6,0.1)
# print(x)
# y = np.sin(x)
# print(y)

# plt.plot(x,y)
# plt.show()

# y1 = np.sin(x)
# y2 = np.cos(x)

# plt.plot(x,y1,label='sin')
# plt.plot(x,y2,linestyle='--',label='cos')
# plt.xlabel('x')
# plt.ylabel('y')
# plt.title('sin & cos')
# plt.legend()
# plt.show()

from matplotlib.image import imread     #从matplotlib库的image模块内导出imread方法并使用

img = imread('lena.png')
plt.imshow(img)

plt.show()