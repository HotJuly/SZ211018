const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
    浏览器网络缓存
        浏览器在第一次请求服务器某个资源的时候,服务器出了返回该资源以外,还会对该资源进行缓存处理
        缓存策略:
            强缓存
                如果某个网页二次请求服务器上的同一个资源,浏览器发现了这个情况,不发送请求,直接复用上一次的资源
                特点:响应头中具有cache-control:max-age=超时时间
                    如果第二次请求该资源的时候,距离第一次请求还没有超过最大超时时间,浏览器就不会发送请求

                状态码:200(请求直接被浏览器拦截了)

                优点:只要时间没到,就一定不会发送请求,可以减少当前项目浪费的网络请求时间
                缺点:由于在规定时间内,不会发送请求,很可能出现客户端与服务器端代码版本不统一的情况

            协商缓存
                如果某个网页二次请求服务器上的同一个资源,浏览器发送请求给服务器,同时携带上上一次请求的etag和last-modified属性
                    服务器会将本地的该文件的etag和last-modified属性,与浏览器发送过来的两个属性进行比较,如果都相同,就返回响应(但是不会返回文件)

                特点:响应头中具有etag(当前文件的hash值)和last-modified(最后修改时间)属性

                状态码:304(请求有发送到服务器,只不过服务器将本次请求重定向到你的内存的文件上)

        缓存的重要依据:请求文件的链接

        如何解决强缓存的缺点?
            通过每次编译项目的时候,对有变化的文件的名字进行修改,可以防止上一次强缓存的生效
            
            三种hash值的含义
                hash值
                    每次项目构建的时候,都会根据当前本轮构建中所有的文件生成一个唯一的hash值

                chunkhash值
                    每次项目构建的时候,根据当前入口文件和他所依赖的所有文件生成的一个唯一的hash值

                contenthash值
                    每次项目构建的时候,根据当前文件的内容生成的唯一hash值
*/

module.exports={
    entry:"./src/main.js",
    output:{
        filename:"[name].[contenthash:8].js",
        path:resolve(__dirname,'./server/build')
    },
    module:{
        rules:[
            {
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:resolve(__dirname,'./public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
        })
    ],
    mode:"development",
    resolve:{
        alias:{
            "@":resolve(__dirname,'./src')
        },
        extensions:[".js",".json",".vue",".less"]
    }
}