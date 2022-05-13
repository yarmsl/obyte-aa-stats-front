import { Serie } from '@nivo/line';
import { usd } from 'lib/currency';

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

export const transformTopAA = (
  data: IAddress[] | undefined
): IRenderAddress[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((address) => ({
      address: address.address,
      usd_amount_in: usd(address.usd_amount_in),
      usd_amount_out: usd(address.usd_amount_out),
    }));
  }
  return [];
};

export const transformTopAAByTvl = (
  data: topAAbyTvlRes[] | undefined
): IRenderAATvl[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((address) => ({
      address: address.address,
      usd_balance: usd(address.usd_balance),
    }));
  }
  return [];
};
