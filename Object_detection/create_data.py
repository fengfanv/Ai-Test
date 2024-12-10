from dataset.mnist import load_mnist
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np


def get_region(img):
    """
    获取mnist数据集，有像素的区域
    """
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
    w = abs(x_min - x_max)
    h = abs(y_min - y_max)
    return (x, y, w, h)


# ----------------------------------------------------
# ----------------------------------------------------
# ----------------------------------------------------

# img, label = load_mnist()
# print(img.shape, label.shape)


def create_a_img():
    """
    生成一张100*100的图片，图片内含有多个mnist手写数字
    """
    # global img, label
    img, label = load_mnist()

    new_img = np.zeros((100, 100, 3))  # 100*100图像
    new_img_num = 6  # 100*100图像上，最多放多少个数字
    child_list = []  # 100*100图像上，数字列表
    for i in range(new_img_num):
        index = np.random.randint(0, img.shape[0])

        num_label = label[index]

        num_img = img[index].reshape(28, 28)
        region_x, region_y, region_w, region_h = get_region(num_img)
        region_xmin = region_x
        region_ymin = region_y
        region_xmax = region_x + region_w
        region_ymax = region_y + region_h
        num_img = num_img[region_ymin:region_ymax, region_xmin:region_xmax]

        random_x = np.random.randint(0, 100 - region_w)
        random_y = np.random.randint(0, 100 - region_h)

        child_list.append(
            {
                "label": num_label,
                "img": num_img,
                "x": random_x,
                "y": random_y,
                "w": region_w,
                "h": region_h,
            }
        )

    new_child = []
    for i in range(len(child_list)):
        isOverlapping = False
        for j in range(len(child_list)):
            if j == i:
                break
            x11 = child_list[i]["x"]
            y11 = child_list[i]["y"]
            x12 = child_list[i]["x"] + child_list[i]["w"]
            y12 = child_list[i]["y"] + child_list[i]["h"]

            x21 = child_list[j]["x"]
            y21 = child_list[j]["y"]
            x22 = child_list[j]["x"] + child_list[j]["w"]
            y22 = child_list[j]["y"] + child_list[j]["h"]

            interWidth = min(x12, x22) - max(x11, x21)
            interHeight = min(y12, y22) - max(y11, y21)
            interArea = max(0, interWidth) * max(0, interHeight)

            unionArea = (
                (x12 - x11) * (y12 - y11) + (x22 - x21) * (y22 - y21) - interArea
            )

            IOU = interArea / unionArea

            # print(i, j, "IOU", IOU)

            if IOU > 0:
                isOverlapping = True
                break
        if isOverlapping == False:
            new_child.append(child_list[i])

    # print(len(child_list), len(new_child))

    for i in range(len(new_child)):
        x = new_child[i]["x"]
        y = new_child[i]["y"]
        w = new_child[i]["w"]
        h = new_child[i]["h"]
        xmin = x
        ymin = y
        xmax = x + w
        ymax = y + h
        new_img[ymin:ymax, xmin:xmax, 0] = new_child[i]["img"]
        new_img[ymin:ymax, xmin:xmax, 1] = new_child[i]["img"]
        new_img[ymin:ymax, xmin:xmax, 2] = new_child[i]["img"]

    # # 创建一个图形和轴
    # fig, ax = plt.subplots(1)

    # # 显示图像
    # ax.imshow(new_img)

    # # 显示图形
    # for i in range(len(new_child)):
    #     x = new_child[i]["x"]
    #     y = new_child[i]["y"]
    #     w = new_child[i]["w"]
    #     h = new_child[i]["h"]
    #     label = new_child[i]["label"]

    #     rect = patches.Rectangle(
    #         (x, y), w, h, linewidth=1, edgecolor="red", facecolor="none"
    #     )
    #     ax.add_patch(rect)

    #     ax.text(x, y, label, ha="center", va="bottom", fontsize=10, color="red")

    # # 设置坐标轴的限制
    # ax.set_xlim(0, new_img.shape[1])
    # ax.set_ylim(new_img.shape[0], 0)  # Y轴方向反转，以便正确显示坐标系

    # plt.show()

    # -----------------------------------------
    # -----------------------------------------
    # -----------------------------------------

    # # 创建一个图形和轴
    # fig, ax = plt.subplots(1)

    # # 显示图像
    # ax.imshow(new_img)

    rect_list = []
    for i in range(len(new_child)):
        x = new_child[i]["x"]
        y = new_child[i]["y"]
        w = new_child[i]["w"]
        h = new_child[i]["h"]
        xmin = x
        ymin = y
        xmax = x + w
        ymax = y + h
        label = new_child[i]["label"]
        rect_list.append(
            {
                "class": label,
                "img": new_img,
                "x": x,
                "y": y,
                "w": w,
                "h": h,
                "xmin": xmin,
                "ymin": ymin,
                "xmax": xmax,
                "ymax": ymax,
            }
        )
        _class = rect_list[i]["class"]
        _img = rect_list[i]["img"]
        _x = rect_list[i]["x"]
        _y = rect_list[i]["y"]
        _w = rect_list[i]["w"]
        _h = rect_list[i]["h"]
        _xmin = rect_list[i]["xmin"]
        _ymin = rect_list[i]["ymin"]
        _xmax = rect_list[i]["xmax"]
        _ymax = rect_list[i]["ymax"]

        # rect = patches.Rectangle(
        #     (_x, _y), _w, _h, linewidth=1, edgecolor="red", facecolor="none"
        # )
        # ax.add_patch(rect)

        # ax.text(_x, _y, _class, ha="center", va="bottom", fontsize=10, color="red")

    # # 设置坐标轴的限制
    # ax.set_xlim(0, new_img.shape[1])
    # ax.set_ylim(new_img.shape[0], 0)  # Y轴方向反转，以便正确显示坐标系

    # plt.show()

    return rect_list


# print(len(create_a_img()))
