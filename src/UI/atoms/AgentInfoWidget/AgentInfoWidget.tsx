/* eslint-disable camelcase */
import { Box, Link, Typography } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';

import { safetyDefinitionByAddressSelector } from 'store/Obyte';

const AgentInfoWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const dd = useAppSelector(safetyDefinitionByAddressSelector);
  const {
    description,
    homepage_url = '',
    source_url = '',
  } = useMemo(() => dd(address), [address, dd]);

  return (
    <Box
      sx={{
        '&>*:not(:last-child)': {
          mb: '10px',
        },
      }}
    >
      <Typography>{description}</Typography>
      {homepage_url && (
        <Link sx={{ display: 'flex' }} href={homepage_url}>
          <HomeRoundedIcon />
          <Typography sx={{ ml: '5px' }}>Homepage</Typography>
        </Link>
      )}
      {source_url && (
        <Link sx={{ display: 'flex' }} href={source_url}>
          <GitHubIcon />
          <Typography sx={{ ml: '5px' }}>GitHub</Typography>
        </Link>
      )}
    </Box>
  );
};

export default memo(AgentInfoWidget);
