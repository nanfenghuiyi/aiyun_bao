import Vue from "vue";
import axios from "axios";
import router from './router';
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入


// 发送请求保存session信息
axios.defaults.withCredentials = false

// 设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.responseType = 'json'

// 简单配置
NProgress.configure({ showSpinner: false }) // 关闭进度环

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log("发送请求之前", config);
  NProgress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
    // console.log("请求错误", error)
    router.push("/error");
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log("响应数据", response)
  NProgress.done()
  return response
}, function (error) {
  // 对响应错误做点什么
    router.push("/error");
  return Promise.reject(error)
});

Vue.prototype.axios = axios