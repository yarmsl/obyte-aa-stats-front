import { addDays, endOfDay, startOfDay, startOfHour } from 'date-fns';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTopAAbyTvlQuery, useGetTopAAbyTypeQuery } from 'store/AAstats';
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
  const thisHour = startOfHour(new Date()).getTime();

  const handlePeriod = useCallback(
    (value: number) => () => dispatch(handleAgentsTablePeriodControl(value)),
    [dispatch]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const to = useMemo(() => {
    if (selectedPeriod === 2) {
      return Math.floor(
        endOfDay(addDays(thisHour, -1)).getTime() / 1000 / 3600
      );
    }
    switch (timeframe) {
      case 'daily':
        return Math.floor(endOfDay(thisHour).getTime() / 1000 / 3600 / 24);
      default:
        return Math.floor(thisHour / 1000 / 3600);
    }
  }, [selectedPeriod, thisHour, timeframe]);

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    if (selectedPeriod === 1) {
      return Math.ceil(startOfDay(thisHour).getTime() / 1000 / 3600);
    }
    if (selectedPeriod === 2) {
      return Math.ceil(
        startOfDay(addDays(thisHour, -1)).getTime() / 1000 / 3600
      );
    }
    switch (timeframe) {
      case 'daily':
        return Math.ceil(
          endOfDay(addDays(thisHour, -selectedPeriod)).getTime() /
            1000 /
            3600 /
            24
        );
      default:
        return Math.ceil(
          addDays(thisHour, -selectedPeriod).getTime() / 1000 / 3600
        );
    }
  }, [selectedPeriod, thisHour, timeframe]);

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
