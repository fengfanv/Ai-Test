
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

// console.log('np', np)

// let a = [[51, 55], [14, 19], [0, 4]]
// let X = np.flatten(a)
// console.log(np.indexing(X, [[0, 2, 4]]))
// console.log(np.expr(X, '>', 15))
// console.log(np.indexing(X, [np.expr(X, '>', 15)]))

const matplotlib = require('../common/matplotlib')

// var x = np.arange(0, 6, 0.1)
// var y = np.sin(x)
// var y2 = np.cos(x)
// //折线图
// matplotlib.chart.line([{
//     label: 'sin',
//     x: x,
//     y: y
// },
// {
//     label: 'cos',
//     x: x,
//     y: y2
// }])

// // matplotlib.image('./lena.png')
// matplotlib.imread('./lena.png', (imageData) => {
//     console.log(imageData)

//     const { width, height, data } = imageData

//     let image = np.reshape(data, [height, width, 4])

//     matplotlib.imshow(image)
// })