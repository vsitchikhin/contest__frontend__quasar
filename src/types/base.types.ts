export enum LoadingStatusCodesEnum {
  notLoaded = 'not_loaded',
  loaded = 'loaded',
  error = 'error',
}

export enum LoadingStatusActionsEnum {
  noAction = 'no',
  loading = 'loading',
  saving = 'saving',
  deleting = 'deleting',
}

export type TLoadingStatus = {
  code: LoadingStatusCodesEnum;
  action: LoadingStatusActionsEnum;
  errorCode?: string;
  msg?: string;
};

export interface IHttpProvider {
  get<T1, T2>(url: string, queryParam?: T1, config?: any): Promise<T2>;
  post<T1, T2>(url: string, data?: T1, config?: any): Promise<T2>;
  delete<T1, T2>(url: string, queryParam?: T1, config?: any): Promise<T2>;
}

