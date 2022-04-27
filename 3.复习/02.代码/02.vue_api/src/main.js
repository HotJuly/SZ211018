import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ShowBigImg from './components/ShowBigImg.vue';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue();

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')

const div = document.createElement('div');
div.id="wrap";
document.body.appendChild(div);

const Com = Vue.extend(ShowBigImg);
new Com().$mount('#wrap');

