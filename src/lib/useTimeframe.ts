import { addDays, endOfDay, endOfHour } from 'date-fns';
import { useMemo } from 'react';

interface IUseTimeframeOutput {
  from: number;
  to: number;
  now: number;
}

export const useTimeframe = (
  selectedPeriod: number,
  timeframe: tfTypes
): IUseTimeframeOutput => {
  const thisHour = endOfHour(new Date()).getTime();

  const now = useMemo(
    () =>
      timeframe === 'daily'
        ? Math.floor(thisHour / 1000 / 3600 / 24)
        : Math.floor(thisHour / 1000 / 3600),
    [thisHour, timeframe]
  );

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    if (selectedPeriod === 1) {
      return thisHour / 1000 / 3600 - 25;
    }
    // if (selectedPeriod === 2) {
    //   if (timeframe === 'daily') {
    //     return Math.ceil(
    //       startOfDay(addDays(thisHour, -1)).getTime() / 1000 / 3600 / 24
    //     );
    //   }
    //   return Math.ceil(
    //     startOfDay(addDays(thisHour, -1)).getTime() / 1000 / 3600
    //   );
    // }
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
    // if (selectedPeriod === 2) {
    //   return Math.floor(
    //     addDays(endOfDay(thisHour), -1).getTime() / 1000 / 3600
    //   );
    // }
    switch (timeframe) {
      case 'daily':
        return Math.floor(endOfDay(thisHour).getTime() / 1000 / 3600 / 24);
      default:
        return Math.floor(thisHour / 1000 / 3600);
    }
  }, [thisHour, timeframe]);

  return { from, to, now };
};
