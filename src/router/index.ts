import { useTokenStoreWithOut } from '@/stores/token';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/token',
      name: 'token',
      component: () => import('@/views/TokenView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'token' && !useTokenStoreWithOut().token) {
    next({ name: 'token' });
  } else {
    next();
  }
});

export default router;
