import { FC, ReactElement, useEffect, useState } from 'react';

import { useLocalStorage } from '@astrosat/react-utils';
import { Outlet } from 'react-router-dom';

import { useAuthentication } from '~/accounts/authentication/authentication.hook';
import { useRefresh } from '~/accounts/authentication/refresh.hook';

export const Persistent: FC = (): ReactElement => {
  const { userId, accessToken } = useAuthentication();
  const { refetch: refreshToken } = useRefresh();
  const [isLoading, setIsLoading] = useState(true);
  // const [persist] = useLocalStorage('persist', 'false');
  // console.log('AUTHENTICATE PERSISTENCE: ', { userId, accessToken });

  useEffect(() => {
    // console.log('PERSISTENCE DATA: ', { userId, accessToken });
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        // refresh token
        // console.log('Verifying REFRESH TOKEN');
        await refreshToken();
      } catch (error) {
        console.log('REFRESH ERROR: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    // !accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
    // }, [persist, accessToken, refreshToken]);
  }, [accessToken, refreshToken, userId]);

  // FIXME: Temp effect just to view state
  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${accessToken}`);
  // }, [isLoading, accessToken]);

  // return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
  return isLoading ? <p>Loading...</p> : <Outlet />;
};
