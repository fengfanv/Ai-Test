const Main = require('./main.js')
const Reshape = require('./reshape.js')
const Transpose = require('./transpose.js')

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

//下面是关于，对换数组的维度的方法（numpy.transpose）
exports.transpose = Transpose.transpose;

//下面是关于，两个数组的点积运算方法（numpy.dot）