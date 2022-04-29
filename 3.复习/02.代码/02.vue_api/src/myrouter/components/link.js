import Vue from 'vue';
export default {
    name:"RouterLink",
    functional:true,
    props:{
        tag:{
            type:String,
            default:'a'
        },
        to:{
            type:String,
            require:true
        }
    },
    render(createElement,{data,children,props}){
        // createElement方法可以创建出虚拟DOM对象
        // context中会存储与当前组件相关的数据
        // 函数式组件中不能使用this

        /*
            需求:渲染出一个a标签,并且禁用该a标签的默认行为,但是又要实现路由跳转功能
            拆解:
                1.渲染出一个a标签

                2.禁用该a标签的默认行为

                3.实现路由跳转功能
        */

        data.on={
            click:function(event){
                event.preventDefault();
                Vue.prototype.$router.push(props.to);
            }
        }

        data.attrs.href=props.to;


        return createElement(props.tag,data,children);
    }
}