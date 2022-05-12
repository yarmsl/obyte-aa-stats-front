import { Box } from '@mui/material';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
// import { useGetStatsForOneAddressQuery } from 'store/AAstats';

const AgentInfoWidget: FC = () => {
  const { address } = useParams<{ address: string }>();
  console.log(address);

  // const {data} = useGetStatsForOneAddressQuery({

  // })

  return <Box>123</Box>;
};

export default memo(AgentInfoWidget);
