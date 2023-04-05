import numpy as np

a1 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

a2 = np.array([
    [
        [1, 2, 3],
        [4, 5, 6]
    ],
    [
        [7, 8, 9],
        [10, 11, 12]
    ]
])

a3 = np.array([
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
])

a4 = np.array([
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


# print('a1.shape', a1.shape)
# print("np.reshape(a1, (-1), order='F')")
# print(np.reshape(a1, (-1), order='F'))
# print('-------------------------------------------')
# print('a2.shape', a2.shape)
# print("np.reshape(a2, (-1), order='F')")
# print(np.reshape(a2, (-1), order='F'))
# print('-------------------------------------------')
# print('a3.shape', a3.shape)
# print("np.reshape(a3, (-1), order='F')")
# print(np.reshape(a3, (-1), order='F'))
# print('-------------------------------------------')
# print('a4.shape', a4.shape)
# print("np.reshape(a4, (-1), order='F')")
# print(np.reshape(a4, (-1), order='F'))

# print("np.reshape(a4, (4, -1), order='F')")
# print(np.reshape(a4, (4, -1), order='F'))

# print("np.reshape(a4, (3,3, -1), order='F')")
# print(np.reshape(a4, (3, 2, -1), order='F'))


# print("np.reshape(a4, (8, -1), order='C')：")
# print(np.reshape(a4, (8, -1), order='C'))
# print("np.reshape(a4, (4, -1), order='C')")
# print(np.reshape(a4, (4, -1), order='C'))
# print("np.reshape(a4, (3, -1), order='C')")
# print(np.reshape(a4, (3, -1), order='C'))
# print("np.reshape(a4, (2, 3, -1), order='C')")
# print(np.reshape(a4, (2, 3, -1), order='C'))
# print("np.reshape(a4, (-1), order='C')")
# print(np.reshape(a4, (-1), order='C'))
# print("np.reshape(a4, (2, 2, 2, -1), order='C')")
# print(np.reshape(a4, (2, 2, 2, -1), order='C'))
# print("np.reshape(a4, (2, 2, 2, 2, -1), order='C')")
# print(np.reshape(a4, (2, 2, 2, 2, -1), order='C'))
# print("np.reshape(a4, (2, 2, 2, 2, 1, -1), order='C')")
# print(np.reshape(a4, (2, 2, 2, 2, 1, -1), order='C'))

# print(np.reshape(a4, (8, -1), order='F'))
# print(np.reshape(a4, (-1), order='F'))
