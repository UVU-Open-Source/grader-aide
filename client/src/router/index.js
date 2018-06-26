// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import GradeZybooks from '@/views/GradeZybooks'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: GradeZybooks
    },
    {
      path: '/login',
      name: 'auth',
      component: Login
    }
  ]
})
