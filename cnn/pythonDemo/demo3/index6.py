import sys,os
sys.path.append(os.pardir)#为导入父级目录下中的文件进行设定（将父级目录加入到Python搜索模块的路径集中，dataset文件夹属于父级目录，所以这也就是为什么才能使用dataset中的文件）

from dataset.mnist import load_mnist #从父级dataset目录下的mnist文件中导出load_mnist方法

#(训练图像，训练标签),(测试图像，测试标签)
(x_train,t_train),(x_test,t_test) = load_mnist(flatten=True,normalize=False)
#flatten=True 是否将图像的展开成一维数组，true处理成一维数组，false图像的值为1*28*28的三维数组
#normalize=False 是否将图像的值处理成0-1之间的数，true处理成0-1之间的数，false保持图像值为0-255之间的数
#one_hot_label 是否将数据的标签保存成one-hot（[0,0,0,0,0,1,0,0,0,0] 正确为1，其余为0）这样，true保存成前边one-hot形式，false使用纯数字（1、2、3等等）表示数据的标签

print(x_train.shape)#(60000, 784)
print(t_train.shape)#(60000,)
print(x_test.shape)#(10000, 784)
print(t_test.shape)#(10000,)

#因为有墙的原因，第一次下载可能不成功，多执行几遍就行了，然后这些文件会缓存到本地

#显示mnist图像
from PIL import Image
import numpy as np

def img_show(img):
    pil_img = Image.fromarray(np.uint8(img))#将numpy数组的图像数据 转换成 PIL 使用的数据图像
    pil_img.show()

img = x_train[0]
label = t_train[0]
print(label)#5

print(img.shape)#(784,)
img = img.reshape(28,28)#将图像的形状还原成原来的尺寸28*28  注意这个reshape是numpy的方法
print(img.shape)#(28, 28)

img_show(img)
