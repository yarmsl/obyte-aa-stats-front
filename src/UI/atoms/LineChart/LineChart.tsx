import { FC, memo, useMemo } from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import { useMedia } from 'lib/useMedia';
import { darkModeSelector } from 'store/UI';
import { useAppSelector } from 'store';
import { ILineChartProps } from './types';
import LineChartTooltip from '../LineChartTooltip/LineChartTooltip';

const LineChart: FC<ILineChartProps> = ({ data, mini, lineWidth }) => {
  const { isMobile } = useMedia();
  const darkMode = useAppSelector(darkModeSelector);
  const dataLength = useMemo(() => data.length, [data.length]);
  const isMultipleCharts = useMemo(() => dataLength > 1, [dataLength]);
  const serieLength = useMemo(
    () => (dataLength > 0 ? data[0].data.length : 0),
    [data, dataLength]
  );
  const formatDatesX = useMemo(() => {
    if (serieLength <= 30) {
      if (isMobile) {
        return { tickValues: 'every 10 day', format: '%b %d' };
      }
      return { tickValues: 'every 3 day', format: '%b %d' };
    }
    if (serieLength > 30 && serieLength <= 365) {
      if (isMobile) {
        return { tickValues: 'every 2 month', format: '%b' };
      }
      return { tickValues: 'every month', format: '%b' };
    }

    return { tickValues: 'every year', format: '%Y' };
  }, [isMobile, serieLength]);

  const theme = useMemo(
    () => ({
      textColor: darkMode ? '#fff' : 'rgba(0,0,0,.6)',
      fontSize: 14,
      fontFamily: 'Poppins',
      axis: {
        ticks: {
          line: {
            strokeWidth: 0,
          },
        },
      },
      grid: {
        line: {
          stroke: darkMode ? '#1a223f' : '#ebebeb',
          strokeWidth: 1,
        },
      },
    }),
    [darkMode]
  );

  return (
    <ResponsiveLineCanvas
      data={data}
      theme={theme}
      margin={
        mini
          ? undefined
          : {
              top: 20,
              right: 20,
              bottom: isMultipleCharts ? 40 : 20,
              left: 50,
            }
      }
      xScale={{
        type: 'time',
        precision: 'day',
      }}
      yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
      yFormat='>-$.2f'
      xFormat='time:%x'
      curve='linear'
      axisTop={null}
      axisRight={null}
      axisBottom={
        mini
          ? null
          : {
              tickValues: formatDatesX.tickValues,
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              format: formatDatesX.format,
            }
      }
      axisLeft={
        mini
          ? null
          : {
              tickSize: 0,
              tickPadding: 2,
              tickRotation: 0,
              format: '>-$.2s',
            }
      }
      enableGridX={false}
      enableGridY={!mini}
      isInteractive
      // eslint-disable-next-line react/no-unstable-nested-components
      tooltip={LineChartTooltip}
      colors={{ scheme: 'category10' }}
      lineWidth={lineWidth || 1.5}
      enablePoints={false}
      legends={
        !mini && isMultipleCharts
          ? [
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 40,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
                itemWidth: 140,
                itemHeight: 20,
                symbolSize: 10,
              },
            ]
          : undefined
      }
    />
  );
};

export default memo(LineChart);
