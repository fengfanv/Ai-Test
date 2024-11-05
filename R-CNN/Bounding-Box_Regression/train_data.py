import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from dataset.mnist import load_mnist


img, label = load_mnist()
# print(img.shape, label.shape)


def get_region(img):
    '''
    获取有像素的区域
    '''
    x_min = 28
    x_max = 0
    y_min = 28
    y_max = 0

    for y in range(28):
        for x in range(28):
            itemValue = img[y][x]
            if itemValue != 0:
                if y < y_min:
                    y_min = y
                if y > y_max:
                    y_max = y

                if x < x_min:
                    x_min = x
                if x > x_max:
                    x_max = x

    x_max += 1
    y_max += 1
    x = x_min
    y = y_min
    w = abs(x_min-x_max)
    h = abs(y_min-y_max)
    return (x, y, w, h)


def get_number(num):
    indexes = label == num
    imgData = img[indexes]

    imgData = imgData[0:20]

    imgData = imgData.reshape(-1, 28*28)

    length = imgData.shape[0]

    imgCoordinate = []
    for i in range(length):
        imgCoordinate.append(get_region(imgData[i].reshape(28, 28)))

    return imgData, np.array(imgCoordinate)

# get_number(0)


'''
first_img = img[0].reshape(28, 28)
x, y, w, h = get_region(first_img)

# 创建一个图形和轴
fig, ax = plt.subplots(1)

# 显示图像
ax.imshow(first_img)

# 显示图形
rect = patches.Rectangle((x, y), w, h, linewidth=1,
                         edgecolor='red', facecolor='none')
ax.add_patch(rect)

# 设置坐标轴的限制
ax.set_xlim(0, 28)
ax.set_ylim(28, 0)  # Y轴方向反转，以便正确显示坐标系

plt.show()
'''
