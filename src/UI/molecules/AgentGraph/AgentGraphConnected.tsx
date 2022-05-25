import {
  agentGraphUiControls,
  longPeriodsUiControls,
  shortPeriodsUiControls,
} from 'conf/uiControls';
import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetStatsForOneAddressQuery,
  useGetTvlOverTimeForOneAddressQuery,
} from 'store/AAstats';
import {
  agentGraphActivitiesControlsSelector,
  agentGraphPeriodControlValueSelector,
  agentGraphTimeframeSelector,
  agentGraphTypeSelector,
  handleAgentGraphActivitiesControls,
  handleAgentGraphPeriodControl,
} from 'store/UI';
import AgentGraph from './AgentGraph';

const AgentGraphConnected: FC = () => {
  const dispatch = useAppDispatch();
  const { address = '' } = useParams<{ address: string }>();
  const timeframe = useAppSelector(agentGraphTimeframeSelector);
  const selectedPeriod = useAppSelector(agentGraphPeriodControlValueSelector);
  const selectedActivities = useAppSelector(
    agentGraphActivitiesControlsSelector
  );
  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  const presicion = useMemo(
    () => (timeframe === 'daily' ? 'day' : 'hour'),
    [timeframe]
  );
  const yType = useAppSelector(agentGraphTypeSelector);

  const handlePeriod = useCallback(
    (value: number) => () => dispatch(handleAgentGraphPeriodControl(value)),
    [dispatch]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const handleActivities = useCallback(
    (value: keyof IAddressGraphData) => () => {
      const isSelected = selectedActivities.some((a) => a.value === value);
      const conf = agentGraphUiControls.find((c) => c.value === value);

      if (conf) {
        if (!isSelected) {
          if (
            value === 'usd_balance' ||
            value === 'num_users' ||
            value === 'triggers_count'
          ) {
            dispatch(handleAgentGraphActivitiesControls([conf]));
            if (value === 'usd_balance' && selectedPeriod !== 30) {
              dispatch(handleAgentGraphPeriodControl(30));
            }
          } else {
            dispatch(
              handleAgentGraphActivitiesControls(
                [
                  ...selectedActivities.filter((sa) => sa.group != null),
                  conf,
                ].sort((a, b) => a.value.localeCompare(b.value))
              )
            );
            if (selectedPeriod < 30 && selectedPeriod > 0) {
              dispatch(handleAgentGraphPeriodControl(30));
            }
          }
        } else if (selectedActivities.length > 1) {
          dispatch(
            handleAgentGraphActivitiesControls(
              selectedActivities.filter((a) => a.value !== value)
            )
          );
        }
      }
    },
    [dispatch, selectedActivities, selectedPeriod]
  );

  const isSelectedActivities = useCallback(
    (value: keyof IAddressGraphData) =>
      selectedActivities.some((a) => a.value === value),
    [selectedActivities]
  );

  const slices = useMemo(
    () => selectedActivities.filter((sa) => sa.value !== 'usd_balance'),
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

  const { data, isFetching } = useGetStatsForOneAddressQuery(
    {
      address,
      from,
      to,
      timeframe,
      slices,
      asset: null,
    },
    { skip: !!tvlConf }
  );

  const { data: tvl, isFetching: isTvlFetching } =
    useGetTvlOverTimeForOneAddressQuery(
      {
        address,
        from,
        to,
        timeframe,
        conf: tvlConf as IUiSelects<IAddressGraphData>,
      },
      { skip: !tvlConf }
    );

  const isLoading = useMemo(
    () => (tvlConf ? isTvlFetching : isFetching),
    [isFetching, tvlConf, isTvlFetching]
  );

  const totalData = useMemo(() => {
    if (tvlConf) {
      return tvl;
    }
    return data;
  }, [data, tvlConf, tvl]);

  return (
    <AgentGraph
      data={totalData || []}
      handlePeriod={handlePeriod}
      isSelectedPeriod={isSelectedPeriod}
      handleActivities={handleActivities}
      isSelectedActivities={isSelectedActivities}
      presicion={presicion}
      yType={yType}
      isLoading={isLoading}
      actionButtonsConf={actionButtonsConf}
    />
  );
};

export default memo(AgentGraphConnected);
