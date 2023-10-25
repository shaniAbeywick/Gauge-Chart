import { createRouter, createWebHistory } from 'vue-router'
import master from '../pages/master.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'master',
      component: master
    }
    
  ]
})

export default router
