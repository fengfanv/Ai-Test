//node -v 查看node版本
//node 启动类似python解析器的功能
//ctrl+c 结束node进程&或退出解释器功能
//node xxx.js 运行js文件



console.log(1 + 2)
console.log(1 - 2)
console.log(1 * 2)
console.log(1 / 2)
console.log(4 ** 2) //求4的2次方

const { type } = require('../common/index')

let x = 10;
console.log(type(x)) //[object Number]









let a = [1, 2, 3, 4, 5, 6]
console.log(a);
console.log(a.length);
console.log(a[0]);
console.log(a[2]);

console.log(a.slice(1, 3))
console.log(a.slice(1))
console.log(a.slice(0, 3))
console.log(a.slice(0, -1))
console.log(a.slice(0, -2))

let me = {
    'height': 180
}

let hello = function (name) {
    console.log('你好', name, '！')
}
hello('Kang')