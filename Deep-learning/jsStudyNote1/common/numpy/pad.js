const Main = require('./main.js');
var shape = Main.shape;

const Broadcast = require('./broadcast.js');
var broadcastToShape = Broadcast.broadcastToShape;

const Axis = require('./axis.js');
var get_axis = Axis.get_axis;

const Reshape = require('./reshape.js');
var reshape = Reshape.reshape;

const printTest = require('./print_test.js');
var toStr = printTest.toStr;

function pad(arr, pad_width, mode, constant_values) {
    if (typeof arr == 'undefined') {
        throw new Error('arr不能为空')
    }
    if (typeof pad_width == 'undefined') {
        throw new Error('pad_width不能为空')
    } else {
        if (typeof pad_width != 'number' && Array.isArray(pad_width) == false) {
            throw new Error('pad_width只能是数值或数组')
        }
    }
    if (typeof mode == 'undefined') {
        mode = 'constant'
    }
    if (typeof constant_values == 'undefined') {
        constant_values = 0
    } else {
        if (typeof constant_values != 'number' && Array.isArray(constant_values) == false) {
            throw new Error('constant_values只能是数值或数组')
        }
    }
    if (Array.isArray(arr) == false) {
        return arr
    }
    if (mode == 'constant') {
        let arrShape = shape(arr);

        //处理pad_width-----------------------------
        if (typeof pad_width == 'number') {
            pad_width = [pad_width]
        }
        let pad_width_shape = shape(pad_width)
        if (pad_width_shape.length > 2) {
            throw new Error('pad_width只能是1维或2维数组')
        }
        if (pad_width_shape[0] != 1 && pad_width_shape[0] != 2 && pad_width_shape[0] != arrShape.length) {
            throw new Error('pad_width一维的元素个数只能是 1 或 2 或是 arr维度数量')
        }
        if (pad_width_shape.length == 2 && pad_width_shape[1] > 2) {
            throw new Error('pad_width二维的元素个数只能是 1 或 2（before,after）')
        }
        pad_width = broadcastToShape(pad_width, [arrShape.length, 2])[0]
        // console.log('pad_width', pad_width, [arrShape.length, 2])

        //处理constant_values-----------------------------
        if (typeof constant_values == 'number') {
            constant_values = [constant_values]
        }
        let constant_values_shape = shape(constant_values)
        if (constant_values_shape.length > 2) {
            throw new Error('constant_values只能是1维或2维数组')
        }
        if (constant_values_shape[0] != 1 && constant_values_shape[0] != 2 && constant_values_shape[0] != arrShape.length) {
            throw new Error('constant_values一维的元素个数只能是 1 或 2 或是 arr维度数量')
        }
        if (constant_values_shape.length == 2 && constant_values_shape[1] > 2) {
            throw new Error('constant_values二维的元素个数只能是 1 或 2（before,after）')
        }
        constant_values = broadcastToShape(constant_values, [arrShape.length, 2])[0]
        // console.log('constant_values', constant_values, [arrShape.length, 2])

        //根据pad_width和constant_values处理arr----------------------------
        for (let i = 0; i < arrShape.length; i++) {
            let item_pad_width = pad_width[i];
            let item_constant_values = constant_values[i];
            let arrShape = shape(arr);
            let item_shape = arrShape[i];
            let result_shape = [].concat(arrShape);
            result_shape[i] = result_shape[i] + item_pad_width[0] + item_pad_width[1];
            let item_axis = get_axis(arr, i).axisArr;
            // console.log(i, item_axis);
            let before_arr = [];
            let after_arr = [];
            for (let j = 0; j < item_pad_width[0]; j++) {
                before_arr.push(item_constant_values[0])
            }
            for (let k = 0; k < item_pad_width[1]; k++) {
                after_arr.push(item_constant_values[1])
            }
            for (let m = 0; m < item_axis.length; m++) {
                item_axis[m] = before_arr.concat(item_axis[m], after_arr)
            }
            arr = reshape(item_axis, result_shape)
        }
        return arr;
    } else if (mode == 'edge') {
        let arrShape = shape(arr);

        //处理pad_width-----------------------------
        if (typeof pad_width == 'number') {
            pad_width = [pad_width]
        }
        let pad_width_shape = shape(pad_width)
        if (pad_width_shape.length > 2) {
            throw new Error('pad_width只能是1维或2维数组')
        }
        if (pad_width_shape[0] != 1 && pad_width_shape[0] != 2 && pad_width_shape[0] != arrShape.length) {
            throw new Error('pad_width一维的元素个数只能是 1 或 2 或是 arr维度数量')
        }
        if (pad_width_shape.length == 2 && pad_width_shape[1] > 2) {
            throw new Error('pad_width二维的元素个数只能是 1 或 2（before,after）')
        }
        pad_width = broadcastToShape(pad_width, [arrShape.length, 2])[0]
        // console.log('pad_width', pad_width, [arrShape.length, 2])

        //根据pad_width处理arr----------------------------
        for (let i = 0; i < arrShape.length; i++) {
            let item_pad_width = pad_width[i];
            let arrShape = shape(arr);
            let item_shape = arrShape[i];
            let result_shape = [].concat(arrShape);
            result_shape[i] = result_shape[i] + item_pad_width[0] + item_pad_width[1];

            let itemAxis = get_axis(arr, i)
            let item_axis = itemAxis.axisArr;
            // console.log(i, toStr(item_axis));

            for (let m = 0; m < item_axis.length; m++) {
                let before_arr = [];
                let after_arr = [];
                for (let j = 0; j < item_pad_width[0]; j++) {
                    before_arr.push(item_axis[m][0])
                }
                for (let k = 0; k < item_pad_width[1]; k++) {
                    after_arr.push(item_axis[m][item_axis[m].length - 1])
                }
                item_axis[m] = before_arr.concat(item_axis[m], after_arr)
            }
            arr = reshape(Axis.axisArrToOriginalArr(item_axis, itemAxis.strides), result_shape)
        }
        return arr;
    } else {
        return arr;
    }
}
exports.pad = pad;
// console.log(pad())

// console.log(pad(1))

// console.log(pad(1,'1'))

// console.log(pad(1,1))

// console.log(pad('1',1))

//----------

// console.log(pad([1], 1))

// console.log(pad([1], [1]))

// console.log(pad([1], [1, 1]))

// console.log(pad([1], [[1, 1]]))

//----------

// console.log(pad([1], [[[1]]]))

// console.log(pad([[[1]]], [1,2,3,4]))

// console.log(pad([[[1]]], [1,2,3]))

// console.log(pad([[[1]]], [[1,1,2]]))

// console.log(pad([[[1]]], [[1,1]]))

// ----------

// console.log(pad([1], 1, undefined, 'a'))

// console.log(pad([1], 1, undefined, 2))

// console.log(pad([1], 1, undefined, [2]))

// console.log(pad([1], 1, undefined, [[2]]))

// console.log(pad([1], 1, undefined, [[2,2]]))

// console.log(pad([1], 1, undefined, [[[2,2]]]))

// console.log(pad([[[1]]], 1, undefined, [1,2,3,4]))

// console.log(pad([[[1]]], 1, undefined, [1,2,3]))

// console.log(pad([[[1]]], 1, undefined, [[1],[2],[3]]))

// console.log(pad([[[1]]], 1, undefined, [[1,2,3]]))

//---------------------------------

// console.log(toStr(pad([[[1]]], 1, undefined, [[2], [3], [4]])))

// console.log(toStr(pad([[[1]]], [[2, 3], [1, 3], [2, 4]], undefined, [[2, 3], [4, 5], [6, 7]])))

// console.log(toStr(pad([1], [[2, 3], [1, 3], [2, 4]], undefined, [[2, 3], [4, 5], [6, 7]])))

// console.log(toStr(pad([1], [2, 3], undefined, [2, 3])))

// console.log(toStr(pad([1], [[2, 3]], undefined, [[2, 3]])))

// console.log(toStr(pad([1], 1, undefined, [[2, 3]])))

// console.log(toStr(pad([[1]], 1, undefined, [[2, 3]])))

// console.log(toStr(pad([[1]], 1, undefined, [2, 3])))

// console.log(toStr(pad([[1]], 1, undefined, [2])))

//---------------------------------

// console.log(toStr(pad([[1]], 1, 'edge')))

// console.log(toStr(pad([[1,2],[3,4]], 1, 'edge')))

// console.log(toStr(pad([[1, 2], [3, 4]], [1, 2], 'edge')))

// console.log(toStr(pad([[1, 2], [3, 4]], [[1, 2], [1, 3]], 'edge')))

// console.log(toStr(pad([1, 2], [1, 3], 'edge')))

// console.log(toStr(pad([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [[1, 2], [1, 3]], 'edge')))

// console.log(toStr(pad([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [[1, 2]], 'edge')))

// console.log(toStr(pad([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [[1, 2], [1, 2], [0, 0]], 'edge')))