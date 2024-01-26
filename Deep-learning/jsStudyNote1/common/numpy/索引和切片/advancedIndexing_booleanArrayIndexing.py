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


# 如下不能转换成整数数组索引。但如下在索引前，处理索引的方式，和整数数组在分解和处理索引时，有点类似。
print(a[np.array([[True,False,True],[True,False,True]])]) # a (2, 3, 4, 5) index (2, 3) result (4, 4, 5)
'''
[[True,False,True],[True,False,True]] 转换成 [0,0]、[0,2]、[1,0]、[1,2]

a[0,0] (4,5)
a[0,2] (4,5)
a[1,0] (4,5)
a[1,2] (4,5)

a.shape                                                                  (2,3,4,5)
([[True,False,True],[True,False,True]]) => [<0,0>,<0,2>,<1,0>,<1,2>]     (4  )
                                                                          ^
a[0,0].shape                                                                 (4,5)  #  这些索引结果的形状：a[0,0]，a[0,2]等等
                                                                              ^ ^
a[[[True,False,True],[True,False,True]]].shape                           (4,  4,5)
'''

print(a[np.array([[True,False,True],[True,True,False]])]) # a (2, 3, 4, 5) index (2, 3) result (4, 4, 5)
#                                           ^
'''
[[True,False,True],[True,True,False]] 转换成 [0,0]、[0,2]、[1,0]、[1,1]

a[0,0] (4,5)
a[0,2] (4,5)
a[1,0] (4,5)
a[1,1] (4,5)

a.shape                                                                  (2,3,4,5)
([[True,False,True],[True,True,False]]) => [<0,0>,<0,2>,<1,0>,<1,1>]     (4  )
                                                                          ^
a[0,0].shape                                                                 (4,5)  #  这些索引结果的形状：a[0,0]，a[0,2]等等
                                                                              ^ ^
a[[[True,False,True],[True,True,False]]].shape                           (4,  4,5)
'''

print(a[np.array([[True,False,True],[True,True,True]])]) # a (2, 3, 4, 5) index (2, 3) result (5, 4, 5)
#                                           ^    ^
'''
[[True,False,True],[True,True,True]] 转换成 [0,0]、[0,2]、[1,0]、[1,1]、[1,2]

a[0,0] (4,5)
a[0,2] (4,5)
a[1,0] (4,5)
a[1,1] (4,5)
a[1,2] (4,5)

a.shape                                                                     (2,3,4,5)
([[True,False,True],[True,True,True]]) => [<0,0>,<0,2>,<1,0>,<1,1>,<1,2>]   (5  )
                                                                             ^
a[0,0].shape                                                                    (4,5)  #  这些索引结果的形状：a[0,0]，a[0,2]等等
                                                                                 ^ ^
a[[[True,False,True],[True,True,True]]].shape                               (5,  4,5)
'''

print(a[np.array([[True,False,True,False],[True,True,True,False]])]) # a (2, 3, 4, 5) index (2, 4) 报错。IndexError: boolean index did not match indexed array along dimension 1; dimension is 3 but corresponding boolean dimension is 4


print(a[:,np.array([[True,True,False,False],[True,True,False,False],[True,True,False,False]])])  # a (2, 3, 4, 5) index (3, 4) result (2, 6, 5)
'''
(:,[[True,True,False,False],[True,True,False,False],[True,True,False,False]]) 转换成 [:,0,0]、[:,0,1]、[:,1,0]、[:,1,1]、[:,2,0]、[:,2,1]

a[0,0,0] (5)
a[0,0,1] (5)
a[0,1,0] (5)
a[0,1,1] (5)
a[0,2,0] (5)
a[0,2,1] (5)

a[1,0,0] (5)
a[1,0,1] (5)
a[1,1,0] (5)
a[1,1,1] (5)
a[1,2,0] (5)
a[1,2,1] (5)

a.shape                                                                                                                                  (2,3,4,5)
                                                                                                                                          ^
(:,[[True,True,False,False],[True,True,False,False],[True,True,False,False]]) => [<:,0,0>,<:,0,1>,<:,1,0>,<:,1,1>,<:,2,0>,<:,2,1>]         (6  )
                                                                                                                                            ^
a[0,0,0].shape                                                                                                                                 (5)  #  这些索引结果的形状：a[0,0,0]，a[0,0,1]等等
                                                                                                                                                ^
a[:,[[True,True,False,False],[True,True,False,False],[True,True,False,False]]].shape                                                     (2,6,  5)
'''

print(a[:,np.array([[True,True,False,False],[True,True,True,True],[True,True,False,False]])]) # a (2, 3, 4, 5) index (3, 4) result (2, 8, 5)
#                                                        ^    ^
'''
(:,[[True,True,False,False],[True,True,True,True],[True,True,False,False]]) 转换成 [:,0,0]、[:,0,1]、[:,1,0]、[:,1,1]、[:,1,2]、[:,1,3]、[:,2,0]、[:,2,1]

a[0,0,0] (5)
a[0,0,1] (5)
a[0,1,0] (5)
a[0,1,1] (5)
a[0,1,2] (5)
a[0,1,3] (5)
a[0,2,0] (5)
a[0,2,1] (5)

a[1,0,0] (5)
a[1,0,1] (5)
a[1,1,0] (5)
a[1,1,1] (5)
a[1,1,2] (5)
a[1,1,3] (5)
a[1,2,0] (5)
a[1,2,1] (5)

a.shape                                                                                                                                             (2,3,4,5)
                                                                                                                                                     ^
(:,[[True,True,False,False],[True,True,True,True],[True,True,False,False]]) => [<:,0,0>,<:,0,1>,<:,1,0>,<:,1,1>,<:,1,2>,<:,1,3>,<:,2,0>,<:,2,1>]      (8  )
                                                                                                                                                       ^
a[0,0,0].shape                                                                                                                                            (5)  #  这些索引结果的形状：a[0,0,0]，a[0,0,1]等等
                                                                                                                                                           ^
a[:,[[True,True,False,False],[True,True,True,True],[True,True,False,False]]].shape                                                                  (2,8,  5)
'''

print(a[:,:,np.array([[True,True,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]])]) # a (2, 3, 4, 5) index (4, 5) result (2, 3, 3)
'''
(:,:,[[True,True,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]) 转换成 [:,:,0,0]、[:,:,0,1]、[:,:,3,4]

a[0,0,0,0] 索引结果是标量值，没有维度
a[0,0,0,1] 索引结果是标量值，没有维度
a[0,0,3,4] 索引结果是标量值，没有维度

a[0,1,0,0] 索引结果是标量值，没有维度
a[0,1,0,1] 索引结果是标量值，没有维度
a[0,1,3,4] 索引结果是标量值，没有维度

a[0,2,0,0] 索引结果是标量值，没有维度
a[0,2,0,1] 索引结果是标量值，没有维度
a[0,2,3,4] 索引结果是标量值，没有维度


a[1,0,0,0] 索引结果是标量值，没有维度
a[1,0,0,1] 索引结果是标量值，没有维度
a[1,0,3,4] 索引结果是标量值，没有维度

a[1,1,0,0] 索引结果是标量值，没有维度
a[1,1,0,1] 索引结果是标量值，没有维度
a[1,1,3,4] 索引结果是标量值，没有维度

a[1,2,0,0] 索引结果是标量值，没有维度
a[1,2,0,1] 索引结果是标量值，没有维度
a[1,2,3,4] 索引结果是标量值，没有维度


a.shape                                                                                                                                                                     (2,3,4,5)
                                                                                                                                                                             ^ ^
(:,:,[[True,True,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]) => [<:,:,0,0>,<:,:,0,1>,<:,:,3,4>]         (3  )
                                                                                                                                                                                 ^
a[0,0,0,0]                                                                                                                     a[0,0,0,0]等等这些的索引结果是标量值，没有维度        ( )
                                                                                                                                                                                   ^
a[:,:,[[True,True,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]].shape                                 (2,3,3  )
'''

print(a[:,np.array([[[True,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]])]) # a (2, 3, 4, 5) index (3, 4, 5) result (2, 2)
'''
(:,[[[True,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]]) 转换成 [:,0,0,0]、[:,2,3,4]

a[0,0,0,0] 索引结果是标量值，没有维度
a[0,2,3,4] 索引结果是标量值，没有维度

a[1,0,0,0] 索引结果是标量值，没有维度
a[1,2,3,4] 索引结果是标量值，没有维度

a.shape                                                                                                                                                                                                                                                                                                                                                                                                                                   (2,3,4,5)
                                                                                                                                                                                                                                                                                                                                                                                                                                           ^
(:,[[[True,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]]) => [<:,0,0,0>,<:,2,3,4>]          (2    )
                                                                                                                                                                                                                                                                                                                                                                                                                                             ^
a[0,0,0,0]                                                                                                                                                                                                                                                                                                                                                                                   a[0,0,0,0]等等这些的索引结果是标量值，没有维度       (  )
                                                                                                                                                                                                                                                                                                                                                                                                                                                ^
a[:,[[[True,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]]].shape                          (2,2    )
'''


# -------------------


print(a[:,np.array([[True,True,False,False],[True,True,True,True],[True,True,False,False]]),np.array([True,True,True,True])]) # a (2, 3, 4, 5) index (:,(3,4),(4)) 报错：IndexError: boolean index did not match indexed array along dimension 3; dimension is 5 but corresponding boolean dimension is 4
print(a[:,np.array([[True,True,False,False],[True,True,True,True],[True,True,False,False]]),np.array([True,True,True,True,True])]) # a (2, 3, 4, 5) index (:,(3,4),(5)) 报错：IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (8,) (8,) (5,)
print(a[:,np.array([[True,True,False,False],[True,True,True,True],[True,True,False,False]]),:,np.array([True,True,True,True,True])]) # a (2, 3, 4, 5) index (:,(3,4),:,(5)) 报错：IndexError: too many indices for array: array is 4-dimensional, but 5 were indexed

# ---

print(a[np.array([[True,False,True],[True,False,True]]),np.array([True,True,True,True])]) # a (2, 3, 4, 5) index ((2,3),(4)) result (4, 5)
print(a[np.array([[True,False,True],[True,False,True]])])                                 # a (2, 3, 4, 5) index (2, 3)      result (4, 4, 5)
print(a[np.array([[True,False,True],[True,False,True]]),[0,1,2,3]]) # 结果与 a[np.array([[True,False,True],[True,False,True]]),np.array([True,True,True,True])] 一样。

'''
print(a[np.array([[True,False,True],[True,False,True]])])  # (4, 4, 5)
[[[  0   1   2   3   4]
  [  5   6   7   8   9]
  [ 10  11  12  13  14]
  [ 15  16  17  18  19]]

 [[ 40  41  42  43  44]
  [ 45  46  47  48  49]
  [ 50  51  52  53  54]
  [ 55  56  57  58  59]]

 [[ 60  61  62  63  64]
  [ 65  66  67  68  69]
  [ 70  71  72  73  74]
  [ 75  76  77  78  79]]

 [[100 101 102 103 104]
  [105 106 107 108 109]
  [110 111 112 113 114]
  [115 116 117 118 119]]]

# np.array([[True,False,True],[True,False,True]]) 形状(2,3) 可转变成 [0,0]、[0,2]、[1,0]、[1,2] 

print(a[0,0]) # (4, 5)
[[ 0  1  2  3  4]
 [ 5  6  7  8  9]
 [10 11 12 13 14]
 [15 16 17 18 19]]

print(a[0,2]) # (4, 5)
[[40 41 42 43 44]
 [45 46 47 48 49]
 [50 51 52 53 54]
 [55 56 57 58 59]]

print(a[1,0]) # (4, 5)
[[60 61 62 63 64]
 [65 66 67 68 69]
 [70 71 72 73 74]
 [75 76 77 78 79]]

print(a[1,2]) # (4, 5)
[[100 101 102 103 104]
 [105 106 107 108 109]
 [110 111 112 113 114]
 [115 116 117 118 119]]

# ---

print(a[np.array([[True,False,True],[True,False,True]]),[0,1,2,3]]) # (4, 5)
[[  0   1   2   3   4]
 [ 45  46  47  48  49]
 [ 70  71  72  73  74]
 [115 116 117 118 119]]

# np.array([[True,False,True],[True,False,True]]) 形状(2,3) 可转变成 [0,0]、[0,2]、[1,0]、[1,2]
# [0,1,2,3] 形状(4) 可转变成 [:,:,0,:]、[:,:,1,:]、[:,:,2,:]、[:,:,3,:]

print(a[0,0,0])
print(a[0,0][0])
[0 1 2 3 4]

print(a[0,2,1])
print(a[0,2][1])
[45 46 47 48 49]

print(a[1,0,2])
print(a[1,0][2])
[70 71 72 73 74]

print(a[1,2,3])
print(a[1,2][3])
[115 116 117 118 119]

# ---

print(a[np.array([[True,False,True],[True,False,True]]),[True,True,True,False]]) # 报错：IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (4,) (4,) (3,)
                                                                          ^
print(a[np.array([[True,False,True],[True,False,True]]),[0,1,2 ]]) # 报错：IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (4,) (4,) (3,)
                                                              ^
# 请把这个报错的例子 与 print(a[np.array([[True,False,True],[True,False,True]]),[0,1,2,3]]) 进行对比。

IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (4,) (4,) (3,)
                                                                                         (a)  (b)  (c)
(a)、np.array([[True,False,True],[True,False,True]]) 可转变成 [0,0]、[0,2]、[1,0]、[1,2] => [<0,:,:,:>,<0,:,:,:>,<1,:,:,:>,<1,:,:,:>] (4)
                                                              ^      ^      ^     ^
(b)、np.array([[True,False,True],[True,False,True]]) 可转变成 [0,0]、[0,2]、[1,0]、[1,2] => [<:,0,:,:>,<:,2,:,:>,<:,0,:,:>,<:,2,:,:>] (4)
                                                                ^      ^      ^      ^
(c)、[0,1,2] => [<:,:,0,:>,<:,:,1,:>,<:,:,2,:>] (3)
'''

# ---

'''
print(a[np.array([[True,False,True],[True,False,True]]),[0,1,2,3],[1,1,1,1]]) # (4)

# np.array([[True,False,True],[True,False,True]]) shape(2,3) => [<0,0,:,:>,<0,2,:,:>,<1,0,:,:>,<1,2,:,:>] (4)
# [0,1,2,3] shape(4) => [<:,:,0,:>,<:,:,1,:>,<:,:,2,:>,<:,:,3,:>] (4)
# [1,1,1,1] shape(4) => [<:,:,:,1>,<:,:,:,1>,<:,:,:,1>,<:,:,:,1>] (4)
# 这三个相结合后是 [<0,0,0,1>,<0,2,1,1>,<1,0,2,1>,<1,2,3,1>] (4)

a.shape                                                                                                         (2,3,4,5)
([[True,False,True],[True,False,True]],[0,1,2,3],[1,1,1,1]) => [<0,0,0,1>,<0,2,1,1>,<1,0,2,1>,<1,2,3,1>]        (4      )
                                                                                                                 ^
a[0,0,0,1].shape                                              a[0,0,0,1]等等这些的索引结果是标量值，没有维度           (   )
                                                                                                                      ^
a[[[True,False,True],[True,False,True]],[0,1,2,3],[1,1,1,1]].shape                                              (4      )

# ---

print(a[np.array([[True,False,True],[True,False,True]]),[0,1,2,3]]) # (4, 5)

# np.array([[True,False,True],[True,False,True]]) shape(2,3) => [<0,0,:,:>,<0,2,:,:>,<1,0,:,:>,<1,2,:,:>] (4)
# [0,1,2,3] shape(4) => [<:,:,0,:>,<:,:,1,:>,<:,:,2,:>,<:,:,3,:>] (4)
# 这俩个相结合后是 [<0,0,0,:>,<0,2,1,:>,<1,0,2,:>,<1,2,3,:>] (4)

a.shape                                                                                          (2,3,4,5)

([[True,False,True],[True,False,True]],[0,1,2,3]) => [<0,0,0,:>,<0,2,1,:>,<1,0,2,:>,<1,2,3,:>]   (4    )
                                                                                                  ^
a[0,0,0,:].shape                                                                                       (5)  #  这些索引结果的形状：a[0,0,0,:]，a[0,2,1,:]等等
                                                                                                        ^
a[[[True,False,True],[True,False,True]],[0,1,2,3]].shape                                         (4,    5)

# ---

print(a[:,np.array([[True,False,False,False],[True,False,False,False],[True,False,False,True]]),[0,1,2,3]]) # (2, 4)

# np.array([[True,False,False,False],[True,False,False,False],[True,False,False,True]]) shape(3,4) => [<:,0,0,:>,<:,1,0,:>,<:,2,0,:>,<:,2,3,:>] (4)
# [0,1,2,3] shape(4) => [<:,:,:,0>,<:,:,:,1>,<:,:,:,2>,<:,:,:,3>] (4)
# 这俩个相结合后是 [<:,0,0,0>,<:,1,0,1>,<:,2,0,2>,<:,2,3,3>] (4)

a[0,0,0,0]
    ^ ^ ^
a[0,1,0,1]
    ^ ^ ^
a[0,2,0,2]
    ^ ^ ^
a[0,2,3,3]
    ^ ^ ^

a[1,0,0,0]
    ^ ^ ^
a[1,1,0,1]
    ^ ^ ^
a[1,2,0,2]
    ^ ^ ^
a[1,2,3,3]
    ^ ^ ^

a.shape                                                                                                                                   (2,3,4,5)
                                                                                                                                           ^
(:,[[True,False,False,False],[True,False,False,False],[True,False,False,True]],[0,1,2,3]) => [<:,0,0,0>,<:,1,0,1>,<:,2,0,2>,<:,2,3,3>]      (4    )
                                                                                                                                             ^
a[0,0,0,0]                                                                                 a[0,0,0,0]等等这些的索引结果是标量值，没有维度         (  )
                                                                                                                                                ^
a[:,[[True,False,False,False],[True,False,False,False],[True,False,False,True]],[0,1,2,3]].shape                                          (2,4    )

# ---

print(a[np.array([[True,False,True],[True,False,True]]),:,[0,1,2,3]]) # (4, 4)

# np.array([[True,False,True],[True,False,True]]) shape(2,3) => [<0,0,:,:>,<0,2,:,:>,<1,0,:,:>,<1,2,:,:>] (4)
# [0,1,2,3] shape(4) => [<:,:,:,0>,<:,:,:,1>,<:,:,:,2>,<:,:,:,3>] (4)
# 这俩个相结合后是 [<0,0,:,0>,<0,2,:,1>,<1,0,:,2>,<1,2,:,3>] (4)

a.shape                                                                                                           (2,3,4,5)
([[True,False,True],[True,False,True]],:,[0,1,2,3]) => [<0,0,:,0>,<0,2,:,1>,<1,0,:,2>,<1,2,:,3>]                  (4      )
                                                                                                                   ^
a[0,0,:,0].shape                                                                                                    (4    )
                                                                                                                     ^
a[[[True,False,True],[True,False,True]],:,[0,1,2,3]].shape                                                        (4,4    )

# ---

print(a[:,[0,1,2],np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,True]])]) # (2, 3)

# [0,1,2] shape(3) => [<:,0,:,:>,<:,1,:,:>,<:,2,:,:>] (3)
# np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,True]]) shape(4,5) => [<:,:,2,4>,<:,:,3,0>,<:,:,3,4>] (3)
# 这俩个相结合后是 [<:,0,2,4>,<:,1,3,0>,<:,2,3,4>]

a[0,0,2,4]
    ^ ^ ^
a[0,1,3,0]
    ^ ^ ^
a[0,2,3,4]
    ^ ^ ^

a[1,0,2,4]
    ^ ^ ^
a[1,1,3,0]
    ^ ^ ^
a[1,2,3,4]
    ^ ^ ^

a.shape                                                                                                                                                                                 (2,3,4,5)
                                                                                                                                                                                         ^
(:,[0,1,2],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,True]]) => [<:,0,2,4>,<:,1,3,0>,<:,2,3,4>]             (3    )
                                                                                                                                                                                           ^
a[0,0,2,4]                                                                                                                         a[0,0,2,4]等等这些的索引结果是标量值，没有维度               (  )
                                                                                                                                                                                              ^
a[:,[0,1,2],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,True]]].shape                                       (2,3    )

# ---

print(a[[0,1],:,np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])]) # (2, 3)

# [0,1] shape(2) => [<0,:,:,:>,<1,:,:,:>] (2)
# np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]) shape(4,5) => [<:,:,2,4>,<:,:,3,0>] (2)
# 这俩个相结合后是 [<0,:,2,4>,<1,:,3,0>]

a.shape                                                                                                                                                                             (2,3,4,5)
([0,1],:,[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]) => [<0,:,2,4>,<1,:,3,0>]                  (2      )
                                                                                                                                                                                     ^
a[0,:,2,4].shape                                                                                                                                                                      (3    )  #  这些索引结果的形状：a[0,:,2,4]，a[1,:,3,0]等等
                                                                                                                                                                                       ^
a[[0,1],:,[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]].shape                                    (2,3    )

# ---

print(a[np.array([[False,False,True],[True,False,False]]),np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])]) # (2)

# np.array([[False,False,True],[True,False,False]]) shape(2,3) => [<0,2,:,:>,<1,0,:,:>] (2)
# np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]) shape(4,5) => [<:,:,2,4>,<:,:,3,0>] (2)
# 这俩个相结合后是 [<0,2,2,4>,<1,0,3,0>]

a.shape                                                                                                                                                                                                 (2,3,4,5)
([[False,False,True],[True,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]) => [<0,2,2,4>,<1,0,3,0>]      (2      )
                                                                                                                                                                                                         ^
a[0,2,2,4]                                                                                                                                             a[0,2,2,4]等等这些的索引结果是标量值，没有维度           (  )
                                                                                                                                                                                                              ^
a[[[False,False,True],[True,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]].shape                        (2      )

# ---

print(a[np.array([[False,False,True],[True,False,False]]),:,np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])]) # 报错 IndexError: too many indices for array: array is 4-dimensional, but 5 were indexed
                                                          ^
print(a[np.array([[False,True,True],[True,False,False]]),:,np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])]) # 报错 IndexError: too many indices for array: array is 4-dimensional, but 5 were indexed
                          ^                              ^
index = np.arange(4*5*6).reshape(4,5,6)<1
print(a[np.array([[False,False,True],[True,False,False]]),index]) # 报错：IndexError: too many indices for array: array is 4-dimensional, but 5 were indexed
'''

# ---

'''
print(a[np.array([[False,False,True],[True,False,False]]),[[1,2],[3,2]]]) # (2, 2, 5)

索引元组从左数第一位是 np.array([[False,False,True],[True,False,False]])
其形状是(2,3)
所以这个在索引元组里第一位，形状是(2,3)的布尔数组索引 可以对应 被索引数组a(2,3,4,5)的前两个维度

所以这个布尔数组索引 可转换成 [<0,2,:,:>,<1,0,:,:>] (2)

然后分别从 [<0,2,:,:>,<1,0,:,:>] 里提取各个维度的索引，并将其组装成整数数组：
[<0,2,:,:>,<1,0,:,:>] => [0,1]
  ^         ^             ^ ^
[<0,2,:,:>,<1,0,:,:>] => [2,0]
    ^         ^           ^ ^
提取完毕后，用从布尔数组索引里提取出来的整数数组，来替换原布尔数组索引：
使用 ([0,1],[2,0],:,:) 来替换原来的 (np.array([[False,False,True],[True,False,False]]),:,:)

index = ([0,1],[2,0],[[1,2],[3,2]]) ((2),(2),(2,2))

所以 a[index] 的结果等于 a[np.array([[False,False,True],[True,False,False]]),[[1,2],[3,2]]]

# ---

print(a[[[0,1],[1,0]],:,np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])]) # (2, 2, 3)

索引元组从左数第三位是 np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])
其形状是(4,5)
所以这个在索引元组里第三位，形状是(4,5)的布尔数组索引 可以对应 被索引数组a(2,3,4,5)的后两个维度

所以这个布尔数组索引 可转换成 [<:,:,2,4>,<:,:,3,0>] (2)

然后分别从 [<0,2,:,:>,<1,0,:,:>] 里提取各个维度的索引，并将其组装成整数数组：
[<:,:,2,4>,<:,:,3,0>] => [2,3]
      ^         ^         ^ ^
[<:,:,2,4>,<:,:,3,0>] => [4,0]
        ^         ^       ^ ^
提取完毕后，用从布尔数组索引里提取出来的整数数组，来替换原布尔数组索引：
使用 (:,:,[2,3],[4,0]) 来替换原来的 (:,:,np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]))

index = ([[0,1],[1,0]],:,[2,3],[4,0])
                       ^ 测试时，请把 : 替换成slice(None)
所以 a[index] 的结果等于 a[[[0,1],[1,0]],:,np.array([[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]])]
'''

# ---

b=np.arange(2*3*4*5*6).reshape(2,3,4,5,6)

'''
print(b[:,[[2,1],[1,0]],:,np.array([[True,True,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False]])]) # (2, 2, 2, 4)

索引元组从左数第四位是 np.array([[True,True,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False]])
其形状是(5,6)
所以这个在索引元组里第四位，形状是(5,6)的布尔数组索引 可以对应 被索引数组b(2,3,4,5,6)的后两个维度

所以这个布尔数组索引 可转换成 [<:,:,:,0,0>,<:,:,:,0,1>] (2)

然后分别从 [<:,:,:,0,0>,<:,:,:,0,1>] 里提取各个维度的索引，并将其组装成整数数组：
[<:,:,:,0,0>,<:,:,:,0,1>] => [0,0]
        ^           ^         ^ ^
[<:,:,:,0,0>,<:,:,:,0,1>] => [0,1]
          ^           ^       ^ ^
提取完毕后，用从布尔数组索引里提取出来的整数数组，来替换原布尔数组索引：
使用 (:,:,:,[0,0],[0,1]) 来替换原来的 (:,:,:,np.array([[True,True,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False]]))

index = (:,[[2,1],[1,0]],:,[0,0],[0,1])
         ^------->-------^---------> 测试时，请把 : 替换成slice(None)
所以 b[index] 的结果等于 b[:,[[2,1],[1,0]],:,np.array([[True,True,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False]])]

# ---







'''


