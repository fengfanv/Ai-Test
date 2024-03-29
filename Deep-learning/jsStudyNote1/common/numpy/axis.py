import numpy as np

# numpy轴的概念

# a = np.arange(4*3*2).reshape(4,3,2)
# print(a.shape) # (4, 3, 2)
# print(a)
'''
[[[ 0  1]
  [ 2  3]
  [ 4  5]]

 [[ 6  7]
  [ 8  9]
  [10 11]]

 [[12 13]
  [14 15]
  [16 17]]

 [[18 19]
  [20 21]
  [22 23]]]



[ [[0  1],[2  3],[4  5]], [[6  7],[8  9],[10 11]], [[12 13],[14 15],[16 17]], [[18 19],[20 21],[22 23]] ]
该数据的形状是 (4, 3, 2)
从左至右依次为axis=0轴、axis=1轴、axis=2轴

以 [] 来界定轴

axis=0
(4, 3, 2)
 ^
0，6，12，18
1，7，13，19
2，8，14，20
3，9，15，21
4，10，16，22
5，11，17，23


如何用代码提取轴的数据？
请看如下操作：
第一步，很重要，把数据拉直，[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
1、如何知道所提取的轴数据每组有多长？
答：看当前轴，所在的形状数组的数是几，当前提取的是axis=0，数据形状是(4, 3, 2)，axis=0所在形状数组的位置是4，所以当前轴的每组数据长度是4，如axis=0的第一组数据是0，6，12，18，长度是4
2、如何知道轴的每组数据里数据之间的间隔是多少？（如，为什么axis=0的第一组数据是 0、6、12、18）
答：当前获取的是axis=0的数据，当前数据形状是(4, 3, 2)，axis=0在形状数组的最前面，也就是4，在形状数组里，4的后面是3和2，3乘2等于6，所以axis=0在上面被拉直的数据间隔就是6，不信你数一下。
3、我们都知道，轴的每组数据，是在一维数组里，从左往右，依次读取出来的，如axis=0的第一组数据是0、6、12、18，第二组数据是1、7、13、19，代码实现的时候如何知道第二组数据是1、7、13、19？
答：提取数据时，从左往右，看数据有没有被使用过。然后每次提取数据后，都给数据打上标记，标记已使用
如：当axis=0的第一组数据提取完毕之后，给一维数组的0、6、12、18打上标记，[(0),1,2,3,4,5,(6),7,8,9,10,11,(12),13,14,15,16,17,(18),19,20,21,22,23]
打上标记后，提取axis=0的第二组数据时，先从左往右看一维数组 [(0),1,2,3,4,5,(6),7,8,9,10,11,(12),13,14,15,16,17,(18),19,20,21,22,23]
从左往右看完之后，我们发现0已经被使用了，但1还没有被使用，所以1就是axis=0第二组数据的第一个数据。

如果你有什么不懂，请“先”看《关于transpose》和《轴的概念》，然后重复看当前axis.py里的案例，看了这里的案例，你就能明白了


axis=1
(4, 3, 2)
    ^
0，2，4
1，3，5
6，8，10
7，9，11
12，14，16
13，15，17
18，20，22
19，21，23

axis=2
(4, 3, 2)
       ^
0，1
2，3
4，5
6，7
8，9
10，11
12，13
14，15
16，17
18，19
20，21
22，23
'''

# print(a.sum(axis=0))
'''
[[36 40]
 [44 48]
 [52 56]]
(4, 3, 2)  =>  (3, 2)

[[0+6+12+18=36  1+7+13+19=40]
 [2+8+14+20=44  3+9+15+21=48]
 [4+10+16+22=52  5+11+17+23=56]]
'''
# print(a.sum(axis=1))
'''
[[ 6  9]
 [24 27]
 [42 45]
 [60 63]]
(4, 3, 2)  =>  (4, 2)

[[0+2+4=6     1+3+5=9]
 [6+8+10=24   7+9+11=27]
 [12+14+16=42 13+15+17=45]
 [18+20+22=60 19+21+23=63]]
'''
# print(a.sum(axis=2))
'''
[[ 1  5  9]
 [13 17 21]
 [25 29 33]
 [37 41 45]]
(4, 3, 2)  =>  (4, 3)

[[0+1=1    2+3=5    4+5=9]
 [6+7=13   8+9=17   10+11=21]
 [12+13=25 14+15=29 16+17=33]
 [18+19=37 20+21=41 22+23=45]]
'''

#-----------------------------------------------------------

# a = np.arange(4*3*2*1).reshape(4,3,2,1)
# print(a.shape) # (4, 3, 2, 1)
# print(a)
'''
[[[[ 0]
   [ 1]]

  [[ 2]
   [ 3]]

  [[ 4]
   [ 5]]]


 [[[ 6]
   [ 7]]

  [[ 8]
   [ 9]]

  [[10]
   [11]]]


 [[[12]
   [13]]

  [[14]
   [15]]

  [[16]
   [17]]]


 [[[18]
   [19]]

  [[20]
   [21]]

  [[22]
   [23]]]]

该数据的形状是 (4, 3, 2, 1)
从左往右数，分别是 axis=0轴、axis=1轴、axis=2轴、axis=3轴

axis=0
0，6，12，18
1，7，13，19
2，8，14，20
3，9，15，21
4，10，16，22
5，11，17，23

axis=1
0，2，4
1，3，5
6，8，10
7，9，11
12，14，16
13，15，17
18，20，22
19，21，23

axis=2
0，1
2，3
4，5
6，7
8，9
10，11
12，13
14，15
16，17
18，19
20，21
22，23

axis=3
0
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
'''
# print(a.sum(axis=0))
'''
(4, 3, 2, 1) => (3, 2, 1)
[[[36]
  [40]]

 [[44]
  [48]]

 [[52]
  [56]]]
'''
# print(a.sum(axis=1))
'''
(4, 3, 2, 1) => (4, 2, 1)
[[[ 6]
  [ 9]]

 [[24]
  [27]]

 [[42]
  [45]]

 [[60]
  [63]]]
'''
# print(a.sum(axis=2))
'''
(4, 3, 2, 1) => (4, 3, 1)
[[[ 1]
  [ 5]
  [ 9]]

 [[13]
  [17]
  [21]]

 [[25]
  [29]
  [33]]

 [[37]
  [41]
  [45]]]
'''
# print(a.sum(axis=3))
'''
(4, 3, 2, 1) => (4, 3, 2)
[[[ 0  1]
  [ 2  3]
  [ 4  5]]

 [[ 6  7]
  [ 8  9]
  [10 11]]

 [[12 13]
  [14 15]
  [16 17]]

 [[18 19]
  [20 21]
  [22 23]]]
'''

#-----------------------------------------------------------

# a = np.arange(1*4*3*2*1).reshape(1,4,3,2,1)
# print(a.shape) # (1, 4, 3, 2, 1)
# print(a)
'''
[[[[[ 0]
    [ 1]]

   [[ 2]
    [ 3]]

   [[ 4]
    [ 5]]]


  [[[ 6]
    [ 7]]

   [[ 8]
    [ 9]]

   [[10]
    [11]]]


  [[[12]
    [13]]

   [[14]
    [15]]

   [[16]
    [17]]]


  [[[18]
    [19]]

   [[20]
    [21]]

   [[22]
    [23]]]]]

该数据形状是 (1, 4, 3, 2, 1)
从左往右数，分别是 axis=0轴、axis=1轴、axis=2轴、axis=3轴、axis=4轴

axis=0
0
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23



axis=1
0，6，12，18
1，7，13，19
2，8，14，20
3，9，15，21
4，10，16，22
5，11，17，23

axis=2
0，2，4
1，3，5
6，8，10
7，9，11
12，14，16
13，15，17
18，20，22
19，21，23

axis=3
0，1
2，3
4，5
6，7
8，9
10，11
12，13
14，15
16，17
18，19
20，21
22，23

axis=4
0
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
'''

# print(a.sum(axis=0))
# print(a.sum(axis=0).shape) #(4, 3, 2, 1)
'''
[[[[ 0]
   [ 1]]

  [[ 2]
   [ 3]]

  [[ 4]
   [ 5]]]


 [[[ 6]
   [ 7]]

  [[ 8]
   [ 9]]

  [[10]
   [11]]]


 [[[12]
   [13]]

  [[14]
   [15]]

  [[16]
   [17]]]


 [[[18]
   [19]]

  [[20]
   [21]]

  [[22]
   [23]]]]
'''

# print(a.sum(axis=1))
# print(a.sum(axis=1).shape) #(1, 3, 2, 1)
'''
[[[[36]
   [40]]

  [[44]
   [48]]

  [[52]
   [56]]]]
'''

# print(a.sum(axis=2))
# print(a.sum(axis=2).shape) #(1, 4, 2, 1)
'''
[[[[ 6]
   [ 9]]

  [[24]
   [27]]

  [[42]
   [45]]

  [[60]
   [63]]]]
'''
# print(a.sum(axis=3))
# print(a.sum(axis=3).shape) #(1, 4, 3, 1)
'''
[[[[ 1]
   [ 5]
   [ 9]]

  [[13]
   [17]
   [21]]

  [[25]
   [29]
   [33]]

  [[37]
   [41]
   [45]]]]
'''

# print(a.sum(axis=4))
# print(a.sum(axis=4).shape) #(1, 4, 3, 2)
'''
[[[[ 0  1]
   [ 2  3]
   [ 4  5]]

  [[ 6  7]
   [ 8  9]
   [10 11]]

  [[12 13]
   [14 15]
   [16 17]]

  [[18 19]
   [20 21]
   [22 23]]]]
'''



# a = np.arange(10)
# # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# a.shape
# (10,)
# a.max()
# 9
# a.max(axis=0)
# 9