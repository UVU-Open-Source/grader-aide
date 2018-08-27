// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'
import GradeZybooks from '@/views/GradeZybooks'
import Login from '@/views/Login'
import UnregisteredCourseList from '@/views/UnregisteredCourseList'
import RegisteredCourseList from '@/views/RegisteredCourseList'
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
      path: '/courses/unregistered',
      name: 'unregistered-courses',
      component: UnregisteredCourseList
    },
    {
      path: '/courses/registered',
      name: 'registered-courses',
      component: RegisteredCourseList
    },
    {
      path: '/courses/:courseId/edit',
      name: 'edit-course',
      component: EditCourse
    },
    {
      path: '/courses/:canvasCourseId/register',
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
