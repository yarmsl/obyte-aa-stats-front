import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTopAAbyTvlQuery, useGetTopAAbyTypeQuery } from 'store/AAstats';
import { definitionByAddressSelector } from 'store/Obyte';
import { useGetDefinitionsQuery } from 'store/Obyte/Obyte.service';
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
    (rowData: IRenderAddress) => nav(`aa/${rowData.address}`),
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

  const dd = useAppSelector(definitionByAddressSelector);

  const getDef = useCallback((address: string) => dd(address), [dd]);
  console.log('----> ', getDef('SLFG3AFZQNCLYDXFT4L3CIE7XSIMHEAK'));

  const { data: tvl } = useGetTopAAbyTvlQuery({});

  const aaTop = useMemo(() => {
    if (data) {
      const res = data.reduce((accu: IMergedTopAA[], curr) => {
        if (tvl) {
          const tvlData = tvl.find((t) => t.address === curr.address);
          if (tvlData) {
            return accu.concat({
              ...curr,
              usd_balance: tvlData.usd_balance,
            });
          }
          return accu.concat({ ...curr, usd_balance: 'no data' });
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
  }, [data, sortByTvl, tvl]);

  const addresses = useMemo(() => aaTop.map((aa) => aa.address), [aaTop]);

  const { data: defs } = useGetDefinitionsQuery(addresses, {
    skip: addresses.length === 0,
  });

  console.log(defs);

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
