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
console.log(type(a));
console.log(a.length);
console.log(a[0], a[2]);
a[1] = 18;
console.log(a);

console.log(a.slice(1, 3))
console.log(a.slice(1))
console.log(a.slice(0, 3))
console.log(a.slice(0, -1))
console.log(a.slice(0, -2))

let me = {
    'height': 180
}
console.log(type(me))
console.log(me['height'])
me['age'] = 18
console.log(me)


let hungry = true;
console.log(type(hungry))
console.log(!true)
console.log(true && false)

//if语句
if (true) {
    console.log('true');
} else {
    console.log('false');
}

//for循环
let arr = [1, 2, 3]
for (let i in arr) {
    console.log(i)
}

//函数
let hello = function (name) {
    console.log('你好', name, '！')
}
hello('Kang')