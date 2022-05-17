import { addDays, endOfDay, endOfHour, startOfDay } from 'date-fns';
import { useMemo } from 'react';

interface IUseTimeframeOutput {
  from: number;
  to: number;
}

export const useTimeframe = (
  selectedPeriod: number,
  timeframe: tfTypes
): IUseTimeframeOutput => {
  const thisHour = endOfHour(new Date()).getTime();

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    if (selectedPeriod === 1) {
      return Math.ceil(startOfDay(thisHour).getTime() / 1000 / 3600);
    }
    if (selectedPeriod === 2) {
      return Math.ceil(
        startOfDay(addDays(thisHour, -1)).getTime() / 1000 / 3600
      );
    }
    switch (timeframe) {
      case 'daily':
        return Math.ceil(
          endOfDay(addDays(thisHour, -selectedPeriod)).getTime() /
            1000 /
            3600 /
            24
        );
      default:
        return Math.ceil(
          addDays(thisHour, -selectedPeriod).getTime() / 1000 / 3600
        );
    }
  }, [selectedPeriod, thisHour, timeframe]);

  const to = useMemo(() => {
    if (selectedPeriod === 2) {
      return Math.floor(
        addDays(endOfDay(thisHour), -1).getTime() / 1000 / 3600
      );
    }
    switch (timeframe) {
      case 'daily':
        return Math.floor(endOfDay(thisHour).getTime() / 1000 / 3600 / 24);
      default:
        return Math.floor(thisHour / 1000 / 3600);
    }
  }, [selectedPeriod, thisHour, timeframe]);

  return { from, to };
};
