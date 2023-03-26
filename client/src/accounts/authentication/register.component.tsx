import { FC, ReactElement } from 'react';

import { FormWrapper } from '~/components/forms/form-wrapper.component';

import { RegisterForm } from './register-form.component';
import { RegistrationFormType, useRegister } from './register.hook';

export const Register: FC = (): ReactElement => {
  const { mutate: register, data: registeredUserId, error, isError, isLoading } = useRegister();
  // console.log('REGISTERED USER ID: ', registeredUserId);
  // console.log('REGISTRATION ERROR: ', error);

  const onRegister = (form: RegistrationFormType) => {
    // console.log('Register: ', form);
    register(form);
  };

  if (isLoading) {
    return <p>Registering User</p>;
  }

  if (isError) {
    return <p>There is a register error</p>;
  }

  return (
    <FormWrapper>
      <>
        <h1 className="offscreen">Register</h1>
        <RegisterForm registerUser={onRegister} />
      </>
    </FormWrapper>
  );
};
