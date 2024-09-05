const Main = require('./main.js');
var shape = Main.shape;

const Broadcast = require('./broadcast.js');
var broadcastToShape = Broadcast.broadcastToShape;

function pad(arr, pad_width, mode) {
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
    if (Array.isArray(arr) == false) {
        return arr;
    }
    if (mode == 'constant') {
        let arrShape = shape(arr);
        //处理pad_width
        if (typeof pad_width == 'number') {
            pad_width = [pad_width];
        }
        let pad_width_shape = shape(pad_width);
        if (pad_width_shape.length > 2) {
            throw new Error('pad_width最高只能是2维数组')
        }
        if (pad_width_shape.length != 1 && pad_width_shape[0] > arrShape.length) {
            throw new Error('pad_width的一维数量不能大于arr的维度数')
        }
        if (pad_width_shape.length >= 2 && pad_width_shape[1] > 2) {
            throw new Error('pad_width的二维指向arr的每个维度，每个维度只能前后填充（before,after）')
        }
        console.log(pad_width, [arrShape.length, 2])
        console.log(broadcastToShape(pad_width, [arrShape.length, 2])[0])


        //根据pad_width处理arr

    } else {
        return arr;
    }
}

// console.log(pad())

// console.log(pad(1,1))

// console.log(pad(1,'1'))

// console.log(pad('1',1))

// console.log(pad([1], 1)) == console.log(pad([1], [1])) == console.log(pad([1], [1, 1])) == console.log(pad([1], [ [ 1, 1 ] ]))

