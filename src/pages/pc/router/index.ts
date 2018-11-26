import Vue from 'vue'
import store from '@/store/'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Meta)
Vue.use(Router)

import routerConfig from './routerConfig'

const routerMap: any[] = []

const recursiveRouterConfig = (config: any[] = []) => {
  config.forEach((item: any) => {
    const route = {
      path: item.path,
      component: item.layout,
      children: [
        {
          path: '',
          name: item.name,
          meta: item.meta,
          component: item.component
        }
      ]
    }

    if (Array.isArray(item.children)) {
      recursiveRouterConfig(item.children)
    }
    routerMap.push(route)
  })

  return routerMap
}

const routes = recursiveRouterConfig(routerConfig)

const myRouter = new Router({
  mode: 'history', // require service support
  routes: routes
})

// myRouter.beforeEach((to, from, next) => {
//   store.commit('unLoading')
//   if (to.meta.noAuth || store.getters.checkToken) {
//     next()
//   } else {
//     next({
//       name: 'Home',
//       params: { redirect: to.fullPath }
//     })
//   }
// })
export default myRouter

// 无需授权 --> next()
// 需要授权 --> 先检测用户权限 --> 在检测是否管理员菜单 --> 是管理员并授权 || 非管理员 -->  next()
