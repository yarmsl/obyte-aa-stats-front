import { addDays, endOfDay, startOfHour } from 'date-fns';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTotalActivityOverTimeQuery } from 'store/AAstats';
import {
  handleTotalGraphPeriodControl,
  totalGraphControlValue,
  totalGraphActivityControl,
  handleTotalGraphActivitiesControls,
} from 'store/UI';
import { totalGraphActivitiesUiControls } from 'conf/uiControls';
import TotalGraph from './TotalGraph';

const TotalGraphConnected: FC = () => {
  const [timeframe] = useState<tfTypes>('daily');
  const dispatch = useAppDispatch();
  const selectedPeriod = useAppSelector(totalGraphControlValue);
  const selectedActivities = useAppSelector(totalGraphActivityControl);

  const handlePeriod = useCallback(
    (value: number) => () => dispatch(handleTotalGraphPeriodControl(value)),
    [dispatch]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const handleActivities = useCallback(
    (value: keyof ITotalActivity) => () => {
      const isSelected = selectedActivities.some((a) => a.value === value);
      const conf = totalGraphActivitiesUiControls.find(
        (c) => c.value === value
      );
      if (conf) {
        if (!isSelected) {
          dispatch(
            handleTotalGraphActivitiesControls(
              [...selectedActivities, conf].sort((a, b) =>
                a.value.localeCompare(b.value)
              )
            )
          );
        } else if (selectedActivities.length > 1) {
          dispatch(
            handleTotalGraphActivitiesControls(
              selectedActivities.filter((a) => a.value !== value)
            )
          );
        }
      }
    },
    [dispatch, selectedActivities]
  );

  const isSelectedActivities = useCallback(
    (value: keyof ITotalActivity) =>
      selectedActivities.some((a) => a.value === value),
    [selectedActivities]
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
    slices: selectedActivities,
  });

  return (
    <TotalGraph
      data={data || []}
      handlePeriod={handlePeriod}
      isSelectedPeriod={isSelectedPeriod}
      handleActivities={handleActivities}
      isSelectedActivities={isSelectedActivities}
      isLoading={isFetching}
    />
  );
};

export default memo(TotalGraphConnected);
