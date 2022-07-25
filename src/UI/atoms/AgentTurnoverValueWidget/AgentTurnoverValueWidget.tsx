import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUsdInValuesForOneAddressQuery } from 'store/AAstats';
import NeuBox from 'UI/templates/NeuBox/NeuBox';
import ValueWidget from '../ValueWidget/ValueWidget';

const AgentTurnoverValueWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const { from, to } = useTimeframe(3, 'daily');
  const { data, isFetching } = useGetUsdInValuesForOneAddressQuery(
    {
      from,
      to: to - 1,
      timeframe: 'daily',
      address,
    },
    { skip: !address }
  );

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

export default memo(AgentTurnoverValueWidget);
