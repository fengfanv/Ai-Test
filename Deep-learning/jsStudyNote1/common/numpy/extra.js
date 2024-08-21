const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Main = require('./main.js')
var arange = Main.arange;

function flatten(arr) {
    return reshape(arr, [-1])
}
exports.flatten = flatten;