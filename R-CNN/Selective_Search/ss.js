const np = require('../../Deep-learning/jsStudyNote1/common/numpy')
const { imread, imshow } = require('../../Deep-learning/jsStudyNote1/common/matplotlib')

const { _felzenszwalb_cython } = require('./felzenszwalb.js')
const { local_binary_pattern } = require('./LBP.js')
const { rgb2hsv } = require('./hsv.js')


function _generate_segments(im_orig, scale, sigma, min_size) {

    let im_mask = _felzenszwalb_cython(im_orig, scale, sigma, undefined, min_size)

    let im_orig_shape = np.shape(im_mask)

    let zeros_shape = im_orig_shape.slice(0, 2)
    zeros_shape.push(1)
    im_orig = np.append(im_orig,
        np.zeros(zeros_shape)
        , 2)

    np.indexing(im_orig, [np.slice(np.None), np.slice(np.None), 3], im_mask)

    return im_orig
}

function _sim_colour(r1, r2) {
    let intersection_sum = 0

    for (let i = 0; i < r2["hist_c"].length; i++) {
        let a = r1["hist_c"][i]
        let b = r2["hist_c"][i]
        intersection_sum += Math.min(a, b)
    }

    return intersection_sum
}


function _sim_texture(r1, r2) {
    let intersection_sum = 0

    for (let i = 0; i < r2["hist_t"].length; i++) {
        let a = r1["hist_t"][i]
        let b = r2["hist_t"][i]
        intersection_sum += Math.min(a, b)
    }
    return intersection_sum
}

function _sim_size(r1, r2, imsize) {
    return 1.0 - (r1["size"] + r2["size"]) / imsize
}

function _sim_fill(r1, r2, imsize) {
    let bbsize = (
        (Math.max(r1["max_x"], r2["max_x"]) - Math.min(r1["min_x"], r2["min_x"]))
        * (Math.max(r1["max_y"], r2["max_y"]) - Math.min(r1["min_y"], r2["min_y"]))
    )
    return 1.0 - (bbsize - r1["size"] - r2["size"]) / imsize
}

function _calc_sim(r1, r2, imsize) {
    return (
        _sim_colour(r1, r2)
        + _sim_texture(r1, r2)
        + _sim_size(r1, r2, imsize)
        + _sim_fill(r1, r2, imsize)
    )
}

function _calc_colour_hist(img) {
    let BINS = 25
    let hist = []

    for (let colour_channel = 0; colour_channel < 3; colour_channel++) {

        let c = np.indexing(img, [np.slice(np.None), colour_channel])

        hist = np.concatenate(
            [hist, np.histogram(c, BINS, [0.0, 255.0])[0]])
    }
    hist = np.expr(hist, '/', img.length)
    return hist
}

function _calc_texture_gradient(img) {
    let img_shape = np.shape(img)
    let ret = np.zeros([img_shape[0], img_shape[1], img_shape[2]])
    for (let colour_channel = 0; colour_channel < 3; colour_channel++) {
        np.indexing(ret,
            [np.slice(np.None), np.slice(np.None), colour_channel],
            local_binary_pattern(np.indexing(img, [np.slice(np.None), np.slice(np.None), colour_channel]), 8, 1.0))
    }
    return ret
}

function _calc_texture_hist(img) {
    let BINS = 10
    let hist = []

    for (let colour_channel = 0; colour_channel < 3; colour_channel++) {
        let fd = np.indexing(img, [np.slice(np.None), colour_channel])
        hist = np.concatenate([hist, np.histogram(fd, BINS, [0.0, 1.0])[0]])
    }
    hist = np.expr(hist, '/', img.length)
    return hist
}

function _extract_regions(img) {

    let R = {}
    let hsv = rgb2hsv(np.indexing(img, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)]))

    for (let y = 0; y < img.length; y++) {
        let i = img[y];
        for (let x = 0; x < i.length; x++) {
            let [r, g, b, l] = i[x]
            if (!R[l]) {
                R[l] = {
                    "min_x": 0xffff, "min_y": 0xffff,
                    "max_x": 0, "max_y": 0, "labels": [l]
                }
            }

            if (R[l]["min_x"] > x) {
                R[l]["min_x"] = x
            }

            if (R[l]["min_y"] > y) {
                R[l]["min_y"] = y
            }
            if (R[l]["max_x"] < x) {
                R[l]["max_x"] = x
            }
            if (R[l]["max_y"] < y) {
                R[l]["max_y"] = y
            }
        }
    }

    let tex_grad = _calc_texture_gradient(img)

    let img_3 = np.indexing(img, [np.slice(np.None), np.slice(np.None), 3])

    for (let k in R) {
        let v = R[k]

        let masked_pixels = np.indexing(hsv, [np.expr(img_3, '==', k)])
        R[k]["size"] = masked_pixels.length
        R[k]["hist_c"] = _calc_colour_hist(masked_pixels)

        R[k]["hist_t"] = _calc_texture_hist(np.indexing(tex_grad, [np.expr(img_3, '==', k)]))

    }
    return R
}

function _extract_neighbours(regions) {
    function intersect(a, b) {

        let judge_1 = (b["min_x"] > a["min_x"] && b["min_x"] < a["max_x"]) && (b["min_y"] > a["min_y"] && b["min_y"] < a["max_y"])
        let judge_2 = (b["max_x"] > a["min_x"] && b["max_x"] < a["max_x"]) && (b["max_y"] > a["min_y"] && b["max_y"] < a["max_y"])
        let judge_3 = (b["min_x"] > a["min_x"] && b["min_x"] < a["max_x"]) && (b["max_y"] > a["min_y"] && b["max_y"] < a["max_y"])
        let judge_4 = (b["max_x"] > a["min_x"] && b["max_x"] < a["max_x"]) && (b["min_y"] > a["min_y"] && b["min_y"] < a["max_y"])

        if (judge_1 || judge_2 || judge_3 || judge_4) {
            return true
        }
        return false
    }

    let R = []
    for (let key in regions) {
        let item = regions[key]
        R.push([key, item])
    }

    let neighbours = []
    for (let cur = 0; cur < R.length - 1; cur++) {
        for (let j = cur + 1; j < R.length; j++) {
            let a = R[cur]
            let b = R[j]
            if (intersect(a[1], b[1])) {
                neighbours.push([a, b])
            }
        }
    }

    return neighbours
}

function _merge_regions(r1, r2) {
    let new_size = r1["size"] + r2["size"]
    let rt = {
        "min_x": Math.min(r1["min_x"], r2["min_x"]),
        "min_y": Math.min(r1["min_y"], r2["min_y"]),
        "max_x": Math.max(r1["max_x"], r2["max_x"]),
        "max_y": Math.max(r1["max_y"], r2["max_y"]),
        "size": new_size,
        "hist_c": np.expr(np.expr(np.expr(r1["hist_c"], '*', r1["size"]), '+', np.expr(r2["hist_c"], '*', r2["size"])), '/', new_size),
        "hist_t": np.expr(np.expr(np.expr(r1["hist_t"], '*', r1["size"]), '+', np.expr(r2["hist_t"], '*', r2["size"])), '/', new_size),
        "labels": [].concat(r1["labels"], r2["labels"]),
    }
    return rt
}

function selective_search(im_orig, scale = 1.0, sigma = 0.8, min_size = 50) {
    let im_orig_shape = np.shape(im_orig)

    if (im_orig_shape[2] != 3) {
        throw new Error('需要3通道图像')
    }

    let img = _generate_segments(im_orig, scale, sigma, min_size)

    if (!img) {
        return [undefined, []]
    }

    let img_shape = np.shape(img)
    let imsize = img_shape[0] * img_shape[1]
    let R = _extract_regions(img)

    let neighbours = _extract_neighbours(R)

    let S = {}
    for (let i = 0; i < neighbours.length; i++) {
        let [ai, ar] = neighbours[i][0];
        let [bi, br] = neighbours[i][1];
        S[[ai, bi].join()] = _calc_sim(ar, br, imsize)
    }

    while (Object.keys(S).length != 0) {
        let sorted_items = [];
        let S_key_arr = Object.keys(S);
        for (let i = 0; i < S_key_arr.length; i++) {
            let k = S_key_arr[i];
            let value = S[k]
            sorted_items.push([k, value])
        }
        sorted_items = sorted_items.toSorted((a, b) => a[1] - b[1])

        let [i, j] = sorted_items.slice(-1)[0][0].split(',')

        let t = Math.max(...Object.keys(R)) + 1.0

        R[t] = _merge_regions(R[i], R[j])

        let key_to_delete = [];
        let new_S_arr = Object.keys(S);
        for (let p = 0; p < new_S_arr.length; p++) {
            let k = new_S_arr[p];
            let v = S[k];

            let item_key = k.split(',');

            if (item_key.indexOf(i) != -1 || item_key.indexOf(j) != -1) {
                key_to_delete.push(k)
            }
        }

        for (let k in S) {
            if (key_to_delete.indexOf(k) != -1) {
                delete S[k]
            }
        }

        key_to_delete = key_to_delete.filter((item) => {
            return item != [i, j].join()
        })

        for (let w = 0; w < key_to_delete.length; w++) {
            let item = key_to_delete[w];
            let k = item.split(',')
            let n = undefined;
            if ([i, j].indexOf(k[0]) != -1) {
                n = k[1]
            } else {
                n = k[0]
            }

            S[[t, n].join()] = _calc_sim(R[t], R[n], imsize)
        }

    }

    let regions = []
    for (let k in R) {
        let r = R[k]

        regions.push({
            'rect': [r['min_x'], r['min_y'], r['max_x'] - r['min_x'], r['max_y'] - r['min_y']],
            'size': r['size'],
            'labels': r['labels']
        })
    }

    return [img, regions]
}

imread('./lena.png', (imageData) => {
    console.log(imageData)

    const { width, height, data } = imageData

    let image = np.reshape(data, [height, width, 4])

    image = np.indexing(image, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)])

    let [_, regions] = selective_search(image, 250, 0.5, 100)

    console.log('regions.length', regions.length)

    let rect = [];
    for (let i = 0; i < regions.length; i++) {
        rect.push({
            left: regions[i].rect[0],
            top: regions[i].rect[1],
            width: regions[i].rect[2],
            height: regions[i].rect[3],
            label: ''
        })
    }

    imshow(image, undefined, rect)
})