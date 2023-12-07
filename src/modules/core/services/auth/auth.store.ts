import { defineStore } from 'pinia';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
import { SelectedUserDto, UserFullDto, UserShortDto } from 'src/modules/core/types/auth.types';

interface IAuthState {
  user: UserFullDto | null;
  users: UserShortDto[] | null;
  selectedUser: SelectedUserDto | null;

  userLoadingStatus: TLoadingStatus;
  usersLoadingStatus: TLoadingStatus;
  selectedUserLoadingStatus: TLoadingStatus;

  error: boolean;
  relocatedFrom: string | null;
}

export const authStore = defineStore({
  id: 'authStore',

  state: (): IAuthState => ({
    user: null,
    selectedUser: null,
    users: null,

    userLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
    },

    usersLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
    },

    selectedUserLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
    },

    error: false,
    relocatedFrom: null,
  }),

  actions: {
    SET_USER_PAYLOAD(payload: UserFullDto | null) {
      this.user = payload;
    },

    SET_USER_LOADING_STATUS(status: TLoadingStatus) {
      this.userLoadingStatus = {
        ...this.userLoadingStatus,
        ...status,
      };
    },

    SET_ERROR(status: boolean) {
      this.error = status;
    },

    SET_RELOCATED_FROM(url: string | null) {
      this.relocatedFrom = url;
    },
  },
});
