# 误差反向传播法
# 也是求梯度的一种方法，这个速度比上一章的用数值微分求梯度更快

# 这个文件，没讲述，5.1计算图，5.2链式法则，5.3反向传播 的内容 5.1 5.2 5.3内容的铺垫很重要，如果有一天，你看不懂下面的内容了，那你就从5.1开始重新看

# 误差反向传播法 - 乘法层实现
class MulLayer:
    def __init__(self):
        self.x = None
        self.y = None
    
    def forward(self,x,y):
        self.x = x
        self.y = y
        out = x * y
        return out
    
    def backward(self,dout):
        dx = dout * self.y #翻转x和y
        dy = dout * self.x
        '''
        # 这里为什么翻转x和y
        如正向传播时，公式是如下式子，z = x * y
        z关于x的偏导数是y，∂z/∂x=y
        z关于y的偏导数是x，∂z/∂y=x
        他只是给你一种感觉翻转了x、y，其实没有翻转，只是z关于x的偏导数是y，z关于y的偏导数是x，
        这样让你错觉以为翻转了

        不懂为啥 z关于x的偏导数是y,z关于y的偏导数是x 的话，看“导数那个文章”“为什么y=x²的导函数为y=2x”，它们也都是经过类似的处理，然后变成了∂z/∂x=y等等
        '''
        return dx,dy

# 使用上面的乘法层，实现买两个苹果和10%消费税的问题
'''
apple = 100 #苹果单价
apple_num = 2 #苹果数量
tax = 1.1 #10%消费税

# layer
mul_apple_layer = MulLayer()#计算两个苹果那个节点100*2 那个节点
mul_tax_layer = MulLayer()#两个苹果的价格 和 消费税 那个节点

# forward 向前处理
apple_price = mul_apple_layer.forward(apple, apple_num)
price = mul_tax_layer.forward(apple_price, tax)

print(price) #220.00000000000003

# backward 向后处理
dprice = 1 #关于最终价格220那个的导数
dapple_price,dtax = mul_tax_layer.backward(dprice)
dapple,dapple_num = mul_apple_layer.backward(dapple_price)

print(dapple,dapple_num,dtax) #2.2 110.00000000000001 200
'''


# 误差反向传播法 - 加法层的实现
class AddLayer:
    def __init__(self):
        pass
    def forward(self,x,y):
        out = x + y
        return out
    def backward(self,dout):
        dx = dout * 1
        dy = dout * 1
        '''
        # 为啥书上说，加法节点的反向传播只是将输入信号输出到下一个节点
        如正向传播时，公式是如下式子，z = x + y
        z关于x的偏导数是1，∂z/∂x=1
        z关于y的偏导数是也是1，∂z/∂y=1
        所以 加法节点的反向传播，不是单纯的，把输入信号，单纯的传递给下一个节点
        只是它本身，的偏导数，都是1，乘1，和不乘1，效果都是一样的，
        所以他给我们一种感觉是，啥都没做就传到下一个节点了，其实他本身有操作，只是操作后的效果，和操作前效果是一样，让咱们以为没有操作
        这都是错觉

        不懂为啥 z关于x的偏导数是1,z关于y的偏导数是也是1 的话，看“导数那个文章”“为什么y=x²的导函数为y=2x”，它们也都是经过类似的处理，然后变成了∂z/∂x=1等等
        '''
        return dx,dy

# 使用上面的乘法层，加法层，实现买，两个苹果，三个橘子和10%消费税，的问题

apple = 100 #苹果单价
apple_num = 2 #苹果数量
orange = 150 #橘子单价
orange_num = 3 #橘子数量
tax = 1.1 #消费税10%

# layer
mul_apple_layer = MulLayer() #两个苹果，那个节点
mul_orange_layer = MulLayer() #三个橘子，那个节点
add_apple_orange_layer = AddLayer() #两个苹果 和 三个橘子 那个节点
mul_tax_layer = MulLayer() #商品总价 和 消费税 那个节点

# forward 向前处理
apple_price = mul_apple_layer.forward(apple,apple_num)
orange_price = mul_orange_layer.forward(orange,orange_num)
all_price = add_apple_orange_layer.forward(apple_price,orange_price)
price = mul_tax_layer.forward(all_price,tax)
print(price)#715.0000000000001

# backward 向后处理
dprice = 1 #关于最终价格 对于 最终价格715自己的，那个的导数
dall_price,dtax = mul_tax_layer.backward(dprice)
dapple_price,dorange_price = add_apple_orange_layer.backward(dall_price)
dorange,dorange_num = mul_orange_layer.backward(dorange_price)
dapple,dapple_num = mul_apple_layer.backward(dapple_price)

print(dapple_num,dapple,dorange,dorange_num,dtax) #110.00000000000001 2.2 3.3000000000000003 165.0 650

