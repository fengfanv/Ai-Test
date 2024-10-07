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

function concatenate(a_list, axis) {
    if (typeof a_list == 'undefined') {
        throw new Error('a_list不能为空')
    }

    if (!Array.isArray(a_list)) {
        throw new Error('a_list必须是数组类型')
    }

    if (a_list.length <= 0) {
        throw new Error('a_list不能是空列表')
    }

    if (typeof axis == 'undefined') {
        axis = 0
    }

    if (String(axis) == 'None') {
        let resultData = [];
        for (let i = 0; i < a_list.length; i++) {
            if (!Array.isArray(a_list[i])) {
                a_list[i] = [a_list[i]]
            }
            a_list[i] = reshape(a_list[i], [-1]);
            resultData = resultData.concat(a_list[i])
        }
        return resultData;
    } else {
        let shapeArr = [];
        for (let i = 0; i < a_list.length; i++) {

            let arrShape = shape(a_list[i]);
            shapeArr.push(arrShape);

            if (arrShape.length == 0) {
                throw new Error('零维数组不能连接')
            }

            if (i != 0 && arrShape.length != shapeArr[i - 1].length) {
                throw new Error('维数不相同')
            }

            if (axis < 0) {
                axis = axis + arrShape.length
            }

            if (axis > arrShape.length - 1) {
                throw new Error('当前数据不存在轴（axis:' + axis + '）')
            }

            for (let j = 0; j < arrShape.length; j++) {
                if (j != axis) {
                    if (i != 0) {
                        if (arrShape[j] != shapeArr[i - 1][j]) {
                            throw new Error('除了连接轴axis之外的所有输入数组维度都必须完全匹配')
                        }
                    }
                }
            }
        }

        let resultShape = [].concat(shapeArr[0]);
        for (let i = 1; i < a_list.length; i++) {
            resultShape[axis] = resultShape[axis] + shapeArr[i][axis];
        }

        let a_list_data = [];
        for (let i = 0; i < a_list.length; i++) {
            a_list_data[i] = []
            printArr4(a_list[i], [], (res) => {
                if (res.index.length == axis) {
                    a_list_data[i].push(res.value)
                }
            })
        }

        if (axis == 0) {
            let resultData = [];
            for (let i = 0; i < a_list.length; i++) {
                resultData = resultData.concat(a_list[i])
            }
            return reshape(resultData, resultShape)
        } else {
            let resultData = a_list_data[0];
            for (let i = 1; i < a_list.length; i++) {
                for (let j = 0; j < a_list_data[i].length; j++) {
                    resultData[j] = [].concat(resultData[j], a_list_data[i][j])
                }
            }
            return reshape(resultData, resultShape)
        }
    }
}
exports.concatenate = concatenate;

//console.log(toStr(concatenate([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9, 100], [10, 11, 12, 200]]], 1)))

// console.log(toStr(concatenate([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9, 100], [10, 11, 12, 200]]], 0)))

// console.log(toStr(concatenate([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9]]], 0)))

//console.log(toStr(concatenate([[[[ 1,  2,  3,  4],[ 5,  6,  7,  8],[ 9, 10, 11, 12]],[[13, 14, 15, 16],[17, 18, 19, 20],[21, 22, 23, 24]]], [[[25, 26, 27, 28],[29, 30, 31, 32],[33, 34, 35, 36]],[[37, 38, 39, 40],[41, 42, 43, 44],[45, 46, 47, 48]]]], 0)))

//console.log(toStr(concatenate([[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28], [29, 30, 31, 32], [33, 34, 35, 36]], [[37, 38, 39, 40], [41, 42, 43, 44], [45, 46, 47, 48]]]], 1)))

//console.log(toStr(concatenate([[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28], [29, 30, 31, 32], [33, 34, 35, 36]], [[37, 38, 39, 40], [41, 42, 43, 44], [45, 46, 47, 48]]]], 2)))

//console.log(toStr(concatenate([[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28], [29, 30, 31, 32], [33, 34, 35, 36],[33, 34, 35, 36]], [[37, 38, 39, 40], [41, 42, 43, 44], [45, 46, 47, 48],[45, 46, 47, 48]]]], 1)))

//console.log(toStr(concatenate([[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28]], [[37, 38, 39, 40]]]], 1)))

//console.log(toStr(concatenate([[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], [[13, 14, 15, 16], [17, 18, 19, 20], [21, 22, 23, 24]]], [[[25, 26, 27, 28]], [[37, 38, 39, 40]]]], 1)))

//console.log(toStr(concatenate([1, 1], 1)))

// console.log(toStr(concatenate([1, [1]], 1)))

//console.log(toStr(concatenate([[1], 1], 1)))

// console.log(toStr(concatenate([[1], [1]], 1)))

// console.log(toStr(concatenate([[1], [1]], 0)))

// console.log(toStr(concatenate([[1], [[1]]], 0)))

// console.log(toStr(concatenate([[[1]], [[1,1]]], 0)))

// console.log(toStr(concatenate([[[1]], [[1,1]]], 1)))

//console.log(toStr(concatenate([[[1]]])))

//-------------------

//console.log(toStr(concatenate([[[1]], [[2,3]]],'None')))

// console.log(toStr(concatenate([1, [[2,3]]],'None')))

// console.log(toStr(concatenate([1, 2],'None')))

// console.log(toStr(concatenate([1],'None')))

// console.log(toStr(concatenate()))

//垂直
function vstack(tup_list) {
    if (typeof tup_list == 'undefined') {
        throw new Error('tup_list不能为空')
    }

    if (!Array.isArray(tup_list)) {
        throw new Error('tup_list必须是数组类型')
    }

    if (tup_list.length <= 0) {
        throw new Error('tup_list不能是空列表')
    }

    for (let i = 0; i < tup_list.length; i++) {
        let itemShape = shape(tup_list[i])
        if (itemShape.length < 2) {
            for (let j = 1; j <= 2 - itemShape.length; j++) {
                tup_list[i] = [tup_list[i]]
            }
        }
    }

    return concatenate(tup_list, 0)
}
exports.vstack = vstack;

// console.log(toStr(vstack()))

// console.log(toStr(vstack(1)))

// console.log(toStr(vstack([1])))

// console.log(toStr(vstack([1,2])))

// console.log(toStr(vstack([1,[2]])))

// console.log(toStr(vstack([1,[[2]]])))

// console.log(toStr(vstack([1,[[[2]]]])))

// console.log(toStr(vstack([1,[[2],[3]]])))

// console.log(toStr(vstack([[[[0],[1]]],[[[2],[3]]]])))

// console.log(toStr(vstack([[0,1],[2],[3]])))

// console.log(toStr(vstack([[[0],[1]],[2],[3]])))

// console.log(toStr(vstack([[1, 2, 3],[4, 5, 6]])))

// console.log(toStr(vstack([[[1], [2], [3]],[[4], [5], [6]]])))

// console.log(toStr(vstack([[[[ 1,  2,  3,  4],[ 5,  6,  7,  8],[ 9, 10, 11, 12]],[[13, 14, 15, 16],[17, 18, 19, 20],[21, 22, 23, 24]]], [[[25, 26, 27, 28],[29, 30, 31, 32],[33, 34, 35, 36]],[[37, 38, 39, 40],[41, 42, 43, 44],[45, 46, 47, 48]]]])))

//水平
function hstack(tup_list) {
    if (typeof tup_list == 'undefined') {
        throw new Error('tup_list不能为空')
    }

    if (!Array.isArray(tup_list)) {
        throw new Error('tup_list必须是数组类型')
    }

    if (tup_list.length <= 0) {
        throw new Error('tup_list不能是空列表')
    }

    let axis = 1;

    for (let i = 0; i < tup_list.length; i++) {
        let itemShape = shape(tup_list[i])
        if (itemShape.length < 1) {
            for (let j = 1; j <= 1 - itemShape.length; j++) {
                tup_list[i] = [tup_list[i]]
            }
        }
        if (itemShape.length <= 1) {
            axis = 0;
        }
    }

    return concatenate(tup_list, axis)
}
exports.hstack = hstack;

// console.log(toStr(hstack()))

// console.log(toStr(hstack(1)))

// console.log(toStr(hstack([1])))

// console.log(toStr(hstack([1,2])))

// console.log(toStr(hstack([1,[2]])))

// console.log(toStr(hstack([1,[[2]]])))

// console.log(toStr(hstack([1,[[[2]]]])))

// console.log(toStr(hstack([1,[[2],[3]]])))

// console.log(toStr(hstack([[[[0],[1]]],[[[2],[3]]]])))

// console.log(toStr(hstack([[0,1],[2],[3]])))

// console.log(toStr(hstack([[[0],[1]],[2],[3]])))

// console.log(toStr(hstack([[1, 2, 3],[4, 5, 6]])))

// console.log(toStr(hstack([[[1], [2], [3]],[[4], [5], [6]]])))

// console.log(toStr(hstack([[[[ 1,  2,  3,  4],[ 5,  6,  7,  8],[ 9, 10, 11, 12]],[[13, 14, 15, 16],[17, 18, 19, 20],[21, 22, 23, 24]]], [[[25, 26, 27, 28],[29, 30, 31, 32],[33, 34, 35, 36]],[[37, 38, 39, 40],[41, 42, 43, 44],[45, 46, 47, 48]]]])))