import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const notRequiredAuthenticationRoutes = ['/auth/signing', '/auth/signup'];

// todo: доделать перенаправление со "/" и при отсутствии авторизации
export default route(function ( /* { store, ssrContext } */ ) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: (to, from) => {
      if (to.name === from.name) {
        return;
      }
      if (to.meta?.dasableScrollToTopOnEnter || from.meta?.dasableScrollToTopOnLeave) {
        return;
      }

      return { left: 0, top: 0 };
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    // const tokenService = new TokenService();
    // todo: Обработка более полноценная: если пользователь админ - переброс на админа, если пользователь студент - переброс на студента
    if (to.path === '/') {
      next({ name: 'Courses' });
    }
    // if (!notRequiredAuthenticationRoutes.includes(to.path) && !tokenService.accessToken) next({ name: 'Login' });
    // else if (to.name === 'Login' && tokenService.accessToken) next(from);
    // else next();
  });

  return Router;
});


/*

import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';
import { TokenService } from 'src/modules/core/services/TokenService/token.service';

const notRequiredAuthenticationRoutes = ['/auth/login', '/auth/register', '/auth/remember-password'];





*/
