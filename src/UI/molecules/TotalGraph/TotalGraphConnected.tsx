import { FC, memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetTotalActivityOverTimeQuery,
  useGetTotalTvlOverTimeQuery,
} from 'store/AAstats';
import {
  handleTotalGraphPeriodControl,
  totalGraphControlValue,
  totalGraphActivityControl,
  handleTotalGraphActivitiesControls,
  totalGraphTimeframeSelector,
} from 'store/UI';
import {
  longPeriodsUiControls,
  shortPeriodsUiControls,
  totalGraphActivitiesUiControls,
} from 'conf/uiControls';
import { useTimeframe } from 'lib/useTimeframe';
import { useLineChart } from 'lib/useLineChart';
import TotalGraph from './TotalGraph';

const TotalGraphConnected: FC = () => {
  const timeframe = useAppSelector(totalGraphTimeframeSelector);
  const presicion = useMemo(
    () => (timeframe === 'daily' ? 'day' : 'hour'),
    [timeframe]
  );
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
    (value: keyof ITotalWithTvlActivity) => () => {
      const isSelected = selectedActivities.some((a) => a.value === value);
      const conf = totalGraphActivitiesUiControls.find(
        (c) => c.value === value
      );

      if (conf) {
        if (!isSelected) {
          if (value === 'usd_balance') {
            dispatch(handleTotalGraphActivitiesControls([conf]));
            if (selectedPeriod !== 30) {
              dispatch(handleTotalGraphPeriodControl(30));
            }
          } else {
            dispatch(
              handleTotalGraphActivitiesControls(
                [
                  ...selectedActivities.filter((sa) => sa.group != null),
                  conf,
                ].sort((a, b) => a.value.localeCompare(b.value))
              )
            );
            if (selectedPeriod < 30 && selectedPeriod > 0) {
              dispatch(handleTotalGraphPeriodControl(30));
            }
          }
        } else if (selectedActivities.length > 1) {
          dispatch(
            handleTotalGraphActivitiesControls(
              selectedActivities.filter((a) => a.value !== value)
            )
          );
        }
      }
    },
    [dispatch, selectedActivities, selectedPeriod]
  );

  const isSelectedActivities = useCallback(
    (value: keyof ITotalWithTvlActivity) =>
      selectedActivities.some((a) => a.value === value),
    [selectedActivities]
  );

  const slices = useMemo(
    () =>
      selectedActivities.filter(
        (sa) => sa.value !== 'usd_balance'
      ) as IUiSelects<ITotalActivity>[],
    [selectedActivities]
  );

  const tvlConf = useMemo(
    () => selectedActivities.find((sa) => sa.value === 'usd_balance'),
    [selectedActivities]
  );

  const actionButtonsConf = useMemo(() => {
    if (tvlConf) {
      return shortPeriodsUiControls;
    }
    return longPeriodsUiControls;
  }, [tvlConf]);

  const { data, isFetching } = useGetTotalActivityOverTimeQuery(
    {
      from,
      to,
      timeframe,
      slices,
    },
    { skip: !!tvlConf }
  );

  const { data: tvl, isFetching: isTvlFetching } = useGetTotalTvlOverTimeQuery(
    {
      from,
      to,
      timeframe,
      conf: tvlConf as IUiSelects<ITotalWithTvlActivity>,
    },
    { skip: !tvlConf }
  );

  const isLoading = useMemo(
    () => (tvlConf ? isTvlFetching : isFetching),
    [isFetching, tvlConf, isTvlFetching]
  );

  const total = useMemo(() => {
    if (tvlConf) {
      return tvl || [];
    }
    return data || [];
  }, [data, tvlConf, tvl]);

  const { serieLength, isDataSerieLessThan1, isEveryValOfSerieIsNull } =
    useLineChart(total);

  return (
    <TotalGraph
      data={total}
      handlePeriod={handlePeriod}
      isSelectedPeriod={isSelectedPeriod}
      handleActivities={handleActivities}
      isSelectedActivities={isSelectedActivities}
      isLoading={isLoading}
      presicion={presicion}
      actionButtonsConf={actionButtonsConf}
      serieLength={serieLength}
      isDataSerieLessThan1={isDataSerieLessThan1}
      isEveryValOfSerieIsNull={isEveryValOfSerieIsNull}
    />
  );
};

export default memo(TotalGraphConnected);
