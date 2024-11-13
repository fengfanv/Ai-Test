const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',  // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'numpy-bundle.js',   // 打包后输出的文件名
    library: 'numpy', // 这里是你包的全局访问名
    libraryTarget: 'umd',  // 使其支持多种模块格式（CommonJS, AMD, global变量等）
  },
  target: 'web',  // 告诉Webpack编译为浏览器兼容的代码
  externals: [nodeExternals()],  // 如果你使用了Node特有的模块（如fs），则可以排除
  mode: 'development',  // 设置为开发模式，可以避免压缩
  optimization: {
    minimize: false,  // 禁用压缩
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // 转译到兼容浏览器的代码
          },
        },
      },
    ],
  },
};

/*
┌─ src
│   ├─ index.js 代码包入口文件
│   ├─ 等等其它代码包文件
│   └─ 等等其它代码包文件
│
└─ webpack.config.js webpack配置文件
*/

//安装打包依赖
//npm install --save-dev webpack webpack-cli webpack-node-externals babel-loader @babel/preset-env

//打包成浏览器单文件CDN包
//npx webpack --config webpack.config.js


