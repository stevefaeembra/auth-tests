import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '~/accounts/authentication/logout.hook';
import { UNAUTHORIZED_ERROR } from '~/api/api.constants';

import { useAuthentication } from '../authentication/authentication.hook';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/accounts/refresh`;

export const useRefresh = (): UseQueryResult<string> => {
  const { setAccessToken } = useAuthentication();
  const { refetch: logout } = useLogout();
  // const navigate = useNavigate();

  return useQuery(
    ['Refresh'],
    async () => {
      const response = await fetch(ENDPOINT, {
        credentials: 'include',
      });

      if (response.status === UNAUTHORIZED_ERROR) {
        // console.log('REFRESH FAILED MUST HAVE EXPIRED, LOGOUT');
        // logout
        await logout();
        return null;
        // navigate('/login', { replace: true });
        // return Promise.reject({ message: 'Please re-authenticate' });
      }

      if (!response.ok) {
        // const error = await response.json();
        // console.log('REFRESH FAILED ERROR: ', error);
        // console.log('REFRESH FAILED ERROR');

        // throw new Error(`Error Refreshing tokens, Message: ${error.message}`);
        throw new Error('Error Refreshing tokens');
      }

      const data = await response.json();
      // console.log('REFRESH DATA: ', data);

      setAccessToken(data.accessToken);

      return data.accessToken;
    },
    {
      enabled: false,
    },
  );
};
