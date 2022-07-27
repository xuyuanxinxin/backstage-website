import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录页面',
      },
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: '控制面板',
      },
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/DataView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.path === '/') {
    router.push('/login')
  }
  document.title = to.meta.title ?? import.meta.env.VITE_APP_TITLE
})
export default router
