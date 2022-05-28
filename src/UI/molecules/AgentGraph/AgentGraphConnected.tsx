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
  assetSelector,
  handleAgentGraphActivitiesControls,
  handleAgentGraphPeriodControl,
} from 'store/UI';
import AgentGraph from './AgentGraph';

const AgentGraphConnected: FC = () => {
  const dispatch = useAppDispatch();
  const { address = '' } = useParams<{ address: string }>();
  const asset = useAppSelector(assetSelector);
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
    },
    { skip: !!tvlConf }
  );

  const graphData = useMemo(() => {
    let addressData = Array.isArray(data) ? data : [];
    if (asset === 'all') {
      const uniqPeriods = Array.from(
        new Set(addressData.map((ad) => ad.period))
      );
      addressData = uniqPeriods.map((uniqPeriod) => {
        const thisPeriodData = addressData.filter(
          (ad) => ad.period === uniqPeriod
        );
        return thisPeriodData.reduce(
          (accu: IAddress, curr) => ({
            ...accu,
            amount_in: accu.amount_in + curr.amount_in,
            amount_out: accu.amount_out + curr.amount_out,
            bounced_count: accu.bounced_count + curr.bounced_count,
            num_users: accu.num_users + curr.num_users,
            triggers_count: accu.triggers_count + curr.triggers_count,
            usd_amount_in: accu.usd_amount_in + curr.usd_amount_in,
            usd_amount_out: accu.usd_amount_out + curr.usd_amount_out,
          }),
          {
            ...thisPeriodData[0],
            amount_in: 0,
            amount_out: 0,
            bounced_count: 0,
            num_users: 0,
            triggers_count: 0,
            usd_amount_in: 0,
            usd_amount_out: 0,
          }
        );
      });
    } else {
      addressData = addressData.filter((ad) => ad.asset === asset);
    }
    return slices.map(({ label, color, value }) => ({
      id: label,
      color,
      data: addressData.map((d) => ({
        x:
          timeframe === 'daily'
            ? new Date(d.period * 3600 * 1000 * 24)
            : new Date(d.period * 3600 * 1000),
        y:
          value !== 'asset' && value !== 'usd_balance'
            ? d[value]
            : d.usd_amount_in,
      })),
    }));
  }, [asset, data, slices, timeframe]);

  const { data: tvlData, isFetching: isTvlFetching } =
    useGetTvlOverTimeForOneAddressQuery(
      {
        address,
        from,
        to,
        timeframe,
      },
      { skip: !tvlConf }
    );

  const tvlGraphData = useMemo(() => {
    let addressTvlData = Array.isArray(tvlData) ? tvlData : [];

    if (asset === 'all') {
      const uniqPeriods = Array.from(
        new Set(addressTvlData.map((atd) => atd.period))
      );
      addressTvlData = uniqPeriods.map((uniqPeriod) => {
        const thisPeriodData = addressTvlData.filter(
          (atd) => atd.period === uniqPeriod
        );
        return thisPeriodData.reduce(
          (accu: IAddressTvl, curr) => ({
            ...accu,
            balance: accu.balance + curr.balance,
            usd_balance: accu.usd_balance + curr.usd_balance,
          }),
          {
            ...thisPeriodData[0],
            balance: 0,
            usd_balance: 0,
          }
        );
      });
    } else {
      addressTvlData = addressTvlData.filter((atd) => atd.asset === asset);
    }

    if (addressTvlData.length > 0 && tvlConf) {
      if (timeframe === 'daily') {
        const dailyTvlPeriods = Array.from(
          new Set(addressTvlData.map((d) => Math.floor(d.period / 24)))
        );
        const dailyTvl = dailyTvlPeriods.map((period) => {
          const hoursTvlByDay = addressTvlData.filter(
            (d) => Math.floor(d.period / 24) === period
          );
          const middle =
            hoursTvlByDay.reduce((accu, curr) => accu + curr.usd_balance, 0) /
            hoursTvlByDay.length;

          return { period, usd_balance: middle };
        });
        return [
          {
            id: tvlConf.label,
            color: tvlConf.color,
            data: dailyTvl.map((d) => ({
              x: new Date(d.period * 3600 * 1000 * 24),
              y: d.usd_balance,
            })),
          },
        ];
      }
      return [
        {
          id: tvlConf.label,
          color: tvlConf.color,
          data: addressTvlData.map((d) => ({
            x: new Date(d.period * 3600 * 1000),
            y: d.usd_balance,
          })),
        },
      ];
    }
    return [];
  }, [asset, timeframe, tvlConf, tvlData]);

  const isLoading = useMemo(
    () => (tvlConf ? isTvlFetching : isFetching),
    [isFetching, tvlConf, isTvlFetching]
  );

  const totalData = useMemo(() => {
    if (tvlConf) {
      return tvlGraphData;
    }
    return graphData;
  }, [graphData, tvlConf, tvlGraphData]);

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
