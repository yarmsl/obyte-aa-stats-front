import { Box, Divider, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { styles } from './styles';

const ValueWidget: FC<IValueWidgetProps> = ({ title, value, unit }) => (
  <Box sx={styles.root}>
    <Typography sx={styles.title}>{title}</Typography>
    <Divider sx={styles.divider} />
    <Box sx={styles.content}>
      <Typography sx={styles.value}>
        {value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        {unit}
      </Typography>
    </Box>
    <Typography sx={styles.logo}>Obyte</Typography>
  </Box>
);

export default memo(ValueWidget);
