import { createRouter, createWebHistory } from 'vue-router'
import PhoneDirectory from '@/views/PhoneDirectory.vue'

const routes = [
  {
    path: '/',
    name: 'PhoneDirectory',
    component: PhoneDirectory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 