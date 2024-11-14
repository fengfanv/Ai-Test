const np = require('../../Deep-learning/jsStudyNote1/common/numpy')
const { imread, imshow } = require('../../Deep-learning/jsStudyNote1/common/matplotlib')

function BiLinear_interpolation(img, dstH, dstW) {
    const [scrH, scrW, _] = np.shape(img)
    img = np.pad(img, [[0, 1], [0, 1], [0, 0]], 'constant')
    let retimg = np.zeros([dstH, dstW, 3])
    for (let i = 0; i < dstH; i++) {
        for (let j = 0; j < dstW; j++) {
            let scrx = (i + 0.5) * (scrH / dstH) - 0.5
            let scry = (j + 0.5) * (scrW / dstW) - 0.5
            let x = Math.floor(scrx)
            let y = Math.floor(scry)
            let u = scrx - x
            let v = scry - y

            //快
            let v1 = (1 - u) * (1 - v)
            let v2 = u * (1 - v)
            let v3 = (1 - u) * v
            let v4 = u * v
            let item1 = np.expr(v1, '*', img[x][y])
            let item2 = np.expr(v2, '*', img[x + 1][y])
            let item3 = np.expr(v3, '*', img[x][y + 1])
            let item4 = np.expr(v4, '*', img[x + 1][y + 1])
            let value = np.expr(item1, '+', np.expr(item2, '+', np.expr(item3, '+', item4)))
            retimg[i][j] = value;

            // //慢
            // let item1 = np.expr((1 - u) * (1 - v), '*', np.indexing(img, [x, y]))
            // let item2 = np.expr(u * (1 - v), '*', np.indexing(img, [x + 1, y]))
            // let item3 = np.expr((1 - u) * v, '*', np.indexing(img, [x, y + 1]))
            // let item4 = np.expr(u * v, '*', np.indexing(img, [x + 1, y + 1]))
            // np.indexing(retimg, [i, j], np.expr(item1, '+', np.expr(item2, '+', np.expr(item3, '+', item4))))

            console.log([i, j])
        }
    }
    return retimg
}

imread('./test.jpg', (imageData) => {
    console.log(imageData)

    const { width, height, data } = imageData

    image = np.reshape(data, [height, width, 4])

    image = np.indexing(image, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)])

    // image2 = BiLinear_interpolation(image, Math.floor(height * 0.5), Math.floor(width * 1))

    // image2 = BiLinear_interpolation(image, Math.floor(height * 0.5), Math.floor(width * 0.5))

    imshow(image2)
})