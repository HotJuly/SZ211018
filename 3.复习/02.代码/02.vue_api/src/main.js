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
Vue.mixin({
  mounted(){
    console.log('mixin',this.$options.name)
  }
})

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   render: res.render,
//   staticRenderFns: res.staticRenderFns
// }).$mount('#app')

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
