import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { styles } from './styles';

const Footer: FC = () => (
  <Box component='footer' sx={styles.root}>
    <Typography sx={styles.copyright}>
      © 2022 Obyte. All Rights Reserved
    </Typography>
  </Box>
);

export default memo(Footer);
