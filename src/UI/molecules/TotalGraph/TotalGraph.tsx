import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import { graphUiControls } from 'conf/uiControls';
import { styles } from './styles';
import { ITotalGraphProps } from './types';

const TotalGraph: FC<ITotalGraphProps> = ({
  data,
  handlePeriod,
  isSelected,
}) => (
  <Box sx={styles.root}>
    <Box sx={styles.header}>
      <Typography sx={styles.title}>Chart Title</Typography>
      <ButtonGroup size='small' color='secondary'>
        {graphUiControls.map(({ label, value }) => (
          <Button
            variant={isSelected(value) ? 'contained' : 'outlined'}
            key={value}
            onClick={() => handlePeriod({ label, value })}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
    <Box
      sx={styles.wrapper}
      onTouchStart={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <ResponsiveLineCanvas
        data={data}
        margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          precision: 'hour',
        }}
        yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
        yFormat=' >-.2f'
        xFormat='time:%c'
        curve='linear'
        enableArea
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '%x',
          legend: 'date',
          legendOffset: 46,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '.2s',
          legend: 'value',
          legendOffset: -40,
          legendPosition: 'middle',
          // tickValues: [0, 500000000000, 1000000000000],
        }}
        enableGridX={false}
        isInteractive
        // tooltip={(point) => {
        //   console.log(point);
        //   return <div>{point.point.x}</div>;
        // }}
        colors={{ scheme: 'category10' }}
        lineWidth={2}
        pointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        //   useMesh={true}
        //   gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        //   gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 134,
            translateY: 7,
            itemsSpacing: 3,
            itemDirection: 'left-to-right',
            itemWidth: 98,
            itemHeight: 21,
            itemOpacity: 0.75,
            symbolSize: 11,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
    <WaterMark />
  </Box>
);

export default memo(TotalGraph);
