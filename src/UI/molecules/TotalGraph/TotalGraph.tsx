import { Box, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import { graphUiControls } from 'conf/uiControls';
import LineChart from 'UI/atoms/LineChart/LineChart';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import { styles } from './styles';
import { ITotalGraphProps } from './types';

const TotalGraph: FC<ITotalGraphProps> = ({
  data,
  handlePeriod,
  isSelected,
  isLoading,
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Chart Title</Typography>
        <ActionButtons
          config={graphUiControls}
          isSelected={isSelected}
          handler={handlePeriod}
        />
      </Box>
      <Box
        sx={styles.wrapper}
        onTouchStart={stopPropagate}
        onMouseDown={stopPropagate}
      >
        <LineChart data={data} />
        {isLoading && (
          <Skeleton
            sx={styles.skeleton}
            variant='rectangular'
            animation='wave'
          />
        )}
      </Box>
      <WaterMark />
    </Box>
  );
};

export default memo(TotalGraph);
