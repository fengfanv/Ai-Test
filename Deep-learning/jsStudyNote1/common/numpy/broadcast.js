const Main = require('./main.js');
var shape = Main.shape;

const Common = require('./common.js');
var printArr = Common.printArr;

/*

实现numpy.broadcast方法

关于numpy.broadcast方法的运行基本操作，请看“broadcast.py”细心看，一看你就能明白

第一步，检查两个数组，能否使用广播机制

第二步，如果两个数组，可以使用广播机制，则进行广播处理

第三步，返回被处理好的数据
*/

function broadcast(a1, a2) {

    var arr1 = a1;
    var arr2 = a2;

    //第一步、检查两个数组是否支持广播机制
    let arr1Shape = shape(arr1);
    let arr2Shape = shape(arr2);

    let arr1ShapeReverse = arr1Shape.reverse();
    let arr2ShapeReverse = arr2Shape.reverse();
    let len = arr1ShapeReverse.length>arr2ShapeReverse.length?arr1ShapeReverse.length:arr2ShapeReverse.length;
    for (let i = 0; i < len; i++) {
        let arr1Item = arr1ShapeReverse[i] || 1;
        let arr2Item = arr2ShapeReverse[i] || 1;
        if (arr1Item != arr2Item) {
            if (arr1Item != 1 && arr2Item != 1) {
                throw new Error('broadcast:error arr1 与 arr2 无法使用广播机制！');
            }
        }
    }


    //第二步、处理两个数组

    //主要分为两个小方法
    //第一个小方法，当形状数组里某个维度的数不够时，补1的方法

    //第二个小方法，当形状数组里某个维的数是1时，变成对应的维度的小方法（这里需要注意一下，当两个数组里相关维度都是1时，不用调用此方法，只有当一个数组里是1，另一个数组里不是1时才调用）
    //下面是第二个小方法，运行时的一些操作
    /*
    如有，两个数组 a1 和 b1 
    它们的形状分别是 a1.shape=[4,3]，b1.shape=[1,3]
    这里我们发现 b1.shape的下标0处（b1的0维）是1，而a1.shape的下标0处是4，所以b1.shape下标0处，需要根据a1.shape下标0处，去变化
    a1.shape下标0处是4，所以b1.shape下标0处，需要变化成4
    --
    首先准备好需要被变形的数组b1。（变形方法参数1）
    然后告诉“变形方法”这个b1数组形状下标里第几处需要变化（或b1数组里第几维需要变化）。（变形方法参数2）这里是b1.shape下标0处（b1数组的第0维）
    再然后告诉“变形方法”会发生变化的地方，需要变成多少。（变形方法参数3）这里b1.shape下标0处需要变成 4 才能对应a1.shape下标第0处
    --
    再再然后 在变形方法里整个可以深度遍历 数组子元素 的循环方法
    循环数组子元素，一个一个的循环，当循环到数组里需要根据上面变形方法参数2和参数3来变化维度的地方的时候，根据参数2和参数3循环复制处理相关数据
    循环复制处理好数据后，把 这个数据 和 这个数据将要存放在b1数组的哪个位置下的坐标，一起临时放在一个对象里
    然后就是等待数组里所有需要被变形的地方，都复制处理好后，根据坐标，将循环复制好的数据，重新放入b1数组
    就这样，这个第二个小方法就结束了
    */

    //是否可以循环
    let isLoop = true;
    while(isLoop){
        arr1Shape = shape(arr1);
        arr2Shape = shape(arr2);
        if(arr1Shape.join()==arr2Shape.join()){
            //数据处理完毕，关闭循环
            isLoop = false;
            //返回处理好的数据
            return [arr1,arr2]
        }else{
            let arr1ShapeReverse = arr1Shape.reverse();
            let arr2ShapeReverse = arr2Shape.reverse();
            let len = arr1ShapeReverse.length>arr2ShapeReverse.length?arr1ShapeReverse.length:arr2ShapeReverse.length;
            for(let i=0;i<len;i++){
                let arr1Item = arr1ShapeReverse[i] || -1;
                let arr2Item = arr2ShapeReverse[i] || -1;
                if (arr1Item != arr2Item) {
                    //判断是不是，维度维度缺失
                    if(arr1Item==-1){
                        arr1 = addDim(arr1);
                        break;
                    }else if(arr2Item == -1){
                        arr2 = addDim(arr2);
                        break;
                    }
                    //判断那方是1
                    if(arr1Item==1){
                        let shapeIndex = (arr1Shape.length-1)-i;
                        printArr2(arr1,[],shapeIndex,arr2Item);
                        break;
                    }else if(arr2Item==1){
                        let shapeIndex = (arr2Shape.length-1)-i;
                        printArr2(arr2,[],shapeIndex,arr1Item);
                        break;
                    }
                }
            }
        }
    }
}

//增加维度
function addDim(arr) {
    return [arr];
}


//复制（或扩充）指定维度的数据（此方法由 Common.printArr 演变而来，所以取名叫 printArr2）
function printArr2(arr, indexArr, shapeIndex, copyNum) {
    /*
    arr 原始数组
    indexArr 遍历数组子元素时，当前子元素的坐标
    shapeIndex 遍历到第几维（或形状数组下标第几个）时开始执行复制方法
    copyNum 执行复制方式时，复制几次
    */
    if (Array.isArray(arr) == false || arr.length < 1) {
        throw new Error('printArr2:error arr不能是空数组！');
    }
    let arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
        let item = arr[i];
        let newIndexArr = JSON.parse(JSON.stringify(indexArr));
        newIndexArr.push(i);
        if (shapeIndex == newIndexArr.length - 1) {
            if (arrLen != 1) {
                throw new Error('printArr2:error 需要被广播的维度的数据数量不唯一')
            }
            for (let j = 0; j < copyNum; j++) {
                arr[j] = item;
            }
        } else {
            if (Array.isArray(item)) {
                printArr2(item, newIndexArr, shapeIndex, copyNum);
            } else {
                throw new Error('printArr2:error 此数据指定的广播复制的维度不存在 或 此数据形状有问题')
            }
        }
    }
}

exports.broadcast = broadcast;

// let test1 = [
//     [
//         [1,2,3],
//     ],
//     [
//         [4,5,6]
//     ]
// ]
// printArr2(test1, [], 1, 4);
// setTimeout(() => {
//     console.log(test1);
//     [
//         [
//             [ 1, 2, 3 ],
//             [ 1, 2, 3 ],
//             [ 1, 2, 3 ],
//             [ 1, 2, 3 ]
//         ],
//         [
//             [ 4, 5, 6 ],
//             [ 4, 5, 6 ],
//             [ 4, 5, 6 ],
//             [ 4, 5, 6 ]
//         ]
//     ]
// })

// let test2 = [
//     [
//         [1],
//         [2]
//     ],
//     [
//         [3],
//         [4]
//     ]
// ]
// printArr2(test2, [], 2, 4);
// setTimeout(() => {
//     console.log(test2)
//     [
//         [
//             [1, 1, 1, 1],
//             [2, 2, 2, 2]
//         ],
//         [
//             [3, 3, 3, 3],
//             [4, 4, 4, 4]
//         ]
//     ]
// })

// let test3 = [
//     [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9]
//     ]
// ]
// printArr2(test3, [], 0, 2);
// setTimeout(() => {
//     console.log(test3)
//     [
//         [
//             [ 1, 2, 3 ],
//             [ 4, 5, 6 ],
//             [ 7, 8, 9 ]
//         ],
//         [
//             [ 1, 2, 3 ],
//             [ 4, 5, 6 ],
//             [ 7, 8, 9 ]
//         ]
//     ]
// })

// let test4 = [
//     [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9]
//     ],
//     [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9]
//     ]
// ]
// printArr2(test4, [], 0, 4);
// 报错，说明是正常的（指定维度的数据，的数量不唯一）

// let test5 = [
//     [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9]
//     ],
//     [
//         [1,2,3],
//         [4,5,6],
//         [7,8,9]
//     ],
// ]
// printArr2(test5, [], 4, 4);
// 报错，说明是正常的（指定的维度不存在）

// let test6 = [
//     [
//         [1,2,3],
//     ],
//     5
// ]
// printArr2(test6, [], 1, 4);
// 报错，说明是正常的（数据形状有误）

/*实验*/
let a1 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
let b1 = [1, 2, 3]
// console.log('before：shape(a1)',shape(a1))
// console.log('before：shape(b1)',shape(b1))
// let res1 = broadcast(a1,b1)
// console.log('after：a1',res1[0]);
// console.log('after：b1',res1[1]);
// console.log('after：shape(a1)',shape(res1[0]))
// console.log('after：shape(b1)',shape(res1[1]))


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
// console.log('before：shape(a2)',shape(a2))
// console.log('before：shape(b2)',shape(b2))
// let res2 = broadcast(a2,b2)
// console.log('after：a2',res2[0]);
// console.log('after：b2',res2[1]);
// console.log('after：shape(a2)',shape(res2[0]))
// console.log('after：shape(b2)',shape(res2[1]))

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
// console.log('before：shape(a4)',shape(a4))
// console.log('before：shape(b4)',shape(b4))
// let res4 = broadcast(a4,b4)
// console.log('after：a4',res4[0]);
// console.log('after：b4',res4[1]);
// console.log('after：shape(a4)',shape(res4[0]))
// console.log('after：shape(b4)',shape(res4[1]))

let a5 = [
    [0],
    [1],
    [2]
]
let b5 = [0, 1, 2]
// console.log('before：shape(a5)',shape(a5))
// console.log('before：shape(b5)',shape(b5))
// let res5 = broadcast(a5,b5)
// console.log('after：a5',res5[0]);
// console.log('after：b5',res5[1]);
// console.log('after：shape(a5)',shape(res5[0]))
// console.log('after：shape(b5)',shape(res5[1]))

let a6 = [0, 0, 0]
let b6 = [1]
// console.log('before：shape(a6)',shape(a6))
// console.log('before：shape(b6)',shape(b6))
// let res6 = broadcast(a6,b6)
// console.log('after：a6',res6[0]);
// console.log('after：b6',res6[1]);
// console.log('after：shape(a6)',shape(res6[0]))
// console.log('after：shape(b6)',shape(res6[1]))