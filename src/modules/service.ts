import { useCookie } from 'src/modules/core/utils/Cookie.utils';

export class Service {
  protected apiHeaders: { [key: string]: string };
  protected basePath = process.env.API_HOST;

  public constructor() {
    this.apiHeaders = {
      Authorization: `Bearer ${useCookie<string>('jwt').value || ''}`,
    };
  }

  protected updateTokenInBrowser(token: string) {
    window.document.cookie = `jwt=${token || ''};path=/`;
    this.apiHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }
}
