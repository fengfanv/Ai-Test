//获取数据类型
module.exports.type = function (value) {
    return Object.prototype.toString.call(value);
}