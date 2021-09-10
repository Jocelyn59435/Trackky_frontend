import jwtDecode from 'jwt-decode';
import { useMemo } from 'react';
import { useCookies } from 'react-cookie';

type authReturnType = { token?: any; setToken: (token: string) => void };

export default function useAuth(): authReturnType {
  //check if it is running on the server
  if (typeof window === 'undefined') {
    return { token: null, setToken: () => {} };
  }

  const [userToken, setUserToken, removeUserToken] = useCookies(['token']);

  if (userToken) {
    try {
      const decoded = jwtDecode(userToken as string) as any;
      const expires = new Date(decoded.exp * 1000);
      if (new Date() >= expires) {
        throw new Error('Expired token.');
      }
      return {
        token: userToken,
        setToken: (userToken) => {
          setUserToken('token', userToken);
        },
      };
    } catch (e) {
      setUserToken('token', null);
    }
  }
  return { token: null, setToken: () => {} };
}
