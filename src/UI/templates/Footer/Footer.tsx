import { Box, Link, Typography } from '@mui/material';
import { FC, memo } from 'react';
import SocialBlock from 'UI/atoms/SocialBlock/SocialBlock';
import { styles } from './styles';

const Footer: FC = () => (
  <Box component='footer' sx={styles.root}>
    <SocialBlock />
    <Box>
      <Typography sx={styles.copyright}>
        © 2022{' '}
        <Link sx={styles.link} href='https://obyte.org/' target='_blank'>
          Obyte.
        </Link>{' '}
        All Rights Reserved
      </Typography>
    </Box>
  </Box>
);

export default memo(Footer);
