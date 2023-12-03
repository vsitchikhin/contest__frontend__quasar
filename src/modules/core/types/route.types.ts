export interface IRoute {
  name: string;
  params?: Record<string, string | string[]>;
  query?: Record<string, string | string[]>;
}
