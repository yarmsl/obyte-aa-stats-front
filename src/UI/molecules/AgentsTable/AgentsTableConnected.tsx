import { addDays, endOfDay, startOfHour } from 'date-fns';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetTopAAbyTypeQuery } from 'store/AAstats';
import { aaTopTableSortTypeSelector, handleAAtopTableSortType } from 'store/UI';
import AgentsTable from './AgentsTable';

const AgentsTableConnected: FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [timeframe] = useState<tfTypes>('daily');
  const [selectedPeriod] = useState(0);
  const [limit] = useState(250);
  const type = useAppSelector(aaTopTableSortTypeSelector);
  const thisHour = startOfHour(new Date()).getTime();

  const to = useMemo(() => {
    switch (timeframe) {
      case 'daily':
        return Math.ceil(endOfDay(thisHour).getTime() / 1000 / 3600 / 24);
      default:
        return thisHour / 1000 / 3600;
    }
  }, [thisHour, timeframe]);

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    switch (timeframe) {
      case 'daily':
        return Math.floor(
          endOfDay(addDays(thisHour, -selectedPeriod)).getTime() /
            1000 /
            3600 /
            24
        );
      default:
        return addDays(thisHour, -selectedPeriod).getTime() / 1000 / 3600;
    }
  }, [selectedPeriod, thisHour, timeframe]);

  const onChangeSortType = useCallback(
    (dataKey: string) => {
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

  return (
    <AgentsTable
      data={data || []}
      isLoading={isFetching}
      onChangeSortType={onChangeSortType}
      onNavigate={onNavigate}
    />
  );
};

export default memo(AgentsTableConnected);
