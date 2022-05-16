import { Box } from '@mui/material';
import { usd } from 'lib/currency';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetStatsForOneAddressQuery } from 'store/AAstats';

const AgentInfoWidget: FC = () => {
  const { address } = useParams<{ address: string }>();
  console.log(address);

  const { data } = useGetStatsForOneAddressQuery({
    address: 'LEECDEWCDQHGSMCJCTGY3SD5T3R4IZ65',
    timeframe: 'daily',
    from: 19035,
    to: 19126,
  });

  const sorted = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return [...data]
        .sort((a, b) => b.usd_amount_in - a.usd_amount_in)
        .slice(0, 10)
        .map((d) => ({
          ...d,
          usd_amount_in: usd(d.usd_amount_in),
          usd_amount_out: usd(d.usd_amount_out),
        }));
    }
    return [];
  }, [data]);

  console.log(sorted);

  console.log(new Date(19076 * 1000 * 3600 * 24).toDateString());

  return <Box>123</Box>;
};

export default memo(AgentInfoWidget);
