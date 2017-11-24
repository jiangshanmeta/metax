const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname,  dir)
}
console.log(__dirname,"+++++++++++")

console.log(resolve('example'))

const examplePath = resolve('example');
const srcPath = resolve('src');


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
            '@': examplePath,
            'src': srcPath,
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
                include:[srcPath,examplePath]
            },
            {
                test:/\.vue$/,
                loader:"vue-loader",
                include:[examplePath],
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