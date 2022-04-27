import { Box, Divider, Typography } from '@mui/material';
import { FC, memo } from 'react';
import WaterMark from '../WaterMark/WaterMark';
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
    <WaterMark />
  </Box>
);

export default memo(ValueWidget);
