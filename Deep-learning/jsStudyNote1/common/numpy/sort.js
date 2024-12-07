const Main = require('./main.js')
var shape = Main.shape;

const Axis = require('./axis.js')
var get_axis = Axis.get_axis;
var axisArrToOriginalArr = Axis.axisArrToOriginalArr;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const printTest = require('./print_test.js')
var toStr = printTest.toStr;

//JS-library/paixu/快速排序
function quick_sort(arr_test) {
    let arr = arr_test;

    if (arr.length <= 1) {
        return arr;
    }
    let midIndex = Math.floor(arr.length / 2);
    let midValue = arr.splice(midIndex, 1)[0];

    let leftArr = [];
    let rightArr = [];
    let arrLen = arr.length;

    for (let i = 0; i < arrLen; i++) {
        if (arr[i] > midValue) {
            rightArr.push(arr[i]);
        } else {
            leftArr.push(arr[i]);
        }
    }
    return quick_sort(leftArr).concat(midValue, quick_sort(rightArr))
}

function sort(a, axis, kind) {
    if (typeof a == 'undefined') {
        throw new Error('a不能为空')
    }

    if (typeof axis == 'undefined') {
        axis = -1
    }

    if (typeof kind == 'undefined') {
        kind = 'quicksort'
    }

    if (kind == 'quicksort') {

        if (String(axis) == 'None') {

            if (!Array.isArray(a)) {
                a = [a]
            }

            let a_flatten = reshape(a, [-1])

            return quick_sort(a_flatten)

        } else {
            if (!Array.isArray(a)) {
                throw new Error('a必须是数组')
            }

            if (a.length == 0) {
                return []
            }

            let aShape = shape(a)

            let axisInfo = get_axis(a, axis)

            for (let i = 0; i < axisInfo.axisArr.length; i++) {
                axisInfo.axisArr[i] = quick_sort(axisInfo.axisArr[i])
            }

            return reshape(axisArrToOriginalArr(axisInfo.axisArr, axisInfo.strides), aShape)
        }
    }
}
exports.sort = sort;

// console.log(toStr(sort()))

// console.log(toStr(sort(1)))

// console.log(toStr(sort(1, 'None')))

// console.log(toStr(sort([[1, 4], [3, 1]])))

// console.log(toStr(sort([[1, 4], [3, 1]], 1)))

// console.log(toStr(sort([[1, 4], [3, 1]], -1)))

// console.log(toStr(sort([[1, 4], [3, 1]], 'None')))

// console.log(toStr(sort([[1, 4], [3, 1]], 0)))

// console.log(toStr(sort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],0)))

// console.log(toStr(sort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],1)))

// console.log(toStr(sort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],2)))

// console.log(toStr(sort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],3)))

// console.log(toStr(sort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]])))

// console.log(toStr(sort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],'None')))

// console.log(toStr(sort([2,1],'None')))

// console.log(toStr(sort([2,1])))

// console.log(toStr(sort([2,1],-1)))

// console.log(toStr(sort([1])))

// console.log(toStr(sort([])))

// console.log(toStr(sort([],'None')))

function argsort(a, axis, kind) {
    if (typeof a == 'undefined') {
        throw new Error('a不能为空')
    }

    if (typeof axis == 'undefined') {
        axis = -1
    }

    if (typeof kind == 'undefined') {
        kind = 'quicksort'
    }

    if (kind == 'quicksort') {

        if (String(axis) == 'None') {

            if (!Array.isArray(a)) {
                a = [a]
            }

            let a_flatten = reshape(a, [-1])

            for (let i = 0; i < a_flatten.length; i++) {
                a_flatten[i] = {
                    index: i,
                    value: a_flatten[i],
                    valueOf: function () {
                        return this.value
                    }
                }
            }

            // let sortData = quick_sort(a_flatten)
            let sortData = a_flatten.toSorted((a, b) => a.value - b.value)

            for (let i = 0; i < sortData.length; i++) {
                sortData[i] = sortData[i].index;
            }

            return sortData

        } else {
            if (!Array.isArray(a)) {
                a = [a]
            }

            if (a.length == 0) {
                return []
            }

            let aShape = shape(a)

            let axisInfo = get_axis(a, axis)

            for (let i = 0; i < axisInfo.axisArr.length; i++) {

                for (let j = 0; j < axisInfo.axisArr[i].length; j++) {
                    axisInfo.axisArr[i][j] = {
                        index: j,
                        value: axisInfo.axisArr[i][j],
                        valueOf: function () {
                            return this.value
                        }
                    }
                }

                // axisInfo.axisArr[i] = quick_sort(axisInfo.axisArr[i])
                axisInfo.axisArr[i] = axisInfo.axisArr[i].toSorted((a, b) => a.value - b.value)

                for (let j = 0; j < axisInfo.axisArr[i].length; j++) {
                    axisInfo.axisArr[i][j] = axisInfo.axisArr[i][j].index;
                }

            }

            return reshape(axisArrToOriginalArr(axisInfo.axisArr, axisInfo.strides), aShape)
        }
    }
}
exports.argsort = argsort;

// console.log(toStr(argsort()))

// console.log(toStr(argsort(1)))

// console.log(toStr(argsort(1, 'None')))

// console.log(toStr(argsort([[1, 4], [3, 1]])))

// console.log(toStr(argsort([[1, 4], [3, 1]], 1)))

// console.log(toStr(argsort([[1, 4], [3, 1]], -1)))

// console.log(toStr(argsort([[1, 4], [3, 1]], 'None')))

// console.log(toStr(argsort([[1, 4], [3, 1]], 0)))

// console.log(toStr(argsort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],0)))

// console.log(toStr(argsort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],1)))

// console.log(toStr(argsort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],2)))

// console.log(toStr(argsort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],3)))

// console.log(toStr(argsort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]])))

// console.log(toStr(argsort([[[3, 7], [9, 1], [4, 6]], [[1, 4], [3, 1], [7, 9]]],'None')))

// console.log(toStr(argsort([2,1],'None')))

// console.log(toStr(argsort([2,1])))

// console.log(toStr(argsort([2,1],-1)))

// console.log(toStr(argsort([1])))

// console.log(toStr(argsort([])))

// console.log(toStr(argsort([],'None')))