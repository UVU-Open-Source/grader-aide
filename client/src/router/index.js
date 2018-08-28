// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import HelloWorld from '@/components/HelloWorld'
import GradeAssignments from '@/views/GradeAssignments'
import UnregisteredCourseList from '@/views/UnregisteredCourseList'
import RegisteredCourseList from '@/views/RegisteredCourseList'
import RegisterCourse from '@/views/RegisterCourse'

import gaurds from './gaurds'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld,
      beforeEnter: gaurds.isAuthenticated
    },
    {
      path: '/courses/unregistered',
      name: 'unregistered-courses',
      component: UnregisteredCourseList,
      beforeEnter: gaurds.isAuthenticated
    },
    {
      path: '/courses/registered',
      name: 'registered-courses',
      component: RegisteredCourseList,
      beforeEnter: gaurds.isAuthenticated
    },
    {
      path: '/courses/:canvasCourseId/register',
      name: 'register-course',
      component: RegisterCourse,
      beforeEnter: gaurds.isAuthenticated
    },
    {
      path: '/courses/:canvasCourseId/grade',
      name: 'grade-assignment',
      component: GradeAssignments,
      beforeEnter: gaurds.isAuthenticated
    },
    {
      path: '/login',
      name: 'auth',
      component: Login,
      beforeEnter: gaurds.needsAuthentication
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
