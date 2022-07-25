import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useMemo } from 'react';
import { useGetTotalUsdInValuesQuery } from 'store/AAstats';
import NeuBox from 'UI/templates/NeuBox/NeuBox';
import ValueWidget from '../ValueWidget/ValueWidget';

const TurnoverValueWidget: FC = () => {
  const { from, to } = useTimeframe(3, 'daily');
  const { data, isFetching } = useGetTotalUsdInValuesQuery({
    from,
    to: to - 1,
    timeframe: 'daily',
  });

  const [prev, value] = useMemo(() => data || [0, 0], [data]);

  return (
    <NeuBox>
      <ValueWidget
        value={value}
        title='Turnover'
        unit='$'
        shorten
        trend={prev}
        trendTooltip='Turnover compared to the previous period (24h)'
        isLoading={isFetching}
      />
    </NeuBox>
  );
};

export default memo(TurnoverValueWidget);
