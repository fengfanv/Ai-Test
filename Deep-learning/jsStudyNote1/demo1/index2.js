
// js定义一个Man构造函数
function Man(name) {
    console.log('初始化构造函数！');

    this.name = name;

    this.hello = function () {
        console.log(this.name + ' said hello to you.');
    }

    this.goodbye = function () {
        console.log(this.name + ' said good-bye to you.');
    }
}

var m = new Man('XiaoKang')//构造函数Man生成一个实例（对象）m
m.hello()
m.goodbye()

const np = require('../common/numpy');

console.log('np',np)