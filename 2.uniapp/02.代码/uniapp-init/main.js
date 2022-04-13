import App from './App'
import myAxios from 'utils/myAxios.js';
import Vue from 'vue'
Vue.config.productionTip = false

// 由于小程序中,App,Page,Component三者区分的非常清楚,而uniapp中这三者都是vue组件
// 所以才多了这一行声明,声明当前App组件代表整个小程序
App.mpType = 'app'

Vue.prototype.$myAxios = myAxios;

const app = new Vue({
    ...App

	// onLaunch: function() {
	// 	console.log('App Launch')
	// },
	// onShow: function() {
	// 	console.log('App Show')
	// },
	// onHide: function() {
	// 	console.log('App Hide')
	// }
})
app.$mount()
