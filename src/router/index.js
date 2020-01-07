import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },

  /**
   * Protocol
   */

  {
    path: '/busTicketProtocol',
    name: 'busTicketProtocol',
    component: () => import('../views/Protocol/busTicketProtocol.vue'),
    meta: {
      title: '大巴车购/售票协议'
    }
  },
  {
    path: '/passBusSpecification',
    name: 'passBusSpecification',
    component: () => import('../views/Protocol/passBusSpecification.vue'),
    meta: {
      title: '用户服务协议'
    }
  },
  {
    path: '/privacy_ayb',
    name: 'privacy_ayb',
    component: () => import('../views/Protocol/privacy_ayb.vue'),
    meta: {
      title: '隐私政策'
    }
  },
  {
    path: '/securityRules',
    name: 'securityRules',
    component: () => import('../views/Protocol/securityRules.vue'),
    meta: {
      title: '用户服务协议'
    }
  },
  {
    path: '/userServiceProtocol',
    name: 'userServiceProtocol',
    component: () => import('../views/Protocol/userServiceProtocol.vue'),
    meta: {
      title: '用户服务协议'
    }
  },

  /**
   * Authen
   */
  {
    path: '/quickAuthen',
    name: 'quickAuthen',
    component: () => import('../views/Authen/quickAuthen.vue'),
    meta: {
      title: '快速代注册认证'
    }
  },
  {
    path: '/quickUploadChannel',
    name: 'quickUploadChannel',
    component: () => import('../views/Authen/quickUploadChannel.vue'),
    meta: {
      title: '快速上传通道'
    }
  },
  {
    path: '/cardAuthen',
    name: 'cardAuthen',
    component: () => import('../views/Authen/cardAuthen.vue'),
    meta: {
      title: '大巴车随车名片快速注册'
    }
  },
  {
    path: '/busManagerAuthen',
    name: 'busManagerAuthen',
    component: () => import('../views/Authen/busManagerAuthen.vue'),
    meta: {
      title: '大巴车承包者认证'
    }
  },
  {
    path: '/busEmployeesCheckExist',
    name: 'busEmployeesCheckExist',
    component: () => import('../views/Authen/busEmployeesCheckExist.vue'),
    meta: {
      title: '手机号'
    }
  },
  {
    path: '/busEmployeesAuthen',
    name: 'busEmployeesAuthen',
    component: () => import('../views/Authen/busEmployeesAuthen.vue'),
    meta: {
      title: '大巴车司机雇员认证'
    }
  },
  {
    path: '/busAuthen',
    name: 'busAuthen',
    component: () => import('../views/Authen/busAuthen.vue'),
    meta: {
      title: '大巴车注册'
    }
  },
  // 实名认证
  {
    path: '/realNameAuthen',
    name: 'realNameAuthen',
    component: () => import('../views/Authen/realNameAuthen.vue'),
    meta: {
      title: '实名认证'
    }
  },
  // 快车/出租车
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Authen/index.vue'),
    meta: {
      title: '车主认证身份'
    }
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('../views/Utils/city.vue'),
    meta: {
      title: '城市'
    }
  },
  {
    path: '/car',
    name: 'car',
    component: () => import('../views/Utils/car.vue'),
    meta: {
      title: '汽车'
    }
  },
  {
    path: '/taxiAuthen',
    name: 'taxiAuthen',
    component: () => import('../views/Authen/taxiAuthen.vue'),
    meta: {
      title: '出租车认证'
    }
  },
  {
    path: '/expressAuthen',
    name: 'expressAuthen',
    component: () => import('../views/Authen/expressAuthen.vue'),
    meta: {
      title: '快车/顺风车认证'
    }
  },
  // 钱包
  {
    path: '/wealthDetail',
    name: 'wealthDetail',
    component: () => import('../views/Wealth/wealthDetail.vue'),
    meta: {
      title: '详情'
    }
  },
  // 支付
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/Pay/pay.vue'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/payResult',
    name: 'payResult',
    component: () => import('../views/Pay/payResult.vue'),
    meta: {
      title: '支付结果'
    }
  },
  {
    path: '/priceDetail', // 未测试
    name: 'priceDetail',
    component: () => import('../views/Pay/priceDetail.vue'),
    meta: {
      title: '拼车预估价格明细'
    }
  },
  {
    path: '/pricingRules', // 未测试
    name: 'pricingRules',
    component: () => import('../views/Pay/pricingRules.vue'),
    meta: {
      title: '计价规则'
    }
  },
  // 消息
  {
    path: '/busRepeatDetail', // 未完成
    name: 'busRepeatDetail',
    component: () => import('../views/News/busRepeatDetail.vue'),
    meta: {
      title: '详情'
    }
  },
  // 推荐与分享
  {
    path: '/cardGuide', // 
    name: 'cardGuide',
    component: () => import('../views/Share/cardGuide.vue'),
    meta: {
      title: '专属名片'
    }
  },
  {
    path: '/rulesAndroid', // 
    name: 'rulesAndroid',
    component: () => import('../views/Share/rulesAndroid.vue'),
    meta: {
      title: '共享收益规则'
    }
  },
  {
    path: '/rulesIos', // 
    name: 'rulesIos',
    component: () => import('../views/Share/rulesIos.vue'),
    meta: {
      title: '共享业务收入规则'
    }
  },
  {
    path: '/share', // 
    name: 'share',
    component: () => import('../views/Share/share.vue'),
    meta: {
      title: '推荐与分享'
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
