import { FC, ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FieldError } from '~/components/forms/field-error.component';
import { SubmitButton } from '~/components/forms/submit-button.component';

import { LoginFormSchema, LoginFormType } from './login.hook';
import { MandatoryField } from './register-form.component';

interface FormProps {
  loginUser: (form: LoginFormType) => void;
}

const EMAIL_ID = 'email';
const PASSWORD_ID = 'password';

const defaultFormValues = {
  [EMAIL_ID]: '',
  [PASSWORD_ID]: '',
};

export const LoginForm: FC<FormProps> = ({ loginUser }): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema), defaultValues: defaultFormValues });

  const onSubmit: SubmitHandler<LoginFormType> = form => loginUser(form);

  return (
    <form className="flex flex-col p-8" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={EMAIL_ID}>
        Email <MandatoryField />:
      </label>
      <div>
        <input
          type={EMAIL_ID}
          {...register(EMAIL_ID)}
          autoFocus
          required
          aria-required={true}
          className="form-input"
          disabled={isSubmitting}
        />

        {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
      </div>

      <label htmlFor={PASSWORD_ID}>
        Password <MandatoryField />:
      </label>
      <div>
        <input
          type={PASSWORD_ID}
          {...register(PASSWORD_ID)}
          required
          aria-required={true}
          className="form-input"
          disabled={isSubmitting}
        />

        {errors.password ? <FieldError>{errors.password.message}</FieldError> : null}
      </div>

      <div className="flex justify-end p-2">
        <SubmitButton isDisabled={isSubmitting}>Login</SubmitButton>
      </div>
    </form>
  );
};
