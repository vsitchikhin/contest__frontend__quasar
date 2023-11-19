import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/student/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Courses',
        component: () => import('pages/student/CoursesPage.vue'),
      },
      {
        path: 'course/:courseId',
        name: 'Course',
        component: () => import('pages/student/TasksPage.vue'),
      },
      {
        path: 'task/:taskId',
        name: 'Task',
        component: () => import('pages/student/TaskPage.vue'),
      },
      {
        path: 'task/:taskId/edit',
        name: 'TaskEditor',
        component: () => import('pages/student/EditorPage.vue'),
      },
    ],
  },

  {
    path: '/admin/',
    component: () => import('layouts/MainLayout.vue'),
    children: [],
  },

  {
    path: '/auth/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'signing',
        name: 'Signing',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('pages/auth/RegisterPage.vue'),
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
