import { Service } from 'src/modules/service';
import { tokenStore } from 'src/modules/core/services/tokens/token.store';

export class TokenService extends Service {
  private store;

  public constructor() {
    super();
    this.store = tokenStore();
  }

  // ------------------------------------------------------------
  // Геттеры данных
  public get token(): string | null {
    return this.store.token;
  }

  public setToken(token: string | null) {
    this.store.SET_TOKEN(token);
  }
}
