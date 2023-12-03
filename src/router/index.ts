import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { TokenService } from 'src/modules/core/services/tokens/token.service';
import routes from './routes';
import { UsersService } from 'src/modules/users/services/users.service';
import { useCookie } from 'src/modules/core/utils/Cookie.utils';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const notRequiredAuthenticationRoutes = ['/auth/signing', '/auth/signup', '/auth', '/auth/signing/', '/auth/signup/', '/auth/'];

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

  Router.beforeEach(async (to, from, next) => {
    const tokenService = new TokenService();
    const usersService = new UsersService();

    const isUserAuthenticated = !!tokenService.token || !!useCookie<string>('jwt').value;
    const isMainOrAuthPath = notRequiredAuthenticationRoutes.includes(to.path) || to.path === '/';

    if (!notRequiredAuthenticationRoutes.includes(to.path) && (!tokenService.token && !useCookie<string>('jwt').value)) {
      next({ name: 'Signing' });
    } else if (isMainOrAuthPath && isUserAuthenticated) {
      let user = usersService.currentUser;
      console.log(user);
      // todo: Обработка более полноценная: если пользователь админ - переброс на админа, если пользователь студент - переброс на студента
      if (!tokenService.token) {
        tokenService.setToken(useCookie<string>('jwt').value || null);
      }

      if (!user) {
        await usersService.loadCurrentUser();
      }

      user = usersService.currentUser;
      console.log(user);

      if (user?.permissions && user?.permissions?.includes('access_admin')) {
        next({ name: 'AdminCourses' });
      } else {
        next({ name: 'Courses' });
      }
    }
    else next();
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
