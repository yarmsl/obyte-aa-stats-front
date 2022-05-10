import { addDays, endOfDay, startOfHour } from 'date-fns';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTotalActivityOverTimeQuery } from 'store/AAstats';
import { handleGraphControl, graphControlValue } from 'store/UI';
import TotalGraph from './TotalGraph';

const TotalGraphConnected: FC = () => {
  const [timeframe] = useState<tfTypes>('daily');
  const dispatch = useAppDispatch();
  const selectedPeriod = useAppSelector(graphControlValue);
  const handlePeriod = useCallback(
    (ctrls: IUiControls) => () => dispatch(handleGraphControl(ctrls)),
    [dispatch]
  );

  const isSelected = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const thisHour = startOfHour(new Date()).getTime();

  const to = useMemo(() => {
    switch (timeframe) {
      case 'daily':
        return Math.ceil(endOfDay(thisHour).getTime() / 1000 / 3600 / 24);
      default:
        return thisHour / 1000 / 3600;
    }
  }, [thisHour, timeframe]);

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    switch (timeframe) {
      case 'daily':
        return Math.floor(
          endOfDay(addDays(thisHour, -selectedPeriod)).getTime() /
            1000 /
            3600 /
            24
        );
      default:
        return addDays(thisHour, -selectedPeriod).getTime() / 1000 / 3600;
    }
  }, [selectedPeriod, thisHour, timeframe]);

  const { data, isFetching } = useGetTotalActivityOverTimeQuery({
    from,
    to,
    asset: null,
    timeframe,
    slices: ['usd_amount_in', 'usd_amount_out'],
  });

  return (
    <TotalGraph
      data={data || []}
      handlePeriod={handlePeriod}
      isSelected={isSelected}
      isLoading={isFetching}
    />
  );
};

export default memo(TotalGraphConnected);
