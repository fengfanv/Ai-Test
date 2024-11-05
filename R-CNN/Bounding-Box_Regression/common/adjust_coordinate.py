import math


def adjust_coordinates(original_coords, regression_factors):
    """
    Adjusts the original coordinates based on regression factors.

    :param original_coords: A list of 4 elements [x, y, w, h] representing the original box.
    :param regression_factors: A list of 4 elements [dx, dy, dw, dh] for adjustments.
    :return: A list of adjusted coordinates [x_pred, y_pred, w_pred, h_pred].
    """
    if len(original_coords) != 4 or len(regression_factors) != 4:
        raise ValueError("Both input lists must have exactly 4 elements.")

    x_anchor, y_anchor, w_anchor, h_anchor = original_coords
    dx, dy, dw, dh = regression_factors

    # Calculate adjusted center coordinates
    x_pred = x_anchor + dx * w_anchor
    y_pred = y_anchor + dy * h_anchor

    # Calculate adjusted width and height
    w_pred = w_anchor * math.exp(dw)
    h_pred = h_anchor * math.exp(dh)

    return [x_pred, y_pred, w_pred, h_pred]


'''
# 示例用法
original_coords = [50, 50, 100, 100]  # [x, y, w, h]
regression_factors = [0.1, -0.2, 0.05, 0.1]  # [dx, dy, dw, dh]
adjusted_coords = adjust_coordinates(original_coords, regression_factors)
print(adjusted_coords)
'''


def create_train_data(real_coordinate, predict_coordinate):
    center_x, center_y, width, height = real_coordinate
    ref_center_x, ref_center_y, ref_width, ref_height = predict_coordinate
    y = [
        (center_x - ref_center_x) / ref_width,  # dx 预测边框中心点与参考框中心点的 x 轴偏移量
        (center_y - ref_center_y) / ref_height,  # dy 预测边框中心点与参考框中心点的 y 轴偏移量
        math.log(width / ref_width),            # dw 预测宽度相对于参考宽度的对数变化
        math.log(height / ref_height)           # dh 预测高度相对于参考高度的对数变化
    ]
    return y
