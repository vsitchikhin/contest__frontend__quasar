import { Service } from 'src/modules/service';
import { usersStore } from 'src/modules/users/services/users.store';
import { UserFullDto } from 'src/modules/users/types/users.types';
// import { CrmUserApi, UserDataResponse, UserDto } from 'src/openapi';
// import { ApiService } from 'src/api/ApiService';

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

  // ------------------------------------------------------------
  // Методы обновления стора
  public async loadCurrentUser(): Promise<void> {
    try {
      // const response: UserDataResponse = await this.userApi.getUserData();
      // if (response && !response.failure) {
      //   this.store.SET_CURRENT_USER(response.payload);
      // }
    } catch (e) {
      return Promise.reject();
    }
  }
}
