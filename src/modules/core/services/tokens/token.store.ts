import { defineStore } from 'pinia';
import { useCookie } from 'src/modules/core/utils/Cookie.utils';
import { useLocalStorage } from 'src/modules/core/utils/LocalStorage.utils';
import { Ref } from 'vue';

export interface ITokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

interface ITokenState {
  accessToken: Ref<string | null>;
  refreshToken: Ref<string | null>;
  tokenType: Ref<string | null>;
  tokenResponse: ITokenResponse | null;
}

export const tokenStore = defineStore({
  id: 'token',

  state: (): ITokenState => ({
    accessToken: useCookie<string>('accessToken', null, true),
    refreshToken: useLocalStorage<string>('refreshToken'),
    tokenType: useLocalStorage<string>('tokenType'),
    tokenResponse: null,
  }),

  actions: {
    SET_ACCESS_TOKEN(value: string) {
      this.accessToken = value;
    },

    SET_REFRESH_TOKEN(value: string) {
      this.refreshToken = value;
    },

    SET_TOKEN_TYPE(value: string) {
      this.tokenType = value;
    },

    SET_TOKEN_RESPONSE(response: ITokenResponse | null) {
      this.tokenResponse = response;
    },
  },
});
