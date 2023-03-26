import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthentication } from '~/accounts/authentication/authentication.hook';
// import { useApiClient } from '~/api/api-client.hook';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/accounts/`;

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUserId, setUser, setAccessToken } = useAuthentication();
  // const apiClient = useApiClient();

  return useQuery(
    ['logout'],
    async () => {
      // await apiClient(ENDPOINT);
      const response = await fetch(ENDPOINT, { credentials: 'include' });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error logging out: ${error}`);
      }

      setUserId(null);
      setUser(null);
      setAccessToken(null);

      return null;
    },
    {
      enabled: false,
      onSettled: (data, error) => {
        navigate('/login', { replace: true });
      },
    },
  );
};
