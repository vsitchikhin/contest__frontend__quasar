import { defineStore } from 'pinia';
import { UserFullDto } from 'src/modules/users/types/users.types';

interface IUsersState {
  currentUser: UserFullDto | null;
}

export const usersStore = defineStore({
  id: 'user',

  state: (): IUsersState => ({
    currentUser: null,
  }),

  actions: {
    SET_CURRENT_USER(value: UserFullDto | null) {
      this.currentUser = value;
    },
  },
});
