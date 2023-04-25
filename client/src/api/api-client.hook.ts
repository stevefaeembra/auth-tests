import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthentication } from '~/accounts/authentication/authentication.hook';
import { useLogout } from '~/accounts/authentication/logout.hook';
import { useRefresh } from '~/accounts/authentication/refresh.hook';

import { UNAUTHORIZED_ERROR } from './api.constants';

export const useApiClient = () => {
  const { accessToken } = useAuthentication();
  const { refetch: logout } = useLogout();
  const { refetch: refresh } = useRefresh();
  const navigate = useNavigate();

  return useCallback(
    async (
      endpoint: string,
      data: unknown = {},
      customHeaders: HeadersInit = {},
      config: Record<string, unknown> = {},
    ) => {
      // console.log('ACCESS TOKEN: ', accessToken);
      // const headers = {};

      // if (accessToken) {
      //   headers.Authorization = `Bearer ${accessToken}`;
      // }

      // if (data) {
      //   headers['Content-Type'] = 'application/json';
      // }

      const method = config?.method as string;

      const customConfig: RequestInit = {
        method: method ? method : 'POST',
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          'Content-Type': 'application/json',
          // 'Content-Type': data ? 'application/json' : undefined,
          ...customHeaders,
        },
        ...config,
      };
      // console.log('REQUEST CONFIG: ', customConfig);
      // console.log('Endpoint >>>', endpoint);
      let response = await fetch(endpoint, customConfig);
      // console.log('RESPONSE: ', response);

      const previousRequest = customConfig;
      if (response.status === UNAUTHORIZED_ERROR && !previousRequest?.sent) {
        previousRequest.sent = true;
        const { data: newAccessToken } = await refresh();
        // console.log('NOT AUTHORIZED: ', newAccessToken);

        if (newAccessToken) {
          // console.log('NEW ACCESS TOKEN: ', newAccessToken);
          previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          response = await fetch(endpoint, previousRequest);
        }

        // await logout();
        // navigate('/', { replace: true });
        // return Promise.reject({ message: 'Please re-authenticate' });
      }

      // 'response.ok', response.ok);
      // if (!response.ok) {
      //   console.log('response in apiClient', response);
      //   return Promise.reject({ message: 'Please re-authenticate' });
      // }

      // console.log('RESPONSE: ', response);
      const responseData = await response.json();
      // console.log('RESPONSE DATA: ', responseData);

      return response.ok ? responseData : Promise.reject(responseData);
    },
    [accessToken, refresh],
  );
};
