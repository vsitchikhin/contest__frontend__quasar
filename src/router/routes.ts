import { RouteRecordRaw } from 'vue-router';
import TasksPage from 'pages/student/TasksPage.vue';
import CoursesPage from 'pages/student/CoursesPage.vue';
import TaskPage from 'pages/student/TaskPage.vue';
import EditorPage from 'pages/student/EditorPage.vue';
import MainLayout from 'layouts/MainLayout.vue';
import AdminLayout from 'layouts/AdminLayout.vue';
import AdminCourses from 'pages/admin/CoursesPage.vue';
import AdminCourse from 'pages/admin/CoursePage.vue';
import EntityList from 'pages/admin/EntityList.vue';
import AddEntity from 'pages/admin/AddEntity.vue';
import AllocateTasks from 'pages/admin/AllocateTasks.vue';
import EntityTaskList from 'pages/admin/EntityTaskList.vue';
import CreateTask from 'pages/admin/CreateTask.vue';
import CreateGroup from 'pages/admin/CreateGroup.vue';
import CreateCourse from 'pages/admin/CreateCourse.vue';
import UsersPage from 'pages/admin/UsersPage.vue';
import AuthLayout from 'layouts/AuthLayout.vue';
import LoginPage from 'pages/auth/LoginPage.vue';
import RegisterPage from 'pages/auth/RegisterPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/student/',
    component: () => MainLayout,
    children: [
      {
        path: '',
        name: 'Courses',
        component: () => CoursesPage,
      },
      {
        path: 'course/:courseId',
        name: 'Course',
        component: () => TasksPage,
      },
      {
        path: 'task/:taskId',
        name: 'Task',
        component: () => TaskPage,
      },
      {
        path: 'task/:taskId/edit',
        name: 'TaskEditor',
        component: () => EditorPage,
      },
    ],
  },

  {
    path: '/admin/',
    component: () => AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminCourses',
        component: () => AdminCourses,
      },
      {
        path: 'course/:courseId',
        name: 'AdminCourse',
        component: () => AdminCourse,
      },
      {
        path: 'course/:courseId/entities',
        name: 'EntityList',
        component: () => EntityList,
      },
      {
        path: 'course/:courseId/entity/add',
        name: 'AddEntity',
        component: () => AddEntity,
      },
      {
        path: 'course/:courseId/:entityId/allocate-tasks',
        name: 'AllocateTasks',
        component: () => AllocateTasks,
      },
      {
        path: 'course/:courseId/:entityId/tasks',
        name: 'EntityTasks',
        component: () => EntityTaskList,
      },
      {
        path: 'task/:courseId/create',
        name: 'CreateTask',
        component: () => CreateTask,
      },
      {
        path: 'group/create',
        name: 'CreateGroup',
        component: () => CreateGroup,
      },
      {
        path: 'course/create',
        name: 'CreateCourse',
        component: () => CreateCourse,
      },
      {
        path: 'users',
        name: 'Users',
        component: () => UsersPage,
      },
    ],
  },

  {
    path: '/auth/',
    component: () => AuthLayout,
    children: [
      {
        path: 'signing',
        name: 'Signing',
        component: () => LoginPage,
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => RegisterPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
