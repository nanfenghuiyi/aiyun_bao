import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./axios"
import ElementUI from 'element-ui'
import 'lib-flexible'
import 'element-ui/lib/theme-chalk/index.css'
import global_msg from "./utils/main"

import 'normalize.css/normalize.css' // 重置的现代替代方法

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$global_msg = global_msg

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
