import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTopAACombinedByTypeQuery } from 'store/AAstats';
import { obyteApi } from 'store/Obyte';
import {
  agentsTableSortTypeSelector,
  agentsTablePeriodSelector,
  handleAgentsTableSortType,
  // handleAgentsTableSortByTvl,
  handleAgentsTablePeriodControl,
  agentsTableTimeframeSelector,
} from 'store/UI';
import AgentsTable from './AgentsTable';

const AgentsTableConnected: FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const selectedPeriod = useAppSelector(agentsTablePeriodSelector);
  const timeframe = useAppSelector(agentsTableTimeframeSelector);
  const type = useAppSelector(agentsTableSortTypeSelector);

  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  // const dd = useAppSelector(descriptionByAddressSelector);

  const { setUrl } = useStateUrlParams();

  const handlePeriod = useCallback(
    (value: number) => () => {
      dispatch(handleAgentsTablePeriodControl(value));
      setUrl({ t_period: value });
    },
    [dispatch, setUrl]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const onChangeSortType = useCallback(
    (dataKey: string) => () => {
      dispatch(handleAgentsTableSortType(dataKey as combinedTypes));
      setUrl({ t_sort: dataKey as combinedTypes });
    },
    [dispatch, setUrl]
  );

  const onNavigate = useCallback(
    (address: string) => () => {
      nav(`/aa/${address}`);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    [nav]
  );
  // const getDef = useCallback((address: string) => dd(address), [dd]);

  // const { data, isFetching } = useGetTopAAbyTypeQuery({
  //   from,
  //   to,
  //   timeframe,
  //   limit: 10000,
  //   type,
  // });

  // const { data: tvl } = useGetTopAAbyTvlQuery({});

  // const aaTop = useMemo(() => {
  //   if (data && tvl) {
  //     if (isSortByTvl) {
  //       return tvl
  //         .reduce((accu: IMergedTopAA[], curr) => {
  //           const amountData = data.find(
  //             (amount) => amount.address === curr.address
  //           );
  //           if (amountData) {
  //             return accu.concat({
  //               ...curr,
  //               agent: getDef(curr.address),
  //               usd_amount_in: amountData.usd_amount_in,
  //               usd_amount_out: amountData.usd_amount_out,
  //             });
  //           }
  //           return accu.concat({
  //             ...curr,
  //             agent: getDef(curr.address),
  //             usd_amount_in: 0,
  //             usd_amount_out: 0,
  //           });
  //         }, [])
  //         .filter(
  //           (res) =>
  //             !(
  //               res.usd_amount_in === 0 &&
  //               res.usd_amount_out === 0 &&
  //               res.usd_balance === 0
  //             )
  //         );
  //     }
  //     return data
  //       .reduce((accu: IMergedTopAA[], curr) => {
  //         const tvlData = tvl.find((t) => t.address === curr.address);
  //         if (tvlData) {
  //           return accu.concat({
  //             ...curr,
  //             agent: getDef(curr.address),
  //             usd_balance: tvlData.usd_balance,
  //           });
  //         }
  //         return accu.concat({
  //           ...curr,
  //           agent: getDef(curr.address),
  //           usd_balance: 0,
  //         });
  //       }, [])
  //       .filter(
  //         (res) =>
  //           !(
  //             res.usd_amount_in === 0 &&
  //             res.usd_amount_out === 0 &&
  //             res.usd_balance === 0
  //           )
  //       );
  //   }
  //   return [];
  // }, [data, getDef, isSortByTvl, tvl]);

  const isSortSelected = useCallback(
    (dataKey: keyof IGetTopAACombinedByTypeRes) => type === dataKey,
    [type]
  );

  const { data, isFetching } = useGetTopAACombinedByTypeQuery({
    from,
    to,
    type,
    timeframe,
  });

  useEffect(() => {
    if (data) dispatch(obyteApi.util.prefetch('getDefinitions', data, {}));
  }, [dispatch, data]);

  return (
    <AgentsTable
      data={data || []}
      isLoading={isFetching}
      onChangeSortType={onChangeSortType}
      onNavigate={onNavigate}
      handlePeriod={handlePeriod}
      isSelectedPeriod={isSelectedPeriod}
      isSortSelected={isSortSelected}
    />
  );
};

export default memo(AgentsTableConnected);
