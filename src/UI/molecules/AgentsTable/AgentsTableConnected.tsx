import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTopAAbyTvlQuery, useGetTopAAbyTypeQuery } from 'store/AAstats';
import {
  addressesSelector,
  descriptionByAddressSelector,
  obyteApi,
} from 'store/Obyte';
import {
  aaTopTableSortTypeSelector,
  agentsTableControl,
  handleAAtopTableSortType,
  handleAgentsTablePeriodControl,
} from 'store/UI';
import AgentsTable from './AgentsTable';

const AgentsTableConnected: FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { value: selectedPeriod, timeframe = 'daily' } =
    useAppSelector(agentsTableControl);
  const [limit] = useState(250);
  const type = useAppSelector(aaTopTableSortTypeSelector);
  const [sortByTvl, setSortByTvl] = useState(false);
  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  const dd = useAppSelector(descriptionByAddressSelector);
  const addresses = useAppSelector(addressesSelector);

  const handlePeriod = useCallback(
    (value: number) => () => dispatch(handleAgentsTablePeriodControl(value)),
    [dispatch]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const onChangeSortType = useCallback(
    (dataKey: string) => {
      if (dataKey === 'usd_balance') {
        setSortByTvl(true);
        return;
      }
      setSortByTvl(false);
      dispatch(handleAAtopTableSortType(dataKey as topAATypes));
    },
    [dispatch]
  );

  const onNavigate = useCallback(
    (address: string) => () => nav(`aa/${address}`),
    [nav]
  );

  const { data, isFetching } = useGetTopAAbyTypeQuery({
    from,
    to,
    timeframe,
    limit,
    type,
  });

  // const period = useMemo(
  //   () => (timeframe === 'daily' ? to * 24 : to),
  //   [timeframe, to]
  // );

  const getDef = useCallback((address: string) => dd(address), [dd]);

  const { data: tvl } = useGetTopAAbyTvlQuery({});

  const aaTop = useMemo(() => {
    if (data) {
      const res = data.reduce((accu: IMergedTopAA[], curr) => {
        if (tvl) {
          const tvlData = tvl.find((t) => t.address === curr.address);
          if (tvlData) {
            return accu.concat({
              ...curr,
              agent: getDef(curr.address),
              usd_balance: tvlData.usd_balance,
            });
          }
          return accu.concat({
            ...curr,
            agent: getDef(curr.address),
            usd_balance: 'no data',
          });
        }
        return accu;
      }, []);
      if (sortByTvl) {
        return res.sort(
          (a, b) =>
            +b.usd_balance.replace(/\D/g, '') -
            +a.usd_balance.replace(/\D/g, '')
        );
      }
      return res;
    }
    return [];
  }, [data, getDef, sortByTvl, tvl]);

  useEffect(() => {
    if (addresses.length > 0) {
      dispatch(obyteApi.util.prefetch('getDefinitions', addresses, {}));
    }
  }, [addresses, dispatch]);

  return (
    <AgentsTable
      data={aaTop}
      isLoading={isFetching}
      onChangeSortType={onChangeSortType}
      onNavigate={onNavigate}
      handlePeriod={handlePeriod}
      isSelectedPeriod={isSelectedPeriod}
    />
  );
};

export default memo(AgentsTableConnected);
