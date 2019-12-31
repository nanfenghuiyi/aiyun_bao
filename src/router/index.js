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
]

const router = new VueRouter({
  routes
})

export default router
