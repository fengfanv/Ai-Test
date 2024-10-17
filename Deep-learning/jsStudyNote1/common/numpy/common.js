
//乘法
function multiply(value, arr, index) {
    if (index >= arr.length) {
        return value
    } else {
        let newValue = value * arr[index];
        let newIndex = index + 1;
        return multiply(newValue, arr, newIndex)
    }
}
exports.multiply = multiply;

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
exports.printArr = printArr;
exports.nditer = function (arr, callback) {
    printArr(arr, [], callback)
}
// let a = [[0,0,0],[0,0,0]];
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

//根据“数组形状”生成数组元素索引
//来源于indexing.js/createArrList方法
//实现原理详见indexing.js/createArrList
function generateArrayElementIndex(shape) {
    if (typeof (shape) == 'undefined' || shape.indexOf(0) != -1 || shape.length == 0) {
        return [];
    }

    let len = shape.length;
    let list = [];
    let index = [];
    for (let i = 0; i < len; i++) {
        index.push(0)
    }

    if (len > 1) {
        shape[len - 1] = shape[len - 1] + 1;//注意这里
    }

    let isLoop = true;
    while (isLoop) {
        let item = [];
        for (let i = 0; i < len; i++) {
            item.push(index[i]);
        }
        list.push(item);

        index[len - 1] = index[len - 1] + 1;

        for (let i = 0; i < len; i++) {

            let checkIndexArr = index.slice(i + 1, len);
            let checkShapeArr = shape.slice(i + 1, len);
            let checkStatusArr = [];
            for (let j = 0; j < checkIndexArr.length; j++) {
                if (checkIndexArr[j] >= checkShapeArr[j] - 1) {
                    checkStatusArr.push(true)
                }
            }
            if (checkIndexArr.length != 0 && checkIndexArr.length == checkStatusArr.length) {
                index[i] = index[i] + 1;
                for (let j = i + 1; j < len; j++) {
                    index[j] = 0;
                }
            }
        }
        if (index[0] >= shape[0]) {
            isLoop = false;
            return list
        }
    }
}
exports.generateArrayElementIndex = generateArrayElementIndex;
// console.time('耗时')
// console.log(generateArrayElementIndex([2,3,4]))
// console.timeEnd('耗时')

//根据“索引”为数组元素赋值
//批量修改高维数组元素值时，因为是递归调用，会造成堆栈溢出(会炸内存)
function setArrayValue(arr, targetArr, value, i) {
    if (typeof i == 'undefined') {
        i = 0
    }
    if (i + 1 == targetArr.length) {
        arr[targetArr[i]] = value;
    } else {
        setArrayValue(arr[targetArr[i]], targetArr, value, i + 1)
    }
}
exports.setArrayValue = setArrayValue;
// let a = [[0, 0, 0], [0, 0, 0]];
// let aIndexingArr = generateArrayElementIndex([2,3])
// let newData = [1, 2, 3, 4, 5, 6]
// for (let i = 0; i < aIndexingArr.length; i++) {
//     setArrayValue(a, aIndexingArr[i], newData[i])
// }
// console.log(a)

//使用for循环代替递归调用，避免函数调用堆栈的累积，降低内存使用
function setArrayValue_v2(arr, targetArr, value) {
    let current = arr;

    for (let i = 0; i < targetArr.length; i++) {
        if (i + 1 === targetArr.length) {
            //到达目标索引，设置值
            current[targetArr[i]] = value;
        } else {
            //移动到下一个嵌套的数组
            current = current[targetArr[i]];
        }
    }
}
exports.setArrayValue_v2 = setArrayValue_v2;

//此方法由Common.printArr演变而来
function printArr4(arr, indexArr, callback) {
    if (Array.isArray(arr) == false || arr.length < 1) {
        throw new Error('printArr4:error arr不能是空数组！');
    }
    if (typeof indexArr == 'undefined') {
        indexArr = []
    }
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let newIndexArr = JSON.parse(JSON.stringify(indexArr));
        newIndexArr.push(i);
        if (Array.isArray(item)) {
            callback && callback({ index: newIndexArr, value: item, childArr: arr, childIndex: i })
            printArr4(item, newIndexArr, callback);
        } else {
            // callback && callback({ index: newIndexArr, value: item, childArr: arr, childIndex: i })
        }
    }
}
exports.printArr4 = printArr4;