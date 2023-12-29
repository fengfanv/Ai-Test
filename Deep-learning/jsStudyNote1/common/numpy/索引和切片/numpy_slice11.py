import numpy as np

# 结构化数组（Structured Arrays）
# 在NumPy中，结构化数组允许每个元素存储多个相关联的字段。这些字段可以具有不同的名称、数据类型和大小。
# 创建结构化数组的关键是使用dtype参数指定一个结构体类型，该类型定义了数组中每个元素的结构。

## 举个栗子

# 使用dtype定义结构体类型，包含两个字段：name(字符串)和 age(整数)
dt = np.dtype([('name', 'S10'), ('age', int)])
# 创建结构化数组，并填充数据  
arr = np.array([('John', 28), ('Anna', 32), ('Peter', 37)], dtype=dt)
# arr = np.array([('John', 28), ('Anna', 32), ('Peter', 37)], dtype=[('name', 'S10'), ('age', int)])

print(arr[0]['name'])  # b'John'
print(arr[1]['age'])   # 32
print(arr['name']) # [b'John' b'Anna' b'Peter']
print(arr['age']) # [28 32 37]

arr[0]['name'] = 'Jane'
arr[1]['age'] = 31

# 记录数组（Record Arrays）
# 记录数组是结构化数组的一种特殊形式，它将数组的每个元素视为一个对象，并允许使用属性来访问和修改数据。这使得记录数组在处理具有复杂结构的数据时更加直观和方便。
# 创建记录数组的方法与创建结构化数组类似，但是需要使用np.recarray而不是np.array。

## 举个栗子

arr2 = np.recarray((3,), dtype=dt)
arr2['name'] = ['John', 'Anna', 'Peter']
arr2['age'] = [28, 32, 37]
print(arr2[0].name)  # b'John'
print(arr2[1].age)   # 32
  
arr2[0].name = 'Jane'
arr2[1].age = 31

