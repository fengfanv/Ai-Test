const matplotlib = require('./index')

//柱状图
// matplotlib.chart.bar([{
//     label: '测试',
//     x: [1, 2, 3, 4, 5],
//     y: [2, 2, 3, 4, 54]
// },
// {
//     label: '测试2',
//     x: [1, 2, 3, 4, 5],
//     y: [2, 2, 20, 4, 54]
// }])

//折线图
// matplotlib.chart.line([{
//     label: '测试',
//     x: [1, 2, 3, 4, 5],
//     y: [2, 2, 3, 4, 54]
// },
// {
//     label: '测试2',
//     x: [1, 2, 3, 4, 5],
//     y: [2, 2, 20, 4, 34]
// }])

//图片
// matplotlib.image(__dirname + '/favicon.ico')

// matplotlib.image('C:/Users/merka/Desktop/abc3.png')

// matplotlib.image('C:/Users/merka/Desktop/abc1.png')

// matplotlib.image('C:/Users/merka/Desktop/abc1.png', [
//     {
//         left: 206,
//         top: 658,
//         width: 232,
//         height: 232,
//         label: '中间'
//     },
//     {
//         left: 260,
//         top: 198,
//         width: 134,
//         height: 134,
//         label: '上部'
//     }
// ])

//imshow
// matplotlib.imshow()

// matplotlib.imshow([])

// matplotlib.imshow([1])

// matplotlib.imshow([[1]])

// matplotlib.imshow([[300]])

// matplotlib.imshow([[1,300]])

// matplotlib.imshow([[1,300]],'gray')

// matplotlib.imshow([[[1],[300]]],'gray')

// matplotlib.imshow([[[1,1],[300,1]]],'gray')

// matplotlib.imshow([[[1,1,1],[300,1,2]]])

// matplotlib.imshow([[[1,1,1]]]) //python 认定这段代码是 0-255 int

// matplotlib.imshow([[[1.0,1.0,1.0]]]) //python 认定这段代码是 0.0-1.0 float

// matplotlib.imshow([[[1,155,1]]])

// matplotlib.imshow([[[1,155,1,200]]])

// matplotlib.imshow([[[0.5,0.1,0.2,0.9]]])

// matplotlib.imshow([[[0.5,0.1,0.2,0.9,1]]])

// matplotlib.imshow([[[[0.5,0.1,0.2,0.9]]]])

// matplotlib.imshow([[0, 1], [2, 3]])

// matplotlib.imshow([[1, 2], [3, 4]])

// matplotlib.imshow([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]])