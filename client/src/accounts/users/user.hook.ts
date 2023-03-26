import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { User, UserData } from './users.hook';
import { useAuthentication } from '../authentication/authentication.hook';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/users`;

export const useUser = (): UseQueryResult<User> => {
  // export const useUser = (userIdnfo: Record<string, unknown>): UseQueryResult<User> => {
  const { userId, setUser, accessToken } = useAuthentication();
  console.log('GET USER Details: ', { userId, accessToken });
  return useQuery(
    ['User', userId],
    async () => {
      const response = await fetch(`${ENDPOINT}/${userId}`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error fetching app config, Message: ${error.message}`);
      }

      const data: User = await response.json();
      console.log('USER DATA: ', data);

      setUser(data);

      return UserData.parse(data);
    },
    {
      enabled: !!userId,
    },
  );
};
