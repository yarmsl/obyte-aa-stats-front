import { FC, memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTotalActivityOverTimeQuery } from 'store/AAstats';
import {
  handleTotalGraphPeriodControl,
  totalGraphControlValue,
  totalGraphActivityControl,
  handleTotalGraphActivitiesControls,
} from 'store/UI';
import { totalGraphActivitiesUiControls } from 'conf/uiControls';
import { useTimeframe } from 'lib/useTimeframe';
import TotalGraph from './TotalGraph';

const TotalGraphConnected: FC = () => {
  const [timeframe] = useState<tfTypes>('daily');
  const dispatch = useAppDispatch();
  const selectedPeriod = useAppSelector(totalGraphControlValue);
  const selectedActivities = useAppSelector(totalGraphActivityControl);
  const { from, to } = useTimeframe(selectedPeriod, timeframe);

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

  const { data, isFetching } = useGetTotalActivityOverTimeQuery({
    from,
    to,
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
