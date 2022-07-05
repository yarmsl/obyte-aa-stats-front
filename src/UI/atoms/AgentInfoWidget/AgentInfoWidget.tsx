/* eslint-disable camelcase */
import { Box, Link, Typography, IconButton } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import { safetyDefinitionByAddressSelector } from 'store/Obyte';
import { useMedia } from 'lib/useMedia';
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

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleBox}>
        <Typography sx={styles.title}>{description}</Typography>
      </Box>
      <Box sx={styles.linksWrapper}>
        {homepage_url && (
          <Link
            component={isPortable ? IconButton : 'a'}
            sx={styles.link}
            href={homepage_url}
            target='_blank'
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
