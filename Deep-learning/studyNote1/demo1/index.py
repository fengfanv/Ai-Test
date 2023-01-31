#   python --version    查看python版本

#   python              启动python解析器
#   win环境下，先按Ctrl+Z，然后再按Enter键，退出 命令行工具正在运行的python解析器

#   python xxx.py       运行python文件

print(1+2)
print(1-2)
print(1*2)
print(1/2)
print(4**2)             #求4的2次方

print(type(10))         #查看数据类型   <class 'int'>
print(type(2.178))      #<class 'float'>
print(type('Hello kang!'))#<class 'str'>

#python是“动态类型语言”与js很像

x = 10                  #变量初始化
print(type(x))          #<class 'int'>
y = 3.14                
print(type(y))          #<class 'float'>
x = x*y
print(type(x))          #x的数据类型 从 <class 'int'> 变化 <class 'float'>

a = [1,2,3,4,5,6]       #列表类型
print(a)                #[1, 2, 3, 4, 5, 6]
print(type(a))          #<class 'list'>
print(len(a))           #获取列表的长度 6
print(a[0],a[1])        #访问列表元素的值 1 2
a[1] = 18               #修改列表的值
print(a)                #[1, 18, 3, 4, 5, 6]
print(a[1:3])           #获取索引（下标）从1到3的元素值（不包含下标3），[18, 3]
print(a[1:])            #获取索引（下标）从1开始到列表尾部的所有元素值，[18, 3, 4, 5, 6]
print(a[:3])            #获取从列表开始到下标3的元素值（不包含下标3），[1, 18, 3]
print(a[:-1])           #获取从第一个元素开始到倒数第一个元素结束的元素值，[1, 18, 3, 4, 5]
print(a[:-2])           #获取从第一个元素开始到倒数第一二元素结束的元素值，[1, 18, 3, 4]

me = {'height':180}     #字典类型
print(type(me))         #<class 'dict'>
print(me['height'])     #180
me['age'] = 18
print(me)               #{'height': 180, 'age': 18}

hungry = True           #布尔，python内布尔值是大写开头，不像js里那样，是小写开头
print(type(hungry))     #<class 'bool'>
print(not True)         #针对布尔类型的运算符有and，or，not，针对数值运算的运算符有，+,-,*,/等
print(True and False)   #False

#if语句
if True:
    print('这是True')
    print('啦啦啦True')
else:
    print('这是False')
    print('啦啦啦False')

#for语句
for i in [1,2,3]:
    print(i)

#函数
def hello(name):
    print('你好，',name,'!')

hello('Kang')






