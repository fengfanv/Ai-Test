const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Main = require('./main.js')
var shape = Main.shape;

const printTest = require('./print_test.js')
var toStr = printTest.toStr;

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

function append(arr, values, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('arr不能为空')
    }

    if (typeof values == 'undefined') {
        throw new Error('values不能为空')
    }

    if (typeof axis == 'undefined') {
        if (!Array.isArray(arr)) {
            arr = [arr]
        }
        if (!Array.isArray(values)) {
            values = [values]
        }
        arr = reshape(arr, [-1]);
        values = reshape(values, [-1]);
        return [].concat(arr, values);
    } else {

        let arrShape = shape(arr);
        let valuesShape = shape(values);

        if (arrShape.length == 0 || valuesShape.length == 0) {
            throw new Error('零维数组不能连接')
        }

        if (arrShape.length != valuesShape.length) {
            throw new Error('arr 和 values 维数不相同')
        }

        if (axis < 0) {
            axis = axis + arrShape.length
        }

        if (axis > arrShape.length - 1) {
            throw new Error('当前数据不存在轴（axis:' + axis + '）')
        }

        for (let i = 0; i < arrShape.length; i++) {
            if (i != axis) {
                if (arrShape[i] != valuesShape[i]) {
                    throw new Error('除了连接轴axis之外的所有输入数组维度都必须完全匹配')
                }
            }
        }

        let resultShape = [].concat(arrShape);
        resultShape[axis] = arrShape[axis] + valuesShape[axis];

        let arrData = [];

        printArr4(arr, [], (res) => {
            if (res.index.length == axis) {
                arrData.push(res.value)
            }
        })

        let valuesData = []
        printArr4(values, [], (res) => {
            if (res.index.length == axis) {
                valuesData.push(res.value)
            }
        })

        if (axis == 0) {
            return reshape([].concat(arr, values), resultShape)
        } else {

            for (let i = 0; i < arrData.length; i++) {
                arrData[i] = [].concat(arrData[i], valuesData[i])
            }

            return reshape(arrData, resultShape)
        }
    }
}
exports.append = append;

// console.log(toStr(append([[1, 2, 3], [4, 5, 6]], [[7, 8, 9, 100], [10, 11, 12, 200]], 1)))

// console.log(toStr(append([[1, 2, 3], [4, 5, 6]], [[7, 8, 9, 100], [10, 11, 12, 200]], 0)))

// console.log(toStr(append([[1, 2, 3], [4, 5, 6]], [[7, 8, 9]], 0)))

// console.log(toStr(append([[[ 1,  2,  3,  4],[ 5,  6,  7,  8],[ 9, 10, 11, 12]],[[13, 14, 15, 16],[17, 18, 19, 20],[21, 22, 23, 24]]], [[[25, 26, 27, 28],[29, 30, 31, 32],[33, 34, 35, 36]],[[37, 38, 39, 40],[41, 42, 43, 44],[45, 46, 47, 48]]], 0)))

// console.log(toStr(append([[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28], [29, 30, 31, 32], [33, 34, 35, 36]], [[37, 38, 39, 40], [41, 42, 43, 44], [45, 46, 47, 48]]], 1)))

// console.log(toStr(append([[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28], [29, 30, 31, 32], [33, 34, 35, 36]], [[37, 38, 39, 40], [41, 42, 43, 44], [45, 46, 47, 48]]], 2)))

// console.log(toStr(append([[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28], [29, 30, 31, 32], [33, 34, 35, 36],[33, 34, 35, 36]], [[37, 38, 39, 40], [41, 42, 43, 44], [45, 46, 47, 48],[45, 46, 47, 48]]], 1)))

// console.log(toStr(append([[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28]], [[37, 38, 39, 40]]], 1)))

// console.log(toStr(append([[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28]], [[37, 38, 39, 40]]], 1)))

// console.log(toStr(append(1, 1, 1)))

// console.log(toStr(append(1, [1], 1)))

// console.log(toStr(append([1], 1, 1)))

// console.log(toStr(append([1], [1], 1)))

// console.log(toStr(append([1], [1], 0)))

// console.log(toStr(append([1], [[1]], 0)))

// console.log(toStr(append([[1]], [[1,1]], 0)))

// console.log(toStr(append([[1]], [[1,1]], 1)))

//-------------------

// console.log(toStr(append([[1]], [[2,3]])))

// console.log(toStr(append(1, [[2,3]])))

// console.log(toStr(append(1, 2)))

// console.log(toStr(append(1)))

// console.log(toStr(append()))