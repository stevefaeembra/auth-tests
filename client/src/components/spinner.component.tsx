import { FC } from 'react';

export const AstrosatSpinner: FC = () => {
  return (
    <svg height="500px" viewBox="0 0 1000 1000" width="500px">
      <circle
        cx="500"
        cy="570"
        r="80"
        style={{
          fill: '#000',
        }}
      />

      <circle cx="500" cy="570" r="80" style={{ fill: '#000' }} />
      <circle cx="500" cy="570" r="200" style={{ fill: 'none', strokeWidth: '10', stroke: '#000' }} />
      <circle cx="500" cy="666" r="300" style={{ fill: 'none', strokeWidth: '10', stroke: '#000' }} />
      <circle cx="500" cy="500" r="470" style={{ fill: 'none', strokeWidth: '10', stroke: '#000' }} />

      <circle
        cx="300"
        cy="570"
        r="40"
        style={{ fill: '#000', animation: 'spin 4s linear infinite', transformOrigin: '50% 57%' }}
      />
      <circle
        cx="500"
        cy="366"
        r="40"
        style={{ fill: '#000', animation: 'spin 4s linear infinite', transformOrigin: '50% 66.6%' }}
      />
      <circle
        cx="500"
        cy="30"
        r="40"
        style={{
          fill: '#000',
          animation: 'spin 4s linear infinite',
          animationDuration: '5s',
          transformOrigin: '50% 50%',
        }}
      />

      <text fill="red" fontSize="3.5rem" x="50" y="985">
        Brought to you by Stevenson Astrosat
      </text>
    </svg>
  );
};
