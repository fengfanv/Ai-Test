import numpy as np


def rgb2hsv(rgb):
    # 将输入 RGB 归一化到 [0, 1]
    rgb = rgb / 255.0
    
    # 分离 R, G, B 分量
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    
    # 计算 V
    v = np.max(rgb, axis=-1)
    
    # 计算 S
    c = v - np.min(rgb, axis=-1)  # 计算色差
    s = c / (v + 1e-10)  # 防止除零
    
    # 计算 H
    h = np.zeros_like(v)
    mask = s > 0  # 只有在 S > 0 时，H 才有意义
    
    # 色相计算
    h[mask] = np.where(
        r[mask] == v[mask], 
        (g[mask] - b[mask]) / c[mask],
        np.where(
            g[mask] == v[mask], 
            2.0 + (b[mask] - r[mask]) / c[mask],
            4.0 + (r[mask] - g[mask]) / c[mask]
        )
    )
    
    h = (h / 6.0) % 1.0  # 将 H 转换到 [0, 1]
    
    # 将结果组合成 HSV
    hsv = np.stack((h, s, v), axis=-1)
    
    return hsv


import matplotlib.pyplot as plt
from matplotlib.image import imread

image = imread('lena.png')

hsvImage = rgb2hsv(image[:, :, :3]*255)


fig = plt.figure()
a = fig.add_subplot(221)
plt.imshow(image)
a.set_title("image")

a = fig.add_subplot(222)
plt.imshow(hsvImage)
a.set_title("hsv")

plt.show()


#--------------------------------------------------


# from skimage import color
# import numpy as np
# import matplotlib.pyplot as plt
# from matplotlib.image import imread


# image = imread('lena.png')

# hsvImage = color.rgb2hsv(image[:, :, :3])


# fig = plt.figure()
# a = fig.add_subplot(221)
# plt.imshow(image)
# a.set_title("image")

# a = fig.add_subplot(222)
# plt.imshow(hsvImage)
# a.set_title("hsv")

# plt.show()