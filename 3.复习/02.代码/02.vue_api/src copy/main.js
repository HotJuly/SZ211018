import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.devtools = true

/*
  需求:假设现在每个组件的配置对象中都具有一个a属性,需要将所有组件的a属性加1
    不可能对每个组件都去进行单独的修改,需要一个统一的方法进行统一处理
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // 通过该方法可以获取到所有组件同名的属性值
//   console.log(parent, child, vm)
//   return child + 1
// }

/*
  需求:请问如何捕获到项目中出现的错误?
    1.try{..}catch(e){}
    2.Promise的catch方法

  需求:请问你是如何在项目上线之后,捕获到项目中出现的错误的?
  拆解需求:
    1.如何捕获到出现的报错
      使用try,catch
      promise的catch
      Vue.config.errorHandler(可以捕获到项目中出现的所有报错)
      生命周期errorCaptured

    2.如何将错误发送到公司服务器上
      使用ajax将错误相关信息,发送到服务器即可

    扩展:
      如果是js项目,没有使用框架,可以使用window.onerror=function(){}
*/

Vue.config.errorHandler=function(err, vm, info){
  console.log(err, vm, info)
}

new Vue({
  render: h => h(App),
}).$mount('#app')
