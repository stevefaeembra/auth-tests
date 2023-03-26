import { FC } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthentication } from '~/accounts/authentication/authentication.hook';

interface Props {
  roles: number[];
}

export const Authorization: FC<Props> = ({ roles }) => {
  const { user, setUser, accessToken } = useAuthentication();
  console.log('IS AUTHORIZATION: ', { user, accessToken });
  const location = useLocation();
  // console.log('AUTHORIZATION LOCATION: ', location);

  return user?.roles?.find((role: number) => roles?.includes(role)) ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate replace state={{ from: location }} to="/unauthorized" />
  ) : (
    <Navigate replace state={{ from: location }} to="/login" />
  );
};
