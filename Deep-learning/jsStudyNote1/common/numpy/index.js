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
const Where = require('./where.js')
const Append = require('./append.js')

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
exports.newaxis = Indexing.newaxis;
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
    rand: Random.rand,
    randint: Random.randint,
};

exports.pad = Pad.pad;

exports.nditer = Common.nditer;

exports.meshgrid = Extra.meshgrid;
exports.logspace = Extra.logspace;

//算数运算符、关系运算符
exports.expr = Operators.expr;

exports.where = Where.where;
exports.round = Math.round;
exports.absolute = Math.absolute;
exports.abs = Math.abs;
exports.minimum = Extra.minimum;
exports.append = Append.append;
exports.concatenate = Append.concatenate;

//一期工程（cnn）
//可选
// numpy.kaiser
// numpy.convolve
// numpy.frombuffer


//二期工程（rcnn、fast-rcnn）
//numpy.concatenate
//numpy.histogram
//numpy.fliplr
//numpy.flipud
//numpy.get_include
//numpy.hstack
//numpy.vstack
//numpy.sort
//numpy.argsort
//numpy.trapz
//numpy.unique
//numpy.tile
//numpy.random.seed
//numpy.linalg.svd
//numpy.allclose
//可选
//numpy.array
//numpy.asarray
//-------------
//numpy.ndarray
//numpy.inf
//numpy.uint8
//numpy.float
//numpy.float32
//numpy.uint16


//三期工程（faster-rcnn）
//numpy.isclose
//numpy.cumsum
//numpy.finfo
//numpy.finfo(xxx).eps
//numpy.random.random
//numpy.random.random((1,1)).tolist()
//numpy.dstack
//numpy.logical_or
//numpy.logical_and
//numpy.logical_not
//numpy.repeat
//numpy.spacing
//numpy.searchsorted
//numpy.linspace
//numpy.empty
//numpy.ascontiguousarray
//numpy.all
//numpy.diag
//numpy.delete
//可选
//------------
//numpy.int32
//numpy.bool
//numpy.int