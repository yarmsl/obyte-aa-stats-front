import { Box, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useCallback, useRef } from 'react';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import { totalGraphActivitiesUiControls } from 'conf/uiControls';
import LineChart from 'UI/atoms/LineChart/LineChart';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import SelectButtons from 'UI/atoms/SelectButtons/SelectButtons';
import ShareMenu from 'UI/atoms/ShareMenu/ShareMenu';
import NeuBox from 'UI/templates/NeuBox/NeuBox';
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
  fullDaysBetweenStartAndEnd,
  serieLength,
  isDataSerieLessThan1,
  isEveryValOfSerieIsNull,
  mouseX,
  mouseY,
  onContextMenuClose,
  onContextMenu,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const ref = useRef<HTMLElement | null>(null);
  return (
    <NeuBox ref={ref} onContextMenu={onContextMenu}>
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
              fullDaysBetweenStartAndEnd={fullDaysBetweenStartAndEnd}
              isDataSerieLessThan1={isDataSerieLessThan1}
              serieLength={serieLength}
            />
          )}
        </Box>
        {isLoading && (
          <Skeleton
            sx={styles.skeleton}
            variant='rectangular'
            animation='wave'
          />
        )}
        <WaterMark />
        <ShareMenu
          mouseX={mouseX}
          mouseY={mouseY}
          onClose={onContextMenuClose}
          title='Activities Chart'
          refEl={ref}
        />
      </Box>
    </NeuBox>
  );
};

export default memo(TotalGraph);
