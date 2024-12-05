const np = require('../../Deep-learning/jsStudyNote1/common/numpy')
const { imread, imshow } = require('../../Deep-learning/jsStudyNote1/common/matplotlib')

function rgb2hsv(rgb) {
    console.time('耗时')
    console.log(1)
    //将输入 RGB 归一化到[0, 1]
    rgb = np.expr(rgb, '/', 255.0)
    console.log(2)
    //分离 R, G, B 分量
    let r = np.indexing(rgb, [np.Ellipsis, 0])
    let g = np.indexing(rgb, [np.Ellipsis, 1])
    let b = np.indexing(rgb, [np.Ellipsis, 2])
    console.log(3)
    //计算 V
    let v = np.max(rgb, -1)
    console.log(4)
    //计算 S
    let c = np.expr(v, '-', np.min(rgb, -1))  //计算色差
    let s = np.expr(c, '/', np.expr(v, '+', 1e-10))  //防止除零
    console.log(5)
    //计算 H
    let h = np.zeros_like(v)
    let mask = np.expr(s, '>', 0)  //只有在 S > 0 时，H 才有意义

    console.log(6)
    //色相计算
    let r_mask = np.indexing(r, [mask])
    console.log(6.1)
    let v_mask = np.indexing(v, [mask])
    console.log(6.2)
    let g_mask = np.indexing(g, [mask])
    console.log(6.3)
    let b_mask = np.indexing(b, [mask])
    console.log(6.4)
    let c_mask = np.indexing(c, [mask])
    console.log(7)
    np.indexing(h, [mask], np.where(
        np.expr(r_mask, '==', v_mask),
        np.expr(np.expr(g_mask, '-', b_mask), '/', c_mask),
        np.where(
            np.expr(g_mask, '==', v_mask),
            np.expr(2.0, '+', np.expr(np.expr(b_mask, '-', r_mask), '/', c_mask)),
            np.expr(4.0, '+', np.expr(np.expr(r_mask, '-', g_mask), '/', c_mask))
        )
    ))
    console.log(8)
    h = np.expr(np.expr(h, '/', 6.0), '%', 1.0)  //将 H 转换到[0, 1]
    console.log(9)
    //将结果组合成 HSV
    let hsv = np.stack([h, s, v], -1)
    console.log(10)
    console.timeEnd('耗时')
    return hsv
}
exports.rgb2hsv = rgb2hsv;

// imread('./lena.png', (imageData) => {
//     console.log(imageData)

//     const { width, height, data } = imageData

//     image = np.reshape(data, [height, width, 4])

//     image = np.indexing(image, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)])

//     let hsvImage = rgb2hsv(image)

//     imshow(hsvImage)
// })