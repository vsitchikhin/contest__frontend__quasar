import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
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
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminCourses',
        component: () => import('pages/admin/CoursesPage.vue'),
      },
      {
        path: 'course/:courseId',
        name: 'AdminCourse',
        component: () => import('pages/admin/CoursePage.vue'),
      },
      {
        path: 'course/:courseId/entities',
        name: 'EntityList',
        component: () => import('pages/admin/EntityList.vue'),
      },
      {
        path: 'course/:courseId/entity/add',
        name: 'AddEntity',
        component: () => import('pages/admin/AddEntity.vue'),
      },
      {
        path: 'course/:courseId/:entityId/allocate-tasks',
        name: 'AllocateTasks',
        component: () => import('pages/admin/AllocateTasks.vue'),
      },
      {
        path: 'course/:courseId/:entityId/tasks',
        name: 'EntityTasks',
        component: () => import('pages/admin/EntityTaskList.vue'),
      },
      {
        path: 'task/:courseId/create',
        name: 'CreateTask',
        component: () => import('pages/admin/CreateTask.vue'),
      },
      {
        path: 'group/create',
        name: 'CreateGroup',
        component: () => import('pages/admin/CreateGroup.vue'),
      },
      {
        path: 'course/create',
        name: 'CreateCourse',
        component: () => import('pages/admin/CreateCourse.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('pages/admin/UsersPage.vue'),
      },
    ],
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
