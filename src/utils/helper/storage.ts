const GREETING_ID_KEY = 'vbooth_guest_greeting_id';
const ACCESS_TOKEN = 'access_token';

export const getStoredGreetingId = (): string | null => {
  return localStorage.getItem(GREETING_ID_KEY);
};

export const setStoredGreetingId = (id: string): void => {
  localStorage.setItem(GREETING_ID_KEY, id);
};

export const removeStoredGreetingId = (): void => {
  localStorage.removeItem(GREETING_ID_KEY);
};

export const setAccessToken = (token:string) => {
  localStorage.setItem(ACCESS_TOKEN,token);
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
}