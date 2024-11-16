const Main = require('./main.js');
var create_array = Main.create_array;
var shape = Main.shape;
var size = Main.size;

const Common = require('./common.js');
var multiply = Common.multiply;
var printArr = Common.printArr;
var generateArrayElementIndex = Common.generateArrayElementIndex;
var setArrayValue_v2 = Common.setArrayValue_v2;
var printArr4 = Common.printArr4;

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
    // let newArr = [];
    // for (let i = 0; i < arr.length; i++) {
    //     let item = arr[i];
    //     if (Array.isArray(item)) {
    //         newArr = newArr.concat(ravel_C(item))
    //     } else {
    //         newArr.push(item);
    //     }
    // }
    // return newArr;
    return arr.flat(Infinity)
}

//使用栈结构和迭代方式展平数组（数据量大的时候用不了，Maximum call stack size exceeded）
function ravel_C_v2(arr) {
    const result = [];
    const stack = [];
    stack.push.apply(stack, arr); //使用栈来存储待处理的元素

    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            //如果是数组，则将其元素推入栈中
            stack.push.apply(stack, item);
        } else {
            //否则，将元素添加到结果数组中
            result.unshift(item);
        }
    }

    return result;
}

// let a = [
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
    } else if (newShape.length == 1 && newShape[0] == arrInfo.ravel.length) {
        return arrInfo.ravel;
    }
    let newShapeSize = multiply(newShape[0], newShape, 1);
    if (newShapeSize != arrInfo.size) {
        throw new Error('reshape_C:error 数据无法变成新形状，请重新设置形状！')
    }
    //根据新形状创建一个新矩阵，然后往矩阵里放数据
    let newArr = create_array(newShape, 0);
    // //旧赋值方法
    // let newArrIndex = 0;
    // printArr(newArr, [], (res) => {
    //     res.childArr[res.childIndex] = arrInfo.ravel[newArrIndex];
    //     newArrIndex = newArrIndex + 1;
    // })
    // //新赋值方法V1，能比上边快一点点(这里仅针对2维及以上的数组，赋值)
    // let newArrIndex = 0;
    // printArr4(newArr, [], (res) => {
    //     if (res.index.length == newShape.length - 1) {
    //         res.childArr[res.childIndex] = arrInfo.ravel.slice(newArrIndex * newShape[newShape.length - 1], newArrIndex * newShape[newShape.length - 1] + newShape[newShape.length - 1])
    //         newArrIndex++;
    //     }
    // })
    // console.log(newArrIndex, multiply(newShape[0], newShape, 1) / newShape[newShape.length - 1])
    //新赋值方法V2，能比上边快一点点(这里仅针对2维及以上的数组，赋值)
    //如果被赋值数组最后一个维度是1，则三个赋值方法，一样快。如果最后一个维度不是1，则最后一个方法最快
    const newArrIndexingList = generateArrayElementIndex(newShape.slice(0, newShape.length - 1));
    let len = multiply(newShape[0], newShape, 1) / newShape[newShape.length - 1];
    for (let i = 0; i < len; i++) {
        setArrayValue_v2(newArr, newArrIndexingList[i], arrInfo.ravel.slice(i * newShape[newShape.length - 1], i * newShape[newShape.length - 1] + newShape[newShape.length - 1]))
    }

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


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------


//测试，reshape方法c

// a = a;
// console.log('a.shape', shape(a));
// console.log('a.size', size(a));
// console.log('a：')
// printArr(a, [], (res) => {
//     console.log(res.index, res.value)
// })

// console.log()
// console.log('-------------------------------------')
// console.log()

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
// b = reshape(a, [48,1]);
// console.log('b.shape', shape(b));
// console.log('b.size', size(b));
// console.log('b：')
// printArr(b, [], (res) => {
//     console.log(res.index, res.value)
// })

// let b = null;
// b = reshape(a, [46]); //报错则说明是正确的
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