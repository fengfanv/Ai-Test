import numpy as np

# 关于高级索引_整数数组索引

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

print(a[[1,0,1,0]].shape) # (4, 3, 4, 5)
'''
([1,0,1,0]) a[1].shape => (3,4,5)
  ^
([1,0,1,0]) a[0].shape => (3,4,5)
    ^
([1,0,1,0]) a[1].shape => (3,4,5)
      ^
([1,0,1,0]) a[0].shape => (3,4,5)
        ^

a.shape               (2,3,4,5)
([1,0,1,0]).shape     (4,)
                       ^
a[1].shape              (3,4,5)    # 这些索引结果的形状：a[1]，a[0]，a[1]，a[0]
                         ^ ^ ^
a[[1,0,1,0]].shape    (4,3,4,5)
'''

print(a[[[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]].shape) # (4, 4, 3, 4, 5)
'''
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
   ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
     ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
       ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
         ^

([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
             ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
               ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
                 ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
                   ^

([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
                       ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
                         ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
                           ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
                             ^

([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
                                 ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
                                   ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[0].shape => (3,4,5)
                                     ^
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]) a[1].shape => (3,4,5)
                                       ^

a.shape                                            (  2,3,4,5)
([[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]).shape  (4,4)
                                                    ^ ^
a[1].shape                                             (3,4,5) # 这些索引结果的形状：a[1]，a[0]，a[1]，a[0]等等
                                                        ^ ^ ^
a[[[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]].shape (4,4,3,4,5)
'''

print(a[:,[1,0,1,0]].shape) # (2, 4, 4, 5)
'''
(:,[1,0,1,0]) a[0,1].shape => (4,5)
    ^             ^
(:,[1,0,1,0]) a[0,0].shape => (4,5)
      ^           ^
(:,[1,0,1,0]) a[0,1].shape => (4,5)
        ^         ^
(:,[1,0,1,0]) a[0,0].shape => (4,5)
          ^       ^

(:,[1,0,1,0]) a[1,1].shape => (4,5)
    ^             ^
(:,[1,0,1,0]) a[1,0].shape => (4,5)
      ^           ^
(:,[1,0,1,0]) a[1,1].shape => (4,5)
        ^         ^
(:,[1,0,1,0]) a[1,0].shape => (4,5)
          ^       ^

a.shape               (2,3,4,5)
                       ^
(:,[1,0,1,0]).shape   (:,4)
                         ^
a[0,1].shape              (4,5)  #  这些索引结果的形状：a[0,1]，a[0,0]，a[0,1]，a[0,0]等等
                           ^ ^
a[:,[1,0,1,0]].shape  (2,4,4,5)
'''

print(a[:,[[1,0],[0,1]]].shape) # (2, 2, 2, 4, 5)
'''
(:,[[1,0],[0,1]]) a[0,1].shape => (4,5)
     ^                ^
(:,[[1,0],[0,1]]) a[0,0].shape => (4,5)
       ^              ^

(:,[[1,0],[0,1]]) a[0,0].shape => (4,5)
           ^          ^
(:,[[1,0],[0,1]]) a[0,1].shape => (4,5)
             ^        ^


(:,[[1,0],[0,1]]) a[1,1].shape => (4,5)
     ^                ^
(:,[[1,0],[0,1]]) a[1,0].shape => (4,5)
       ^              ^

(:,[[1,0],[0,1]]) a[1,0].shape => (4,5)
           ^          ^
(:,[[1,0],[0,1]]) a[1,1].shape => (4,5)
             ^        ^

a.shape                     (2,  3,4,5)
                             ^
(:,[[1,0],[0,1]]).shape       (2,2)
                               ^ ^
a[0,1].shape                      (4,5)  #  这些索引结果的形状：a[0,1]，a[0,0]，a[0,0]，a[0,1]等等
                                   ^ ^
a[:,[[1,0],[0,1]]].shape    (2,2,2,4,5)
'''

print(a[:,[0,2,1],[1,2,3]].shape) # (2, 3, 5)
'''
[:,0,1]
[:,2,2]
[:,1,3]

(:,[0,2,1],[1,2,3]) a[0,0,1].shape => (5)
    ^       ^           ^ ^
(:,[0,2,1],[1,2,3]) a[0,2,2].shape => (5)
      ^       ^         ^ ^
(:,[0,2,1],[1,2,3]) a[0,1,3].shape => (5)
        ^       ^       ^ ^

(:,[0,2,1],[1,2,3]) a[1,0,1].shape => (5)
    ^       ^           ^ ^
(:,[0,2,1],[1,2,3]) a[1,2,2].shape => (5)
      ^       ^         ^ ^
(:,[0,2,1],[1,2,3]) a[1,1,3].shape => (5)
        ^       ^       ^ ^

a.shape                                               (2,3,4,5)
                                                       ^
(:,[0,2,1],[1,2,3]) => [<:,0,1>,<:,2,2>,<:,1,3>]        (  3)
                                                           ^
a[0,0,1].shape                                              (5)  #  这些索引结果的形状：a[0,0,1]，a[0,2,2]，a[0,1,3]等等
                                                             ^
a[:,[0,2,1],[1,2,3]].shape                            (2,  3,5)
'''

print(a[:,[[1,2],[0,2]],[[3,2],[1,0]]].shape) # (2, 2, 2, 5)
'''
[:,1,3]
[:,2,2]
[:,0,1]
[:,2,0]

(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[0,1,3].shape => (5)
     ^             ^                ^ ^
(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[0,2,2].shape => (5)
       ^             ^              ^ ^

(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[0,0,1].shape => (5)
           ^             ^          ^ ^
(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[0,2,0].shape => (5)
             ^             ^        ^ ^

             
(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[1,1,3].shape => (5)
     ^             ^                ^ ^
(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[1,2,2].shape => (5)
       ^             ^              ^ ^

(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[1,0,1].shape => (5)
           ^             ^          ^ ^
(:,[[1,2],[0,2]],[[3,2],[1,0]]) a[1,2,0].shape => (5)
             ^             ^        ^ ^

a.shape                                                                      (2,3,4,5)
                                                                              ^
(:,[[1,2],[0,2]],[[3,2],[1,0]]) => [[<:,1,3>,<:,2,2>],[<:,0,1>,<:,2,0>]]       (2,2)
                                                                                ^ ^
a[0,1,3].shape                                                                     (5)  #  这些索引结果的形状：a[0,1,3]，a[0,2,2]，a[0,0,1]，a[0,2,0]等等
                                                                                    ^
a[:,[[1,2],[0,2]],[[3,2],[1,0]]].shape                                       (2,2,2,5)
'''

# 注意，如下这个例子，开始变的和预想的不一样了，这个例子用到了.transpose()
# 解释，假设x.shape为（10,20,30,40,50）并且假设ind_1和ind_2可以广播到形状（2,3,4）。那么x[:, ind_1, ind_2]的形状为（10,2,3,4,40,50），因为 x 的（20,30）子空间被替换为索引的（2,3,4）子空间。然而，x[:, ind_1, :, ind_2]的形状为（2,3,4,10,30,50）因为在索引子空间中没有明确的放置位置，因此它被附加到开头。这时可以使用.transpose()将子空间移动到所需的位置。
print(a[:,[1,2,0],:,[4,3,1]].shape) # (3, 2, 4)
'''
[:,1,:,4]
[:,2,:,3]
[:,0,:,1]

(:,[1,2,0],:,[4,3,1]) a[0,1,:,4].shape => (4)
    ^         ^           ^   ^
(:,[1,2,0],:,[4,3,1]) a[0,2,:,3].shape => (4)
      ^         ^         ^   ^
(:,[1,2,0],:,[4,3,1]) a[0,0,:,1].shape => (4)
        ^         ^       ^   ^

(:,[1,2,0],:,[4,3,1]) a[1,1,:,4].shape => (4)
    ^         ^           ^   ^
(:,[1,2,0],:,[4,3,1]) a[1,2,:,3].shape => (4)
      ^         ^         ^   ^
(:,[1,2,0],:,[4,3,1]) a[1,0,:,1].shape => (4)
        ^         ^       ^   ^

a.shape                                                                      (2,3,4,5)
                                                                              ^
(:,[1,2,0],:,[4,3,1]) => [<:,1,:,4>,<:,2,:,3>,<:,0,:,1>]                       (3    )
                                                                                ^
a[0,1,:,4].shape                                                                   (5)  #  这些索引结果的形状：a[0,1,:,4]，a[0,2,:,3]，a[0,0,:,1]等等
                                                                                    ^
                                                                             (2,3,  5)

(2,3,5).transpose(1,0,2).shape                                                 (3,2,5)

a[:,[1,2,0],:,[4,3,1]].shape                                                   (3,2,5)
'''

# 注意，如下这个例子，开始变的和预想的不一样了，这个例子用到了.transpose()
print(a[:,[[1]],:,[[2]]].shape) # (1, 1, 2, 4)
'''
[:,1,:,2]

(:,[[1]],:,[[2]]) a[0,1,:,2].shape => (4)
     ^       ^        ^   ^

(:,[[1]],:,[[2]]) a[1,1,:,2].shape => (4)
     ^       ^        ^   ^

a.shape                                                                      (2,3,4,5)
                                                                              ^
(:,[[1]],:,[[2]]) => [[<:,1,:,2>]]                                             (1,1  )
                                                                                ^ ^
a[0,1,:,2].shape                                                                   (4)  #  这些索引结果的形状：a[0,1,:,2]，a[1,1,:,2]
                                                                                    ^
                                                                             (2,1,1,4)

(2,1,1,4).transpose(1,2,0,3).shape                                           (1,1,2,4)

a[:,[[1]],:,[[2]]].shape                                                     (1,1,2,4)
'''

# 以上时关于高级索引整数数组索引的基础内容，下面处理索引元组中存在None的情况，多个数组之前需要广播的情况，整数和数组搭配的情况。