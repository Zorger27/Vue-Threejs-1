import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import ThreeScene01 from "@/views/menu/Project1View.vue";
import About from "@/views/menu/AboutView.vue";
import PageNotFound from "@/views/service/PageNotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'project1',
    component: ThreeScene01,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: PageNotFound,
  }
];

const {BASE_URL} = process.env;
const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
});

export default router
