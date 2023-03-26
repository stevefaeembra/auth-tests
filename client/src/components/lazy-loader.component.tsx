import React, { FC, useEffect, useState } from 'react';

import { AstrosatSpinner } from './spinner.component';

interface Props {
  delay?: number;
}

export const LazyLoader: FC<Props> = ({ delay = 250 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);
  return show ? <AstrosatSpinner /> : null;
};
