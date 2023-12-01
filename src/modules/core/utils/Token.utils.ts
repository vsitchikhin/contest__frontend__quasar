import { useCookie } from 'src/modules/core/utils/Cookie.utils';

export interface IJwtTokenPayload {
  aud: string;
  jti: string;
  iat: number;
  ndf: number;
  exp: number;
  sub: string;
  scopes: string[];
}

export function parseTokenPayload(token: string): IJwtTokenPayload {
  const tokenPayload = token.split('.')[1];
  const tokenParse = atob(tokenPayload);
  return JSON.parse(tokenParse) as IJwtTokenPayload;
}

export function readTokenFromCookie(): string | null {
  const token = useCookie<string>('jwt');
  return token.value;
}
