const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname,  dir)
}
console.log(__dirname,"+++++++++++")

console.log(resolve('example'))
module.exports = {
    entry:{
        main:"./example/main.js",
    },
    output:{
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('example')
        },
    },
    devServer:{
        contentBase:"./dist"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                include:[resolve('src'),resolve('example')]
            },
            {
                test:/\.vue$/,
                loader:"vue-loader",
                include:[resolve('example')],
            },


        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),

    ],
}