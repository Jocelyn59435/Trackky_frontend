import { parseCookies, setCookie, destroyCookie } from 'nookies';
import jwtDecode from 'jwt-decode';

type UseAuthReturnType = {
  token: null | string;
  setToken: (token: any) => {};
  destroyToken: () => {};
};

export function useAuth(): UseAuthReturnType {
  const cookies = parseCookies();
  const userToken = { cookies }.cookies?.token;
  if (userToken) {
    try {
      const decoded = jwtDecode(userToken) as any;
      const expires = new Date(decoded.exp * 1000);
      if (new Date() >= expires) {
        throw new Error('Expired Token');
      }
    } catch (e) {
      setCookie(null, 'token', null);
    }
  }
  return {
    token: userToken || null,
    setToken: (token) => setCookie(null, 'token', token),
    destroyToken: () => destroyCookie(null, 'token'),
  };
}
