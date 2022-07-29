export const getRange = (start: number, end: number, step: number): number[] =>
  [...Array(Math.floor((end - start) / step) + 1).keys()].map(
    (x) => x * step + start
  );
