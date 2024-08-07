# 卷积层和池化层的实现（7.4 - 7.4.4）
# 卷积层实现
import sys
import os
sys.path.append(os.pardir)

from common.util import *
from dataset.mnist import load_mnist
import numpy as np


# ------------------------------------------------------ 图片初始化 start -------------------------------------------------------

# 创建 2个，3*3大小，通道为2的图片，这个图片的数据形状是，（2,2,3,3），（图片个数，通道数，图片高，图片宽）

# test
# np.random.rand(2,3) # 两行三列

# 第一张图片
# 第一张图片的第一个通道，3*3
first_picture_channel_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
# 第一张图片的第二个通道，3*3
first_picture_channel_2 = [
    [11, 12, 13],
    [14, 15, 16],
    [17, 18, 19]
]
first_picture = [first_picture_channel_1, first_picture_channel_2]
# print('first_picture',first_picture)

# 第二张图片
# 第二张图片的第一个通道，3*3
second_picture_channel_1 = [
    [101, 102, 103],
    [104, 105, 106],
    [107, 108, 109]
]
# 第二张图片的第二个通道，3*3
second_picture_channel_2 = [
    [111, 112, 113],
    [114, 115, 116],
    [117, 118, 119]
]
second_picture = [second_picture_channel_1, second_picture_channel_2]
# print('second_picture',second_picture)

# ------------------------------------------------------ 图片初始化 end -------------------------------------------------------


# 两张3*3，通道数为2，的图片
x = np.array([first_picture, second_picture])
# print(x.shape) # (2, 2, 3, 3) （图片数量，通道数，高，宽）


# 使用 im2col 将输入数据展开
# im2col 是“image to column”的缩写，意思是“从图像到矩阵”，详细请看书


filter_h = 2  # 滤波器的高
filter_w = 2  # 滤波器的宽
stride = 1  # 步幅
pad = 0  # 填充


# 一张图，按滤波器的大小2*2，步幅1，填充0，通道数2 展开后，变成如下：
x1 = np.array([first_picture])
# print(x1.shape) # (1, 2, 3, 3)（图片数量，通道数，高，宽）
col1 = im2col(x1, filter_h, filter_w, stride, pad)
# print(col1.shape) # (4, 8)
# print(col1)
# print(col1.T)
'''
#为什么会输出如下，请看书，一看就明白
[[ 1.  2.  4.  5. 11. 12. 14. 15.]
 [ 2.  3.  5.  6. 12. 13. 15. 16.]
 [ 4.  5.  7.  8. 14. 15. 17. 18.]
 [ 5.  6.  8.  9. 15. 16. 18. 19.]]
'''


# 两张图，按滤波器的大小2*2，步幅1，填充0，通道数2 展开后，变成如下：
x2 = np.array([first_picture, second_picture])
col2 = im2col(x2, filter_h, filter_w, stride, pad)
# print(col2.shape)# (8, 8)
# print(col2)
'''
[[  1.   2.   4.   5.  11.  12.  14.  15.]
 [  2.   3.   5.   6.  12.  13.  15.  16.]
 [  4.   5.   7.   8.  14.  15.  17.  18.]
 [  5.   6.   8.   9.  15.  16.  18.  19.]
 上面是第一张图展开的结果
 下面是第二张图展开的结果
 [101. 102. 104. 105. 111. 112. 114. 115.]
 [102. 103. 105. 106. 112. 113. 115. 116.]
 [104. 105. 107. 108. 114. 115. 117. 118.]
 [105. 106. 108. 109. 115. 116. 118. 119.]]
'''


# ------------------------------------------------------ 滤波器初始化 start -------------------------------------------------------

# 初始化2个，高宽2*2，通道数为2的滤波器，滤波器数据结构（2,2,2,3），（滤波器个数，通道数，滤波器高，滤波器宽）

# 第一个滤波器
first_filter_channel_1 = [
    [1, 1],
    [1, 1]
]
first_filter_channel_2 = [
    [2, 2],
    [2, 2]
]
first_filter = [first_filter_channel_1, first_filter_channel_2]


# 第二个滤波器
second_filter_channel_1 = [
    [3, 3],
    [3, 3]
]
second_filter_channel_2 = [
    [4, 4],
    [4, 4]
]
second_filter = [second_filter_channel_1, second_filter_channel_2]


# ------------------------------------------------------ 滤波器初始化 end -------------------------------------------------------


# 0000000000000000000000000000000000000000000000000000000 下面开始模拟卷积层的正向处理 00000000000000000000000000000000000000000000000000


# 下面是 一张通道数为2的图 和 一个通道数为2的滤波器的运算结果-------------------------------------------------------

# 注意这里只有一个滤波器
W1 = np.array([first_filter])
b1 = np.array([1])  # 一个滤波器，只有一个偏置，所以这里，初始化了一个，1
# print(W.shape)# (1, 2, 2, 2)

# 展开滤波器
filter_num = 1  # 滤波器数量
col_W1 = W1.reshape(filter_num, -1).T
# print(col_W1)
'''
[[1]
 [1]
 [1]
 [1]
 [2]
 [2]
 [2]
 [2]]
'''
print(col_W1.T)
# 确实是，行乘列，与书上说的一样，和前面全连接网络affine那个运算一样
out1 = np.dot(col1, col_W1)+b1
# print(out1.shape) #(4, 1)
# print(out1)
'''
[[117.]
 [129.]
 [153.]
 [165.]]
'''

out_h = 2  # 卷积运算输出的大小，为啥这里是2，详细看书，一看你就明白
out_w = 2  # 卷积运算输出的大小

# 因为就一张图所以下面的第一个参数为1
out1 = out1.reshape(1, out_h, out_w, -1)
# print(out1)
out1 = out1.transpose(0, 3, 1, 2)
# print(out1.shape) # (1, 1, 2, 2)（图片数量，使用的滤波器个数，卷积运算输出高，卷积运算输出宽）
# print(out1)
'''
# 一张2通道的图 和 一个2通道的滤波器 的运算结果
[[[[117. 129.]
   [153. 165.]]]]
'''


# 下面是 一张通道数为2的图 和 两个通道数为2的滤波器的运算结果-------------------------------------------------------

# 注意这里有两个滤波器
W2 = np.array([first_filter, second_filter])
b2 = np.array([1, 1])  # 一个滤波器，只有一个偏置，这里有两个滤波器，所以这里，初始化了两个，1

# 展开滤波器
filter_num = 2
col_W2 = W2.reshape(filter_num, -1).T
# print(col_W2)
'''
[[1 3]
 [1 3]
 [1 3]
 [1 3]
 [2 4]
 [2 4]
 [2 4]
 [2 4]]
'''

out2 = np.dot(col1, col_W2)+b2
# print(out2)
'''
[[117. 245.]
 [129. 273.]
 [153. 329.]
 [165. 357.]]
'''

# 因为就一张图所以下面的第一个参数为1
out2 = out2.reshape(1, out_h, out_w, -1).transpose(0, 3, 1, 2)
# print(out2.shape) # (1, 2, 2, 2)（图片数量，使用的滤波器个数，卷积运算输出高，卷积运算输出宽）
# print(out2)
'''
[[[[117. 129.]
   [153. 165.]]
    # 上面这个，是这个图，使用第一个滤波器的卷积运算结果
    # 下面这个，是这个图，使用第二个滤波器的卷积运算结果
  [[245. 273.]
   [329. 357.]]]]
'''


# 下面是 两张通道数为2的图 和 两个通道数为2的滤波器的运算结果-------------------------------------------------------

out3 = np.dot(col2, col_W2)+b2
# 因为是两张图所以下面的第一个参数为2
out3 = out3.reshape(2, out_h, out_w, -1).transpose(0, 3, 1, 2)
# print(out3.shape) # (2, 2, 2, 2) （图片数量，使用的滤波器个数，卷积运算输出高，卷积运算输出宽）
# print(out3)
'''
[[[[117. 129.]
   [153. 165.]]
    # 上面这个，是第一张图，使用第一个滤波器的卷积运算结果
    # 下面这个，是第一张图，使用第二个滤波器的卷积运算结果
  [[245. 273.]
   [329. 357.]]]]
   
[[[[117. 129.]
   [153. 165.]]]
    # 上面这个，是第二张图，使用第一个滤波器的卷积运算结果
    # 下面这个，是第二张图，使用第二个滤波器的卷积运算结果
 [[[245. 273.]
   [329. 357.]]]]
'''


# 0000000000000000000000000000000000000000000000000000000 下面开始模拟卷积层的反向处理 00000000000000000000000000000000000000000000000000

# 上面正向传播里，
# 1、先将 图片 和 滤波器，展开成了 像全连接网络里affine运算 的那种数据结构的数据，
# 2、然后将展开后的滤波器看成权重，将展开后的图片看成输入数据，
# 3、然后在通过np.dot(输入数据,权重)（行乘列）进行计算，
# 4、计算完后，将计算结果，转换成 图片那种数据结构。
# 上面的计算流程，这就是卷积运算的正向传播

# 下面开始分析，卷积层，反向传播代码
def backward(self, dout):
    # 在正向传播时，卷积运算的结果，结果的数据结构，如：(1, 1, 2, 2)（图片数量，使用的滤波器个数，卷积运算输出高，卷积运算输出宽）
    # 那么在反向传播时，传进来的数据，数据结构是和 正向传播时 卷积运算结果的数据结构 是一样的
    # 假如正向传播时，输出数据的结构是(1, 1, 2, 2)，那么反向传播时，传回来的数据的数据结构，也是(1, 1, 2, 2)，里面的数据不一样，但数据结构是一样的，这和affine那个一样
    print('dout', dout.shape) # (1, 1, 2, 2)

    FN, C, FH, FW = self.W.shape #（滤波器数量，滤波器通道数，滤波器高，滤波器宽），这里假设，滤波器是如下数据结构(1, 2, 2, 2)


    dout = dout.transpose(0, 2, 3, 1).reshape(-1, FN) # 这里转换数据结构，将dout展开，从 (1, 1, 2, 2) 变成了 (4, 1) ,从 (1, 2, 2, 2) 变成了 (4, 2)，从(2, 1, 2, 2) 变成了（8, 1），从(2, 2, 2, 2) 变成了（8, 2）

    
    # 求出 偏置的梯度
    # 和affine里处理是一样的，不懂就看affine
    self.db = np.sum(dout, axis=0) # 这里偏置的梯度数据结构是，假如 正向传播时，卷积运算时，使用了2个滤波器，则这里就是（2,）。使用了3个滤波器，则这里就是(3,)。使用了1个滤波器，则这里就是(1,)，这是因为，一个滤波器对应一个偏置

    # 求出 权重（或滤波器）的梯度
    self.dW = np.dot(self.col.T, dout)
    # affine反向传播，是用 反转的 输入数据X 和 dout 进行dot运算，算出权重W的梯度
    # 这里和affine反向传播一样，用反转的 已按滤波器展开的图片数据 和 dout 进行dot运算，算出 滤波器的梯度
    # 不明白为啥，看affine反向传播，一看你就明白
    # 下面，是一张图，按滤波器的大小2*2，步幅1，填充0，通道数2 展开后的图片数据，数据结构是(4,8)，这张图片原有的数据结构是(1, 2, 3, 3)（图片数量，通道数，图片高，图片宽）
    '''
    [[ 1.  2.  4.  5. 11. 12. 14. 15.]
     [ 2.  3.  5.  6. 12. 13. 15. 16.]
     [ 4.  5.  7.  8. 14. 15. 17. 18.]
     [ 5.  6.  8.  9. 15. 16. 18. 19.]]
    '''
    # self.col.T 将这个数据反转（行变列），数据结构变成（8,4），变成如下
    '''
    [[ 1.  2.  4.  5.]
     [ 2.  3.  5.  6.]
     [ 4.  5.  7.  8.]
     [ 5.  6.  8.  9.]
     [11. 12. 14. 15.]
     [12. 13. 15. 16.]
     [14. 15. 17. 18.]
     [15. 16. 18. 19.]]
    '''
    # self.dW = np.dot(self.col.T, dout) 算出权重(滤波器) 的梯度 （8,4）dot（4,1）=>（8,1）

    self.dW = self.dW.transpose(1, 0).reshape(FN, C, FH, FW) # 上面算完后，数据结构还是affine那种数据结构，需要把数据结构转成滤波器图像的数据结构，所以这里就变成了上面那个(FN, C, FH, FW = self.W.shape)滤波器的数据结构，(1, 2, 2, 2)（滤波器数量，通道数，滤波器高，滤波器宽）


    # 求出 输入数据（或图片数据）的梯度
    dcol = np.dot(dout, self.col_W.T)
    # affine反向传播，是用 dout 和 反转的 权重W 进行dot运算，算出输入数据X的梯度
    # 这里和affine反向传播一样，是用 dout 和 反转的 已展开的滤波器 进行dot运算，算出图片数据的梯度
    # 有啥不懂，就看affine那个反向传播，确实是，一模一样
    # 下面是，滤波器原始数据结构是(1, 2, 2, 2)，被展开后的数据结构，展开后的数据结构是，(8,1)
    '''
    [[1]
     [1]
     [1]
     [1]
     [2]
     [2]
     [2]
     [2]]
    '''
    # self.col_W.T 将这个数据反转（行变列，列变行），数据结构变成（1,8），变成如下
    '''
    [[1 1 1 1 2 2 2 2]]
    '''
    # dcol = np.dot(dout, self.col_W.T) 算出 图像的梯度，（4,1）dot（1,8）=>（4,8）

    dx = col2im(dcol, self.x.shape, FH, FW, self.stride, self.pad) # 上面算完后，数据结构还是affine那种数据结构，需要将数据转换成图片的数据结构，转换后，数据结构变成(1, 2, 3, 3)，（图片数量，通道数，图片高，图片宽）

    return dx

# 反向传播，和正向传播的流程差不多，且和书上描述的一样，能够清楚的看到affine的影子
# 大概流程如下：
# 1、将传回来的dout展开
# 2、求偏置的梯度
# 3、求权重(滤波器)的梯度
# 3.1、将求出来的权重梯度，转换成滤波器图像的数据结构
# 4、求输入数据(图片数据)的梯度
# 4.1、将求出来的(图片数据)的梯度，转成图片的数据结构

# 与 affine 相比较，affine里没有1、3.1、4.1这三步，剩下的都一样

# 正向传播时，传进来的输入数据的数据结构是什么样，反向传播时，就返回什么样的数据结构
# 正向传播时，输入的运算结果的数据结构是什么样，反向传播时，传进来的就是什么样的数据结构