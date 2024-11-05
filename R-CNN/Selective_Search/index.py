import numpy as np
import matplotlib.pyplot as plt
from matplotlib.image import imread
import cv2  # pip install opencv-python

# img = imread('lena.png')
# print(type(img))  # <class 'numpy.ndarray'>

# # 使用高斯模糊
# kernel_size = 15  # 核大小
# sigma = 0  # 根据核大小自动计算标准差

# blurred_img = cv2.GaussianBlur(img, (kernel_size, kernel_size), sigma)

# plt.imshow(blurred_img)
# plt.show()


# ------------------------------------------------------------


def gaussian_kernel(size, sigma):
    """生成高斯核"""

    # 如果 sigma 为 0，根据核大小自动计算
    if sigma <= 0:
        sigma = size / 6.0

    # 创建一个大小为 (size, size) 的网格
    ax = np.linspace(-(size // 2), size // 2, size)
    xx, yy = np.meshgrid(ax, ax)

    # 计算高斯核
    kernel = np.exp(-(xx**2 + yy**2) / (2 * sigma**2))
    kernel = kernel / np.sum(kernel)  # 归一化核
    return kernel


def gaussian_blur(img, kernel_size, sigma):
    """使用高斯核对图像进行模糊处理"""
    # 生成高斯核
    kernel = gaussian_kernel(kernel_size, sigma)

    # 获取图像的尺寸
    h, w = img.shape[:2]

    # 创建一个空的输出图像
    blurred_img = np.zeros_like(img)

    # 计算边距
    pad = kernel_size // 2

    # 填充边界
    padded_img = np.pad(img, ((pad, pad), (pad, pad), (0, 0)), mode='edge')

    # 进行卷积操作
    for i in range(h):
        for j in range(w):
            for c in range(img.shape[2]):  # 遍历每个通道
                blurred_img[i, j, c] = np.sum(
                    padded_img[i:i + kernel_size,
                               j:j + kernel_size, c] * kernel
                )

    return blurred_img


# img = imread('lena.png')

# kernel_size = 15  # 核大小
# sigma = 0  # 根据核大小自动计算标准差

# blurred_img = gaussian_blur(img, kernel_size, sigma)

# plt.imshow(blurred_img)
# plt.show()
