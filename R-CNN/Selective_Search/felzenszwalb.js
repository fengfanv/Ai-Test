const { gaussian_blur } = require('./index.js')
const np = require('../../Deep-learning/jsStudyNote1/common/numpy')
const { imread, imshow } = require('../../Deep-learning/jsStudyNote1/common/matplotlib')

function find_root(forest, n) {
    let root = n
    while (forest[root] < root) {
        root = forest[root]
    }
    return root
}

function set_root(forest, n, root) {
    while (forest[n] < n) {
        let j = forest[n]
        forest[n] = root
        n = j
    }
    forest[n] = root
}

function join_trees(forest, n, m) {
    if (n != m) {
        let root = find_root(forest, n)
        let root_m = find_root(forest, m)

        if (root > root_m) {
            root = root_m
        }
        set_root(forest, n, root)
        set_root(forest, m, root)
    }
}

//---------------------------------------------

function _felzenszwalb_cython(image, scale = 1, sigma = 0.8, kernel = 3, min_size = 20) {

    image = np.expr(image, '/', 255)

    scale = scale / 255

    image = gaussian_blur(image, kernel, sigma)

    let img_1 = np.indexing(image, [np.slice(1, np.None), np.Ellipsis])
    let img_2 = np.indexing(image, [np.slice(np.None, -1), np.Ellipsis])
    let img_3 = np.indexing(image, [np.slice(np.None, np.None, np.None), np.slice(1, np.None), np.Ellipsis])
    let img_4 = np.indexing(image, [np.slice(np.None, np.None, np.None), np.slice(np.None, -1), np.Ellipsis])
    let img_5 = np.indexing(image, [np.slice(1, np.None), np.slice(1, np.None), np.Ellipsis])
    let img_6 = np.indexing(image, [np.slice(np.None, -1), np.slice(np.None, -1), np.Ellipsis])
    let img_7 = np.indexing(image, [np.slice(1, np.None), np.slice(np.None, -1), np.Ellipsis])
    let img_8 = np.indexing(image, [np.slice(np.None, -1), np.slice(1, np.None), np.Ellipsis])
    let down_cost = np.sqrt(np.sum(np.expr(np.expr(img_1, '-', img_2), '*', np.expr(img_1, '-', img_2)), axis = -1))
    let right_cost = np.sqrt(np.sum(np.expr(np.expr(img_3, '-', img_4), '*', np.expr(img_3, '-', img_4)), axis = -1))
    let dright_cost = np.sqrt(np.sum(np.expr(np.expr(img_5, '-', img_6), '*', np.expr(img_5, '-', img_6)), axis = -1))
    let uright_cost = np.sqrt(np.sum(np.expr(np.expr(img_7, '-', img_8), '*', np.expr(img_7, '-', img_8)), axis = -1))
    let costs = np.hstack([
        np.flatten(right_cost), np.flatten(down_cost), np.flatten(dright_cost),
        np.flatten(uright_cost)])

    let [height, width] = np.shape(image)
    let segments = np.reshape(np.arange(width * height), [height, width])
    let segments_1 = np.flatten(np.indexing(segments, [np.slice(1, np.None), np.Ellipsis]))
    let segments_2 = np.flatten(np.indexing(segments, [np.slice(np.None, -1), np.Ellipsis]))
    let segments_3 = np.flatten(np.indexing(segments, [np.slice(np.None, np.None, np.None), np.slice(1, np.None), np.Ellipsis]))
    let segments_4 = np.flatten(np.indexing(segments, [np.slice(np.None, np.None, np.None), np.slice(np.None, -1), np.Ellipsis]))
    let segments_5 = np.flatten(np.indexing(segments, [np.slice(1, np.None), np.slice(1, np.None), np.Ellipsis]))
    let segments_6 = np.flatten(np.indexing(segments, [np.slice(np.None, -1), np.slice(np.None, -1), np.Ellipsis]))
    let segments_7 = np.flatten(np.indexing(segments, [np.slice(np.None, -1), np.slice(1, np.None), np.Ellipsis]))
    let segments_8 = np.flatten(np.indexing(segments, [np.slice(1, np.None), np.slice(np.None, -1), np.Ellipsis]))
    let down_edges = np.column_stack([segments_1, segments_2])
    let right_edges = np.column_stack([segments_3, segments_4])
    let dright_edges = np.column_stack([segments_5, segments_6])
    let uright_edges = np.column_stack([segments_7, segments_8])
    let edges = np.vstack([right_edges, down_edges, dright_edges, uright_edges])

    let edge_queue = np.argsort(costs)
    edges = np.indexing(edges, [edge_queue])
    costs = np.indexing(costs, [edge_queue])
    let segments_p = np.arange(width * height)

    let segment_size = np.ones(width * height)

    let cint = np.zeros(width * height)
    let num_costs = np.size(costs)

    for (let e = 0; e < num_costs; e++) {
        let seg0 = find_root(segments_p, edges[e][0])
        let seg1 = find_root(segments_p, edges[e][1])
        if (seg0 == seg1) {
            continue;
        }
        inner_cost0 = cint[seg0] + scale / segment_size[seg0]
        inner_cost1 = cint[seg1] + scale / segment_size[seg1]
        if (costs[e] < Math.min(inner_cost0, inner_cost1)) {
            join_trees(segments_p, seg0, seg1)
            let seg_new = find_root(segments_p, seg0)
            segment_size[seg_new] = segment_size[seg0] + segment_size[seg1]
            cint[seg_new] = costs[e]
        }
    }


    for (let e = 0; e < num_costs; e++) {
        let seg0 = find_root(segments_p, edges[e][0])
        let seg1 = find_root(segments_p, edges[e][1])
        if (seg0 == seg1) {
            continue;
        }
        if (segment_size[seg0] < min_size || segment_size[seg1] < min_size) {
            join_trees(segments_p, seg0, seg1)
            let seg_new = find_root(segments_p, seg0)
            segment_size[seg_new] = segment_size[seg0] + segment_size[seg1]
        }
    }


    let flat = np.flatten(segments_p)
    let old = np.zeros_like(flat)
    while (String(np.any(np.expr(old, '!=', flat))) == 'True') {
        old = flat
        flat = np.indexing(flat, [flat])
    }
    flat = np.unique(flat, undefined, true)[1]
    return np.reshape(flat, [height, width])
}

imread('./lena.png', (imageData) => {
    console.log(imageData)

    const { width, height, data } = imageData

    image = np.reshape(data, [height, width, 4])

    image = np.indexing(image, [np.slice(np.None), np.slice(np.None), np.slice(0, 3)])

    sigma = 0.5
    kernel = 3
    K = 250
    min_size = 25

    let seg1 = _felzenszwalb_cython(image, K, sigma, kernel, min_size)

    imshow(seg1)
})