import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { usd } from 'lib/currency';
import { FC, memo, MouseEvent, TouchEvent, useCallback, useMemo } from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WaterMark from '../WaterMark/WaterMark';
import { styles } from './styles';

const ValueWidget: FC<IValueWidgetProps> = ({
  title,
  value,
  unit,
  shorten,
  trend,
  trendTooltip,
  isLoading,
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );

  const print = useCallback(
    (val: number) => {
      if (unit === '$') {
        return usd(val, 2, shorten);
      }
      return `${val.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}${unit || ''}`;
    },
    [shorten, unit]
  );

  const printValue = useMemo(() => print(value), [print, value]);

  const printTrend = useMemo(() => {
    if (trend && value !== trend) {
      return print(value - trend);
    }
    return null;
  }, [print, trend, value]);

  const isValueGreater = useMemo(
    () => (trend ? value > trend : false),
    [trend, value]
  );

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{title}</Typography>
      <Divider sx={styles.divider} />
      <Box
        sx={styles.content}
        onTouchStart={stopPropagate}
        onMouseDown={stopPropagate}
      >
        <Typography sx={styles.value}>{printValue}</Typography>
        {printTrend && (
          <Tooltip
            title={trendTooltip || false}
            arrow
            disableHoverListener={!trendTooltip}
          >
            <Box sx={styles.trend}>
              <IconButton
                color={isValueGreater ? 'success' : 'error'}
                sx={styles.trendIcon}
                size='small'
              >
                {isValueGreater ? <TrendingUpIcon /> : <TrendingDownIcon />}
              </IconButton>
              <Typography
                color={isValueGreater ? 'success.main' : 'error.main'}
              >
                {printTrend}
              </Typography>
            </Box>
          </Tooltip>
        )}
      </Box>
      {isLoading && (
        <Skeleton sx={styles.skeleton} variant='rectangular' animation='wave' />
      )}
      <WaterMark />
    </Box>
  );
};

export default memo(ValueWidget);
