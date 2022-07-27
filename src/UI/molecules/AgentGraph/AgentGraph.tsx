import { Box, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useCallback, useRef } from 'react';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import LineChart from 'UI/atoms/LineChart/LineChart';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import SelectButtons from 'UI/atoms/SelectButtons/SelectButtons';
import AssetSelect from 'UI/atoms/AssetSelect/AssetSelect';
import { useMedia } from 'lib/useMedia';
import NeuBox from 'UI/templates/NeuBox/NeuBox';
import ShareMenu from 'UI/atoms/ShareMenu/ShareMenu';
import { styles } from './styles';
import { IAgentGraphProps } from './types';

const AgentGraph: FC<IAgentGraphProps> = ({
  data,
  handlePeriod,
  isSelectedPeriod,
  handleActivities,
  isSelectedActivities,
  presicion,
  yType,
  isLoading,
  actionButtonsConf,
  selectButtonConf,
  isDataSerieLessThan1,
  isEveryValOfSerieIsNull,
  fullDaysBetweenStartAndEnd,
  mouseX,
  mouseY,
  onContextMenu,
  onContextMenuClose,
  serieLength,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { isMobile } = useMedia();

  const ref = useRef<HTMLElement | null>(null);

  return (
    <NeuBox ref={ref} onContextMenu={onContextMenu}>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <Box sx={styles.headerTop}>
            <AssetSelect />
            <SelectButtons<IAddressGraphData>
              config={selectButtonConf}
              isSelected={isSelectedActivities}
              handler={handleActivities}
            />
          </Box>
          {!isMobile && (
            <ActionButtons
              config={actionButtonsConf}
              isSelected={isSelectedPeriod}
              handler={handlePeriod}
            />
          )}
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
              yType={yType}
              fullDaysBetweenStartAndEnd={fullDaysBetweenStartAndEnd}
              isDataSerieLessThan1={isDataSerieLessThan1}
              serieLength={serieLength}
            />
          )}
        </Box>
        {isMobile && (
          <Box sx={styles.footer}>
            <ActionButtons
              config={actionButtonsConf}
              isSelected={isSelectedPeriod}
              handler={handlePeriod}
            />
          </Box>
        )}
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
          title='Agent Chart'
          refEl={ref}
        />
      </Box>
    </NeuBox>
  );
};

export default memo(AgentGraph);
