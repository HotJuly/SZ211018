const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    tree shaking(树摇)
        问题:每个项目,都会存在很多用不上的代码,例如:使用到一个模块中的部分功能,但是打包的时候,其余没用的代码也会被打包带上
        最终,无形中增加了项目的体积,网络请求花费的时间和解析代码所花费的时间都变长了,导致页面展示速度变慢

        树摇的要求:
            1.模块化语法必须使用ES6模块化语法
            2.已生产环境打包即可
                生产环境自动启用TerserPlugin插件进行树摇操作
*/

module.exports={
    entry:"./src/main.js",
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
    mode:"production",
    // optimization: {
    //     minimizer: [new TerserPlugin()],
    // },
    resolve:{
        alias:{
            "@":resolve(__dirname,'./src')
        },
        extensions:[".js",".json",".vue",".less"]
    }
}