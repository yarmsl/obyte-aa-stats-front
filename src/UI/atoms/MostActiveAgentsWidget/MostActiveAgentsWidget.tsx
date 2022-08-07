/* eslint-disable camelcase */
import { Box, Divider, Link, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';
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
          <Typography sx={styles.title}>Most Active Agents.</Typography>
          <Typography color='secondary.dark' sx={styles.title}>
            Turnover 24h
          </Typography>
        </Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.content} onMouseDown={stopPropagate}>
          {mostActiveAgents.map(({ title, address, usd_amount_in }, i) => (
            <Link
              key={address}
              component={RouterLink}
              to={`aa/${address}`}
              sx={styles.link}
            >
              <Typography sx={styles.index}>{`${i + 1}.`}</Typography>
              <Box sx={styles.titleBox}>
                <Typography sx={styles.addressTitle}>{title}</Typography>
                {address !== title && (
                  <Typography sx={styles.addressSubtitle}>{address}</Typography>
                )}
              </Box>
              <Typography
                sx={styles.value}
                color='secondary.dark'
                fontSize='inherit'
              >
                {usd_amount_in}
              </Typography>
            </Link>
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
