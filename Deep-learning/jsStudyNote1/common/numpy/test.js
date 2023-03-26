const numpy = require('./index.js');
console.log(numpy)
// console.log('numpy.shape，',numpy.shape)
// console.log('numpy.ndim',numpy.ndim)
// console.log('----')

//4
let arr1 = [0,0,0,0];
// console.log('arr1，正确结果，[4]')
// console.log('numpy.shape，',numpy.shape(arr1))
// console.log('numpy.ndim',numpy.ndim(arr1))
// console.log('----')

//1,2
let arr2 = [
    [0,0]
]
// console.log('arr2，正确结果，[1,2]')
// console.log('numpy.shape，',numpy.shape(arr2))
// console.log('----')

//2,2
let arr3 = [
    [0,0],
    [0,0]
]
// console.log('arr3，正确结果，[2,2]')
// console.log('numpy.shape，',numpy.shape(arr3))
// console.log('----')

//3,2,1
let arr4 = [
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
// console.log('arr4，正确结果，[3,2,1]')
// console.log('numpy.shape，',numpy.shape(arr4))
// console.log('----')

//2,3,2,1
let arr5 = [
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
]
// console.log('arr5，正确结果，[2,3,2,1]')
// console.log('numpy.shape，',numpy.shape(arr5))
// console.log('----')

//2,2,3,2,1
let arr6 = [
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
]
// console.log('arr6，正确结果，[2,2,3,2,1]')
// console.log('numpy.shape，',numpy.shape(arr6))
// console.log('----')

// //2,3,2,1，形状不规整错误
// let arr7 = [
//     [
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             [1]
//         ]
//     ],
//     [
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             // [1]
//         ]
//     ]
// ]
// console.log('arr7，正确结果，[2,3,2,1]')
// console.log('numpy.shape，',numpy.shape(arr7))
// console.log('----')

// //2,3,2,1，检查过程中发现非数组类型
// let arr8 = [
//     [
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             [1]
//         ]
//     ],
//     [
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             [1]
//         ],
//         [
//             [1],
//             1
//             // [1]
//         ]
//     ]
// ]
// console.log('arr8，正确结果，[2,3,2,1]')
// console.log('numpy.shape，',numpy.shape(arr8))
// console.log('----')

//numpy.create_array
// console.log('numpy.create_array',numpy.create_array);
// let arr9 = [];
// let arr9_shape = [2,2,3,2,1];
// arr9 = numpy.create_array(arr9_shape,0);
// console.log('arr9，正确结果，[2,2,3,2,1]')
// console.log('numpy.shape，',numpy.shape(arr9))
// console.log(JSON.stringify(arr9));
// console.log('numpy.size',numpy.size);
// console.log('arr9.size',numpy.size(arr9))
// console.log('numpy.size([])',numpy.size([]))
// console.log('----')

//numpy.arange
// console.log("numpy.arange(10)，",numpy.arange(10));
// console.log("numpy.arange(0,10)，",numpy.arange(0,10));
// console.log("numpy.arange(5,22)，",numpy.arange(5,22));
// console.log("numpy.arange(1,6,0.5)，",numpy.arange(1,6,0.5));













