export interface IAccessTokenPayload {
  aud: string;
  jti: string;
  iat: number;
  ndf: number;
  exp: number;
  sub: string;
  scopes: string[];
}

export function parseAccessTokenPayload(token: string): IAccessTokenPayload {
  const tokenPayload = token.split('.')[1];
  const tokenParse = atob(tokenPayload);
  return JSON.parse(tokenParse) as IAccessTokenPayload;
}
