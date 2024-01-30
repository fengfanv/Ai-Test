import numpy as np

# only integers, slices (`:`), ellipsis (`...`), numpy.newaxis (`None`) and integer or boolean arrays are valid indices
# 只有整数、切片（':'）、省略号（'...'）、numpy.newaxis（'None'）和整数或布尔数组是有效的索引

# 关于高级索引_整数数组索引的案例

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
(:,[[1,0],[0,1]]).shape     (:,2,2)
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
(:,[0,2,1],[1,2,3]) => [<:,0,1>,<:,2,2>,<:,1,3>]        (3  )
                                                         ^
a[0,0,1].shape                                              (5)  #  这些索引结果的形状：a[0,0,1]，a[0,2,2]，a[0,1,3]等等
                                                             ^
a[:,[0,2,1],[1,2,3]].shape                            (2,3  ,5)
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

print(a[[1,1,0,1],:,[2,3,1,2]].shape) # (4, 3, 5)
'''
[1,:,2]
[1,:,3]
[0,:,1]
[1,:,2]

([1,1,0,1],:,[2,3,1,2]) a[1,:,2].shape => (3,5)
  ^           ^           ^   ^
([1,1,0,1],:,[2,3,1,2]) a[1,:,3].shape => (3,5)
    ^           ^         ^   ^
([1,1,0,1],:,[2,3,1,2]) a[0,:,1].shape => (3,5)
      ^           ^       ^   ^
([1,1,0,1],:,[2,3,1,2]) a[1,:,2].shape => (3,5)
        ^           ^     ^   ^

a.shape                                                                      (2,3,4,5)
([1,1,0,1],:,[2,3,1,2]) => [<1,:,2>,<1,:,3>,<0,:,1>,<1,:,2>]                 (4    )
                                                                              ^
a[1,:,2].shape                                                                   (3,5)  #  这些索引结果的形状：a[1,:,2]，a[1,:,3]等等
                                                                                  ^ ^
a[[1,1,0,1],:,[2,3,1,2]].shape                                               (4,  3,5)
'''

# 注意，如下这个例子，开始变的和预想的不一样了，这个例子用到了.transpose()
# 文档，假设x.shape为（10,20,30,40,50）并且假设ind_1和ind_2可以广播到形状（2,3,4）。那么x[:, ind_1, ind_2]的形状为（10,2,3,4,40,50），因为 x 的（20,30）子空间被替换为索引的（2,3,4）子空间。然而，x[:, ind_1, :, ind_2]的形状为（2,3,4,10,30,50）因为在索引子空间中没有明确的放置位置，因此它被附加到开头。这时可以使用.transpose()将子空间移动到所需的位置。
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
a[0,1,:,4].shape                                                                   (4)  #  这些索引结果的形状：a[0,1,:,4]，a[0,2,:,3]，a[0,0,:,1]等等
                                                                                    ^
                                                                             (2,3,  4)

(2,3,4).transpose(1,0,2).shape                                                 (3,2,4)

a[:,[1,2,0],:,[4,3,1]].shape                                                   (3,2,4)
'''

# 注意，如下这个例子，开始变的和预想的不一样了，这个例子也用到了.transpose()
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

print(a[:,[1,0],[1,0],[1,0]].shape) # (2, 2)
'''
[:,1,1,1]
[:,0,0,0]

(:,[1,0],[1,0],[1,0]) a[0,1,1,1].shape => () 索引结果是标量值，没有维度
    ^     ^     ^         ^ ^ ^
(:,[1,0],[1,0],[1,0]) a[0,0,0,0].shape => () 索引结果是标量值，没有维度
      ^     ^     ^       ^ ^ ^

(:,[1,0],[1,0],[1,0]) a[1,1,1,1].shape => () 索引结果是标量值，没有维度
    ^     ^     ^         ^ ^ ^
(:,[1,0],[1,0],[1,0]) a[1,0,0,0].shape => () 索引结果是标量值，没有维度
      ^     ^     ^       ^ ^ ^

a.shape                                                                      (2,3,4,5)
                                                                              ^
(:,[1,0],[1,0],[1,0]) => [<:,1,1,1>,<:,0,0,0>]                                 (2    )
                                                                                ^
a[0,1,1,1]                          a[0,1,1,1]等等这些的索引结果是标量值，没有维度   (  )
                                                                                   ^
a[:,[1,0],[1,0],[1,0]].shape                                                 (2,2    )
'''

# -----------------

b=np.arange(2*3*4*5*6).reshape(2,3,4,5,6)

print(b[[0,1],[1,2],:,[2,3]]) # (2, 4, 6)
'''
[0,1,:,2]
[1,2,:,3]

([0,1],[1,2],:,[2,3]) b[0,1,:,2].shape => (4,6)
  ^     ^       ^       ^ ^   ^
([0,1],[1,2],:,[2,3]) b[1,2,:,3].shape => (4,6)
    ^     ^       ^     ^ ^   ^

b.shape                                                                      (2,3,4,5,6)

([0,1],[1,2],:,[2,3]) => [<0,1,:,2>,<1,2,:,3>]                               (2      )
                                                                              ^
b[0,1,:,2].shape                                                                   (4,6)  #  这些索引结果的形状：b[0,1,:,2]，b[1,2,:,3]
                                                                                    ^ ^
b[[0,1],[1,2],:,[2,3]].shape                                                 (2,    4,6)
'''

print(b[:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]]) # (5, 2, 4)
'''
[:,0,:,1,2]
[:,2,:,2,3]
[:,1,:,0,5]
[:,1,:,3,1]
[:,0,:,1,4]

(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[0,0,:,1,2].shape => (4)
    ^             ^           ^               ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[0,2,:,2,3].shape => (4)
      ^             ^           ^             ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[0,1,:,0,5].shape => (4)
        ^             ^           ^           ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[0,1,:,3,1].shape => (4)
          ^             ^           ^         ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[0,0,:,1,4].shape => (4)
            ^             ^           ^       ^   ^ ^

(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[1,0,:,1,2].shape => (4)
    ^             ^           ^               ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[1,2,:,2,3].shape => (4)
      ^             ^           ^             ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[1,1,:,0,5].shape => (4)
        ^             ^           ^           ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[1,1,:,3,1].shape => (4)
          ^             ^           ^         ^   ^ ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) b[1,0,:,1,4].shape => (4)
            ^             ^           ^       ^   ^ ^

b.shape                                                                                                     (2,3,4,5,6)
                                                                                                             ^
(:,[0,2,1,1,0],:,[1,2,0,3,1],[2,3,5,1,4]) => [<:,0,:,1,2>,<:,2,:,2,3>,<:,1,:,0,5>,<:,1,:,3,1>,<:,0,:,1,4>]    (5      )
                                                                                                               ^
b[0,0,:,1,2].shape                                                                                                  (4) # 这些索引结果的形状：b[0,0,:,1,2]，b[0,2,:,2,3]等等
                                                                                                                     ^
                                                                                                            (2,5,    4)
(2,5,4).transpose(1,0,2).shape                                                                                  (5,2,4)
'''


# -----------------

c=np.arange(2*3*4*5*6*7).reshape(2,3,4,5,6,7)

print(c[:,:,[[1]],:,[[2]],[[3]]]) # (1, 1, 2, 3, 5)
'''
[:,:,1,:,2,3]

(:,:,[[1]],:,[[2]],[[3]]) c[0,0,1,:,2,3].shape => (5)
       ^       ^     ^          ^   ^ ^
(:,:,[[1]],:,[[2]],[[3]]) c[0,1,1,:,2,3].shape => (5)
       ^       ^     ^          ^   ^ ^
(:,:,[[1]],:,[[2]],[[3]]) c[0,2,1,:,2,3].shape => (5)
       ^       ^     ^          ^   ^ ^

(:,:,[[1]],:,[[2]],[[3]]) c[1,0,1,:,2,3].shape => (5)
       ^       ^     ^          ^   ^ ^
(:,:,[[1]],:,[[2]],[[3]]) c[1,1,1,:,2,3].shape => (5)
       ^       ^     ^          ^   ^ ^
(:,:,[[1]],:,[[2]],[[3]]) c[1,2,1,:,2,3].shape => (5)
       ^       ^     ^          ^   ^ ^

c.shape                                                                                                     (2,3,4,5,6,7)
                                                                                                             ^ ^
(:,:,[[1]],:,[[2]],[[3]]) =>  [[<:,:,1,:,2,3>]]                                                                 (1,1    )
                                                                                                                 ^ ^
c[0,0,1,:,2,3].shape                                                                                                  (5) # 这些索引结果的形状：c[0,0,1,:,2,3]，c[0,1,1,:,2,3]等等
                                                                                                                       ^
                                                                                                            (2,3,1,1,  5)
(2,3,1,1,5).transpose(2,3,0,1,4).shape                                                                        (1,1,2,3,5)
'''

print(c[:,:,[[1]],[[2]],[[3]]]) # (2, 3, 1, 1, 7)
'''
[:,:,1,2,3]

(:,:,[[1]],[[2]],[[3]]) c[0,0,1,2,3].shape => (7)
       ^     ^     ^          ^ ^ ^
(:,:,[[1]],[[2]],[[3]]) c[0,1,1,2,3].shape => (7)
       ^     ^     ^          ^ ^ ^
(:,:,[[1]],[[2]],[[3]]) c[0,2,1,2,3].shape => (7)
       ^     ^     ^          ^ ^ ^

(:,:,[[1]],[[2]],[[3]]) c[1,0,1,2,3].shape => (7)
       ^     ^     ^          ^ ^ ^
(:,:,[[1]],[[2]],[[3]]) c[1,1,1,2,3].shape => (7)
       ^     ^     ^          ^ ^ ^
(:,:,[[1]],[[2]],[[3]]) c[1,2,1,2,3].shape => (7)
       ^     ^     ^          ^ ^ ^

c.shape                                                                                                     (2,3,4,5,6,7)
                                                                                                             ^ ^
(:,:,[[1]],[[2]],[[3]]) => [[<:,:,1,2,3>]]                                                                      (1,1  )
                                                                                                                 ^ ^
c[0,0,1,2,3].shape                                                                                                    (7)  #  这些索引结果的形状：c[0,0,1,2,3]，c[0,1,1,2,3]等等
                                                                                                                       ^
c[:,:,[[1]],[[2]],[[3]]].shape                                                                                (2,3,1,1,7)
'''


# -----------------

# 以上是关于高级索引整数数组索引的基础内容，下面处理索引元组中存在None的情况，多个数组之间需要广播的情况，整数和数组搭配的情况。

# 关于 None
# a[:,[1,2],None,[1,2]] == a[:,:,None][:,[1,2],:,[1,2]]   # 注意看这个例子。之前在编写基本索引方法处理None的情况，会先把索引元组里的None忽略掉，然后在进行索引获取数据，在基本索引里，None不会影响索引结果的数据，只会影响索引结果的形状，因为None是不对应被索引数组里某个维度的。但这里不一样，这里不单纯是基本索引，这里索引元组是包含有数组的高级索引，所以 a[:,[1,2],None,[1,2]] 这里在思考如何处理None时，不应该有“None是不对应被索引数组里某个维度的”的思想，这里索引元组含有高级索引，需要特殊处理，所以 a[:,[1,2],None,[1,2]] != a[:,[1,2],[1,2]]
# a[None,[0,1],None,[1,2]] == a[None,:,None][:,[0,1],:,[1,2]]
# a[[0,1],None,None,[1,2],None] == a[:,None,None,:,None][[0,1],:,:,[1,2],:]


# 番外篇（关于基本索引和高级索引相结合的前瞻）
# 在包含有高级索引的索引元组里，切片、newaxis(None)，在基本索引里处理。整数、整数数组、布尔数组，在高级索引里处理。
# 高级索引和基本索引相结合时，注意一个多维布尔数组会占用多个维度的问题
# a[None,::-1,[1,2],1:4:2,[1,2]] == a[None,::-1,:,1:4:2,:][:,:,[1,2],:,[1,2]]
# a[[1,0],None,::-2,2:3:1,[3,3]] == a[:,None,::-2,2:3:1,:][[1,0],:,:,:,[3,3]]
# a[::-1,[1,2],None,2:4:1,[2,2]] == a[::-1,:,None,2:4:1,:][:,[1,2],:,:,[2,2]]
# a[::-1,None,[1,2],None,2:4:1,[2,2]] == a[::-1,None,:,None,2:4:1,:][:,:,[1,2],:,:,[2,2]]
# a[::-1,None,0:2:1,None,[1,2],None,[2,2]] == a[::-1,None,0:2:1,None,:,None,:][:,:,:,:,[1,2],:,[2,2]]
# a[::-1,1,None,2:4:1,[2,2]] == a[::-1,:,None,2:4:1,:][:,[1,1],:,:,[2,2]]
# a[[[True,True,False],[True,True,False]],slice(1,3)] == a[:,:,slice(1,3)][[[True,True,False],[True,True,False]],:] == a[:,:,slice(1,3)][[0,0,1,1],[0,1,0,1]]
# a[None,[[True,True,False],[True,True,False]],slice(1,3),None,[1,2,2,0]] == a[None,:,:,slice(1,3),None][:,[[True,True,False],[True,True,False]],:,:,[1,2,2,0]] == a[None,:,:,slice(1,3),None][:,[0,0,1,1],[0,1,0,1],:,:,[1,2,2,0]]
# a[[[False,False,False],[False,False,False]]] == a[[],[]]
# a[:,[[False,False,False,False],[False,False,False,False],[False,False,False,False]]] == a[:,[],[]]
# a[:,[[False,False,False,False],[False,False,False,False],[False,False,False,False]],slice(1,2)] == a[:,[],[],slice(1,2)]

# 关于 Ellipsis
# 注意Ellipsis和多维布尔数组搭配的情况
# a[None,[1,1],...,slice(1,2),[1,2]] == a[None,:,...,slice(1,2),:][:,[1,1],...,:,[1,2]] == a[None,:,:,slice(1,2),:][:,[1,1],:,:,[1,2]]
# c[None,[1,1],...,None,[1,1],slice(1,2)] == c[None,:,...,None,:,slice(1,2)][:,[1,1],...,:,[1,1],:] == c[None,:,:,:,:,None,:,slice(1,2)][:,[1,1],:,:,:,:,[1,1],:]
# c[None,[[True,True,False],[True,True,False]],slice(1,2),...,None,[1,2,2,1]] == c[None,:,:,slice(1,2),...,None,:][:,[[True,True,False],[True,True,False]],:,...,:,[1,2,2,1]] == c[None,:,:,slice(1,2),:,:,None,:][:,[[True,True,False],[True,True,False]],:,:,:,:,[1,2,2,1]]

# 多个数组之间需要广播的情况
# a[[1,0,1],[1]] == a[[1,0,1],[1,1,1]]
# a[[1],[[1,1],[0,0]],[[1]]] == a[[[1,1],[1,1]],[[1,1],[0,0]],[[1,1],[1,1]]]
# a[:,[1],:,[[1,1],[0,0]]] == a[:,[[1,1],[1,1]],:,[[1,1],[0,0]]]

# 整数和数组搭配的情况
# 文档，x[arr1, :, 1] 在这里面1是一个高级索引。
# 文档2，高级索引和基本索引相结合，索引操作分为两部分，一部分是由基本索引（不包括整数）所定义的子空间，另一部分是由高级索引部分定义的子空间。
# 在含有高级索引的索引元组里，整数 会被当做是一个只含有一个值的一维数组，然后这个一维数组会被广播。
# a[[1,0,1],1] == a[[1,0,1],[1,1,1]]
# a[:,[1,2],None,1] == a[:,[1,2],None,[1,1]] == a[:,:,None,:][:,[1,2],:,1] == a[:,:,None,:][:,[1,2],:,[1,1]]
# a[:,[[1,2],[2,0]],None,1] == a[:,[[1,2],[2,0]],None,[[1,1],[1,1]]]

