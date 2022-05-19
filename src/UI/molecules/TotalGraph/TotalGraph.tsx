import { Box, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import { totalGraphActivitiesUiControls } from 'conf/uiControls';
import LineChart from 'UI/atoms/LineChart/LineChart';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import SelectButtons from 'UI/atoms/SelectButtons/SelectButtons';
import { styles } from './styles';
import { ITotalGraphProps } from './types';

const TotalGraph: FC<ITotalGraphProps> = ({
  data,
  handlePeriod,
  isSelectedPeriod,
  handleActivities,
  isSelectedActivities,
  isLoading,
  presicion,
  actionButtonsConf,
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.headerLeft}>
          <Typography sx={styles.title}>Activities</Typography>
          <SelectButtons<ITotalWithTvlActivity>
            config={totalGraphActivitiesUiControls}
            isSelected={isSelectedActivities}
            handler={handleActivities}
          />
        </Box>
        <ActionButtons
          config={actionButtonsConf}
          isSelected={isSelectedPeriod}
          handler={handlePeriod}
        />
      </Box>
      <Box
        sx={styles.wrapper}
        onTouchStart={stopPropagate}
        onMouseDown={stopPropagate}
      >
        <LineChart data={data} precision={presicion} />
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
