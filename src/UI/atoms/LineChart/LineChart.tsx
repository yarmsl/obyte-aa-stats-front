import { FC, memo, useMemo } from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import { useMedia } from 'lib/useMedia';
import { darkModeSelector } from 'store/UI';
import { useAppSelector } from 'store';
import { ILineChartProps } from './types';
import LineChartTooltip from '../LineChartTooltip/LineChartTooltip';

const LineChart: FC<ILineChartProps> = ({
  data,
  lineWidth,
  small,
  precision = 'day',
  xType = 'time',
  yType = 'currency',
}) => {
  const { isMobile, isTablet } = useMedia();
  const darkMode = useAppSelector(darkModeSelector);
  const serieLength = useMemo(
    () => (data.length > 0 ? data[0].data.length : 0),
    [data]
  );
  const formatDatesX = useMemo(() => {
    if (xType === 'linear') {
      return { tickValues: undefined, format: undefined };
    }
    if (precision === 'hour') {
      return { tickValues: 'every 3 day', format: '%b %d' };
    }
    if (serieLength <= 30) {
      if (isTablet) {
        return { tickValues: 'every 5 day', format: '%b %d' };
      }
      if (isMobile) {
        return { tickValues: 'every 10 day', format: '%b %d' };
      }
      return { tickValues: 'every 4 day', format: '%b %d' };
    }
    if (serieLength > 30 && serieLength <= 365) {
      if (isMobile) {
        return { tickValues: 'every 2 month', format: '%b' };
      }
      return { tickValues: 'every month', format: '%b' };
    }

    return { tickValues: 'every year', format: '%Y' };
  }, [isMobile, isTablet, precision, serieLength, xType]);

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

  const colors = useMemo(() => {
    const cls = data.map((d) => {
      if ('color' in d) {
        return d.color;
      }
      return undefined;
    });
    if (cls.some((c) => c == null)) {
      return undefined;
    }
    return cls;
  }, [data]);

  return (
    <ResponsiveLineCanvas
      data={data}
      colors={colors}
      theme={theme}
      margin={
        small || isMobile
          ? {
              right: 20,
            }
          : {
              top: 20,
              right: 30,
              bottom: 20,
              left: 50,
            }
      }
      xScale={{
        type: xType,
        precision,
      }}
      yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
      yFormat={yType === 'currency' ? '<-$2.4s' : ' >-.0f'}
      xFormat={xType === 'time' ? 'time:%x' : undefined}
      curve='linear'
      axisTop={null}
      axisRight={null}
      axisBottom={
        small || isMobile
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
        small || isMobile
          ? null
          : {
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              format: yType === 'currency' ? '<-$.2s' : '<-.0s',
              tickValues: yType === 'currency' ? 3 : 2,
            }
      }
      gridYValues={6}
      enableGridX={false}
      enableGridY={!small}
      isInteractive
      tooltip={LineChartTooltip}
      lineWidth={lineWidth || 1.5}
      enablePoints={false}
    />
  );
};

export default memo(LineChart);
