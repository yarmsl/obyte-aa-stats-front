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
    return data.reduce((accu: IRenderAddress[], curr) => {
      if (curr.usd_amount_in < 1 && curr.usd_amount_out < 1) {
        return accu;
      }
      return accu.concat({
        address: curr.address,
        usd_amount_in: usd(curr.usd_amount_in),
        usd_amount_out: usd(curr.usd_amount_out),
      });
    }, []);
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

export const transformTotalTvl = (
  data: ITotalTvl[] | undefined,
  timeframe: tfTypes,
  conf: IUiSelects<ITotalWithTvlActivity>
): Serie[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (timeframe === 'daily') {
      const dailyTvlPeriods = Array.from(
        new Set(data.map((d) => Math.floor(d.period / 24)))
      );
      const dailyTvl = dailyTvlPeriods.map((period) => {
        const hoursTvlByDay = data.filter(
          (d) => Math.floor(d.period / 24) === period
        );
        const middle =
          hoursTvlByDay.reduce((accu, curr) => accu + curr.usd_balance, 0) /
          hoursTvlByDay.length;

        return { period, usd_balance: middle };
      });
      return [
        {
          id: conf.label,
          color: conf.color,
          data: dailyTvl.map((d) => ({
            x: new Date(d.period * 3600 * 1000 * 24),
            y: d.usd_balance,
          })),
        },
      ];
    }
    return [
      {
        id: conf.label,
        color: conf.color,
        data: data.map((d) => ({
          x: new Date(d.period * 3600 * 1000),
          y: d.usd_balance,
        })),
      },
    ];
  }
  return [];
};

export const transformTvlValues = (
  data: ITotalTvl[] | undefined
): ITotalTvl[] => {
  if (Array.isArray(data) && data.length > 0) {
    const last = data[data.length - 1];
    const prev = data.find((d) => d.period === last.period - 24) || data[0];
    return [prev, last];
  }
  return [];
};
