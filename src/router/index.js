import Vue from 'vue'
import VueRouter from 'vue-router'

import LayoutIndex from '@/views/layout/index.vue'
import CategoryIndex from '@/views/layout/category.vue'
import CartIndex from '@/views/layout/cart.vue'
import HomeIndex from '@/views/layout/home.vue'
import UserIndex from '@/views/layout/user.vue'

import store from '@/store'

const LoginIndex = () => import('@/views/login/index.vue')
const SearchIndex = () => import('@/views/search/index.vue')
const SearchListIndex = () => import('@/views/search/list.vue')
const ProductDetailIndex = () => import('@/views/prodetail/index.vue')
const PayIndex = () => import('@/views/pay/index.vue')
const MyOrderIndex = () => import('@/views/myorder/index.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: LoginIndex
    },
    {
      path: '/',
      component: LayoutIndex,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: HomeIndex
        },
        {
          path: '/category',
          component: CategoryIndex
        },
        {
          path: '/cart',
          component: CartIndex
        },
        {
          path: '/user',
          component: UserIndex
        }
      ]
    },
    {
      path: '/search',
      component: SearchIndex
    },
    {
      path: '/searchlist',
      component: SearchListIndex
    },
    {
      path: '/prodetail/:id',
      component: ProductDetailIndex
    },
    {
      path: '/pay',
      component: PayIndex
    },
    {
      path: '/myorder',
      component: MyOrderIndex
    }
  ]
})
// 全局路由守卫
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log('路由守卫执行', to.path)
  // console.log('需要认证的路径', authUrls)
  // console.log('当前token', store.getters.token)

  if (!authUrls.includes(to.path)) {
    // console.log('路径不需要认证，直接通过')
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    // console.log('有token，直接通过')
    next()
    return
  }
  // console.log('没有token，跳转到登录页')
  next('/login')
})

export default router
