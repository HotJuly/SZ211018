import Vue from 'vue';
export default {
    name:"RouterView",
    functional:true,
    render(createElement){
        // createElement方法可以创建出虚拟DOM对象
        // 函数式组件中不能使用this

        /*
            需求:根据当前路由路径,找到对应的路由组件,并进行渲染
            拆解:
                1.根据当前路由路径
                    $route对象身上具有path属性

                2.找到对应的路由组件
                    使用$router对象身上的mapRoutes对象配合path属性即可获取到对应的路由组件

                3.进行渲染
        */

        // 1.获取当前路由路径
        const path = Vue.prototype.$route.path;

        // 2.找到对应的路由组件
        const mapRoutes = Vue.prototype.$router.mapRoutes;
        const component = mapRoutes[path];

        return createElement(component);
    }
}