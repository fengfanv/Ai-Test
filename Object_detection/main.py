from create_data import create_a_img
import numpy as np

# 生成数据
all_list = []
for i in range(200):
    list = create_a_img()
    all_list = all_list + list

'''
print(len(all_list))
print(all_list[0])
"""
all_list=[
{
class:int类型，数字标签（0，1，2，3，4，5，6，7，8，9）
img:ndarray类型，形状为[100,100,3]，100*100图片
x:int类型，数字在100*100图像上x轴位置
y:int类型，数字在100*100图像上y轴位置
w:int类型，数字在100*100图像上宽
h:int类型，数字在100*100图像上高
xmin:int类型，数字在100*100图像上最小x轴位置
ymin:int类型，数字在100*100图像上最小y轴位置
xmax:int类型，数字在100*100图像上最大x轴位置
ymax:int类型，数字在100*100图像上最大y轴位置
},
...
]
"""
'''
