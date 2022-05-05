const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
    /*
        面试题:loader和plugin的区别
            其实webpack只认得js和json,如果想要编译其他类型的文件,就必须使用其他的解析库
            例如:less文件编译
                less包可以将less文件编译成css,但是webpack无法直接调用他,
                    所以需要下载less-loader帮助webpack调用less

                plugin一般会提供便利的完整的功能,plugin很少会与编译文件有关

    */
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
    devServer:{
        port:9000,
        proxy:{
            "/v2/api":{
                target:"https://www.baidu.com",
                ws:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    },
    resolve:{
        alias:{
            "@":resolve(__dirname,'./src')
        },
        extensions:[".js",".json",".vue",".less"]
    }
}