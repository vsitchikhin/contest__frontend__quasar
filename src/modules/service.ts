// import {useRuntimeConfig, useNuxtApp} from "#app";
// import {IHttpProvider} from "src/types/base.types";

export class Service {
  protected apiHeaders: { [key: string]: string };
  // protected basePath = useRuntimeConfig().public.API_HOST;
  // protected api: IHttpProvider = <IHttpProvider>useNuxtApp().$axios;

  public constructor() {
    this.apiHeaders = {
      Authorization: 'Bearer',
    };
  }

  protected updateTokenInBrowser(token: string) {
    window.document.cookie = `jwt=${token}`;
  }
}
