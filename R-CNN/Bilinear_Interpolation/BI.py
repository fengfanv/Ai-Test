import matplotlib.pyplot as plt
from matplotlib.image import imread
import numpy as np
import math

# 使用，双线性插值，来，放大或缩小图像
def BiLinear_interpolation(img, dstH, dstW):
    scrH, scrW, _ = img.shape
    print(img.shape)
    img = np.pad(img, ((0, 1), (0, 1), (0, 0)), 'constant')
    print(img.shape)
    retimg = np.zeros((dstH, dstW, 3), dtype=np.uint8)
    for i in range(dstH):
        for j in range(dstW):
            scrx = (i+0.5)*(scrH/dstH)-0.5
            scry = (j+0.5)*(scrW/dstW)-0.5
            x = math.floor(scrx)
            y = math.floor(scry)
            u = scrx-x
            v = scry-y
            
            # retimg[i,j]=(1-u)*(1-v)*img[x,y]+u*(1-v)*img[x+1,y]+(1-u)*v*img[x,y+1]+u*v*img[x+1,y+1]
            
            v1 = (1-u)*(1-v)
            v2 = u*(1-v)
            v3 = (1-u)*v
            v4 = u*v

            item1 = v1*img[x, y]    
            item2 = v2*img[x+1, y]
            item3 = v3*img[x, y+1]
            item4 = v4*img[x+1, y+1]

            retimg[i, j] = item1+item2+item3+item4
    return retimg


image = imread('test.jpg')

# image = image*255 //.png需要乘255

# image2 = BiLinear_interpolation(image, image.shape[0]*10, image.shape[1]*10)  # 放大

# image2 = BiLinear_interpolation(image, math.floor(image.shape[0]*0.5), math.floor(image.shape[1]*0.5))   # 缩小

image2 = BiLinear_interpolation(image, math.floor(image.shape[0]*0.5), math.floor(image.shape[1]*1))

plt.imshow(image2)
plt.show()


# https://blog.csdn.net/qq_41076797/article/details/114546796