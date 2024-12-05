const np = require('../../Deep-learning/jsStudyNote1/common/numpy')
const { imread, imshow } = require('../../Deep-learning/jsStudyNote1/common/matplotlib')

/*
计算图像的局部二进制模式（LBP）。
    
    :param image: 输入图像，应该是一个2D numpy数组
    :param P: 邻域点的数量
    :param R: 半径
    :return: LBP图像
*/
function local_binary_pattern(image, P = 8, R = 1) {
    //创建输出图像
    let lbp_image = np.zeros_like(image)

    //获取图像的尺寸
    let [height, width] = np.shape(image)

    //计算角度步长
    let theta = 2 * Math.PI / P

    //遍历每个像素
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            let center_value = image[x][y]
            let lbp_value = 0

            //遍历 P 个邻域点
            for (let p = 0; p < P; p++) {
                //计算邻域点的坐标
                let neighbor_x = x + Math.floor(R * np.sin(p * theta))  //y坐标
                let neighbor_y = y + Math.floor(R * np.cos(p * theta))  //x坐标

                //确保邻域点在图像内部
                if (0 <= neighbor_x && neighbor_x < height && 0 <= neighbor_y && neighbor_y < width) {
                    let neighbor_value = image[neighbor_x][neighbor_y]
                    //根据邻域点的值与中心点的比较，生成 LBP 值
                    if (neighbor_value >= center_value) {
                        lbp_value |= (1 << p)  //使用位移操作生成二进制值
                    }
                }
            }
            lbp_image[x][y] = lbp_value
        }
    }
    return lbp_image
}
exports.local_binary_pattern = local_binary_pattern;

// imread('./lena.png', (imageData) => {
//     console.log(imageData)

//     const { width, height, data } = imageData

//     image = np.reshape(data, [height, width, 4])

//     image = np.indexing(image, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)])

//     colour_channel_0 = np.indexing(image, [np.slice(np.None), np.slice(np.None), 0])
//     colour_channel_1 = np.indexing(image, [np.slice(np.None), np.slice(np.None), 1])
//     colour_channel_2 = np.indexing(image, [np.slice(np.None), np.slice(np.None), 2])

//     colour_channel_0_res = local_binary_pattern(colour_channel_0, 8, 1.0)
//     colour_channel_1_res = local_binary_pattern(colour_channel_1, 8, 1.0)
//     colour_channel_2_res = local_binary_pattern(colour_channel_2, 8, 1.0)

//     show_image = np.concatenate([colour_channel_0_res, colour_channel_1_res, colour_channel_2_res])

//     imshow(show_image)
// })