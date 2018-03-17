'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
//抽取css插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

//读取package.json文件中的版本号
const version = JSON.parse(require('fs').readFileSync('./package.json')).version;

//压缩js
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    //指定入口
    entry: {
        main: './src/main.js',
        //第三方入口
        vendor: ["vue", "vue-router", "axios", "vue-preview", "qs", "mint-ui", "moment"],
    },
    output: {
        path: path.join(__dirname, 'dist'),
    },
    module: {
        loaders: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!autoprefixer-loader"
                })

            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }, {
                test: /\.(jpg|ttf|svg|png|gif)$/,
                 loader: 'url-loader' //依赖file-loader
                    ,
                options: {
                    path: 'assets',
                    name: '[chunkhash:6].[ext]'
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                //排除路径
                exclude: /node_modules/,
                //更为推荐的方式是在.bablerc文件中配置以下设置
                // options: {   
                //     presets: ['es2015'],
                //     plugins: ['transform-runtime']
                // }
            },
            //处理.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, { //如果你是webpack-dev-server直接运行是没有问题的，但是你通过webpack命令执行，在生产环境中运行，如果不加上面这句话就有问题
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                // options: {
                //     presets: ['es2015'],
                //     plugins: ['transform-runtime']
                // }
            }
        ]
    },
    plugins: [
         //压缩js
        new UglifyJSPlugin(),
        //分离css
        new ExtractTextPlugin("css/style.[contenthash].css"),
        new htmlWebpackPlugin({
            template: './src/index.html',
        }),
        //分离第三方库
        new webpack.optimize.CommonsChunkPlugin({
            // 曲线救国解决main修改影响vendor重新生成
            // name: 'vendor'
            //manifest 记录到依赖清单
            names: ['vendor', 'manifest']

        })
    ],
    devServer: { //配置webpack-dev-server -> express服务器的选项
        host: '127.0.0.1', //A
        port: 9999,
        proxy: { 
            '/v2/*': { // 如果当前请求的url 是以/v2开头/xxxxxx,则默认请求127.0.1/v2/xxx
                changeOrigin: true, //changeOrigin就把当前本地express服务器由A变为向B请求并返回
                target: 'https://api.douban.com/', //B
            }
        }

    }

}


// console.log(process.argv);
//区分是生产环境运行该文件还是开发环境运行
//开发环境 webpack-dev-server --inline --hot --open || webpack

if (process.argv.length === 5) {
    //开发环境
    module.exports.output.filename = 'js/[name].js'

} else {
    //开发环境
    module.exports.output.filename = 'js/[name].[chunkhash].js'
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }))
}