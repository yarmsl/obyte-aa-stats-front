import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTvlOverTimeValuesForOneAddressQuery } from 'store/AAstats';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import ValueWidget from '../ValueWidget/ValueWidget';

const AgentTvlValueWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const { from, now } = useTimeframe(2, 'hourly');

  const { data, isFetching } = useGetTvlOverTimeValuesForOneAddressQuery(
    {
      address,
      from,
      to: now,
    },
    { skip: !address }
  );

  const [prev, value] = useMemo(() => data || [0, 0], [data]);

  return (
    <NeuBox>
      <ValueWidget
        value={value}
        title='Total Value Locked'
        unit='$'
        shorten
        trend={prev}
        trendTooltip='TVL compared to the previous period (24h)'
        isLoading={isFetching}
      />
    </NeuBox>
  );
};

export default memo(AgentTvlValueWidget);
