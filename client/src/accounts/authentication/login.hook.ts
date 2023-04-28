import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useApiClient } from '~/api/api-client.hook';
// import { User } from '~/mocks/handlers/authentication';

import { useAuthentication } from './authentication.hook';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/accounts/`;

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  accessToken: z.optional(z.string()),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserId, setAccessToken } = useAuthentication();
  const apiClient = useApiClient();
  // const { user, setUser } = useAuthentication();
  // console.log('LOGIN HOOK USER: ', user);

  // const from = location.state?.from?.pathname ?? '/';
  // console.log('LOGIN HOOK REDIRECT: ', location);

  return useMutation(
    async (form: LoginFormType) => {
      // console.log('LOGIN FORM: ', form);
      const data = await apiClient(ENDPOINT, form);
      // const response = await fetch(ENDPOINT, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(form),
      // });

      // if (!response.ok) {
      //   const error = await response.json();

      //   throw new Error(`Problem Logging in: ${error.message}`);
      // }

      // const data = await response.json();
      // console.log('LOGIN RESPONSE: ', data);

      setUserId(data.id);
      setAccessToken(data.accessToken);
      // return data;
      // // const data: User = await response.json();
      // console.log('LOGGED IN USER: ', data);
      // setUser(data);
      // navigate(from, { replace: true });

      return data;
      // return LoginFormSchema.parse(data);
    },
    // {
    //   onSuccess: (data, variables, context) => {
    //     const from = location.state?.from?.pathname ?? '/';
    //     console.log('LOGIN HOOK REDIRECT: ', { location, from });
    //     navigate(from, { replace: true });
    //   },
    // },
  );

  // const login = async (form: LoginFormType) => {
  //   try {
  //     // Login user.
  //     console.log('LOGIN USER: ', form);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // return login;
};
