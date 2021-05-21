import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {

      layout: true,
      head: true,
      headReturn: false,
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login'),
    meta: {
      layout: false,
      head: true,
      headReturn: true,
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/register'),
    meta: {
      layout: false,
      head: true,
      headReturn: true,
      title: '注册'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/category/index'),
    meta: {
      keepAlive: false,
      layout: true,
      head: true,
      headReturn: true,
      title: '分类',
      deepth: 2
    }
  },
  {
    path: '/categoryList',
    name: 'categoryList',
    component: () => import('../views/category/categoryList'),
    meta: {
      keepAlive: true,
      layout: true,
      head: true,
      headReturn: true,
      title: '商品列表',
      deepth: 3
    }
  }, {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/index'),
    meta: {
      keepAlive: false,
      headReturn: true,
      layout: false,
      head: true,
      requireAuth: true,
      title: '购物车'
    }
  }, {
    path: '/message',
    name: 'message',
    component: () => import('../views/message/index'),
    meta: {
      keepAlive: false,
      headReturn: true,
      layout: false,
      head: true,
      requireAuth: true,
      title: '留言'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/index'),
    meta: {
      keepAlive: false,
      layout: true,
      head: true,
      headReturn: true,
      title: '我的'
    }
  },
  {
    path: '/goods/detail',
    name: 'detail',
    component: () => import('../views/goods/detail.vue'),
    meta: {
      keepAlive: false,
      layout: false,
      head: true,
      headReturn: true,
      title: '商品详情',
      deepth: 4
    }
  },
  {
    path: '/order/createOrder',
    name: 'createOrder',
    component: () => import('../views/order/createOrder'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      layout: false,
      head: true,
      headReturn: true,
      title: '创建订单'
    }
  },
  {
    path: '/order/editAddress',
    name: 'editAddress',
    component: () => import('../views/order/editAddress'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      layout: false,
      head: true,
      headReturn: true,
      title: '编辑地址'
    }
  },
  {
    path: '/order/orderList',
    name: 'orderList',
    component: () => import('../views/order/orderList'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      layout: false,
      head: true,
      headReturn: true,
      title: '订单列表'
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth !== true) {
    next()
  } else {
    const token = Cookies.get('Token')
    if (token === 'null' || token === '' || token === undefined) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
