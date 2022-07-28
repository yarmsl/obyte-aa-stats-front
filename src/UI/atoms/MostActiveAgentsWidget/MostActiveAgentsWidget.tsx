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
import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useTimeframe } from 'lib/useTimeframe';
import { useGetMostActiveAgentsQuery } from 'store/AAstats';
import { safetyDefinitionByAddressSelector } from 'store/Obyte';
import { useAppSelector } from 'store';
import { Link as RouterLink } from 'react-router-dom';
import { usd } from 'lib/currency';
import NeuBox from 'UI/templates/NeuBox/NeuBox';
import WaterMark from '../WaterMark/WaterMark';
import { styles } from './styles';

const MostActiveAgentsWidget: FC = () => {
  const getDefinition = useAppSelector(safetyDefinitionByAddressSelector);
  const { from, to } = useTimeframe(1, 'hourly');
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { data, isFetching } = useGetMostActiveAgentsQuery({
    from,
    to,
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
    <NeuBox>
      <Box sx={styles.root}>
        <Box sx={styles.head}>
          <Typography sx={styles.title}>Most Active Agents</Typography>
          <Tooltip
            componentsProps={{ tooltip: { sx: styles.tooltip } }}
            title={
              <Box sx={styles.tooltipBox}>
                <Box>
                  <Typography>Most active agents in the last 24h</Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ width: '16px', mr: '5px' }}
                    color='secondary.dark'
                  >
                    $
                  </Typography>
                  <Typography color='secondary.dark'> Turnover</Typography>
                </Box>
              </Box>
            }
          >
            <IconButton sx={{ ml: '10px' }} size='small'>
              <HelpOutlineRoundedIcon fontSize='inherit' />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.content} onMouseDown={stopPropagate}>
          {mostActiveAgents.map(({ title, address, usd_amount_in }, i) => (
            <Box key={address} sx={styles.mostActiveAA}>
              <Link component={RouterLink} to={`aa/${address}`} sx={styles.top}>
                <Typography>{`${i + 1}.`}</Typography>
                <Typography>{title}</Typography>
              </Link>

              <Box sx={styles.stats}>
                <Box sx={styles.counter}>
                  <Typography color='secondary.dark' fontSize='inherit'>
                    {usd_amount_in}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <WaterMark />
        {isFetching && (
          <Skeleton
            sx={styles.skeleton}
            variant='rectangular'
            animation='wave'
          />
        )}
      </Box>
    </NeuBox>
  );
};

export default memo(MostActiveAgentsWidget);
