import { Fragment, useCallback } from 'react';

export const useHighlight = (filter: string, highLightColor: string) =>
  useCallback(
    (text: string) => {
      if (!filter) return text;

      const regexp = new RegExp(filter, 'ig');
      const matchValue = text.match(regexp);

      if (matchValue) {
        return text.split(regexp).map((el, index, array) => {
          if (index < array.length - 1) {
            const lightSubstring = matchValue.shift();

            return (
              <Fragment key={`${el}-${el.length}`}>
                {el}
                <span style={{ color: highLightColor }} data-test-id='highlight-matches'>
                  {lightSubstring}
                </span>
              </Fragment>
            );
          }

          return el;
        });
      }

      return text;
    },
    [filter, highLightColor]
  );
