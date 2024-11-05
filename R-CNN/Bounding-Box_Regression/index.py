import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

from train_data import get_number, get_region
from common.common import left_to_center, center_to_left
from common.model import BoundingBoxRegressor
from common.adjust_coordinate import create_train_data, adjust_coordinates

X, Coordinate = get_number(0)

X_train = []  # cnn池化层输出的数据
all_random_coordinate = []  # 随机选框，模拟rcnn预测到的选框位置
y_train = []  # 由真实选框位置和预测选框位置所计算出来回归因子训练数据(真实边框位置到预测边框位置的偏移量)

length = X.shape[0]

for i in range(length):
    for j in range(2000):
        random_w = int(np.random.uniform(10, 28))
        random_h = int(np.random.uniform(10, 28))
        random_x = int(np.random.uniform(0, 28-random_w))
        random_y = int(np.random.uniform(0, 28-random_h))
        random_coordinate = [random_x, random_y, random_w, random_h]
        center_random_coordinate = left_to_center(random_coordinate)
        center_true_coordinate = left_to_center(Coordinate[i])
        train_data = create_train_data(
            center_true_coordinate, center_random_coordinate)
        X_train.append(X[i])
        all_random_coordinate.append(random_coordinate)
        y_train.append(train_data)

X_train = np.array(X_train)
all_random_coordinate = np.array(all_random_coordinate)
y_train = np.array(y_train)

print(X_train.shape)
print(all_random_coordinate.shape)
print(y_train.shape)

# 创建并训练模型
model = BoundingBoxRegressor(learning_rate=0.001, num_epochs=5000)
model.train(X_train, y_train)


# 预测
test_img = X_train[0].reshape(28, 28)

# 真实坐标
true_coordinate = get_region(test_img)

# rcnn预测到的坐标coordinate
coordinate = all_random_coordinate[0]

# 预测新的边框位置
predictions = model.predict(test_img.reshape(1, -1))
new_coordinate = adjust_coordinates(left_to_center(coordinate), predictions[0])
left_new_coordinate = center_to_left(new_coordinate)


print('rcnn预测坐标', coordinate)
print('回归因子', new_coordinate)
print('新坐标', left_new_coordinate)


# 创建一个图形和轴
fig, ax = plt.subplots(1)

# 显示图像
ax.imshow(test_img)

# 显示图形
# 真实边框位置
rect = patches.Rectangle((true_coordinate[0], true_coordinate[1]), true_coordinate[2], true_coordinate[3], linewidth=1,
                         edgecolor='green', facecolor='none')
ax.add_patch(rect)

# rcnn预测边框位置
rect2 = patches.Rectangle((coordinate[0], coordinate[1]), coordinate[2], coordinate[3], linewidth=1,
                          edgecolor='red', facecolor='none')
ax.add_patch(rect2)

# 回归边框后的位置
rect3 = patches.Rectangle((left_new_coordinate[0], left_new_coordinate[1]), left_new_coordinate[2], left_new_coordinate[3], linewidth=1,
                          edgecolor='blue', facecolor='none')
ax.add_patch(rect3)


# 设置坐标轴的限制
ax.set_xlim(0, 28)
ax.set_ylim(28, 0)  # Y轴方向反转，以便正确显示坐标系

plt.show()
