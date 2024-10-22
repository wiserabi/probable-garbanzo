// Composables
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'DashBoard',
        component: () => import('@/pages/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'caselist',
        name: 'CaseList',
        component: () => import('@/pages/CaseList.vue'),
      },
      {
        path: 'salesstatus',
        name: 'Sales Status',
        component: () => import('@/pages/SalesStatus.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layouts/auth/Auth.vue'),
    children: [
      {
        path: 'signin',
        name: 'Sign In',
        component: () => import('@/pages/auth/SignIn.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
});

export default router;
