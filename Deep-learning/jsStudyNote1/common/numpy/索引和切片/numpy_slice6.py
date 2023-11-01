import numpy as np
import math

x = np.arange(10)
print(x)
# array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# print(x[1:7:2])
# # [1 3 5]
# i=1
# j=7
# k=2
# q=(j-i)/k
# r=(j-i)%k
# print(q) # 3.0
# print(r) # 0
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+r
# print(m) # 3.0
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # True
# print(i+(m-1)*k) # 5
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------

# print(x[1:7:3])
# # [1 4]
# i=1
# j=7
# k=3
# q=(j-i)/k
# r=(j-i)%k
# print(q) # 2.0
# print(r) # 0
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+r
# print(m) # 2.0
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # True
# print(i+(m-1)*k) # 4
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------

# print(x[1:8:3])
# # [1 4 7]
# i=1
# j=8
# k=3
# q=math.floor((j-i)/k)
# r=(j-i)%k
# print(q) # 2 未取整时：2.33333333
# print(r) # 1
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+1
# print(m) # 3
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # True
# print(i+(m-1)*k) # 7
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------

# print(x[0:8:3])
# # [0 3 6]
# i=0
# j=8
# k=3
# q=math.floor((j-i)/k)
# r=(j-i)%k
# print(q) # 2 未取整时：2.6666666
# print(r) # 2
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+1
# print(m) # 3
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # True
# print(i+(m-1)*k) # 6
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标