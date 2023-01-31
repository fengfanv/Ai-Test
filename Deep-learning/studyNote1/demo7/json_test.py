import sys
import json
import numpy as np

# ----------------------------------------- json示例代码 -----------------------------------------
# json_content = '{"name":"小王","cards":["农业银行","工商银行","建设银行"],"money":1000,"wife":{"name":"妻子"}}'
# print(type(json_content)) # <class 'str'>

# # python解析json字符串
# data = json.loads(json_content)
# print(type(data)) # <class 'dict'>
# print(data)

# # python 字典(dict)转json
# json_content_1 = json.dumps(data,ensure_ascii=False)
# print(type(json_content_1))
# print(json_content_1)

# json_content_2 = '{"img":[[1,2,3],[4,5,6],[7,8,9]]}'
# data_2 = json.loads(json_content_2)
# print(data_2)
# print(data_2['img'])
# print(type(data_2['img']))
# img = data_2['img']
# image = np.array(img)
# print(image.shape)
# print(image)

# ----------------------------------------- nodejs 运行python脚本 -----------------------------------------

def main():
    # 读取node.js传来的数据
    lines = sys.stdin.readlines()
    print(lines)
 
if __name__ == '__main__':
    main()
    sys.stdout.flush()



