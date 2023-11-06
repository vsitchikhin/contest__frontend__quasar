import { Service } from 'src/modules/service';
import { tokenStore, ITokenResponse } from 'src/modules/core/services/tokens/token.store';
import { api, AxiosResponse } from 'boot/axios';

export class TokenService extends Service {
  private store;
  private clientId = process.env.AUTH_CLIENT;
  private clientSecret = process.env.AUTH_SECRET;

  public constructor() {
    super();
    this.store = tokenStore();
  }

  // ------------------------------------------------------------
  // Геттеры данных
  public get accessToken(): string | null {
    return this.store.accessToken;
  }

  public get refreshToken(): string | null {
    return this.store.refreshToken;
  }

  // ------------------------------------------------------------
  // Методы обновления стора
  public async getTokens(username: string, password: string): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const response: AxiosResponse<ITokenResponse> = await api.post('/oauth/token', {
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username: username,
        password: password,
        scope: '',
      });
      console.log('Token response', response);
      if (response.status === 200 && response.data?.access_token) {
        this.store.SET_ACCESS_TOKEN(response.data.access_token);
        this.store.SET_REFRESH_TOKEN(response.data.refresh_token);
        this.store.SET_TOKEN_TYPE(response.data.token_type);
        this.store.SET_TOKEN_RESPONSE(null);
      } else {
        this.store.SET_TOKEN_RESPONSE(response.data);
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject();
    }
  }
}
