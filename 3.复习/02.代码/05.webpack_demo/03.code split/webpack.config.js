const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    code split(代码分割)

        多入口文件
            问题:多个入口文件同时依赖于一个模块的代码,打包结果会发现每个入口文件中都具有当前依赖模块的代码
                无形中,增加了项目的体积,网络请求花费的时间以及解析代码所花费的时间都变长,页面渲染变慢

            流程:
                1.在配置对象中添加optimization.splitChunks.chunks="all"即可
                    只要配置这一个选项就可以将多个入口文件共同的依赖包提取出来作为单独的文件存放
                2.在配置对象中添加optimization.splitChunks.minSize=大小数字即可
                    该配置可以将大于填写的大小数字的文件都提取出来作为公共依赖文件

        单入口文件
            单入口文件的代码切割,又称为代码懒加载
            webpack在编译的过程中,如果遇到了import函数,就会将该函数引入的代码,单独切割为一个js文件进行存放
                等到浏览器执行到该import函数的时候,浏览器会发送请求,请求服务器的对应资源,进行使用

        面试题:如何自定义chunk名称
        答案:在引入文件之前书写注释,webpackChunkName:"名称"即可,详情参考main.js
*/

module.exports={
    entry:{
        main:"./src/main.js",
        // home:"./src/home.js",
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
    module:{
        rules:[
            {
                test:/.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:resolve(__dirname,'./public/index.html')
        })
    ],
    mode:"development",
    // optimization: {
    //     minimizer: [new TerserPlugin()],
    // },
    resolve:{
        alias:{
            "@":resolve(__dirname,'./src')
        },
        extensions:[".js",".json",".vue",".less"]
    },
    optimization:{
        splitChunks:{
            chunks:"all",
            minSize:1
        }
    }
}