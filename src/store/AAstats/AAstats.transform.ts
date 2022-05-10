import { Serie } from '@nivo/line';

export const transformTotalActivity = (
  data: ITotalActivity[] | undefined,
  slices: (keyof ITotalActivity)[],
  timeframe: tfTypes
): Serie[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (timeframe === 'daily') {
      return slices.map((slice) => ({
        id: slice,
        data: data.map((d) => ({
          x: new Date(d.period * 3600 * 1000 * 24),
          y: d[slice],
        })),
      }));
    }
    return slices.map((slice) => ({
      id: slice,
      data: data.map((d) => ({
        x: new Date(d.period * 3600 * 1000),
        y: d[slice],
      })),
    }));
  }
  return [];
};
