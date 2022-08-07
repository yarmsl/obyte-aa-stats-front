/* eslint-disable camelcase */
import { Box, Link, Typography, IconButton } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import GitHubIcon from '@mui/icons-material/GitHub';
import { safetyDefinitionByAddressSelector } from 'store/Obyte';
import { useMedia } from 'lib/useMedia';
import {
  explorerAnalyticsClickEvent,
  homepageAnalyticsClickEvent,
  githubAnalyticsClickEvent,
} from 'lib/analytics';
import { styles } from './styles';

const AgentInfoWidget: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const dd = useAppSelector(safetyDefinitionByAddressSelector);
  const {
    description,
    homepage_url = '',
    source_url = '',
  } = useMemo(() => dd(address), [address, dd]);

  const { isPortable } = useMedia();
  const subtitle = useMemo(
    () => (address !== description ? address : null),
    [address, description]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.title} component='h3'>
          {description}
        </Typography>
        {subtitle && (
          <Typography sx={styles.subtitle} component='h4'>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={styles.linksWrapper}>
        <Link
          component={isPortable ? IconButton : 'a'}
          sx={styles.link}
          href={`https://explorer.obyte.org/#${address}`}
          target='_blank'
          onClick={explorerAnalyticsClickEvent}
        >
          <ExploreIcon />
          <Typography sx={styles.linkText}>Explorer</Typography>
        </Link>
        {homepage_url && (
          <Link
            component={isPortable ? IconButton : 'a'}
            sx={styles.link}
            href={homepage_url}
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
            sx={styles.link}
            href={source_url}
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
