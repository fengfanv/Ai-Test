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
print(c.shape)
print(c.transpose().strides)