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

#----------------------------------

# print(x[0:8:2])
# # [0 2 4 6]
# i=0
# j=8
# k=2
# q=(j-i)/k
# r=(j-i)%k
# print(q) # 4
# print(r) # 0
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+r
# print(m) # 4
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # True
# print(i+(m-1)*k) # 6
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标


#----------------------------------------------------------------------------------------------------------------


#----------------------------------
# slice(i,j,k)k是负值时
# print(x[7:1:-2])
# # [7 5 3]
# i=7
# j=1
# k=-2
# q=(j-i)/k
# r=(j-i)%k
# print(q) # 3
# print(r) # 0
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+r
# print(m) # 3
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # False  注意k是负值时，这里是False
# print(i+(m-1)*k) # 3
# # # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------
# slice(i,j,k)k是负值时
# print(x[7:1:-3])
# # [7 4]
# i=7
# j=1
# k=-3
# q=(j-i)/k
# r=(j-i)%k
# print(q) # 2
# print(r) # 0
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+r
# print(m) # 2
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # False  注意k是负值时，这里是False
# print(i+(m-1)*k) # 4
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------
# slice(i,j,k)k是负值时
# print(x[8:1:-3])
# # [8 5 2]
# i=8
# j=1
# k=-3
# q=math.floor((j-i)/k)
# r=(j-i)%k
# print(q) # 2 未取整时：2.33333
# print(r) # -1
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+1
# print(m) # 3
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # False  注意k是负值时，这里是False
# print(i+(m-1)*k) # 2
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------
# slice(i,j,k)k是负值时
# print(x[8:0:-3])
# # [8 5 2]
# i=8
# j=0
# k=-3
# q=math.floor((j-i)/k)
# r=(j-i)%k
# print(q) # 2 未取整时：2.666666
# print(r) # -2
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+1
# print(m) # 3
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # False  注意k是负值时，这里是False
# print(i+(m-1)*k) # 2
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

#----------------------------------
# slice(i,j,k)k是负值时
# print(x[8:0:-2])
# # [8 6 4 2]
# i=8
# j=0
# k=-2
# q=(j-i)/k
# r=(j-i)%k
# print(q) # 4
# print(r) # 0
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+r
# print(m) # 4
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # False  注意k是负值时，这里是False
# print(i+(m-1)*k) # 2
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标

# ----------------------------------

# ----------------------------------

# ----------------------------------

# print(x[8:-3:-2])
# # [8]
# print(x[8:7:-2])
# # [8]

# # 注意，如果切片i或j出现-1,-2,-3这种numpy索引下标。需要先将这些numpy下标转成人脑正常思考下的下标，如这里x有10元素，-3指的是正序下，下标为 7 的x里第8个元素
# #      如果不将这些 -1,-2,-3这种numpy索引下标进行转换，使用 q=(j-i)/k 或 r=(j-i)%k 计算的结果将是不正确的。

# i=8
# j=7
# # j=-3 计算结果不正确
# k=-2
# q=math.floor((j-i)/k)
# r=(j-i)%k
# print(q) # 0 未取整时：0.5
# print(r) # -1
# # m的计算方式如下：当 r 等于 0 时，用 m = q + r ；当 r 不等于 0 时，用 m = q + 1 
# m=q+1
# print(m) # 1
# print(j-i==q*k+r) # True
# print(i+(m-1)*k < j) # False  注意k是负值时，这里是False
# print(i+(m-1)*k) # 8
# # i+(m-1)*k 的意思是，当前切片，取的最后一个数据值的坐标


# --------------------------------------------------------------------
# 这里待完善，这里方法是正确的，但是没有考虑把 numpy负索引 转换成 正序索引的问题。
# 这里应该先把 numpy负索引 转换成 正序索引
# 然后再进行 数值收缩操作(值超越了数组范围时，归整数据)

# print(x[-10-2:100:3])
# # [0, 3, 6, 9]
# i=-12
# j=100
# k=3
# i = i<=-10-0?0:i ==> 0
# j = j>=10?10:j ==> 10
# k=3

# 注意 k 这里是正
# 注意 i 开始坐标(包含)
# 注意 j 结束坐标(不包含)

# ----------

# print(x[100:-10-2:-3])
# # [9, 6, 3, 0]
# i=100
# j=-12
# k=-3

# i = i>=9?9:i ==> 9

# j = j<=-10-1?-1:j ==> -1
# 注意这里的 结果-1 ，是人脑正常理解的那个下标-1，如数据的坐标[-2,-1,0,1,2,3,4]；这里这个-1，是为了 q=(j-i)/k 和 r=(j-i)%k 时方便计算时使用。
#                    不是numpy索引里的下标-1，numpy里的-1下标，指的是数组最后一位，假如有10个元素，-1指的就是第10个元素。

# k=-3

# 注意 k 这里是负
# 注意 i 开始坐标(包含)
# 注意 j 结束坐标(不包含)


