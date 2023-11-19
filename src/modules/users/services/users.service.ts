import { Service } from 'src/modules/service';
import { usersStore } from 'src/modules/users/services/users.store';
import { UserFullDto } from 'src/modules/users/types/users.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
import { api } from 'boot/axios';

export class UsersService extends Service {
  private store;

  public constructor() {
    super();
    this.store = usersStore();
  }

  // ------------------------------------------------------------
  // Геттеры данных
  public get currentUser(): UserFullDto | null {
    return this.store.currentUser;
  }

  public get currentUserLoadingStatus(): TLoadingStatus {
    return this.store.currentUserLoadingStatus;
  }

  // ------------------------------------------------------------
  // Методы обновления стора
  public async loadCurrentUser(): Promise<void> {
    try {
      this.store.SET_CURRENT_USER_LOADING_STATUS({
        code: LoadingStatusCodesEnum.notLoaded,
        action: LoadingStatusActionsEnum.loading,
      });

      const response = await api.get('/api/user', {
        headers: {
          ...this.apiHeaders,
        },
      });

      this.store.SET_CURRENT_USER(response.data);
      this.store.SET_CURRENT_USER_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });
    } catch (e: any) {
      this.store.SET_CURRENT_USER_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.status,
        msg: e.errorMessage,
      });
      console.log(e);
      return Promise.reject();
    }
  }
}
