import { useAuthStore } from '@/stores/AuthStore';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../pages/landing.vue') },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        }, 
        {
          path: 'bulk-sms',
          component: () => import('../pages/bulk-sms.vue'),
        },
        {
          path: 'sender-id',
          component: () => import('../pages/sender-id.vue'),
        },
        {
          path: 'add-client',
          component: () => import('../pages/add-client.vue'),
        },
        {
          path: 'contacts',
          component: () => import('../pages/contacts.vue'),
        },
        {
          path: 'my-account',
          component: () => import('../pages/my-account.vue'),
        },
        {
          path: 'billing',
          component: () => import('../pages/billing.vue'),
        },
        {
          path: 'sms-plans',
          component: () => import('../pages/sms-plans.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'forgot-password',
          component: () => import('../pages/forgot-password.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})


router.beforeEach((to) => {

  //redirect to login page if not logged in or invalid route/url
  const publicPages = ['/', '/login', '/register', '/forgot-password'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if(authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }

});

export default router
