import numpy as np
import cv2

def get_perspective_transform(src_points, dst_points):
    """
    自定义实现 getPerspectiveTransform
    :param src_points: 源图像的 4 个点 [(x1, y1), (x2, y2), (x3, y3), (x4, y4)]
    :param dst_points: 目标图像的 4 个点 [(x1', y1'), (x2', y2'), (x3', y3'), (x4', y4')]
    :return: 透视变换矩阵 H
    """

    # 构建方程
    A = []
    B = []

    for i in range(4):
        x, y = src_points[i]
        x_prime, y_prime = dst_points[i]

        # 创建透视变换方程
        A.append([x, y, 1, 0, 0, 0, -x*x_prime, -y*x_prime])
        A.append([0, 0, 0, x, y, 1, -x*y_prime, -y*y_prime])

        B.append(x_prime)
        B.append(y_prime)

    A = np.array(A)
    B = np.array(B)

    # 求解线性方程组 A * H = B
    H_flat = np.linalg.lstsq(A, B, rcond=None)[0]  # 最小二乘解
    
    # 构建透视变换矩阵 H
    H = np.append(H_flat, 1).reshape(3, 3)
    
    return H

def warp_perspective(img, H, dst_shape):
    """
    使用透视变换矩阵 H 对图像进行透视变换
    :param img: 输入图像
    :param H: 透视变换矩阵
    :param dst_shape: 输出图像的尺寸 (高, 宽)
    :return: 变换后的图像
    """
    # 确保输出图像是和输入图像一样的通道数
    dst_img = np.zeros((dst_shape[0], dst_shape[1], img.shape[2]), dtype=np.uint8)
    
    h, w = dst_shape
    for i in range(h):
        for j in range(w):
            # 目标图像中的坐标 (i, j) 转换到源图像坐标
            dst_coord = np.array([j, i, 1])
            src_coord = np.dot(np.linalg.inv(H), dst_coord)
            src_coord /= src_coord[2]
            src_x, src_y = int(src_coord[0]), int(src_coord[1])

            # 如果源图像坐标在有效范围内
            if 0 <= src_x < img.shape[1] and 0 <= src_y < img.shape[0]:
                dst_img[i, j] = img[src_y, src_x]

    return dst_img

# 测试代码
if __name__ == '__main__':
    # 输入图像
    img = cv2.imread('20241125212402.jpg')

    # 设置源图像的 4 个角点 (源图像四个点)
    src_points = [(126, 216), (1516, 200), (328, 1164), (1335, 1125)]

    # 设置目标图像的 4 个角点 (目标图像四个点)
    dst_points = [(0, 0), (400, 0), (0, 400), (400, 400)]

    # 计算透视变换矩阵
    H = get_perspective_transform(src_points, dst_points)

    # 进行透视变换
    dst_img = warp_perspective(img, H, (400, 400))

    # 显示结果
    cv2.imshow('Warped Image', dst_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
