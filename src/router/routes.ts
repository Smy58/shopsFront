import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/shops.vue') }],
  },
  {
    path: '/shop',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/shop.vue') }],
  },
  {
    path: '/product',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/product.vue') }],
  },
  {
    path: '/busket',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/busket.vue') }],
  },
  {
    path: '/orders',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/orders.vue') }],
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/account.vue') }],
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('pages/login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('pages/signup.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
