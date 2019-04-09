const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/index.js',  // 使用webpack打包哪个文件
  output: {
    filename: 'bundle.js', // 输出的文件名称
    path: path.resolve(__dirname, 'dist')  //指定输出到哪个目录去
  },
  devServer: {
    open: true,
    // contentBase: 'dist', // 没装html-webpack-plugin时，加上这条语句，会直接打开dist下的index.html页面
    port: 3000,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({ //创建一个在内存中生产html页面的插件
      template: path.join(__dirname, './dist/index.html'),
      filename: 'index.html' //设置生产的内存页面的名称
    })
  ],
  module: {
      rules: [
        {
          test: /\.css$/,
          use: [  //loader的处理顺序是从后向前的
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,  // 默认情况下，loader处理不了url地址，不管是字体库还是图片
          use: [
          //limit给定的值是图片的大小，单位是字节，如果图片的原大小大于或等于limit的值，则不会被转换为base64格式的字符串
          //如果小于给定的limit的值，则会被转为base64的字符串
          // name后面的参数表示命名为图片的原名，如果不用这个命令，就会有一个hash的名字
            // 'file-loader?limit=name=[name].[ext]'  ,
          //hash总共32位，用hash：8表示只截取32位前8位
            'url-loader?limit=17298&name=[hash:8]-[name].[ext]'
          ]
        },
        {
          test:/\.(ttf|eot|svg|woff|woff2)$/,
          use: 'url-loader'
        },
        {
          test:/\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ]
  }
  // resolve: {
  //   alias: {
  //     "vue$": "vue/dist/vue.js"
  //   }
  // }

}
