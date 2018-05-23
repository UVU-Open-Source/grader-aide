// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GradeZybooks from '@/views/GradeZybooks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: GradeZybooks
    }
  ]
})
