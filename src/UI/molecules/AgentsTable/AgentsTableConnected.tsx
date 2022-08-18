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
