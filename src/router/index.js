import { createRouter, createWebHistory } from 'vue-router'
import WeatherPage from '../pages/WeatherPage'
const routes = [
  {
    path: '/',
    name: 'home',
    component: WeatherPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
