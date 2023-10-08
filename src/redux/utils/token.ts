import jwtDecode from 'jwt-decode';

const tokenName = 'token';

export const storeToken = (token: string): void => {
  localStorage.setItem(tokenName, token);
};

export const getToken = (): string | undefined => {
  return localStorage.getItem('token');
};

export const getTokenData = () => {
  const token = getToken();

  try {
    return jwtDecode(token);
  } catch (e) {
    return {};
  }
};

export const removeToken = (): void => {
  localStorage.removeItem(tokenName);
};
