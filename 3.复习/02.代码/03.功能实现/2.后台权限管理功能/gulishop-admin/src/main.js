import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as API from '@/api';
import CategorySelector from '@/components/CategorySelector';
import HintButton from '@/components/HintButton';
import '@/plugins/vcharts';

Vue.component('CategorySelector',CategorySelector);
Vue.component('HintButton',HintButton);

Vue.prototype.$API = API;
// vm.$API.trademark.getTradeMarkList();
// vm.$API.user.login();

// var obj = {
//   A(){

//   }
// }

Vue.directive('has-permission',{
  inserted(el,{value}){
    // 当前函数,会在标签插入到页面上的时候触发
    // 想让一个标签不显示,我把这个标签从页面上删除

    // value就是当前按钮想要显示,所需要的权限
    // 当前账号拥有的权限,存在了store对象中
    
    const buttons = store.state.user.buttons;
    // const result = buttons.includes(value);
    const result = buttons[value];
    if(!result){
      // 如果没有权限使用该按钮,就要将该按钮删除
      el.parentNode.removeChild(el);
    }
  }
})

import '@/icons' // icon
import '@/permission' // permission control

// 该代码仅为了测试es6语法使用
// import {default as a} from '@/api/product/trademark';
// import * as obj from '@/api/product/trademark';
// import { default as c , a ,b} from '@/api/product/trademark';
// console.log('a',c , a ,b)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
