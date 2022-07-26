import {
  agentGraphUiControls,
  allPeriodsUiControls,
  shortPeriodsUiControls,
} from 'conf/uiControls';
import { useContextMenu } from 'lib/useContextMenu';
import { useLineChart } from 'lib/useLineChart';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useTimeframe } from 'lib/useTimeframe';
import { equals } from 'ramda';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetStatsForOneAddressQuery,
  useGetTvlOverTimeForOneAddressQuery,
} from 'store/AAstats';
import {
  agentGraphActivitiesControlsSelector,
  agentGraphPeriodControlSelector,
  agentGraphTimeframeSelector,
  agentGraphTypeSelector,
  assetSelector,
  assetsSelector,
  handleAgentGraphActivitiesControls,
  handleAgentGraphPeriodControl,
  handleAsset,
  handleAssets,
} from 'store/UI';
import AgentGraph from './AgentGraph';

const AgentGraphConnected: FC = () => {
  // Test
  const [test, setTest] = useState<0 | null>(0);
  const testLabel = useMemo(() => (test === 0 ? 'zero' : 'gap'), [test]);
  const handleZero = useCallback(
    () => setTest((p) => (p === 0 ? null : 0)),
    []
  );
  // end Test

  const dispatch = useAppDispatch();
  const { address = '' } = useParams<{ address: string }>();
  const asset = useAppSelector(assetSelector);
  const selectedAssets = useAppSelector(assetsSelector);
  const timeframe = useAppSelector(agentGraphTimeframeSelector);
  const selectedPeriod = useAppSelector(agentGraphPeriodControlSelector);
  const selectedActivities = useAppSelector(
    agentGraphActivitiesControlsSelector
  );
  const { setUrl } = useStateUrlParams();
  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  const presicion = useMemo(
    () => (timeframe === 'daily' ? 'day' : 'hour'),
    [timeframe]
  );
  const yType = useAppSelector(agentGraphTypeSelector);
  const { mouseX, mouseY, handleOpenContextMenu, handleCloseContextMenu } =
    useContextMenu();

  const handlePeriod = useCallback(
    (value: number) => () => {
      dispatch(handleAgentGraphPeriodControl(value));
      setUrl({ g_period: value });
    },
    [dispatch, setUrl]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const selectButtonConf = useMemo(
    () =>
      asset === 'all'
        ? agentGraphUiControls.filter((ctrl) => ctrl.value !== 'balance')
        : agentGraphUiControls,
    [asset]
  );

  const handleActivities = useCallback(
    (value: keyof IAddressGraphData) => () => {
      const isSelected = selectedActivities.some((a) => a === value);
      const conf = selectButtonConf.find((c) => c.value === value);

      if (conf != null) {
        if (!isSelected) {
          if (
            value === 'usd_balance' ||
            value === 'balance' ||
            value === 'num_users' ||
            value === 'triggers_count'
          ) {
            dispatch(handleAgentGraphActivitiesControls([value]));
            setUrl({ activity: [value] });
            if (
              (value === 'usd_balance' || value === 'balance') &&
              (selectedPeriod > 30 || selectedPeriod === 0)
            ) {
              dispatch(handleAgentGraphPeriodControl(30));
              setUrl({ g_period: 30 });
            }
          } else {
            const activity = [
              ...selectedActivities.filter(
                (sa) => !(sa !== 'usd_amount_in' && sa !== 'usd_amount_out')
              ),
              value,
            ].sort();
            dispatch(handleAgentGraphActivitiesControls(activity));
            setUrl({ activity });
          }
        } else if (selectedActivities.length > 1) {
          const activity = selectedActivities.filter((a) => a !== value);
          dispatch(handleAgentGraphActivitiesControls(activity));
          setUrl({ activity });
        }
      }
    },
    [dispatch, selectButtonConf, selectedActivities, selectedPeriod, setUrl]
  );

  const isSelectedActivities = useCallback(
    (value: keyof IAddressGraphData) =>
      selectedActivities.some((a) => a === value),
    [selectedActivities]
  );

  const slices = useMemo(() => {
    const validActivities = selectedActivities.filter(
      (agc) => !(agc === 'usd_balance' || agc === 'balance')
    );
    return agentGraphUiControls.filter((agc) =>
      validActivities.includes(agc.value)
    );
  }, [selectedActivities]);

  const tvlSelected = useMemo(
    () =>
      selectedActivities.find((sa) => sa === 'usd_balance' || sa === 'balance'),
    [selectedActivities]
  );

  const tvlConf = useMemo(
    () => agentGraphUiControls.find((agc) => agc.value === tvlSelected),
    [tvlSelected]
  );

  const actionButtonsConf = useMemo(() => {
    if (tvlSelected) {
      return shortPeriodsUiControls;
    }
    return allPeriodsUiControls;
  }, [tvlSelected]);

  const { data, isFetching } = useGetStatsForOneAddressQuery(
    {
      address,
      from,
      to,
      timeframe,
    },
    { skip: !!tvlSelected }
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
          value !== 'asset' && value !== 'usd_balance' && value !== 'balance'
            ? d[value] || test
            : d.usd_amount_in,
      })),
    }));
  }, [asset, data, slices, test, timeframe]);

  const { data: tvlData, isFetching: isTvlFetching } =
    useGetTvlOverTimeForOneAddressQuery(
      {
        address,
        from,
        to,
        timeframe,
      },
      { skip: !tvlSelected }
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
          return {
            period,
            usd_balance:
              hoursTvlByDay.reduce((accu, curr) => accu + curr.usd_balance, 0) /
              hoursTvlByDay.length,
            balance:
              hoursTvlByDay.reduce((accu, curr) => accu + curr.balance, 0) /
              hoursTvlByDay.length,
          };
        });
        return [
          {
            id: tvlConf.label,
            color: tvlConf.color,
            data: dailyTvl.map((d) => ({
              x: new Date(d.period * 3600 * 1000 * 24),
              y:
                tvlConf.value === 'balance' || tvlConf.value === 'usd_balance'
                  ? d[tvlConf.value] || test
                  : d.usd_balance,
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
            y:
              tvlConf.value === 'balance' || tvlConf.value === 'usd_balance'
                ? d[tvlConf.value] || test
                : d.usd_balance,
          })),
        },
      ];
    }
    return [];
  }, [asset, test, timeframe, tvlConf, tvlData]);

  const isLoading = useMemo(
    () => (tvlSelected ? isTvlFetching : isFetching),
    [isFetching, tvlSelected, isTvlFetching]
  );

  const totalData = useMemo(() => {
    if (tvlSelected) {
      return tvlGraphData;
    }
    return graphData;
  }, [graphData, tvlSelected, tvlGraphData]);

  const {
    fullDaysBetweenStartAndEnd,
    isDataSerieLessThan1,
    isEveryValOfSerieIsNull,
  } = useLineChart(totalData);

  useEffect(() => {
    if (tvlSelected && tvlData) {
      const assets = Array.from(new Set(tvlData.map((t) => t.asset))).filter(
        (a) => a != null
      );
      if (!equals(selectedAssets, assets)) {
        dispatch(handleAssets(assets));
      }
      if (
        !assets.some((a) => a === asset) &&
        asset !== 'all' &&
        asset !== null
      ) {
        dispatch(handleAsset('all'));
      }
    } else if (data) {
      const assets = Array.from(new Set(data.map((d) => d.asset))).filter(
        (a) => a != null
      );
      if (!equals(selectedAssets, assets)) {
        dispatch(handleAssets(assets));
      }
      if (
        !assets.some((a) => a === asset) &&
        asset !== 'all' &&
        asset !== null
      ) {
        dispatch(handleAsset('all'));
      }
    }
  }, [asset, data, dispatch, selectedAssets, tvlData, tvlSelected]);

  useEffect(() => {
    if (asset === 'all' && selectedActivities[0] === 'balance') {
      dispatch(
        handleAgentGraphActivitiesControls(
          selectButtonConf
            .filter((sbc) => sbc.value === 'usd_balance')
            .map((sbc) => sbc.value)
        )
      );
    }
  }, [asset, dispatch, selectButtonConf, selectedActivities]);

  return (
    <AgentGraph
      data={totalData}
      handlePeriod={handlePeriod}
      isSelectedPeriod={isSelectedPeriod}
      handleActivities={handleActivities}
      isSelectedActivities={isSelectedActivities}
      presicion={presicion}
      yType={yType}
      isLoading={isLoading}
      actionButtonsConf={actionButtonsConf}
      selectButtonConf={selectButtonConf}
      fullDaysBetweenStartAndEnd={fullDaysBetweenStartAndEnd}
      isDataSerieLessThan1={isDataSerieLessThan1}
      isEveryValOfSerieIsNull={isEveryValOfSerieIsNull}
      onContextMenu={handleOpenContextMenu}
      mouseX={mouseX}
      mouseY={mouseY}
      onContextMenuClose={handleCloseContextMenu}
      testLabel={testLabel}
      handleZero={handleZero}
    />
  );
};

export default memo(AgentGraphConnected);
