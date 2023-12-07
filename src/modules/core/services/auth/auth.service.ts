import { Service } from 'src/modules/service';
import { authStore } from 'src/modules/core/services/auth/auth.store';
import { UserFullDto, UserShortDto } from 'src/modules/core/types/auth.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum } from 'src/types/base.types';
import { CHANGE_TOKEN_CUSTOM_EVENT } from 'src/types/general.consts';
import { api } from 'boot/axios';
import { TokenService } from 'src/modules/core/services/tokens/token.service';

export class AuthService extends Service {
  private store;

  public constructor() {
    super();
    this.store = authStore();
  }

  // ------------------------------------------------------------------
  // Геттеры
  public get users(): UserShortDto[] | null {
    return this.store.users;
  }

  public get user(): UserFullDto | null {
    return this.store.user;
  }

  public get error(): boolean {
    return this.store.error;
  }

  // ------------------------------------------------------------------
  // API запросы
  public async authUser(email: string, password: string) {
    const tokenService = new TokenService();
    try {
      const response = await api.post<
      { email: string; password: string },
      { data: { token: string } }
      >('/api/login', { email, password });
      this.updateTokenInBrowser(response?.data.token);
      tokenService.setToken(response.data?.token || null);

      window.dispatchEvent(new CustomEvent(CHANGE_TOKEN_CUSTOM_EVENT));
      let isUserLoaded = false;
      if (response.data.token) {
        isUserLoaded = await this.loadUser();
      }


      return isUserLoaded;
    } catch(e: any) {
      if (e.status === 401) {
        // todo: доработать
        console.error('u r unauthorized');
      }

      this.setErrorStatus(true);

      // throw new Error(e);
      console.log('error');
      return false;
    }
  }

  public async logoutUser() {
    try {
      await api.post('/api/logout', {}, {
        headers: { ...this.apiHeaders },
      });
      this.updateTokenInBrowser('');
    } catch(e) {
      console.log(e);
    }
  }

  public async loadUser() {
    console.log('it is load user');
    this.store.SET_USER_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get('/api/user', {
        headers: {
          ...this.apiHeaders,
        },
      });


      this.store.SET_USER_PAYLOAD(response);
      return true;
    } catch(e: any) {
      if (e.status === 401) {
        // todo: доработать
        console.error('u r unathorized');
      }

      // throw new Error(e);
      console.log('error');
      return false;
    }
  }

  // ------------------------------------------------------------------
  // Методы
  public setErrorStatus(status: boolean) {
    this.store.SET_ERROR(status);
  }

  public setRelocatedFrom(url: string | null) {
    this.store.SET_RELOCATED_FROM(url);
  }
}
