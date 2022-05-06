import { addDays, startOfHour } from 'date-fns';
import { FC, memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetTotalActivityOverTimeQuery,
  useGetTotalTvlOverTimeQuery,
} from 'store/AAstats';
import { handleGraphControl, graphControlValue } from 'store/UI';
import TotalGraph from './TotalGraph';

const TotalGraphConnected: FC = () => {
  const dispatch = useAppDispatch();
  const selectedPeriod = useAppSelector(graphControlValue);
  const handlePeriod = useCallback(
    (ctrls: IUiControls) => dispatch(handleGraphControl(ctrls)),
    [dispatch]
  );

  const isSelected = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const to = useMemo(() => startOfHour(new Date()).getTime() / 1000 / 3600, []);

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    return (
      addDays(startOfHour(new Date()).getTime(), -selectedPeriod).getTime() /
      1000 /
      3600
    );
  }, [selectedPeriod]);

  const { data: activity } = useGetTotalActivityOverTimeQuery({
    from,
    to,
    asset: null,
    timeframe: 'hourly',
  });

  const { data: tvl } = useGetTotalTvlOverTimeQuery({
    from,
    to,
    asset: null,
  });

  console.log(tvl);

  const activityData = useMemo(
    () => (Array.isArray(activity) ? activity : []),
    [activity]
  );

  console.log(
    [...activityData]
      .sort((a, b) => a.period - b.period)
      .map((a) => ({
        ...a,
        period: new Date(a.period * 3600 * 1000).toLocaleDateString('RU'),
        old_period: a.period,
      }))
  );

  const processData = useCallback(
    (data: keyof ITotalActivity, title: string) => ({
      id: title,
      data: [...activityData]
        .sort((a, b) => a.period - b.period)
        .map((d) => ({
          x: new Date(d.period * 1000 * 3600),
          y: d[data],
        })),
    }),
    [activityData]
  );

  const totalData = useMemo(
    () => [
      // processData('balance', 'Balance'),
      // processData('usd_balance', 'USD Balance'),
      processData('amount_in', 'USD in'),
      processData('amount_out', 'USD out'),
      // processData('usd_amount_in', 'USD Amount in'),
      // processData('usd_amount_out', 'USD Amount out'),
      // processData('triggers_count', 'Triggers'),
      // processData('num_users', 'Users'),
    ],
    [processData]
  );

  console.log(totalData);

  return (
    <TotalGraph
      data={totalData}
      handlePeriod={handlePeriod}
      isSelected={isSelected}
    />
  );
};

export default memo(TotalGraphConnected);
