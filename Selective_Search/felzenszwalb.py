import matplotlib.pyplot as plt
import cv2  # pip install opencv-python
from matplotlib.image import imread
import numpy as np

import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
from index import gaussian_blur


def find_root(forest, n):
    """Find the root of node n.
    Given the example above, for any integer from 1 to 9, 1 is always returned
    """
    root = n
    while (forest[root] < root):
        root = forest[root]
    return root


def set_root(forest, n, root):
    """
    Set all nodes on a path to point to new_root.
    Given the example above, given n=9, root=6, it would "reconnect" the tree.
    so forest[9] = 6 and forest[8] = 6
    The ultimate goal is that all tree nodes point to the real root,
    which is element 1 in this case.
    """
    while (forest[n] < n):
        j = forest[n]
        forest[n] = root
        n = j
    forest[n] = root


def join_trees(forest, n, m):
    """Join two trees containing nodes n and m.
    If we imagine that in the example tree, the root 1 is not known, we
    rather have two disjoint trees with roots 2 and 6.
    Joining them would mean that all elements of both trees become connected
    to the element 2, so forest[9] == 2, forest[6] == 2 etc.
    However, when the relationship between 1 and 2 can still be discovered later.
    """

    if (n != m):
        root = find_root(forest, n)
        root_m = find_root(forest, m)

        if (root > root_m):
            root = root_m

        set_root(forest, n, root)
        set_root(forest, m, root)


def _felzenszwalb_cython(image, scale=1, sigma=0.8, kernel=3, min_size=20):
    """Felzenszwalb's efficient graph based segmentation for
    single or multiple channels.

    Produces an oversegmentation of a single or multi-channel image
    using a fast, minimum spanning tree based clustering on the image grid.
    The number of produced segments as well as their size can only be
    controlled indirectly through ``scale``. Segment size within an image can
    vary greatly depending on local contrast.

    Parameters
    ----------
    image : (N, M, C) ndarray
        Input image.
    scale : float, optional (default 1)
        Sets the obervation level. Higher means larger clusters.
    sigma : float, optional (default 0.8)
        Width of Gaussian smoothing kernel used in preprocessing.
        Larger sigma gives smother segment boundaries.
    min_size : int, optional (default 20)
        Minimum component size. Enforced using postprocessing.

    Returns
    -------
    segment_mask : (N, M) ndarray
        Integer mask indicating segment labels.
    """

    # image = img_as_float(image)
    image = np.asanyarray(image, dtype=np.float64) / 255

    # rescale scale to behave like in reference implementation
    scale = float(scale) / 255.
    # image = ndi.gaussian_filter(image, sigma=[sigma, sigma, 0])
    image = cv2.GaussianBlur(image, (kernel, kernel), sigma)
    # image = gaussian_blur(image, kernel, sigma)

    # compute edge weights in 8 connectivity:
    down_cost = np.sqrt(np.sum((image[1:, :, :] - image[:-1, :, :])
                               * (image[1:, :, :] - image[:-1, :, :]), axis=-1))
    right_cost = np.sqrt(np.sum((image[:, 1:, :] - image[:, :-1, :])
                                * (image[:, 1:, :] - image[:, :-1, :]), axis=-1))
    dright_cost = np.sqrt(np.sum((image[1:, 1:, :] - image[:-1, :-1, :])
                                 * (image[1:, 1:, :] - image[:-1, :-1, :]), axis=-1))
    uright_cost = np.sqrt(np.sum((image[1:, :-1, :] - image[:-1, 1:, :])
                                 * (image[1:, :-1, :] - image[:-1, 1:, :]), axis=-1))
    costs = np.hstack([
        right_cost.ravel(), down_cost.ravel(), dright_cost.ravel(),
        uright_cost.ravel()]).astype(np.float64)

    # compute edges between pixels:
    height, width = image.shape[:2]
    segments = np.arange(width * height, dtype=np.intp).reshape(height, width)
    down_edges = np.c_[segments[1:, :].ravel(), segments[:-1, :].ravel()]
    right_edges = np.c_[segments[:, 1:].ravel(), segments[:, :-1].ravel()]
    dright_edges = np.c_[segments[1:, 1:].ravel(), segments[:-1, :-1].ravel()]
    uright_edges = np.c_[segments[:-1, 1:].ravel(), segments[1:, :-1].ravel()]
    edges = np.vstack([right_edges, down_edges, dright_edges, uright_edges])

    # initialize data structures for segment size
    # and inner cost, then start greedy iteration over edges.
    edge_queue = np.argsort(costs)
    edges = np.ascontiguousarray(edges[edge_queue])
    costs = np.ascontiguousarray(costs[edge_queue])
    segments_p = np.arange(width * height, dtype=np.intp)  # segments

    segment_size = np.ones(width * height, dtype=np.intp)

    # inner cost of segments
    cint = np.zeros(width * height)
    num_costs = costs.size

    for e in range(num_costs):
        seg0 = find_root(segments_p, edges[e][0])
        seg1 = find_root(segments_p, edges[e][1])
        if seg0 == seg1:
            continue
        inner_cost0 = cint[seg0] + scale / segment_size[seg0]
        inner_cost1 = cint[seg1] + scale / segment_size[seg1]
        if costs[e] < min(inner_cost0, inner_cost1):
            # update size and cost
            join_trees(segments_p, seg0, seg1)
            seg_new = find_root(segments_p, seg0)
            segment_size[seg_new] = segment_size[seg0] + segment_size[seg1]
            cint[seg_new] = costs[e]

    # postprocessing to remove small segments
    # edges = edges
    for e in range(num_costs):
        seg0 = find_root(segments_p, edges[e][0])
        seg1 = find_root(segments_p, edges[e][1])
        if seg0 == seg1:
            continue
        if segment_size[seg0] < min_size or segment_size[seg1] < min_size:
            join_trees(segments_p, seg0, seg1)
            seg_new = find_root(segments_p, seg0)
            segment_size[seg_new] = segment_size[seg0] + segment_size[seg1]

    # unravel the union find tree
    flat = segments_p.ravel()
    old = np.zeros_like(flat)
    while (old != flat).any():
        old = flat
        flat = flat[flat]
    flat = np.unique(flat, return_inverse=True)[1]
    return flat.reshape((height, width))

# -------------------------------------------------------------------

# https://www.cnblogs.com/qw12/p/9465538.html

sigma = 0.5
kernel = 3
K, min_size = 250, 25

image = imread('lena.png')

image = image*255

# skimage自带的felzenszwalb算法
seg1 = _felzenszwalb_cython(
    image, scale=K, sigma=sigma, kernel=kernel, min_size=min_size)

plt.imshow(seg1)
plt.show()
