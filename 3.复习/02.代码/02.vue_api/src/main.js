import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

// Vue.filter('textFilter',function(val){
//   // console.log('textFilter')
//   return 'textFilter -- ' + val
// })

/*
  需求:当所有组件挂载结束之后,需要打印当前组件的name属性

*/

// 全局混入可以向所有的组件中注入该配置对象的内容
// Vue.mixin({
//   mounted(){
//     console.log('mixin',this.$options.name)
//   }
// })

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   render: res.render,
//   staticRenderFns: res.staticRenderFns
// }).$mount('#app')

/*
  在Vue中,能够影响到页面显示结果的地方有几个?
    3个
    1.在配置对象中添加render函数
    2.在index.html中可以书写模版代码
    3.在配置对象中添加template属性

    面试题:请问以上三者的优先级?
        render配置>template配置>index.html内部的模版

*/
new Vue({
  name:"Root",
  // el:"#app",
  template:"<h1>{{msg}}</h1>",
  data: {
    msg: 'hello'
  },
  render: h => h(App),
}).$mount('#app')
