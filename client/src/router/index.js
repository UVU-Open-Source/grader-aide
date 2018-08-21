// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import GradeZybooks from '@/views/GradeZybooks'
import Login from '@/views/Login'
import CourseList from '@/views/CourseList'
import EditCourse from '@/views/EditCourse'
import RegisterCourse from '@/views/RegisterCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: GradeZybooks
    },
    {
      path: '/courses',
      name: 'courses',
      component: CourseList
    },
    {
      path: '/courses/:courseId/edit',
      name: 'edit-course',
      component: EditCourse
    },
    {
      path: '/courses/:courseId/register',
      name: 'register-course',
      component: RegisterCourse
    },
    {
      path: '/login',
      name: 'auth',
      component: Login
    }
  ]
})
