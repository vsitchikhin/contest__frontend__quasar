import { defineStore } from 'pinia';
import { UserFullDto } from 'src/modules/users/types/users.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';

interface IUsersState {
  currentUser: UserFullDto | null;
  currentUserLoadingStatus: TLoadingStatus;
}

export const usersStore = defineStore({
  id: 'user',

  state: (): IUsersState => ({
    currentUser: null,
    currentUserLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
    },
  }),

  actions: {
    SET_CURRENT_USER(value: UserFullDto | null) {
      this.currentUser = value;
    },

    SET_CURRENT_USER_LOADING_STATUS(status: TLoadingStatus) {
      this.currentUserLoadingStatus = {
        ...this.currentUserLoadingStatus,
        ...status,
      };
    },
  },
});
