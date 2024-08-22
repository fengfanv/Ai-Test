const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Transpose = require('./transpose.js')
var transpose = Transpose.transpose;

const Main = require('./main.js')
var arange = Main.arange;

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