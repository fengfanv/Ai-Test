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

print(x[1,:,1])
# array([10, 13, 16])

print(x[0,:,2])
# array([2, 5, 8])



# # 你认为 x[[1,0],:,[1,2]] 的结果，其实是如下表达式的结果
print(x[[1,0]][...,[1,2]])
# array([[[10, 11],
#         [13, 14],
#         [16, 17]],

#        [[ 1,  2],
#         [ 4,  5],
#         [ 7,  8]]])

#-----------------------------------------

x = np.arange(2*3*3*3).reshape(2,3,3,3)
# array([[[[ 0,  1,  2],
#          [ 3,  4,  5],
#          [ 6,  7,  8]],

#         [[ 9, 10, 11],
#          [12, 13, 14],
#          [15, 16, 17]],

#         [[18, 19, 20],
#          [21, 22, 23],
#          [24, 25, 26]]],


#        [[[27, 28, 29],
#          [30, 31, 32],
#          [33, 34, 35]],

#         [[36, 37, 38],
#          [39, 40, 41],
#          [42, 43, 44]],

#         [[45, 46, 47],
#          [48, 49, 50],
#          [51, 52, 53]]]])

print(x[[1,0],:,:,[1,2]])
# array([[[28, 31, 34],
#         [37, 40, 43],
#         [46, 49, 52]],

#        [[ 2,  5,  8],
#         [11, 14, 17],
#         [20, 23, 26]]])

print(x[[1,0],...][...,[1,2]])
# array([[[[28, 29],
#          [31, 32],
#          [34, 35]],

#         [[37, 38],
#          [40, 41],
#          [43, 44]],

#         [[46, 47],
#          [49, 50],
#          [52, 53]]],


#        [[[ 1,  2],
#          [ 4,  5],
#          [ 7,  8]],

#         [[10, 11],
#          [13, 14],
#          [16, 17]],

#         [[19, 20],
#          [22, 23],
#          [25, 26]]]])

print(x[1,...,1])
# array([[28, 31, 34],
#        [37, 40, 43],
#        [46, 49, 52]])

print(x[0,...,2])
# array([[ 2,  5,  8],
#        [11, 14, 17],
#        [20, 23, 26]])

#-----------------------------------------

x = np.arange(18).reshape(2,3,3)
print(x)
# array([[[ 0,  1,  2],
#         [ 3,  4,  5],
#         [ 6,  7,  8]],

#        [[ 9, 10, 11],
#         [12, 13, 14],
#         [15, 16, 17]]]) 

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

x = np.arange(2*3*4*5).reshape(2,3,4,5)
print(x)
# array([[[[  0,   1,   2,   3,   4],
#          [  5,   6,   7,   8,   9],
#          [ 10,  11,  12,  13,  14],
#          [ 15,  16,  17,  18,  19]],

#         [[ 20,  21,  22,  23,  24],
#          [ 25,  26,  27,  28,  29],
#          [ 30,  31,  32,  33,  34],
#          [ 35,  36,  37,  38,  39]],

#         [[ 40,  41,  42,  43,  44],
#          [ 45,  46,  47,  48,  49],
#          [ 50,  51,  52,  53,  54],
#          [ 55,  56,  57,  58,  59]]],


#        [[[ 60,  61,  62,  63,  64],
#          [ 65,  66,  67,  68,  69],
#          [ 70,  71,  72,  73,  74],
#          [ 75,  76,  77,  78,  79]],

#         [[ 80,  81,  82,  83,  84],
#          [ 85,  86,  87,  88,  89],
#          [ 90,  91,  92,  93,  94],
#          [ 95,  96,  97,  98,  99]],

#         [[100, 101, 102, 103, 104],
#          [105, 106, 107, 108, 109],
#          [110, 111, 112, 113, 114],
#          [115, 116, 117, 118, 119]]]])

print(x[[1,0],:,1,1])
# array([[ 66,  86, 106],
#        [  6,  26,  46]])

print(x[[1,0],:,1][...,1])
# array([[ 66,  86, 106],
#        [  6,  26,  46]])

print(x[[1,0]][...,1,1])
# array([[ 66,  86, 106],
#        [  6,  26,  46]])

print(x[[1,0],...][...,1,:][...,1])
# array([[ 66,  86, 106],
#        [  6,  26,  46]])

# -----------------

print(x[[1,0],:,:,1])
# array([[[ 61,  66,  71,  76],
#         [ 81,  86,  91,  96],
#         [101, 106, 111, 116]],

#        [[  1,   6,  11,  16],
#         [ 21,  26,  31,  36],
#         [ 41,  46,  51,  56]]])

print(x[[1,0]][...,1])
# array([[[ 61,  66,  71,  76],
#         [ 81,  86,  91,  96],
#         [101, 106, 111, 116]],

#        [[  1,   6,  11,  16],
#         [ 21,  26,  31,  36],
#         [ 41,  46,  51,  56]]])

#-----------------------------------------

x = np.arange(2*3*4*5).reshape(2,3,4,5)
print(x)
# array([[[[  0,   1,   2,   3,   4],
#          [  5,   6,   7,   8,   9],
#          [ 10,  11,  12,  13,  14],
#          [ 15,  16,  17,  18,  19]],

#         [[ 20,  21,  22,  23,  24],
#          [ 25,  26,  27,  28,  29],
#          [ 30,  31,  32,  33,  34],
#          [ 35,  36,  37,  38,  39]],

#         [[ 40,  41,  42,  43,  44],
#          [ 45,  46,  47,  48,  49],
#          [ 50,  51,  52,  53,  54],
#          [ 55,  56,  57,  58,  59]]],


#        [[[ 60,  61,  62,  63,  64],
#          [ 65,  66,  67,  68,  69],
#          [ 70,  71,  72,  73,  74],
#          [ 75,  76,  77,  78,  79]],

#         [[ 80,  81,  82,  83,  84],
#          [ 85,  86,  87,  88,  89],
#          [ 90,  91,  92,  93,  94],
#          [ 95,  96,  97,  98,  99]],

#         [[100, 101, 102, 103, 104],
#          [105, 106, 107, 108, 109],
#          [110, 111, 112, 113, 114],
#          [115, 116, 117, 118, 119]]]])

print(x[[1,0],:,[1,2]])
# array([[[ 65,  66,  67,  68,  69],
#         [ 85,  86,  87,  88,  89],
#         [105, 106, 107, 108, 109]],

#        [[ 10,  11,  12,  13,  14],
#         [ 30,  31,  32,  33,  34],
#         [ 50,  51,  52,  53,  54]]])
print(x[[1,0],:,[1,2]].shape)
# (2, 3, 5)

b1=np.array([[1,0]]) # (1, 2)
b2=np.array([[1,2]]) # (1, 2)
print(x[b1,:,b2])
# array([[[[ 65,  66,  67,  68,  69],
#          [ 85,  86,  87,  88,  89],
#          [105, 106, 107, 108, 109]],

#         [[ 10,  11,  12,  13,  14],
#          [ 30,  31,  32,  33,  34],
#          [ 50,  51,  52,  53,  54]]]])
print(x[b1,:,b2].shape)
# (1, 2, 3, 5)

c1=np.array([[1,0],[1,0]]) # (2, 2)
c2=np.array([[1,2],[1,2]]) # (2, 2)
print(x[c1,:,c2])
# array([[[[ 65,  66,  67,  68,  69],
#          [ 85,  86,  87,  88,  89],
#          [105, 106, 107, 108, 109]],

#         [[ 10,  11,  12,  13,  14],
#          [ 30,  31,  32,  33,  34],
#          [ 50,  51,  52,  53,  54]]],


#        [[[ 65,  66,  67,  68,  69],
#          [ 85,  86,  87,  88,  89],
#          [105, 106, 107, 108, 109]],

#         [[ 10,  11,  12,  13,  14],
#          [ 30,  31,  32,  33,  34],
#          [ 50,  51,  52,  53,  54]]]])
print(x[c1,:,c2].shape)
# (2, 2, 3, 5)

d1=np.array([[1,0],[0,1]]) # (2, 2)
d2=np.array([[1,2],[1,2]]) # (2, 2)
print(x[d1,:,d2])
# array([[[[ 65,  66,  67,  68,  69],
#          [ 85,  86,  87,  88,  89],
#          [105, 106, 107, 108, 109]],

#         [[ 10,  11,  12,  13,  14],
#          [ 30,  31,  32,  33,  34],
#          [ 50,  51,  52,  53,  54]]],


#        [[[  5,   6,   7,   8,   9],
#          [ 25,  26,  27,  28,  29],
#          [ 45,  46,  47,  48,  49]],

#         [[ 70,  71,  72,  73,  74],
#          [ 90,  91,  92,  93,  94],
#          [110, 111, 112, 113, 114]]]])
print(x[d1,:,d2].shape)
# (2, 2, 3, 5)

e1=np.array([[[1,0],[0,1]]]) # (1, 2, 2)
e2=np.array([[[1,2],[1,2]]]) # (1, 2, 2)
print(x[e1,:,e2])
# array([[[[[ 65,  66,  67,  68,  69],
#           [ 85,  86,  87,  88,  89],
#           [105, 106, 107, 108, 109]],

#          [[ 10,  11,  12,  13,  14],
#           [ 30,  31,  32,  33,  34],
#           [ 50,  51,  52,  53,  54]]],


#         [[[  5,   6,   7,   8,   9],
#           [ 25,  26,  27,  28,  29],
#           [ 45,  46,  47,  48,  49]],

#          [[ 70,  71,  72,  73,  74],
#           [ 90,  91,  92,  93,  94],
#           [110, 111, 112, 113, 114]]]]])
print(x[e1,:,e2].shape)
# (1, 2, 2, 3, 5)

f1=np.array([[[[1,0]],[[0,1]]]]) # (1, 2, 1, 2)
f2=np.array([[[[1,2]],[[1,2]]]]) # (1, 2, 1, 2)
print(x[f1,:,f2])
# array([[[[[[ 65,  66,  67,  68,  69],
#            [ 85,  86,  87,  88,  89],
#            [105, 106, 107, 108, 109]],

#           [[ 10,  11,  12,  13,  14],
#            [ 30,  31,  32,  33,  34],
#            [ 50,  51,  52,  53,  54]]]],



#         [[[[  5,   6,   7,   8,   9],
#            [ 25,  26,  27,  28,  29],
#            [ 45,  46,  47,  48,  49]],

#           [[ 70,  71,  72,  73,  74],
#            [ 90,  91,  92,  93,  94],
#            [110, 111, 112, 113, 114]]]]]])
print(x[f1,:,f2].shape)
# (1, 2, 1, 2, 3, 5)

print(x[1,:,1])
# array([[ 65,  66,  67,  68,  69],
#        [ 85,  86,  87,  88,  89],
#        [105, 106, 107, 108, 109]])
print(x[1,:,1].shape)
# (3, 5)

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

