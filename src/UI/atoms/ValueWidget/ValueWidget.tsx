import { Box, Divider, Typography } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import WaterMark from '../WaterMark/WaterMark';
import { styles } from './styles';

const ValueWidget: FC<IValueWidgetProps> = ({ title, value, unit }) => {
  const printValue = useMemo(() => {
    if (unit === '$') {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return `${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}${unit}`;
  }, [unit, value]);
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{title}</Typography>
      <Divider sx={styles.divider} />
      <Box
        sx={styles.content}
        onTouchStart={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Typography sx={styles.value}>{printValue}</Typography>
      </Box>
      <WaterMark />
    </Box>
  );
};

export default memo(ValueWidget);
