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
  const { isMobile } = useMedia();
  const styles = useMemo(() => getStylesByArg(isMobile), [isMobile]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <AssetSelect />
        <SelectButtons<IAddressGraphData>
          config={selectButtonConf}
          isSelected={isSelectedActivities}
          handler={handleActivities}
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
      </Box>
      <Box sx={styles.footer}>
        <ActionButtons
          config={actionButtonsConf}
          isSelected={isSelectedPeriod}
          handler={handlePeriod}
        />
      </Box>
      {isLoading && (
        <Skeleton sx={styles.skeleton} variant='rectangular' animation='wave' />
      )}
      <WaterMark />
    </Box>
  );
};

export default memo(AgentGraph);
