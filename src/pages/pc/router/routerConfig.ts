import { concat } from 'ramda'

const Home = () => import('@/pages/pc/components/Home.vue')
const Dev = () => import('@/pages/pc/components/admin/Dev.vue')

const routerNeedAuth: any[] = []

const routerStatic: any[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      noAuth: true
    },
    layout: Home,
    component: Home
  },
  {
    path: '/dev',
    name: '用户马甲',
    layout: Home,
    component: Dev
  },
  {
    path: '*',
    layout: Home,
    component: Home
  }
]
const routerConfig = concat(routerNeedAuth, routerStatic)

export default routerConfig
