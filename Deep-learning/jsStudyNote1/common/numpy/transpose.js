const Main = require('./main.js');
var shape = Main.shape;
var create_array = Main.create_array;

const Common = require('./common.js');
var printArr = Common.printArr;


/*

实现numpy.transpose方法

关于numpy.transpose实现原理请看“transpose2.js”和“关于transpose的问题”，细心看，一看你就能明白

实现步骤：
第一步，将多维数据里的值及值的坐标都取出来，
第二步，将每个值的坐标轴信息，根据transpose方法传进来的新轴信息，进行转换，
第三步，根据transpose方法传进来的新轴信息，检查数据形状是否会发生变化，如果会发生变化，生成新形状信息
第四步，根据形状信息，创建一个新的空矩阵
第五步，将数据导入到新的空矩阵里
第六步，返回数据
*/

function transpose(arr, axes) {
    /*
    arr 原数据
    axes 新维度信息
    */
    let arrShape = shape(arr);
    if (typeof axes == 'undefined') {
        let newAxes = [];
        for (let i = arrShape.length - 1; i >= 0; i--) {
            newAxes.push(i);
        }
        axes = newAxes;
    }
    //检查axes是否符合规则
    if (axes.length != arrShape.length) {
        throw new Error('transpose:error 设定的新轴的数量与数据形状的数量不匹配！')
    }
    for (let i = 0; i < arrShape.length; i++) {
        if (axes.indexOf(i) == -1) {
            throw new Error('transpose:error 设定的新轴数据信息有错误，请检查！')
        }
    }

    //将数据的坐标信息和数据提取出来
    let arrDataInfo = {};
    printArr(arr, [], (res) => {
        //打印矩阵里的每一个元素
        // console.log(res.index,res.value)
        // axes = [1,0,2];
        // index = [1,2,3];
        // newIndex = [index[axes[0]],index[axes[1]],index[axes[2]]]
        let index = res.index;
        let newIndex = []
        for (let i = 0; i < axes.length; i++) {
            let axesItem = axes[i];
            newIndex.push(index[axesItem])
        }
        arrDataInfo[newIndex.join()] = res.value;
    })
    //生成新形状
    let newShape = [];
    for (let i = 0; i < axes.length; i++) {
        let axesItem = axes[i];
        newShape.push(arrShape[axesItem])
    }
    //根据新形状生成新数组
    let newArr = create_array(newShape, 0);
    //往新形状里装数据
    printArr(newArr, [], (res) => {
        res.childArr[res.childIndex] = arrDataInfo[res.index.join()];
    })

    //返回新数据
    return newArr;
}
exports.transpose = transpose;

//numpy.transpose实验

// a = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]
//console.log(transpose(a))
/*
[
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 3, 6, 9 ]
]
*/
//console.log(transpose(a,[]))//报错，报错是正确的
//console.log(transpose(a,[1]))//报错，报错是正确的
//console.log(transpose(a,[0,1,2]))//报错，报错是正确的
//console.log(transpose(a,[0,2]))//报错，报错是正确的
//console.log(transpose(a,[0,1]))
/*
[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
*/
//console.log(transpose(a,[1,0]))
/*
[
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 3, 6, 9 ]
]
*/
// c = [
//     [
//         [1,2,3],
//         [4,5,6]
//     ],
//     [
//         [1,2,3],
//         [4,5,6]
//     ]
// ]
//console.log(transpose(c))
/*
[
  [
    [ 1, 1 ],
    [ 4, 4 ]
  ],
  [
    [ 2, 2 ],
    [ 5, 5 ]
  ],
  [
    [ 3, 3 ],
    [ 6, 6 ]
  ]
]
*/
//console.log(transpose(c,[1,0,2]))
/*
[
    [
        [ 1, 2, 3 ],
        [ 1, 2, 3 ]
    ],
    [
        [ 4, 5, 6 ],
        [ 4, 5, 6 ]
    ]
]
*/

// let d = [
//     [
//         [
//             [
//                 [1, 2, 3],
//                 [4, 5, 6]
//             ],
//             [
//                 [7, 8, 9],
//                 [10, 11, 12]
//             ]
//         ],
//         [
//             [
//                 [13, 14, 15],
//                 [16, 17, 18]
//             ],
//             [
//                 [19, 20, 21],
//                 [22, 23, 24]
//             ]
//         ]
//     ],
//     [
//         [
//             [
//                 [1, 2, 3],
//                 [4, 5, 6]
//             ],
//             [
//                 [7, 8, 9],
//                 [10, 11, 12]
//             ]
//         ],
//         [
//             [
//                 [13, 14, 15],
//                 [16, 17, 18]
//             ],
//             [
//                 [19, 20, 21],
//                 [22, 23, 24]
//             ]
//         ]
//     ]
// ]
// console.log(transpose(d))
// let f = transpose(d);
// printArr(f, [], (res) => {
//     //打印矩阵里的每一个元素
//     console.log(res.index,res.value)
// })
// const reshape = require('./reshape.js')
// let b = reshape.reshape(d, [2, 2, 2, 2, 1, -1]);
// console.log(shape(b));//[ 2, 2, 2, 2, 1, 3 ]
// let g = transpose(b);
// console.log(shape(g));//[ 3, 1, 2, 2, 2, 2 ]
// printArr(g, [], (res) => {
//     //打印矩阵里的每一个元素
//     console.log(res.index, res.value)
// })