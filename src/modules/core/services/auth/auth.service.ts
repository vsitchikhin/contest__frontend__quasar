import { Service } from 'src/modules/service';
import { authStore } from 'src/modules/core/services/auth/auth.store';
import { SelectedUserDto, UserFullDto, UserShortDto } from 'src/modules/core/types/auth.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
import { CHANGE_TOKEN_CUSTOM_EVENT } from 'src/types/general.consts';
import { api } from 'boot/axios';
import { readTokenFromCookie } from 'src/modules/core/utils/Token.utils';

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

  public get selectedUser(): SelectedUserDto | null {
    return this.store.selectedUser;
  }

  public get userLoadingStatus(): TLoadingStatus {
    return this.store.userLoadingStatus;
  }

  public get usersLoadingStatus(): TLoadingStatus {
    return this.store.usersLoadingStatus;
  }

  public get error(): boolean {
    return this.store.error;
  }

  public get relocatedFrom() {
    return this.store.relocatedFrom;
  }

  // ------------------------------------------------------------------
  // API запросы
  public async authUser(email: string, password: string) {
    try {
      console.info('base path - ', this.basePath);
      const response = await api.post<
      { email: string; password: string },
      { token: string }
      >('/api/login', { email, password });

      this.updateTokenInBrowser(response.token);
      window.dispatchEvent(new CustomEvent(CHANGE_TOKEN_CUSTOM_EVENT));
      await this.loadUser();
    } catch(e: any) {
      if (e.status === 401) {
        // todo: доработать
        console.error('u r unauthorized');
      }

      this.setErrorStatus(true);

      // throw new Error(e);
      console.log('error');
    }
  }

  public async loadUser() {
    this.store.SET_USER_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get<null, UserFullDto>('/api/user', {
        headers: {
          Authorization: `Bearer ${readTokenFromCookie()}`,
        },
      });


      this.store.SET_USER_PAYLOAD(response);
    } catch(e: any) {
      if (e.status === 401) {
        // todo: доработать
        console.error('u r unathorized');
      }

      // throw new Error(e);
      console.log('error');
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
