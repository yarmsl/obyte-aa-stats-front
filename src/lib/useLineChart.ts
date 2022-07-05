import { Datum, Serie } from '@nivo/line';
import { useMemo } from 'react';

interface useLineChartOutput {
  serieLength: number;
  isEveryValOfSerieIsNull: boolean;
  isDataSerieLessThan1: boolean;
}

export const useLineChart = (data: Serie[]): useLineChartOutput => {
  const allSeries = useMemo(
    () => data.reduce((accu: Datum[], curr) => accu.concat(curr.data), []),
    [data]
  );

  const serieLength = useMemo(
    () => (data.length > 0 ? data[0].data.length : 0),
    [data]
  );

  const isEveryValOfSerieIsNull = useMemo(
    () => allSeries.every((s) => s.y == null),
    [allSeries]
  );

  const isDataSerieLessThan1 = useMemo(
    () => allSeries.every((s) => (s.y != null ? s.y < 1 : false)),
    [allSeries]
  );

  return { serieLength, isEveryValOfSerieIsNull, isDataSerieLessThan1 };
};
