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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useTimeframe } from 'lib/useTimeframe';
import { useGetMostActiveAgentsQuery } from 'store/AAstats';
import { safetyDefinitionByAddressSelector } from 'store/Obyte';
import { useAppSelector } from 'store';
import { Link as RouterLink } from 'react-router-dom';
import { usd } from 'lib/currency';
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
            usd_amount_in: usd(ad.usd_amount_in, 2, true),
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
        {mostActiveAgents.map(
          ({ title, address, usd_amount_in, num_users, triggers_count }, i) => (
            <Box key={address} sx={styles.mostActiveAA}>
              <Link component={RouterLink} to={`aa/${address}`} sx={styles.top}>
                {`${i + 1}. ${title}`}
              </Link>
              <Box sx={styles.stats}>
                <Tooltip title='Turnover' arrow>
                  <Box sx={styles.counter}>
                    <Typography color='secondary.dark' fontSize='inherit'>
                      {usd_amount_in}
                    </Typography>
                  </Box>
                </Tooltip>
                <Tooltip title='Number of users' arrow>
                  <Box sx={styles.counter}>
                    <PeopleAltIcon color='info' fontSize='inherit' />
                    <Typography color='info.main' fontSize='inherit'>
                      {num_users}
                    </Typography>
                  </Box>
                </Tooltip>
                <Tooltip title='Number of requests' arrow>
                  <Box sx={styles.counter}>
                    <QueryStatsIcon sx={{ color: 'teal' }} fontSize='inherit' />
                    <Typography color='teal' fontSize='inherit'>
                      {triggers_count}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          )
        )}
      </Box>
      <WaterMark />
      {isFetching && (
        <Skeleton sx={styles.skeleton} variant='rectangular' animation='wave' />
      )}
    </Box>
  );
};

export default memo(MostActiveAgentsWidget);
