import React, { FC, ReactElement } from 'react';

interface Props {
  isDisabled: boolean;
  children: ReactElement | string;
}

export const SubmitButton: FC<Props> = ({ isDisabled, children }) => {
  return (
    <button
      className="rounded-md bg-green-500 p-2 text-gray-900 hover:bg-green-900 hover:text-white active:bg-green-300 active:text-gray-900 disabled:cursor-not-allowed disabled:opacity-75"
      disabled={isDisabled}
      type="submit"
    >
      {children}
    </button>
  );
};
