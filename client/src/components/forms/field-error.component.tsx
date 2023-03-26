import { FC } from 'react';

interface FieldErrorProps {
  children: string | undefined;
}

export const FieldError: FC<FieldErrorProps> = ({ children }) => (
  <p className="mt-1 text-sm text-red-600">{children}</p>
);
