import { AuthType } from "../features/auth/validation/auth.schema";


export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
} & AuthType;

export const ACCESS_KEY = "auth_access_token";
export const REFRESH_KEY = "auth_refresh_token";
export const USER_KEY = "auth_user";

export function setAuthSession(data: LoginResponse, rememberMe = true) {
  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(ACCESS_KEY, data.accessToken);
  storage.setItem(REFRESH_KEY, data.refreshToken);

  storage.setItem(
    USER_KEY,
    JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    } satisfies AuthType)
  );
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY);
}

export function getAuthUser(): AuthType | null {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthType;
  } catch {
    return null;
  }
}
