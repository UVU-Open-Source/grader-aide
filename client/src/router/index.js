// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import GradeZybooks from '@/views/GradeZybooks'
import Login from '@/views/Login'
import CourseList from '@/views/CourseList'
import EditCourse from '@/views/EditCourse'

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
      path: '/login',
      name: 'auth',
      component: Login
    }
  ]
})
