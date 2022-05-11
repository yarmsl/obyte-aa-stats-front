import { Serie } from '@nivo/line';

export const transformTotalActivity = (
  data: ITotalActivity[] | undefined,
  slices: IUiSelects<ITotalActivity>[],
  timeframe: tfTypes
): Serie[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (timeframe === 'daily') {
      return slices.map((slice) => ({
        id: slice.label,
        color: slice.color,
        data: data.map((d) => ({
          x: new Date(d.period * 3600 * 1000 * 24),
          y: d[slice.value],
        })),
      }));
    }
    return slices.map((slice) => ({
      id: slice.label,
      color: slice.color,
      data: data.map((d) => ({
        x: new Date(d.period * 3600 * 1000),
        y: d[slice.value],
      })),
    }));
  }
  return [];
};
