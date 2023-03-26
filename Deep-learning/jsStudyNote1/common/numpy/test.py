import numpy as np

#4
arr1 = np.array([0,0,0,0]);
# print('arr1，正确结果，[4]')
# print('numpy.shape，',arr1.shape)
# print('----')

#1,2
arr2 = np.array([
    [0,0]
])
# print('arr2，正确结果，[1,2]')
# print('numpy.shape，',arr2.shape)
# print('----')

#2,2
arr3 = np.array([
    [0,0],
    [0,0]
])
# print('arr3，正确结果，[2,2]')
# print('numpy.shape，',arr3.shape)
# print('----')

#3,2,1
arr4 = np.array([
    [
        [1],
        [1]
    ],
    [
        [1],
        [1]
    ],
    [
        [1],
        [1]
    ]
])
# print('arr4，正确结果，[3,2,1]')
# print('numpy.shape，',arr4.shape)
# print('----')

#2,3,2,1
arr5 = np.array([
    [
        [
            [1],
            [1]
        ],
        [
            [1],
            [1]
        ],
        [
            [1],
            [1]
        ]
    ],
    [
        [
            [1],
            [1]
        ],
        [
            [1],
            [1]
        ],
        [
            [1],
            [1]
        ]
    ]
])
# print('arr5，正确结果，[2,3,2,1]')
# print('numpy.shape，',arr5.shape)
# print('----')

#2,2,3,2,1
arr6 = np.array([
    [
        [
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ]
        ],
        [
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ]
        ]
    ],
    [
        [
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ]
        ],
        [
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ],
            [
                [0],
                [0]
            ]
        ]
    ]
])
# print('arr6，正确结果，[2,2,3,2,1]')
# print('numpy.shape，',arr6.shape)
# print('----')

# arr9 = np.array([[[[[0],[0]],[[0],[0]],[[0],[0]]],[[[0],[0]],[[0],[0]],[[0],[0]]]],[[[[0],[0]],[[0],[0]],[[0],[0]]],[[[0],[0]],[[0],[0]],[[0],[0]]]]]);
# print(arr9.shape,arr9.size);

# print("numpy.arange(10)，",np.arange(10))
# print("numpy.arange(0,10)，",np.arange(0,10))
# print("numpy.arange(5,22)，",np.arange(5,22))
# print("numpy.arange(1,6,0.5)，",np.arange(1,6,0.5))