import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { CloudServerOutlined, DatabaseOutlined } from '@vicons/antd'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页面',
      inMenu: false
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/dashboard',
    name: '控制面板',
    meta: {
      title: '控制面板',
      icon: DatabaseOutlined
    },
    component: () => import('@/components/Dashboard.vue'),
    children: [
      {
        path: '',
        name: '主页',
        component: () => import('@/views/MainPage.vue')
      }
    ]
  },
  {
    path: '/dataView',
    name: '数据展示',
    component: () => import('@/components/Dashboard.vue'),
    meta: {
      icon: CloudServerOutlined
    },
    children: [
      {
        path: '',
        name: '数据表格',
        component: () => import('@/views/DataView.vue'),
        children: [
          {
            path: 'test',
            name: 'test1',
            component: () => import('@/views/NotFound.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/settings',
    name: '设置',
    component: () => import('@/components/Dashboard.vue'),
    children: [
      {
        path: '',
        name: '分布表单',
        component: () => import('@/views/StepperForm.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '未找到页面',
      inMenu: false
    },
    component: () => import('@/views/NotFound.vue')
  }
]

// for (let i = 0; i < 20; ++i) {
//   routes.splice(routes.length - 1, 0, {
//     path: '/test' + i,
//     name: '设置' + i,
//     component: () => import('@/components/Dashboard.vue'),
//     meta: {
//       icon: CloudServerOutlined,
//     },
//     children: [],
//   } as RouteRecordRaw)
// }
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  window.loading.start()
  if (to.path === '/') {
    router.push('/login')
  }
  document.title = to.meta.title ?? import.meta.env.VITE_APP_TITLE
})

router.afterEach((to, from) => {
  setTimeout(() => {
    window.loading.finish()
  }, 2000)
})
export default router
