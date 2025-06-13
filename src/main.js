import Vue from 'vue'

import 'reset-css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Message } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VueCaptcha from 'vue-captcha'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCaptcha)
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
