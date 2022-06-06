/* eslint-disable camelcase */
import {
  Box,
  Divider,
  IconButton,
  Link,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC, memo, useMemo } from 'react';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useTimeframe } from 'lib/useTimeframe';
import { useGetMostActiveAgentsQuery } from 'store/AAstats';
import { safetyDefinitionByAddressSelector } from 'store/Obyte';
import { useAppSelector } from 'store';
import { Link as RouterLink } from 'react-router-dom';
import WaterMark from '../WaterMark/WaterMark';
import { styles } from './styles';

const MostActiveAgentsWidget: FC = () => {
  const getDefinition = useAppSelector(safetyDefinitionByAddressSelector);
  const { from, now } = useTimeframe(2, 'hourly');
  const { data, isFetching } = useGetMostActiveAgentsQuery({
    from,
    to: now,
    timeframe: 'hourly',
    limit: 3,
  });

  const mostActiveAgents = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((ad) => ({
            ...ad,
            title: getDefinition(ad.address).description,
          }))
        : [],
    [data, getDefinition]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.head}>
        <Typography sx={styles.title}>Most Active Agents</Typography>
        <Tooltip title='Most active agents in the last 24h'>
          <IconButton size='small'>
            <HelpOutlineRoundedIcon fontSize='inherit' />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={styles.divider} />
      <Box sx={styles.content}>
        {mostActiveAgents.map(({ title, address }, i) => (
          <Link
            component={RouterLink}
            to={`aa/${address}`}
            sx={styles[`top${i + 1}`]}
            key={address}
          >
            {title}
          </Link>
        ))}
      </Box>
      <WaterMark />
      {isFetching && (
        <Skeleton sx={styles.skeleton} variant='rectangular' animation='wave' />
      )}
    </Box>
  );
};

export default memo(MostActiveAgentsWidget);
