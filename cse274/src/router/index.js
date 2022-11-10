import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/CSE274-RealtimeDenoiser-WebPage/cse274-realtime-denoiser',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/CSE274-RealtimeDenoiser-WebPage/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/CSE274-RealtimeDenoiser-WebPage',
    redirect: '/CSE274-RealtimeDenoiser-WebPage/cse274-realtime-denoiser',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
