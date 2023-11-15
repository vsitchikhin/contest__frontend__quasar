import { defineStore } from 'pinia';

export interface ITokenResponse {
  token: string | null;
}

interface ITokenState {
  token: string | null;
}

export const tokenStore = defineStore({
  id: 'token',

  state: (): ITokenState => ({
    token: null,
  }),

  actions: {
    SET_TOKEN(value: string | null) {
      this.token = value;
    },
  },
});
