# 池化层实现（7.4.4 - 7.5）

import sys
import os
sys.path.append(os.pardir)

from common.util import *
from dataset.mnist import load_mnist
import numpy as np



# ------------------------------------------------------ 图片初始化 start -------------------------------------------------------

# 创建 2个，4*4大小，通道为3的图片，这个图片的数据形状是，（2,3,4,4），（图片个数，通道数，图片高，图片宽）

# np.random.rand(2,3) # 两行三列

# 第一张图片
# 第一张图片的第一个通道，4*4
first_picture_channel_1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]
# 第一张图片的第二个通道，4*4
first_picture_channel_2 = [
    [21, 22, 23, 24],
    [25, 26, 27, 28],
    [29, 30, 31, 32],
    [33, 34, 35, 36]
]
# 第一张图片的第三个通道，4*4
first_picture_channel_3 = [
    [41, 42, 43, 44],
    [45, 46, 47, 48],
    [49, 50, 51, 52],
    [53, 54, 55, 56]
]
first_picture = [first_picture_channel_1, first_picture_channel_2, first_picture_channel_3]
# print('first_picture',first_picture)

# 第二张图片
# 第二张图片的第一个通道，4*4
second_picture_channel_1 = [
    [101, 102, 103, 104],
    [105, 106, 107, 108],
    [109, 110, 111, 112],
    [113, 114, 115, 116]
]
# 第二张图片的第二个通道，4*4
second_picture_channel_2 = [
    [201, 202, 203, 204],
    [205, 206, 207, 208],
    [209, 220, 211, 212],
    [213, 214, 215, 216],
]
# 第二张图片的第三个通道，4*4
second_picture_channel_3 = [
    [301, 302, 303, 304],
    [305, 306, 307, 308],
    [309, 310, 311, 312],
    [313, 314, 315, 316],
]
second_picture = [second_picture_channel_1, second_picture_channel_2, second_picture_channel_3]
# print('second_picture',second_picture)

# ------------------------------------------------------ 图片初始化 end -------------------------------------------------------

# 两张4*4，通道数为3，的图片
x = np.array([first_picture, second_picture])
# print(x.shape) # (2, 3, 4, 4) （图片数量，通道数，高，宽）

# 一张4*4，通道数为3，的图片
x1 = np.array([first_picture])
# print(x1.shape) # (1, 3, 4, 4)（图片数量，通道数，高，宽）


pool_h = 2  # 池化目标区域，的高，详细见（7.3 池化层）
pool_w = 2  # 池化目标区域，的宽
stride = 2  # 步幅，详细见（7.3 池化层）
pad = 0  # 填充

# ------------------------------------------ 池化层向前处理 ------------------------------------------

N, C, H, W = x1.shape  # 输入数据的形状（图片数量，通道数，高，宽）

# 求出，池化层，正向传播，输出的大小
pool_out_h = int(1 + (H - pool_h) / stride)
pool_out_w = int(1 + (W - pool_w) / stride)
# print(pool_out_h,pool_out_w) # 2 2

# 1、按照 池化的目标区域大小，和步幅，展开输入数据 start
col1 = im2col(x1, pool_h, pool_w, stride, pad)
# print(col1.shape) # (4, 12)
# print(col1)
'''
[[ 1.  2.  5.  6. 21. 22. 25. 26. 41. 42. 45. 46.]
 [ 3.  4.  7.  8. 23. 24. 27. 28. 43. 44. 47. 48.]
 [ 9. 10. 13. 14. 29. 30. 33. 34. 49. 50. 53. 54.]
 [11. 12. 15. 16. 31. 32. 35. 36. 51. 52. 55. 56.]]
'''
col1 = col1.reshape(-1, pool_h*pool_w)
# print(col1)
# 这里的输出结果，和7.4.4的理论，有点不一样，但问题不大。等第3步执行完后，池化层输出的最终结果，的数据结构，会被转成正确的的数据结构
'''
[[ 1.  2.  5.  6.]
 [21. 22. 25. 26.]
 [41. 42. 45. 46.]
 [ 3.  4.  7.  8.]
 [23. 24. 27. 28.]
 [43. 44. 47. 48.]
 [ 9. 10. 13. 14.]
 [29. 30. 33. 34.]
 [49. 50. 53. 54.]
 [11. 12. 15. 16.]
 [31. 32. 35. 36.]
 [51. 52. 55. 56.]]
'''
# ---------------- 数据展开 end

# 2、获取最大值
arg_max = np.argmax(col1, axis=1) #获取最大元素索引值，反向传播时会用到。axis=1,代表我要查找的最大元素在第1维中的索引值。
# print(arg_max.shape) (12,)
# print(arg_max)
'''
[3 3 3 3 3 3 3 3 3 3 3 3]
'''
out1 = np.max(col1, axis=1) #获取最大元素值
# print(out1)
'''
[ 6. 26. 46.  8. 28. 48. 14. 34. 54. 16. 36. 56.]
'''

# 3、转换数据结构
out1 = out1.reshape(N, pool_out_h, pool_out_w, C)
# print(out1.shape) # (1, 2, 2, 3)
# print(out1)
'''
[[[[ 6. 26. 46.]
   [ 8. 28. 48.]]

  [[14. 34. 54.]
   [16. 36. 56.]]]]
'''
out1 = out1.transpose(0, 3, 2, 1)
print(out1.shape)  # (1, 3, 2, 2) （图片数量，通道数，池化输出高，池化输出宽）
print(out1)
'''
[[[[ 6. 14.]
   [ 8. 16.]]

  [[26. 34.]
   [28. 36.]]

  [[46. 54.]
   [48. 56.]]]]
'''

# ------------------------------------------ 池化层的反向传播 ------------------------------------------


# 反向传播代码解析
def backward(self, dout):
    print(dout.shape) # (1, 3, 2, 2)



    # 1、转换dout数据结构
    dout = dout.transpose(0, 2, 3, 1)
    print(dout.shape) # (1, 2, 2, 3)



    # 2、给正向传播时，输入进来的图片，图片里每处池化的区域，区域的最大值位置，附上dout值，其它位置赋值为0
    pool_size = self.pool_h * self.pool_w # 2*2=4
    print(dout.size) # 12     (1*2*2*3)=12
    dmax = np.zeros((dout.size, pool_size))
    print(dmax.shape) # (12, 4)

    print(dout.shape) # (1, 2, 2, 3)
    # dout.flatten() 将dout数据展开
    print(dout.flatten().shape) # (12,)

    print(self.arg_max.size) # 12
    print(self.arg_max.flatten())
    '''
    [3 3 3 3 3 3 3 3 3 3 3 3]
    '''
    # np.arange()函数返回一个有终点和起点的固定步长的排列
    # np.arange(12) array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11])
    # 下面是，图片正向传播时，图片里每一处被池化区域 里 最大的那个值得位置，赋dout值。每处池化区域不是最大值的位置（除最大值得位置，其它位置），设置成0，这点确实和relu一样
    '''
    如一张一个通道的4*4图片
    [21, 22, 23, 24],
    [25, 26, 27, 28],
    [29, 30, 31, 32],
    [33, 34, 35, 36]
    池化区域是2*2，步幅是2
    则：
    第一处池化区域:
    21,22
    25,26
    第二处池化区域:
    23,24
    27,28
    等等...

    第一处池化区域里26是最大的，则在反向传播时，26那个位置返回dout值，除26那个位置的其它位置，反向传播时，返回0
    第二处池化区域里28是最大的，则在反向传播时，28那个位置返回dout值，除28那个位置的其它位置，反向传播时，返回0
    '''
    dmax[np.arange(self.arg_max.size), self.arg_max.flatten()] = dout.flatten()
    print(dmax[np.arange(self.arg_max.size), self.arg_max.flatten()].shape) # (12,)
    print(dmax.shape) # (12, 4)
    print(dmax)
    '''
    [[ 0.  0.  0.  0.00011212  ]
     [ 0.  0.  0.  0.00157219  ]
     [ 0.  0.  0.  -0.00102285 ]
     ...
     [ 0.  0.  0.  .00019068   ]]
    '''



    # 3、赋值完毕，将数据转换成图片的数据结构
    dmax = dmax.reshape(dout.shape + (pool_size,))
    print(dmax.shape) # (1, 2, 2, 3, 4)

    dcol = dmax.reshape(dmax.shape[0] * dmax.shape[1] * dmax.shape[2], -1)
    print(dcol.shape) # (4, 12) 2*2=4, 3*4=12
    dx = col2im(dcol, self.x.shape, self.pool_h, self.pool_w, self.stride, self.pad)
    print(dx.shape) # (1, 3, 4, 4) （正向传播时输入的图片数量，输入的图片的通道数量，输入的图片的高，输入的图片的宽）
    
    return dx

    # 反向传播大致流程
    # 1、转换dout数据结构
    # 2、给正向传播时，输入进来的图片，图片里每处池化的区域，区域的最大值位置，附上dout值，其它位置赋值为0
    # 3、将赋值好的数据，转换成图片的数据结构
    # 总结，流程上确实和relu很像
