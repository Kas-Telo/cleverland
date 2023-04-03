import { useState } from 'react';

export const usePhoneMask = () => {
  const [state, setState] = useState([
    '+',
    '3',
    '7',
    '5',
    ' ',
    '(',
    /(2|3|4)/,
    /9/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ]);

  return (firstNumberOfCode: string | undefined) => {
    switch (firstNumberOfCode) {
      case '2':
        {
          const temp = state;

          temp[7] = /(5|9)/;
          setState(temp);
        }
        break;
      case '3':
        {
          const temp = state;

          temp[7] = /3/;
          setState(temp);
        }
        break;
      case '4':
        {
          const temp = state;

          temp[7] = /4/;
          setState(temp);
        }
        break;
      default:
        break;
    }

    return state;
  };
};
