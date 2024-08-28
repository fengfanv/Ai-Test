const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Transpose = require('./transpose.js')
var transpose = Transpose.transpose;

const Axis = require('./axis.js')
var get_axis = Axis.get_axis;

const Main = require('./main.js')
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
exports.argmax = argmax


// var a = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4])
// a[0][1][1][1] = 100

// console.log(toStr(a))

// console.log(toStr(argmax(a,0)))