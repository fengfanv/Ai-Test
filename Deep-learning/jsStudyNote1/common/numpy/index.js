const Main = require('./main.js')
const Reshape = require('./reshape.js')
const Transpose = require('./transpose.js')
const Broadcast = require('./broadcast.js')
const Dot = require('./dot.js')
const Axis = require('./axis.js')
const Indexing = require('./indexing.js')
const Math = require('./math.js')

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

exports.sum = Math.sum;

// numpy a+b 加法（基于广播机制）
// numpy a-b 减法（基于广播机制）
// numpy a*b 乘法（基于广播机制）
// numpy a/b 除法（基于广播机制）

//numpy a>10 a<10 这种操作

//numpy.mean 求数组平均值

//numpy.zeros_like
//numpy.zeros
//numpy.ones
//numpy.flatten

// numpy.max
// numpy.min
// numpy.argmax
// numpy.argmin

// numpy.maximum

// numpy.random.randn
// numpy.random.choice
// numpy.random.permutation
// numpy.random.uniform
// numpy.random.rand

// numpy.pad

// numpy.frombuffer
// numpy.nditer

// numpy.meshgrid
// numpy.logspace

//可选
// numpy.kaiser
// numpy.convolve
