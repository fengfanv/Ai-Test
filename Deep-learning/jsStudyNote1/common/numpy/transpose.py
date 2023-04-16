import numpy as np

def printArrCallback(res):
    print(res)

def printArr(arr=[], indexArr=[]):
    for index in range(len(arr)):
        item = arr[index]
        newIndexArr = indexArr.copy()
        newIndexArr.append(index)
        if str(type(item)) == "<class 'numpy.ndarray'>":
            printArr(item, newIndexArr)
        else:
            printArrCallback({"index": newIndexArr, "value": item})


a = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

# print(a.transpose(0, 1))
'''
[[1 2 3]
 [4 5 6]
 [7 8 9]]
'''
# b = a.transpose(1, 0)
# print(b)
'''
[[1 4 7]
 [2 5 8]
 [3 6 9]]
'''
# printArr(a)
# print('-------------------------')
# printArr(b)

# print('-------------------------')
c = np.array([
    [
        [1,2,3],
        [4,5,6]
    ],
    [
        [1,2,3],
        [4,5,6]
    ]
])
#print(c.shape)
# print(c.transpose().strides)
#print(np.transpose(c,[1,0,2]))
#print(np.transpose(c,[1])) #报错
#print(np.transpose(c,[0,1,2]))
'''
保持原样输出：
[[[1 2 3]
  [4 5 6]]

 [[1 2 3]
  [4 5 6]]]
'''

d = np.array([
    [
        [
            [
                [1, 2, 3],
                [4, 5, 6]
            ],
            [
                [7, 8, 9],
                [10, 11, 12]
            ]
        ],
        [
            [
                [13, 14, 15],
                [16, 17, 18]
            ],
            [
                [19, 20, 21],
                [22, 23, 24]
            ]
        ]
    ],
    [
        [
            [
                [1, 2, 3],
                [4, 5, 6]
            ],
            [
                [7, 8, 9],
                [10, 11, 12]
            ]
        ],
        [
            [
                [13, 14, 15],
                [16, 17, 18]
            ],
            [
                [19, 20, 21],
                [22, 23, 24]
            ]
        ]
    ]
])
#print(d.shape) #(2, 2, 2, 2, 3)
#print(np.transpose(d))
#f = np.transpose(d)
'''
[[[[[ 1  1]
    [13 13]]
   [[ 7  7]
    [19 19]]]
  [[[ 4  4]
    [16 16]]
   [[10 10]
    [22 22]]]]
 [[[[ 2  2]
    [14 14]]
   [[ 8  8]
    [20 20]]]
  [[[ 5  5]
    [17 17]]
   [[11 11]
    [23 23]]]]
 [[[[ 3  3]
    [15 15]]
   [[ 9  9]
    [21 21]]]
  [[[ 6  6]
    [18 18]]
   [[12 12]
    [24 24]]]]]
'''
#printArr(f,[])
b = np.reshape(d,[2, 2, 2, 2, 1, -1]);
#print(b.shape)#(2, 2, 2, 2, 1, 3)
g = np.transpose(b)
#print(g.shape)#(3, 1, 2, 2, 2, 2)
printArr(g,[])

