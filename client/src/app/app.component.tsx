import { FC, Fragment, ReactElement, Suspense, lazy, useEffect } from 'react';

import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// // import { Button } from "@astrosat/react-utils";
// import { ErrorBoundary } from 'react-error-boundary';

// // import { LoginForm, LoginFormType } from "~/accounts/login-form.component";
// // import { RegisterForm, RegisterFormType } from "~/accounts/register-form.component";
// import { useAuthentication } from '~/accounts/authentication.hook';
// import { ErrorFallback, errorHandler } from '~/components/error-fallback.component';
// import { LazyLoader } from '~/components/lazy-loader.component';
// import { AstrosatSpinner } from '~/components/spinner.component';
// import { useCreateErrorReport } from '~/error-reporting/error-report.hook';
// import Footer from '~/layout/footer.component';
// import Header from '~/layout/header.component';

import { useAuthentication } from '~/accounts/authentication/authentication.hook';
import { Login } from '~/accounts/authentication/login.component';
import { Register } from '~/accounts/authentication/register.component';
import { useUser } from '~/accounts/users/user.hook';
import { Admin } from '~/admin/admin.component';
import Authenticated from '~/authenticated.component';
import { Layout } from '~/layout/layout.component';
import Unauthenticated from '~/unauthenticated.component';

import { useAppConfig } from './app-config.hook';
import { Authorization } from './authorization.component';
import { Editor } from './editor.component';
import { Home } from './home.component';
import { Links } from './links.component';
import { Lounge } from './lounge.component';
import { Persistent } from './persistent.component';
import { Unauthorized } from './unauthorized.component';

// import { FormWrapper } from "./components/forms/form-wrapper.component";

// const Unauthenticated = lazy(() => import('~/unauthenticated.component'));
// const Unauthenticated = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import('~/unauthenticated.component')), 5000);
//   });
// });
// // // const Authenticated = lazy(() => import("~/authenticated.component"));
// const Authenticated = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(import('~/authenticated.component')), 5000);
//   });
// });

export enum Roles {
  USER = 1,
  EDITOR = 2,
  ADMIN = 3,
}

const App: FC = (): ReactElement => {
  const { data: appConfig } = useAppConfig();
  const auth = useAuthentication();
  console.log('AUTHENTICATION DATA: ', auth);
  // const {
  //   data: user,
  //   error: userError,
  //   isError: isUserError,
  //   isLoading: isUserLoading,
  //   isSuccess: isUserSuccess,
  // } = useUser();
  // const location = useLocation();
  // const navigate = useNavigate();
  // // console.log('APP USER: ', user);
  // // console.log('APP LOCATION: ', location);
  // const from = location.state?.from.pathname ?? '/';

  // if (isUserSuccess) {
  //   const from = location.state?.from.pathname ?? '/';
  //   console.log('APP NAVIGATING TO: ', from);
  //   navigate(from, { replace: true });
  // }

  // useEffect(() => {
  //   if (isUserSuccess) {
  //     navigate(from, { replace: true });
  //   }
  // }, [from, isUserSuccess, navigate]);

  // useEffect(() => {
  //   // Navigate away to wherever the user originally came from, if
  //   // we successfully fetch the user's details, i.e. completed login.
  //   if (user) {
  //     console.log('APP USER: ', user);
  //     const from = location.state?.from.pathname ?? '/';
  //     // const pathname = location.state?.from?.pathname;
  //     // console.log('LOCATION: ', pathname);
  //     // const from = pathname ? (pathname === LOGIN_URL ? HOME_URL : pathname) : HOME_URL;
  //     console.log('APP NAVIGATING TO: ', from);
  //     navigate(from, { replace: true });
  //   }
  // }, [location.state?.from.pathname, navigate, user]);

  // console.log('LOGIN LOADING USER: ', { user, isUserLoading, isUserSuccess });
  // console.log('APP CONFIG: ', appConfig);
  // const { mutate, data: report, error: failure, isError, isSuccess } = useCreateErrorReport();

  // const handleErrorReport = (error: Error) => {
  //   const sendErrorReport = async () => {
  //     await mutate({ message: error.message, stackTrace: error.stack ?? '' });
  //   };

  //   sendErrorReport();
  // };

  // const { user } = useAuthentication();
  // const user = null;
  // console.log('USER: ', user);

  // const onRegister = (form: RegisterFormType) => console.log("REGISTER: ", form);
  // const onLogin = (form: LoginFormType) => console.log("LOGIN: ", form);

  // const user = { name: "" };

  // return <Suspense fallback={<div>Loading...</div>}>{user ? <Authenticated /> : <Unauthenticated />}</Suspense>;

  return (
    <Routes>
      <Route element={<Layout />} path="/">
        {/* public routes */}
        <Route element={<Register />} path="register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Links />} path="links" />
        <Route element={<Unauthorized />} path="unauthorized" />
        {/* <Unauthenticated /> */}

        {/* we want to protect these routes */}
        {/* <Route element={<Persistent />}> */}
        <Route element={<Authorization roles={[Roles.USER]} />}>
          <Route element={<Home />} path="/" />
        </Route>

        <Route element={<Authorization roles={[Roles.EDITOR]} />}>
          <Route element={<Editor />} path="editor" />
        </Route>

        <Route element={<Authorization roles={[Roles.ADMIN]} />}>
          <Route element={<Admin />} path="admin" />
        </Route>

        <Route element={<Authorization roles={[Roles.EDITOR, Roles.ADMIN]} />}>
          <Route element={<Lounge />} path="lounge" />
        </Route>
      </Route>
      {/* <Authenticated /> */}
      {/* </Route> */}
    </Routes>

    // <div className="flex min-h-screen flex-col">
    //   <Header />

    //   <main className="grow">
    //     <ErrorBoundary
    //       fallbackRender={({ error, resetErrorBoundary }) => (
    //         <ErrorFallback
    //           error={error}
    //           failure={failure}
    //           handleErrorReport={handleErrorReport}
    //           isError={isError}
    //           isSuccess={isSuccess}
    //           report={report}
    //           resetErrorBoundary={resetErrorBoundary}
    //         />
    //       )}
    //       onError={errorHandler}
    //       onReset={() => console.log('Recover from Error')}
    //     >
    //       {/* <Suspense fallback={<LazyLoader delay={300} />}>{user ? <Authenticated /> : <Unauthenticated />}</Suspense> */}
    //       <Suspense
    //         fallback={
    //           <div className="flex items-center justify-center">
    //             <AstrosatSpinner />
    //           </div>
    //         }
    //       >
    //         {user ? <Authenticated /> : <Unauthenticated />}
    //       </Suspense>
    //       {/* <h2>Main Content</h2>

    //       <Button className="bg-blue-500" onClick={() => console.log("BUTTON CLICKED")}>
    //         <span>Click Me</span>
    //       </Button>

    //       <FormWrapper>
    //         <>
    //           <h1 className="offscreen">Registration</h1>
    //           <RegisterForm registerUser={onRegister} />
    //         </>
    //       </FormWrapper>

    //       <FormWrapper>
    //         <>
    //           <h1 className="offscreen">Login</h1>
    //           <LoginForm login={onLogin} />
    //         </>
    //       </FormWrapper> */}
    //     </ErrorBoundary>
    //   </main>

    //   <Footer />
    // </div>
  );
};

export default App;
