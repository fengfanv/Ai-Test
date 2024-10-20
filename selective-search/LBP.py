import matplotlib.pyplot as plt
from matplotlib.image import imread
import numpy as np


# def local_binary_pattern(image, P=8, R=1):
#     """
#     计算图像的局部二进制模式（LBP）。
    
#     :param image: 输入图像，应该是一个2D numpy数组
#     :param P: 邻域点的数量
#     :param R: 半径
#     :return: LBP图像
#     """
#     # 创建输出图像
#     lbp_image = np.zeros_like(image, dtype=np.uint8)

#     # 获取图像的尺寸
#     height, width = image.shape

#     # 计算角度步长
#     theta = 2 * np.pi / P

#     # 遍历每个像素
#     for x in range(height):
#         for y in range(width):
#             center_value = image[x, y]
#             lbp_value = 0
            
#             # 遍历 P 个邻域点
#             for p in range(P):
#                 # 计算邻域点的坐标
#                 neighbor_x = x + int(R * np.sin(p * theta))  # y坐标
#                 neighbor_y = y + int(R * np.cos(p * theta))  # x坐标
                
#                 # 确保邻域点在图像内部
#                 if 0 <= neighbor_x < height and 0 <= neighbor_y < width:
#                     neighbor_value = image[neighbor_x, neighbor_y]
#                     # 根据邻域点的值与中心点的比较，生成 LBP 值
#                     if neighbor_value >= center_value:
#                         lbp_value |= (1 << p)  # 使用位移操作生成二进制值

#             lbp_image[x, y] = lbp_value

#     return lbp_image


# image = imread('lena.png')

# ret = np.zeros((image.shape[0], image.shape[1], image.shape[2]))
# for colour_channel in (0, 1, 2):
#     ret[:, :, colour_channel] = local_binary_pattern(
#         image[:, :, colour_channel]*255, 8, 1.0)


# fig = plt.figure()
# a = fig.add_subplot(221)
# plt.imshow(image)
# a.set_title("image")

# a = fig.add_subplot(222)
# plt.imshow(ret[:, :, 0])
# a.set_title("R")

# a = fig.add_subplot(223)
# plt.imshow(ret[:, :, 1])
# a.set_title("G")

# a = fig.add_subplot(224)
# plt.imshow(ret[:, :, 2])
# a.set_title("B")
# plt.show()

# -------------------------------------------------------------


# from skimage import feature
# import numpy as np
# import matplotlib.pyplot as plt
# from matplotlib.image import imread


# image = imread('lena.png')

# ret = np.zeros((image.shape[0], image.shape[1], image.shape[2]))
# for colour_channel in (0, 1, 2):
#     ret[:, :, colour_channel] = feature.local_binary_pattern(
#         image[:, :, colour_channel], 8, 1.0)


# fig = plt.figure()
# a = fig.add_subplot(221)
# plt.imshow(image)
# a.set_title("image")

# a = fig.add_subplot(222)
# plt.imshow(ret[:, :, 0])
# a.set_title("R")

# a = fig.add_subplot(223)
# plt.imshow(ret[:, :, 1])
# a.set_title("G")

# a = fig.add_subplot(224)
# plt.imshow(ret[:, :, 2])
# a.set_title("B")
# plt.show()
