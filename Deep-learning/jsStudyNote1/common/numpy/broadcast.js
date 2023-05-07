const Main = require('./main.js');
var shape = Main.shape;

const Common = require('./common.js');
var printArr = Common.printArr;

/*

实现numpy.broadcast方法

关于numpy.broadcast方法的运行基本操作，请看“broadcast.py”细心看，一看你就能明白

第一步，检查两个数组，能否使用广播机制

第二步，如果两个数组，可以使用广播机制，则进行广播处理
*/

function broadcast(arr1, arr2) {

    //第一步、检查两个数组是否支持广播机制
    let arr1Shape = shape(arr1);
    let arr2Shape = shape(arr2)

    let arr1ShapeReverse = arr1Shape.reverse();
    let arr2ShapeReverse = arr2Shape.reverse();

    for(let i=0;i<arr1ShapeReverse.length;i++){
        let arr1Item = arr1ShapeReverse[i] || 1;
        let arr2Item = arr2ShapeReverse[i] || 1;

        if(arr1Item != arr2Item){
            if(arr1Item != 1 && arr2Item != 1){
                throw new Error('broadcast:error arr1 与 arr2 无法使用广播机制！');
            }
        }
    }


    //第二步、处理两个数组


}



/*实验*/
let a1 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
let b1 = [1, 2, 3]
// broadcast(a1,b1) //啥的都没打印，所以是正常的

let a2 = [
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ],
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ],
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ]
]
let b2 = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8]
]
// broadcast(a2,b2) //啥的都没打印，所以是正常的

let a3 = [
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
]
let b3 = [
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],
    [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18]
    ]
]
// broadcast(a3,b3) //抛错了，所以是正常的

let a4 = [
    [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]
]
let b4 = [
    [
        [1, 2, 3, 4, 5, 6],
    ],
    [
        [7, 8, 9, 10, 11, 12],
    ],
    [
        [13, 14, 15, 16, 17, 18],
    ]
]
// broadcast(a4,b4) //啥的都没打印，所以是正常的

let a5 = [
    [0],
    [1],
    [2]
]
let b5 = [0,1,2]
// broadcast(a5,b5) //啥的都没打印，所以是正常的
