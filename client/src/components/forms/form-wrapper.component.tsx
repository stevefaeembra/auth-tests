import { FC, ReactElement } from 'react';

interface FormWrapperProps {
  children: ReactElement;
}

export const FormWrapper: FC<FormWrapperProps> = ({ children }) => (
  <article className="m-2 rounded-md border-2">{children}</article>
);
