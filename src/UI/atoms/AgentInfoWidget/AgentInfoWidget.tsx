/* eslint-disable camelcase */
import { Box, Typography } from '@mui/material';
import { useTimeframe } from 'lib/useTimeframe';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import { useGetStatsForOneAddressQuery } from 'store/AAstats';
import { definitionByAddressSelector } from 'store/Obyte';

const AgentInfoWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const { to } = useTimeframe(0, 'daily');
  const dd = useAppSelector(definitionByAddressSelector);
  const {
    description,
    homepage_url = '',
    field_descriptions,
  } = useMemo(() => dd(address), [address, dd]);
  const { data } = useGetStatsForOneAddressQuery(
    {
      address,
      timeframe: 'daily',
      from: 0,
      to,
    },
    { skip: address == null }
  );

  console.log(data);

  const about = useMemo(
    () =>
      field_descriptions != null
        ? Object.keys(field_descriptions).map((key) => ({
            field: key,
            value: field_descriptions[key],
          }))
        : [{ field: '', value: 'no data' }],
    [field_descriptions]
  );

  console.log(about);

  return (
    <Box>
      <Typography>{description}</Typography>
      <Typography>{homepage_url}</Typography>
    </Box>
  );
};

export default memo(AgentInfoWidget);
