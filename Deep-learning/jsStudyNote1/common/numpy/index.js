const Main = require('./main.js')
const Reshape = require('./reshape.js')
const Transpose = require('./transpose.js')
const Broadcast = require('./broadcast.js')
const Dot = require('./dot.js')
const Axis = require('./axis.js')
const Indexing = require('./indexing.js')
const Math = require('./math.js')
const Extra = require('./extra.js')
const PrintTest = require('./print_test.js')
const Random = require('./random.js')
const Pad = require('./pad.js')
const Common = require('./common.js')
const Operators = require('./operators.js')

//获取数据形状(numpy.shape)
exports.shape = Main.shape;

//获取数据维度(numpy.ndim)
exports.ndim = Main.ndim;

//根据形状数组，生成数据的方法(numpy.create_array)
exports.create_array = Main.create_array;

//获取数据元素的总个数的方法(numpy.size)
exports.size = Main.size;

//根据数值范围创建数组(numpy.arange)的方法
exports.arange = Main.arange;

//修改数据形状的方法（numpy.reshape）
exports.reshape = Reshape.reshape;

//对换数组的维度的方法（numpy.transpose）
exports.transpose = Transpose.transpose;

//对数据应用广播机制（使用广播机制处理数据）（numpy.broadcast)
exports.broadcast = Broadcast.broadcast;

//将数据广播到指定形状（numpy.broadcastToShape)
exports.broadcastToShape = Broadcast.broadcastToShape

//数组点积运算（numpy.dot）
exports.dot = Dot.dot;

//获取数据的某个轴（numpy.get_axis）
exports.get_axis = Axis.get_axis;

//索引功能（numpy.indexing）
exports.slice = Indexing.slice;
exports.Ellipsis = Indexing.Ellipsis;
exports.None = Indexing.None;
exports.True = Indexing.True;
exports.False = Indexing.False;
exports.indexing = Indexing.indexing;

//numpy数学
exports.sin = Math.sin;
exports.cos = Math.cos;
exports.tan = Math.tan;
exports.exp = Math.exp;
exports.log = Math.log;
exports.sqrt = Math.sqrt;
exports.ceil = Math.ceil;

//求和
exports.sum = Math.sum;
//求平均值
exports.mean = Math.mean;

exports.zeros = Main.zeros;
exports.ones = Main.ones;
exports.flatten = Extra.flatten;
exports.zeros_like = Main.zeros_like;

exports.max = Extra.max;
exports.argmax = Extra.argmax;
exports.min = Extra.min;
exports.argmin = Extra.argmin;

exports.maximum = Extra.maximum;

exports.toStr = PrintTest.toStr;

exports.random = {
    randn: Random.randn,
    choice: Random.choice,
    permutation: Random.permutation,
    uniform: Random.uniform,
    rand: Random.rand
};

exports.pad = Pad.pad;

exports.nditer = Common.nditer;

exports.meshgrid = Extra.meshgrid;
exports.logspace = Extra.logspace;

//算数运算符、关系运算符
exports.ar = Operators.ar;

//可选
// numpy.kaiser
// numpy.convolve
// numpy.frombuffer