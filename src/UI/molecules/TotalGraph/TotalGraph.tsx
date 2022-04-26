import { Box, Typography } from '@mui/material';
import { FC, memo, useCallback, useMemo } from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import mock from '../../../mock/MOCK_DATA.json';

const TotalGraph: FC = () => {
  const processData = useCallback(
    (data: keyof IMockData, title: string) => ({
      id: title,
      data: (mock as IMockData[])
        .map((d) => ({
          x: new Date(d.timestamp),
          y: d[data],
        }))
        .sort((a, b) => a.x.getTime() - b.x.getTime()),
    }),
    []
  );

  const totalData = useMemo(
    () => [
      processData('usd_amount_in', 'USD in'),
      processData('amount_out', 'Amount out'),
    ],
    [processData]
  );

  return (
    <Box sx={{ width: '100%', height: 'calc(100% - 27px)' }}>
      <Typography sx={{ fontSize: '18px', fontWeight: 300 }}>
        Chart Title
      </Typography>
      <ResponsiveLineCanvas
        data={totalData}
        margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        yScale={{ type: 'linear', stacked: false, min: 0, max: 100 }}
        yFormat=' >-.2f'
        xFormat='time:%Y-%m-%d'
        curve='monotoneX'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '%b %y',
          legend: 'price',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '.2s',
          legend: 'volume',
          legendOffset: -40,
          legendPosition: 'middle',
          tickValues: [0, 50, 100],
        }}
        enableGridX={false}
        colors={{ scheme: 'paired' }}
        lineWidth={1}
        pointSize={4}
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
  );
};

export default memo(TotalGraph);
