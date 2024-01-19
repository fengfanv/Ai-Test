import numpy as np

# 关于高级索引_布尔数组索引的案例

a=np.arange(2*3*4*5).reshape(2,3,4,5)

# print(a)
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


print(a[[True,False]]) # (1, 3, 4, 5) 和 a[[0]] 一样

print(a[[True,False,True]]) # 报错。IndexError: boolean index did not match indexed array along dimension 0; dimension is 2 but corresponding boolean dimension is 3

print(a[[True,False],[True,False,True]]) # (2, 4, 5) 和 a[[0],[0,2]] 一样

print(a[[True,True],[True,False,True]]) # (2, 4, 5) 和 a[[0,1],[0,2]] 一样

print(a[[True,True],[True,True,True]]) # 报错。报错提示信息和 a[[0,1],[0,1,2]] 一模一样。IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (2,) (3,)

print(a[[True,False],:,[True,True,True,False]]) # (3, 3, 5) 和 a[[0],:,[0,1,2]] 一样

print(a[[True,True],:,[True,True,True,False]]) # 报错。报错提示信息和 a[[0,1],:,[0,1,2]] 一模一样。IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (2,) (3,)

print(a[:,[True,False,False],[True,True,True,False]]) # (2, 3, 5) 和 a[:,[0],[0,1,2]] 一样

print(a[:,[True,False,True],[True,True,True,False]]) # 报错。报错提示信息和 a[:,[0,2],[0,1,2]] 一模一样。IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (2,) (3,)

print(a[:,[True,False,True],[True,True,False,False]]) # (2, 2, 5) 和 a[:,[0,2],[0,1]] 一样

print(a[:,[True,False,False],:,[True,True,False,False,False]]) # (2, 2, 4) 和 a[:,[0],:,[0,1]] 一样

print(a[:,[True,False,True],:,[True,True,False,False,False]]) # (2, 2, 4) 和 a[:,[0,2],:,[0,1]] 一样

print(a[:,[True,False,True],:,[True,True,True,False,False]]) # 报错。报错提示信息和 a[:,[0,2],:,[0,1,2]] 一模一样。IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (2,) (3,)

# -------------------

print(a[np.array([[True,False,True],[True,False,True]])]) # a (2, 3, 4, 5) index (2, 3) result (4, 4, 5)

print(a[np.array([[True,False,True],[True,True,False]])]) # a (2, 3, 4, 5) index (2, 3) result (4, 4, 5)
#                                           ^
print(a[np.array([[True,False,True],[True,True,True]])]) # a (2, 3, 4, 5) index (2, 3) result (5, 4, 5)
#                                               ^
print(a[np.array([[True,False,True,False],[True,True,True,False]])]) # a (2, 3, 4, 5) index (2, 4) 报错。IndexError: boolean index did not match indexed array along dimension 1; dimension is 3 but corresponding boolean dimension is 4

print(a[:,np.array([[True,True,False,False],[True,True,False,False],[True,True,False,False]])])  # a (2, 3, 4, 5) index (3, 4) result (2, 6, 5)

print(a[:,np.array([[True,True,False,False],[True,True,True,True],[True,True,False,False]])]) # a (2, 3, 4, 5) index (3, 4) result (2, 8, 5)
#                                                        ^    ^

#？？？？？
#？？？？？
