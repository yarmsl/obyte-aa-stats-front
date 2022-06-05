import { Box, Skeleton } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback, useMemo } from 'react';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import { agentGraphUiControls } from 'conf/uiControls';
import LineChart from 'UI/atoms/LineChart/LineChart';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import SelectButtons from 'UI/atoms/SelectButtons/SelectButtons';
import AssetSelect from 'UI/atoms/AssetSelect/AssetSelect';
import { useMedia } from 'lib/useMedia';
import { getStylesByArg } from './styles';
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
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );
  const { isDownThan1160 } = useMedia();
  const styles = useMemo(
    () => getStylesByArg(isDownThan1160),
    [isDownThan1160]
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.headerLeft}>
          <AssetSelect />
          <SelectButtons<IAddressGraphData>
            config={agentGraphUiControls}
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
        <LineChart data={data} precision={presicion} yType={yType} />
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

export default memo(AgentGraph);
