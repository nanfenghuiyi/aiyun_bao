import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./axios"
// import ElementUI from 'element-ui'
import element from './utils/element'
import 'lib-flexible'
import 'element-ui/lib/theme-chalk/index.css'
import global_msg from "./utils/main"

import 'normalize.css/normalize.css' // 重置的现代替代方法

import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入

// Vue.use(ElementUI)
Vue.use(element)

Vue.config.productionTip = false
Vue.prototype.$global_msg = global_msg

// 简单配置
NProgress.configure({showSpinner: false }) // 关闭进度环

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
