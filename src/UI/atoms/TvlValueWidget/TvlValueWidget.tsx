import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useMemo } from 'react';
import { useGetTotalTvlValuesQuery } from 'store/AAstats';
import ValueWidget from '../ValueWidget/ValueWidget';

const TvlValueWidget: FC = () => {
  const { from, now } = useTimeframe(2, 'hourly');

  const { data, isFetching } = useGetTotalTvlValuesQuery({
    from,
    to: now,
  });

  const [prev, value] = useMemo(() => {
    if (data && data.length === 2) {
      return data.map((d) => d.usd_balance);
    }
    return [0, 0];
  }, [data]);

  return (
    <ValueWidget
      value={value}
      title='Total Value Locked'
      unit='$'
      shorten
      trend={prev}
      trendTooltip='TVL compared to the previous period (24h)'
      isLoading={isFetching}
    />
  );
};

export default memo(TvlValueWidget);