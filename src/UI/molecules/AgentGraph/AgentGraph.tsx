import { Box, Skeleton, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useCallback, useMemo } from 'react';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
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
  selectButtonConf,
  isDataSerieLessThan1,
  isEveryValOfSerieIsNull,
  serieLength,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { isDownThan1366 } = useMedia();
  const styles = useMemo(
    () => getStylesByArg(isDownThan1366),
    [isDownThan1366]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.headerLeft}>
          <AssetSelect />
          <SelectButtons<IAddressGraphData>
            config={selectButtonConf}
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
            yType={yType}
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

export default memo(AgentGraph);
