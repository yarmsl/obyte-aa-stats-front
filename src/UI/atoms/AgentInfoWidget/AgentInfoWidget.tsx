/* eslint-disable camelcase */
import { FC, memo, useEffect, useMemo } from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Link, Typography, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';

import {
  explorerAnalyticsClickEvent,
  homepageAnalyticsClickEvent,
  githubAnalyticsClickEvent,
} from 'lib/analytics';
import { useMedia } from 'lib/useMedia';
import { useAppDispatch, useAppSelector } from 'store';
import { getTvlByAddressSelector } from 'store/AAstats';
import {
  descriptionByAddressSelector,
  obyteApi,
  safetyDefinitionByAddressSelector,
} from 'store/Obyte';

import { styles } from './styles';

const AgentInfoWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const getTvlByAddress = useAppSelector(getTvlByAddressSelector);
  const dispatch = useAppDispatch();
  const dd = useAppSelector(safetyDefinitionByAddressSelector);
  const getDescription = useAppSelector(descriptionByAddressSelector);
  const { isPortable } = useMedia();

  const { homepage_url = '', source_url = '' } = useMemo(
    () => dd(address),
    [address, dd]
  );

  const description = useMemo(
    () => getDescription(address),
    [address, getDescription]
  );

  const subtitle = useMemo(
    () => (address !== description ? address : null),
    [address, description]
  );

  const usd_balance = useMemo(
    () => getTvlByAddress(address),
    [address, getTvlByAddress]
  );

  useEffect(() => {
    dispatch(
      obyteApi.util.prefetch('getDefinitions', [{ address, usd_balance }], {})
    );
  }, [address, dispatch, usd_balance]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleBox}>
        <Typography component='h1' sx={styles.title}>
          {description}
        </Typography>
        {subtitle && (
          <Typography component='h2' sx={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={styles.linksWrapper}>
        <Link
          component={isPortable ? IconButton : 'a'}
          href={`https://explorer.obyte.org/#${address}`}
          sx={styles.link}
          target='_blank'
          onClick={explorerAnalyticsClickEvent}
        >
          <ExploreIcon />
          <Typography sx={styles.linkText}>Explorer</Typography>
        </Link>
        {homepage_url && (
          <Link
            component={isPortable ? IconButton : 'a'}
            href={homepage_url}
            sx={styles.link}
            target='_blank'
            onClick={homepageAnalyticsClickEvent}
          >
            <HomeRoundedIcon />
            <Typography sx={styles.linkText}>Homepage</Typography>
          </Link>
        )}
        {source_url && (
          <Link
            component={isPortable ? IconButton : 'a'}
            href={source_url}
            sx={styles.link}
            target='_blank'
            onClick={githubAnalyticsClickEvent}
          >
            <GitHubIcon />
            <Typography sx={styles.linkText}>GitHub</Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default memo(AgentInfoWidget);
