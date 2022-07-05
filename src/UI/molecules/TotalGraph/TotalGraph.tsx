import { Box, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useCallback } from 'react';
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
  serieLength,
  isDataSerieLessThan1,
  isEveryValOfSerieIsNull,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
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
      <Box sx={styles.wrapper} onMouseDown={stopPropagate}>
        {!isLoading && isEveryValOfSerieIsNull ? (
          <Box sx={styles.nodata}>
            <Typography>no data</Typography>
          </Box>
        ) : (
          <LineChart
            data={data}
            precision={presicion}
            serieLength={serieLength}
            isDataSerieLessThan1={isDataSerieLessThan1}
          />
        )}
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
