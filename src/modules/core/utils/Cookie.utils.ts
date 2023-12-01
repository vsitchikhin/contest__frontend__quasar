import { ref, watch, Ref, UnwrapRef, onMounted, onUnmounted } from 'vue';
import { CHANGE_COOKIE_CUSTOM_EVENT_NAME } from 'src/modules/core/constants/core.consts';
import { parseAccessTokenPayload } from 'src/modules/core/utils/Jwt.utils';

interface ICookieObject {
  value: string;
  path?: string;
  expires?: number;
  domain?: string;
  secure?: boolean;
}

let checkCookieIntervalPointer: ReturnType<typeof setInterval> | null = null;
const cookieEvent = new CustomEvent(CHANGE_COOKIE_CUSTOM_EVENT_NAME, {
  bubbles: true,
});

function setChangeCookieEvent(): void {
  const lastCookie = window.document.cookie;

  if (checkCookieIntervalPointer !== null) {
    return;
  }

  checkCookieIntervalPointer = setInterval(() => {
    const currentCookie = window.document.cookie;
    if (currentCookie !== lastCookie) {
      window.dispatchEvent(cookieEvent);
    }
  }, 100);
}

function clearChangeCookieEvent(): void {
  if (checkCookieIntervalPointer !== null) {
    clearInterval(checkCookieIntervalPointer);
    checkCookieIntervalPointer = null;
  }
}

export function useCookie<T>(key: string, defaultValue: T | null = null, isAccessToken = false): Ref<T | null> {
  function convertValueToString(valueData: UnwrapRef<T | null>): string {
    if (typeof valueData === 'object') {
      return JSON.stringify(valueData);
    }

    return <string>valueData;
  }

  function convertStringToResult(valueString: string): UnwrapRef<T> {
    try {
      return JSON.parse(valueString);
    } catch (e) {
      return valueString as UnwrapRef<T>;
    }
  }


  const value = ref(defaultValue);
  const readCookie = () => {
    const cookie = convertCookiesStringToObject(window.document.cookie);

    if (cookie[key]) {
      value.value = convertStringToResult(cookie[key]);
    }
  };
  setChangeCookieEvent();
  readCookie();

  onMounted(() => {
    window.addEventListener(CHANGE_COOKIE_CUSTOM_EVENT_NAME, readCookie);
  });

  onUnmounted(() => {
    window.removeEventListener(CHANGE_COOKIE_CUSTOM_EVENT_NAME, readCookie);
    clearChangeCookieEvent();
  });

  const write = () => {
    const cookie: Record<string, ICookieObject> = {};
    let expires = 0;
    if (isAccessToken) {
      const tokenPayload = parseAccessTokenPayload(value.value as string);
      expires = tokenPayload.exp;
    }
    cookie[key] = {
      value: convertValueToString(value.value),
      secure: false,
      expires,
    };
    window.document.cookie = convertObjectToCookiesString(cookie);
  };

  watch([value], write, { deep: true });

  return value as Ref<T | null>;
}

function convertCookiesStringToObject(cookiesString: string): Record<string, string> {
  if (!cookiesString) {
    return {};
  }

  try {
    return cookiesString.split('; ').reduce((prev: Record<string, string>, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
    }, {});
  } catch (e) {
    return {};
  }
}

function convertObjectToCookiesString(object: Record<string, ICookieObject> | null): string {
  let result = '';
  for (const objectKey in object) {
    if (Object.prototype.hasOwnProperty.call(object, objectKey)) {
      const { value, expires, domain, secure } = object[objectKey];
      let { path } = object[objectKey];
      result += `${objectKey}=${value}; `;
      if (!path) {
        path = '/';
      }
      result += 'path=' + path + '; ';
      if (secure) {
        result += 'secure; ';
      }
      if (domain) {
        result += 'domain=' + domain + '; ';
      }
      if (expires) {
        const date = new Date(expires * 1000);
        result += 'expires=' + date.toUTCString() + '; ';
      }
    }
  }

  return result;
}
