const Main = require('./main.js');
var create_array = Main.create_array;
var shape = Main.shape;
var size = Main.size;

const Common = require('./common.js');
var multiply = Common.multiply;

/*

实现numpy.reshape方法

要求：被实现方法必须支持，order：C 这种模式。

F模式看情况，不强制，因为没有用到。
目前F模式将数据拉成一维数据，可实现
目前F模式将数据reshape成2维数据也可实现
目前F模式将数据reshape成3维及以上的数据不可实现（没摸清3维以上的变形规律）

实现步骤：
第一步，将多维数据拉成一维数据
第二步，使用处理好的一维数据变形，改变形状

*/



//------------------------------------------------------------------------------------------------------
//--------------------------------------------order:C---------------------------------------------------
//------------------------------------------------------------------------------------------------------



/*
按order:C的方式将数据拉成一维（将数据按C的方式展开）

思考下面方式时，请使用a这个数据作为思考对象
let a = [
    [1, 2, 3],
    [4, 5, 6]
]
递归的特点是，将一个复杂的问题，分解成一个一个小问题，来解决。

Array.concat方法，连接数组，然后返回一个新数组
*/
function ravel_C(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
            newArr = newArr.concat(ravel_C(item))
        } else {
            newArr.push(item);
        }
    }
    return newArr;
}

let a = [
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
]
// console.log(ravel_C(a))

//获取某个数据在数组中出现的次数
function getDataCount(arr, data) {
    let indexArr = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item == data) {
            indexArr.push(i);
        }
    }
    return indexArr;
}

//将数组里的数据读取出来并打印出坐标（支持给数据赋值）
function printArr(arr, indexArr, callback) {
    if (Array.isArray(arr) == false || arr.length < 1) {
        throw new Error('printArr:error arr不能是空数组！');
    }
    if (typeof indexArr == 'undefined') {
        indexArr = []
    }
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let newIndexArr = JSON.parse(JSON.stringify(indexArr));
        newIndexArr.push(i);
        if (Array.isArray(item)) {
            printArr(item, newIndexArr, callback);
        } else {
            callback && callback({ index: newIndexArr, value: item, childArr: arr, childIndex: i })
        }
    }
}

// let aSize = size(a);
// let aIndex = 0
// printArr(a, [], (res) => {
//     //打印矩阵里的每一个元素
//     // console.log(res.index,res.value)
//     //重新赋值
//     // res.childArr[res.childIndex] = aIndex;
//     // aIndex = aIndex + 1;
//     //遍历完所有子元素
//     // if (aIndex == aSize) {
//     //     console.log('aSize', aSize);
//     //     console.log('a：');
//     //     printArr(a, [], (res) => {
//     //         console.log(res.index,res.value)
//     //     })
//     // }
// })
// console.log('shape(a)', shape(a))


//改变数据形状C
function reshape_C(arr, newShape) {
    //1、检查新形状数组，是否符合规则，是否需要计算（含-1）
    //2、把原有数据拉直
    //3、根据新形状数据，创建一个默认值为0的空数据
    //4、将拉直的数据一个一个的放进，上面创建的新形状数据里
    //5、最后返回处理好的数据

    let arrInfo = {
        size: size(arr),
        ravel: ravel_C(arr)
    }
    let autoC = getDataCount(newShape, -1);
    if (autoC.length > 0 && newShape.length > 1) {
        if (autoC.length > 1) {
            throw new Error('reshape_C:error 新形状内仅能存在一个待被计算的值-1!')
        }
        newShape.splice(autoC[0], 1);
        let multiplyValue = multiply(newShape[0], newShape, 1);
        let autoC_value = arrInfo.size / multiplyValue;
        if (Math.floor(autoC_value) != autoC_value) {
            throw new Error('reshape_C:error 数据的新形状与自动计算值-1，设置不合理，请重新设置形状数据!')
        }
        newShape.splice(autoC[0], 0, autoC_value);
    } else if (autoC.length > 0 && newShape.length == 1) {
        return arrInfo.ravel;
    }
    let newShapeSize = multiply(newShape[0], newShape, 1);
    if (newShapeSize != arrInfo.size) {
        throw new Error('reshape_C:error 数据无法变成新形状，请重新设置形状！')
    }
    //根据新形状创建一个新矩阵，然后往矩阵里放数据
    let newArr = create_array(newShape, 0);
    let newArrIndex = 0;
    printArr(newArr, [], (res) => {
        res.childArr[res.childIndex] = arrInfo.ravel[newArrIndex];
        newArrIndex = newArrIndex + 1;
    })
    return newArr;
}



//------------------------------------------------------------------------------------------------------
//--------------------------------------------order:F---------------------------------------------------
//------------------------------------------------------------------------------------------------------


/*
按order:F的方式将数据拉成一维（将数据按F的方式展开）


*/


function reshape(arr, newShape, order) {
    /*
    arr 原数据
    newShape 新形状
    order 数据排列方式，C 或 F
    */
    if (typeof order == 'undefined') {
        order = 'C';
    }
    if (order == 'C') {
        return reshape_C(arr, newShape);
    }
}
exports.reshape = reshape;


//实验，reshape方法c

a = a;
console.log('a.shape', shape(a));
console.log('a.size', size(a));
console.log('a：')
printArr(a, [], (res) => {
    console.log(res.index, res.value)
})

console.log()
console.log('-------------------------------------')
console.log()

// let b = null;
// b = reshape(a,[-1]);//仅有一个-1，展开数据
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[-1,-1]);//有两个-1，报错（报错是对的）
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[8,-1]);//[8,-1] 会变成 [8,6]
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[-1,8]);//[-1,8] 会变成 [6,8]
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[-1,9]);//48/9=5.33333333 算不出来 -1，报错（报错是对的）
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[2, 2, 2, 2, 1, -1]);//[2, 2, 2, 2, 1, -1]会变成[2, 2, 2, 2, 1, 3]
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[2, 2, -1, 2, 1, 2]);//[2, 2, -1, 2, 1, 2]会变成[ 2, 2, 3, 2, 1, 2 ]
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[48]);
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a,[8,7]);//报错，8*7=56不等于a.size的48。（报错是对的）
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })