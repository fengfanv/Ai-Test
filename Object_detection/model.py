import numpy as np


# 卷积层
def conv2d(input_image, kernel, stride=1, padding=0):
    """
    :param input_image: 输入图像 (H, W, C)
    :param kernel: 卷积核 (Kh, Kw, C, K)
    :param stride: 步长
    :param padding: 填充
    :return: 卷积输出
    """
    H, W, C = input_image.shape
    Kh, Kw, _, K = kernel.shape  # Kh, Kw: 卷积核的大小, K: 卷积核的个数

    # 计算输出尺寸
    H_out = (H + 2 * padding - Kh) // stride + 1
    W_out = (W + 2 * padding - Kw) // stride + 1

    # 添加填充
    padded_input = np.pad(input_image, ((
        padding, padding), (padding, padding), (0, 0)), mode='constant', constant_values=0)

    # 存储输出
    output = np.zeros((H_out, W_out, K))

    for h in range(0, H_out):
        for w in range(0, W_out):
            for k in range(K):
                # 对每个卷积核进行卷积操作
                region = padded_input[h*stride:h *
                                      stride+Kh, w*stride:w*stride+Kw, :]
                output[h, w, k] = np.sum(region * kernel[:, :, :, k])  # 卷积操作

    return output


# 池化层
def max_pool2d(input_image, pool_size=2, stride=2):
    """
    :param input_image: 输入图像 (H, W, C)
    :param pool_size: 池化窗口大小
    :param stride: 池化步长
    :return: 池化后的图像
    """
    H, W, C = input_image.shape
    H_out = (H - pool_size) // stride + 1
    W_out = (W - pool_size) // stride + 1

    output = np.zeros((H_out, W_out, C))

    for h in range(0, H_out):
        for w in range(0, W_out):
            for c in range(C):
                region = input_image[h*stride:h*stride +
                                     pool_size, w*stride:w*stride+pool_size, c]
                output[h, w, c] = np.max(region)  # 最大池化

    return output


# 全连接层
def dense(input_vector, weights, bias):
    """
    :param input_vector: 输入向量
    :param weights: 权重矩阵
    :param bias: 偏置
    :return: 输出
    """
    return np.dot(input_vector, weights) + bias


# 激活函数
def relu(x):
    return np.maximum(0, x)

# ------------------------------------------------------------
# ------------------------------------------------------------
# ------------------------------------------------------------


'''
卷积层（Conv Layers）：用于提取图像特征。
池化层（Pooling Layers）：用于下采样。
全连接层（Fully Connected Layers）：用于输出目标类别和位置坐标。
------------------------------------------------------------
输入层：100x100x3（RGB图像）。
卷积层1：使用64个3x3的卷积核，步幅为1，输出大小为100x100x64。
池化层1：2x2的最大池化，步幅为2，输出大小为50x50x64。
卷积层2：使用128个3x3的卷积核，步幅为1，输出大小为50x50x128。
池化层2：2x2的最大池化，步幅为2，输出大小为25x25x128。
全连接层1：将展平后的特征映射到512维。
全连接层2：输出一个包含(num_classes + 4)的向量（num_classes=10表示数字标签，4个坐标分别是xmin, ymin, xmax, ymax）。
------------------------------------------------------------
判断数字是几：分类任务
判断数字位置：回归任务（坐标回归）
------------------------------------------------------------
计算类别损失（分类）：使用交叉熵损失（cross-entropy loss），来计算预测类别与真实类别之间的误差。
计算位置损失（回归）：使用均方误差（MSE loss）来计算预测坐标与真实坐标的差距。
------------------------------------------------------------
计算总损失，将类别损失和位置损失结合起来，得到一个总的损失。
'''


class Object_detection_model:
    def __init__(self):
        # 卷积层1: 3x3, 64 filters
        self.conv1_weights = np.random.randn(3, 3, 3, 64)
        self.conv1_bias = np.zeros(64)

        # 卷积层2: 3x3, 128 filters
        self.conv2_weights = np.random.randn(3, 3, 64, 128)
        self.conv2_bias = np.zeros(128)

        # 全连接层1
        self.fc1_weights = np.random.randn(25 * 25 * 128, 512)
        self.fc1_bias = np.zeros(512)

        # 全连接层2 (输出类别和目标框位置)
        self.fc2_weights = np.random.randn(512, 14)  # 10类 + 4个坐标
        self.fc2_bias = np.zeros(14)

    def forward(self, x):
        # 卷积层1 + ReLU + 池化层1
        x = relu(conv2d(x, self.conv1_weights) + self.conv1_bias)
        x = max_pool2d(x)

        # 卷积层2 + ReLU + 池化层2
        x = relu(conv2d(x, self.conv2_weights) + self.conv2_bias)
        x = max_pool2d(x)

        # 展平
        x = x.flatten()

        # 全连接层1 + ReLU
        x = relu(dense(x, self.fc1_weights, self.fc1_bias))

        # 全连接层2 (输出预测)
        output = dense(x, self.fc2_weights, self.fc2_bias)
        '''
        output.shape=[14]   模型output的形状是[14] ，前10位是数字0-数字9的概率，后四位是数字坐标(xmin, ymin, xmax, ymax)
        '''

        return output
