import numpy as np


class BoundingBoxRegressor:
    def __init__(self, learning_rate=0.001, num_epochs=1000):
        self.learning_rate = learning_rate
        self.num_epochs = num_epochs
        self.weights = np.random.rand(4, 784)  # 假设特征维度是784
        self.bias = np.random.rand(4)

    def predict(self, X):
        # X 维度应为 [N, 784]，对应特征向量
        return np.dot(X, self.weights.T) + self.bias

    def compute_loss(self, y_true, y_pred):
        return np.mean(np.square(y_true - y_pred))

    def train(self, X, y):
        for epoch in range(self.num_epochs):
            y_pred = self.predict(X)
            loss = self.compute_loss(y, y_pred)

            # Gradient descent
            gradient = -2 * (y - y_pred) / y.shape[0]
            self.weights -= self.learning_rate * np.dot(gradient.T, X)
            self.bias -= self.learning_rate * np.mean(gradient, axis=0)

            if epoch % 100 == 0:
                print(f'Epoch {epoch}, Loss: {loss}')


'''
# 示例数据
X = np.random.rand(100, 784)  # 假设有100个样本，每个样本特征维度是784
y = np.random.rand(100, 4)     # 对应的真实偏移量

# 创建并训练模型
model = BoundingBoxRegressor()
model.train(X, y)

# 预测
predictions = model.predict(X)
print("Predictions:", predictions)
'''
