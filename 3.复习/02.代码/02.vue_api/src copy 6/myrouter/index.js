// import Vue from 'vue';

import Vue from "vue";
import install from './install';

function deepMapRoutes(routes){
    // 由于当前函数会被call强行改变this指向,所以此处的this就是mapRoutes对象
    routes.forEach((routeObj)=>{
        const key = routeObj.path;
        const value = routeObj.component;
        this[key] = value;

        if(routeObj.children&&routeObj.children.length){
            deepMapRoutes.call(this,routeObj.children)
        }
    })
}

class MyRouter{
    constructor(options){
        /*
            此处的this是谁?
                路由器实例对象->$router
        */

        this.options = options;

        this.routes = options.routes;

        /*
            需求:根据当前的路由地址,显示出对应的路由组件
                routes:[
                    {
                        path:"/home",
                        component:Home
                    },
                    {
                        path:"/about",
                        component:About,
                        children:[
                            {
                                path:"/about/xixi",
                                component:Xixi,
                            }
                        ]
                    }
                ]

                path = "/about/xixi"

                数据结构处理成下面的格式:
                {
                    "/home":Home,
                    "/about":About,
                    "/about/xixi":Xixi
                }
        
        
        */

        this.mapRoutes = {};

        deepMapRoutes.call(this.mapRoutes,this.routes);

        // console.log(this.mapRoutes)

        Vue.prototype.$router = this;

        Vue.prototype.$route = Vue.observable({
            path:window.location.pathname
        })
    }

    push(path){
        // console.log('push success',path)

        // 用于控制浏览器历史记录栈的变化
        window.history.pushState({},'',path);

        // 用于控制$route对象的path属性发生变化,从而导致router-view组件渲染出最新的结果
        Vue.prototype.$route.path = path;
    }

    replace(path){
        // console.log('push success',path)

        // 用于控制浏览器历史记录栈的变化
        window.history.replaceState({},'',path);

        // 用于控制$route对象的path属性发生变化,从而导致router-view组件渲染出最新的结果
        Vue.prototype.$route.path = path;
    }
}

MyRouter.install=install;

export default MyRouter