const np = require('../../Deep-learning/jsStudyNote1/common/numpy')
const { imread, imshow } = require('../../Deep-learning/jsStudyNote1/common/matplotlib')

//生成高斯核
function gaussian_kernel(size, sigma) {
    //如果 sigma 为 0，根据核大小自动计算
    if (sigma <= 0) {
        sigma = size / 6.0
    }

    //创建一个大小为 (size, size) 的网格
    let ax = np.linspace(0 - Math.floor(size / 2), Math.floor(size / 2), size)
    let [xx, yy] = np.meshgrid(ax, ax)

    //计算高斯核
    let kernel = np.exp(np.expr(np.expr(0, '-', np.expr(np.expr(xx, '**', 2), '+', np.expr(yy, '+', 2))), '/', np.expr(2, '*', np.expr(sigma, '**', 2))))
    kernel = np.expr(kernel, '/', np.sum(kernel))  //归一化核
    return kernel
}

//使用高斯核对图像进行模糊处理
function gaussian_blur(img, kernel_size, sigma) {
    console.log(1)
    //生成高斯核
    let kernel = gaussian_kernel(kernel_size, sigma)
    console.log(2)

    //获取图像的尺寸
    let [h, w, _] = np.shape(img)
    console.log(3)

    //创建一个空的输出图像
    let blurred_img = np.zeros_like(img)
    console.log(4)

    //计算边距
    let pad = Math.floor(kernel_size / 2)
    console.log(5)

    //填充边界
    let padded_img = np.pad(img, [[pad, pad], [pad, pad], [0, 0]], 'edge')
    let channel = np.shape(padded_img)[2];
    console.log(6)

    //进行卷积操作
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            for (let c = 0; c < channel; c++) {  //遍历每个通道
                console.log(i, j, c)
                // np.indexing(blurred_img, [i, j, c], np.sum(
                //     np.expr(np.indexing(padded_img, [np.slice(i, i + kernel_size),
                //     np.slice(j, j + kernel_size), c]), '*', kernel)
                // ))
                blurred_img[i][j][c] = np.sum(
                    np.expr(np.indexing(padded_img, [np.slice(i, i + kernel_size),
                    np.slice(j, j + kernel_size), c]), '*', kernel)
                )
                // blurred_img[i, j, c] = np.sum(
                //     padded_img[i: i + kernel_size,
                //     j: j + kernel_size, c] * kernel
                // )
            }
        }
    }
    return blurred_img
}

imread('./lena.png', (imageData) => {
    console.log(imageData)

    const { width, height, data } = imageData

    image = np.reshape(data, [height, width, 4])

    image = np.indexing(image, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)])

    let kernel_size = 15  //核大小
    let sigma = 0  //根据核大小自动计算标准差

    let blurred_img = gaussian_blur(image, kernel_size, sigma)

    imshow(blurred_img)
})