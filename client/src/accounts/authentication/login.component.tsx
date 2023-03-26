import { FC, ReactElement, useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '~/accounts/users/user.hook';
import { ErrorFallback, errorHandler } from '~/components/error-fallback.component';
import { FormWrapper } from '~/components/forms/form-wrapper.component';
import { useCreateErrorReport } from '~/error-reporting/error-report.hook';

import { LoginForm } from './login-form.component';
import { LoginFormType, useLogin } from './login.hook';

const HOME_URL = '/';
const LOGIN_URL = '/login';

export const Login: FC = (): ReactElement => {
  const location = useLocation();
  // console.log('LOGIN LOCATION: ', location);
  const navigate = useNavigate();

  const {
    mutate: login,
    data: userInfo,
    error: loginError,
    isError: isLoginError,
    isLoading: isLoginLoading,
  } = useLogin();
  console.log('LOGGED IN USER ID: ', userInfo);
  // console.log('LOGIN ERROR: ', loginError);
  const {
    data: user,
    error: userError,
    isError: isUserError,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useUser();
  // console.log('LOGIN LOADING USER: ', { user, isLoginLoading, isUserLoading, isUserSuccess });
  // const { mutate, data: report, error: failure, isError, isSuccess } = useCreateErrorReport();

  // const handleErrorReport = (error: Error) => {
  //   const sendErrorReport = async () => {
  //     await mutate({ message: error.message, stackTrace: error.stack ?? '' });
  //   };

  //   sendErrorReport();
  // };

  useEffect(() => {
    if (user) {
      console.log('LOGGED IN USER: ', { user, location });
      const from = location.state?.from.pathname ?? '/';
      navigate(from, { replace: true });
    }
    //   console.log('LOGIN REDIRECT: ', location);
    //   // Navigate away to wherever the user originally came from, if
    //   // we successfully fetch the user's details, i.e. completed login.
    //   if (userInfo) {
    //     const pathname = location.state?.from?.pathname;
    //     console.log('LOCATION: ', pathname);
    //     const from = pathname ? (pathname === LOGIN_URL ? HOME_URL : pathname) : HOME_URL;
    //     console.log('NAVIGATING to: ', from);
    //     navigate(from, { replace: true });
    //   }
  }, [location, navigate, user]);

  const onLogin = (form: LoginFormType) => {
    // console.log('LOGIN: ', form);
    login(form);
  };

  // if (isLoginLoading) {
  //   return <p>Logging in User</p>;
  // }

  // if (isLoginError) {
  //   return <p>There is an login error</p>;
  // }

  // if (isUserError) {
  //   return <p>There is a user fetching error</p>;
  // }

  return (
    // <ErrorBoundary
    //   fallbackRender={({ error, resetErrorBoundary }) => (
    //     <ErrorFallback
    //       error={error}
    //       failure={failure}
    //       handleErrorReport={handleErrorReport}
    //       isError={isError}
    //       isSuccess={isSuccess}
    //       report={report}
    //       resetErrorBoundary={resetErrorBoundary}
    //     />
    //   )}
    //   onError={errorHandler}
    //   onReset={() => console.log('Recover from Error')}
    // >
    <FormWrapper>
      <>
        <h1 className="offscreen">Login</h1>
        <LoginForm loginUser={onLogin} />
      </>
    </FormWrapper>
    // </ErrorBou-ndary>
  );
};
