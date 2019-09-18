import React, { useEffect, useState } from 'react';
import { history } from '../App';

export interface IJwtToken {
  jwt_token?: string;
  jwt_token_expiry?: string;
}

export type IUseAuth = [IJwtToken, React.Dispatch<React.SetStateAction<IJwtToken>>];

let interval: NodeJS.Timeout;

const url = 'http://localhost:8000/api/auth/refresh-token';

const auth = async () => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
  const json = await response.json();
  if (response.status !== 200) {
    const error = new Error(json.message);
    throw error;
  }

  return json;
};

const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<IJwtToken>({});

  const syncLogout = (event: StorageEvent) => {
    if (event.key === 'logout') {
      console.log('logged out on all tabs...');
      history.push('/login');
    }
  };

  useEffect(() => {
    const asyncAuth = async () => {
      try {
        const result = await auth();
        setToken(result);
      } catch (err) {
        console.log('not logged in');
      }
    };

    asyncAuth();

    window.addEventListener('storage', syncLogout);

    return () => {
      window.removeEventListener('storage', syncLogout);
      window.localStorage.removeItem('logout');
    };
  }, []);

  useEffect(() => {
    const authorize = async () => {
      interval = setInterval(async () => {
        if (token.jwt_token && token.jwt_token_expiry) {
          const expires = new Date(token.jwt_token_expiry);
          const now = new Date();

          /** If jwt_token is about to be expired (less than 2 minutes left) */
          /** get a new one */
          if ((expires.getTime() - now.getTime()) / 1000 < 120) {
            try {
              const result = await auth();
              setToken(result);
            } catch (err) {
              console.log('not logged in');
            }
          }
        } else {
          try {
            const result = await auth();
            setToken(result);
          } catch (err) {
            console.log('not logged in');
          }
        }
      }, 100 * 1000);
    };

    authorize();

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  return [token, setToken];
};

export default useAuth;
