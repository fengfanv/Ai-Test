import numpy as np


x = np.arange(18).reshape(2,3,3)
print(x)
# array([[[ 0,  1,  2],
#         [ 3,  4,  5],
#         [ 6,  7,  8]],

#        [[ 9, 10, 11],
#         [12, 13, 14],
#         [15, 16, 17]]]) 


# # 你认为 x[[1,0],:,[1,2]] 的结果是什么？是如下结果吗？
# array([[[10, 11],
#         [13, 14],
#         [16, 17]],

#        [[ 1,  2],
#         [ 4,  5],
#         [ 7,  8]]])


# # 上面的结果是错误的，如下才是正确的结果
print(x[[1,0],:,[1,2]])
# array([[10, 13, 16],
#        [ 2,  5,  8]])
# # 上面这个结果，取的是，第一个数组里的1，和第二数组里的1，[1,:,1]。然后第一个数组里的0，第二数组里的2 [0,:,2]。


# # 你认为 x[[1,0],:,[1,2]] 的结果，其实是如下表达式的结果
print(x[[1,0]][...,[1,2]])
# array([[[10, 11],
#         [13, 14],
#         [16, 17]],

#        [[ 1,  2],
#         [ 4,  5],
#         [ 7,  8]]])

#-----------------------------------------

print(x[[1,0],:,1])
# array([[10, 13, 16],
#        [ 1,  4,  7]])

# # 为啥是如上结果，不应该是如下结果吗？
# array([[0, 1, 2],
#        [3, 4, 5],
#        [6, 7, 8]])

# # 答：x[[1,0],:,1] 里的 1 是个高级索引
# # 取的是 x[1,:,1] => [10, 13, 16]
# # 取的是 x[0,:,1] => [1, 4, 7]

# # 如下 x[[1,0],...][...,1] 可以取到和 x[[1,0],:,1] 一样的效果
print(x[[1,0],...][...,1])
# array([[10, 13, 16],
#        [ 1,  4,  7]])

# # 如下表达式，才会输出你认为的那个结果
print(x[[1,0],...][1])
# array([[0, 1, 2],
#        [3, 4, 5],
#        [6, 7, 8]])

#-----------------------------------------

a = np.arange(2*3*4*2).reshape(2,3,4,2)
print(a)
# array([[[[ 0,  1],
#          [ 2,  3],
#          [ 4,  5],
#          [ 6,  7]],

#         [[ 8,  9],
#          [10, 11],
#          [12, 13],
#          [14, 15]],

#         [[16, 17],
#          [18, 19],
#          [20, 21],
#          [22, 23]]],


#        [[[24, 25],
#          [26, 27],
#          [28, 29],
#          [30, 31]],

#         [[32, 33],
#          [34, 35],
#          [36, 37],
#          [38, 39]],

#         [[40, 41],
#          [42, 43],
#          [44, 45],
#          [46, 47]]]])

print(a[...,[1,0],[1,2],:])
# array([[[10, 11],
#         [ 4,  5]],

#        [[34, 35],
#         [28, 29]]])

print(a[...,[1,0],[1,2],:].shape)
# (2, 2, 2)

# 取的是 a[0][1][1] => [10, 11]
# 取的是 a[0][0][2] => [4, 5]
# 取的是 a[1][1][1] => [34, 35]
# 取的是 a[1][0][2] => [28, 29]

#-----------------------------------------

b = np.arange(2*4*6).reshape(2,4,6)
print(b)
# array([[[ 0,  1,  2,  3,  4,  5],
#         [ 6,  7,  8,  9, 10, 11],
#         [12, 13, 14, 15, 16, 17],
#         [18, 19, 20, 21, 22, 23]],

#        [[24, 25, 26, 27, 28, 29],
#         [30, 31, 32, 33, 34, 35],
#         [36, 37, 38, 39, 40, 41],
#         [42, 43, 44, 45, 46, 47]]])

b_ind = np.arange(2*2).reshape(2,2)
print(b_ind)
# array([[0, 1],
#        [2, 3]])

print(b[...,b_ind,:])
# array([[[[ 0,  1,  2,  3,  4,  5],
#          [ 6,  7,  8,  9, 10, 11]],

#         [[12, 13, 14, 15, 16, 17],
#          [18, 19, 20, 21, 22, 23]]],


#        [[[24, 25, 26, 27, 28, 29],
#          [30, 31, 32, 33, 34, 35]],

#         [[36, 37, 38, 39, 40, 41],
#          [42, 43, 44, 45, 46, 47]]]])

print(b[...,b_ind,:].shape)
# (2, 2, 2, 6)

