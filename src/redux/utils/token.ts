import jwtDecode from 'jwt-decode';

const tokenName = 'token';

export const storeToken = (token: string): void => {
  localStorage.setItem(tokenName, token);
};

export const getToken = (): string | undefined => {
  return localStorage.getItem('token');
};
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    return {};
  }
};
export const getTokenData = () => {
  const token = getToken();
  return decodeToken(token);
};

export const removeToken = (): void => {
  localStorage.removeItem(tokenName);
};
