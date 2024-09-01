const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Transpose = require('./transpose.js')
var transpose = Transpose.transpose;

const Axis = require('./axis.js')
var get_axis = Axis.get_axis;

const Broadcast = require('./broadcast.js')
var broadcast = Broadcast.broadcast;

const Main = require('./main.js')
var shape = Main.shape;
var arange = Main.arange;

const printTest = require('./print_test.js')
var toStr = printTest.toStr;

function flatten(arr, order) {
    if (typeof order == 'undefined') {
        order = 'C'
    }
    order = order.toUpperCase()
    if (['C', 'F'].indexOf(order) == -1) {
        throw new Error('order必须是 C 或 F 其中之一')
    }
    if (order == 'C') {
        //C(行)顺序
        return reshape(arr, [-1])
    } else {
        //F(列)顺序
        return reshape(transpose(arr), [-1])
    }
}
exports.flatten = flatten;

function getMax(arr) {
    let index = 0;
    let item = arr[index];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value > item.value) {
            index = i;
            item = arr[i];
        }
    }
    return {
        index,
        item
    }
}

function getMin(arr) {
    let index = 0;
    let item = arr[index];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value < item.value) {
            index = i;
            item = arr[i];
        }
    }
    return {
        index,
        item
    }
}

function max(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] > f_arr[index]) {
                index = i;
            }
        }
        return f_arr[index]
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMax(axisArr[i]).item.value
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.max = max;

function argmax(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] > f_arr[index]) {
                index = i;
            }
        }
        return index
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMax(axisArr[i]).index
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.argmax = argmax;

function min(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] < f_arr[index]) {
                index = i;
            }
        }
        return f_arr[index]
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMin(axisArr[i]).item.value
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.min = min;

function argmin(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] < f_arr[index]) {
                index = i;
            }
        }
        return index
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMin(axisArr[i]).index
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.argmin = argmin;

// var a = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4])
// a[0][1][1][1] = -123
// console.log(toStr(a))

// var b = arange(1 * 2 * 3)
// b[2] = -123
// console.log(toStr(b))

// console.log(toStr(argmin(a)))

// console.log(toStr(argmin(a, 0)))

// console.log(toStr(argmin(a, 1)))

// console.log(toStr(argmin(a, 2)))

// console.log(toStr(argmin(a, 3)))

// console.log(toStr(argmin(a, 4)))

// console.log(toStr(argmin(b)))

// console.log(toStr(argmin(b, 0)))

// console.log(toStr(argmin(b, 1)))

// console.log(toStr(argmax(10)))

// console.log(toStr(argmax(10, 0)))

// console.log(toStr(argmax(10, 1)))

function maximum(a, b) {
    if (typeof a == 'undefined' || typeof b == 'undefined') {
        throw new Error('a或b不能为空')
    }
    if (Array.isArray(a) == false && typeof a != 'number') {
        throw new Error('a只能是Number Or Array')
    }
    if (Array.isArray(b) == false && typeof b != 'number') {
        throw new Error('b只能是Number Or Array')
    }
    if (typeof a == 'number' && typeof b == 'number') {
        if (a > b) {
            return a
        } else {
            return b
        }
    }
    if (typeof a == 'number') {
        a = [a]
    }
    if (typeof b == 'number') {
        b = [b]
    }
    var broadcastRes = broadcast([a, b])
    var resultShape = shape(broadcastRes[0])
    a = broadcastRes[0]
    b = broadcastRes[1]
    a = flatten(a)
    b = flatten(b)
    var resultData = []
    for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
            resultData[i] = a[i]
        } else {
            resultData[i] = b[i]
        }
    }
    return reshape(resultData, resultShape)
}
exports.maximum = maximum;

// console.log(maximum())

// console.log(maximum(1))

// console.log(maximum('1', 1))

// console.log(maximum(1, '1'))

// console.log(toStr(maximum(1, 1)))

// console.log(toStr(maximum(1, 2)))

// console.log(toStr(maximum(2, 1)))

// console.log(toStr(maximum([2], 1)))

// console.log(toStr(maximum(1, [2])))

// console.log(toStr(maximum([23], [2])))

// console.log(toStr(maximum([23], [2])))

// console.log(toStr(maximum([23,1,3,4,20], [10])))

// console.log(toStr(maximum([23,1,3,4,20], 10)))

// console.log(toStr(maximum([23,1,3,4,20], [10,30])))

// console.log(toStr(maximum([[23, 1, 3, 4, 20]], [10, 30, 20, 5, 10])))

// console.log(toStr(maximum([[23, 1, 3, 4, 20]], [[10], [30], [20], [5], [10]])))