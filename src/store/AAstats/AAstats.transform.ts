import { Serie } from '@nivo/line';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';

export const transformTotalActivity = (
  data: ITotalActivity[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsTotalActivity
): Serie[] => {
  const { slices, timeframe } = arg;
  if (Array.isArray(data) && data.length > 0) {
    return slices.map((slice) => ({
      id: slice.label,
      color: slice.color,
      data: data.map((d) => ({
        x:
          timeframe === 'daily'
            ? new Date(d.period * 3600 * 1000 * 24)
            : new Date(d.period * 3600 * 1000),
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
        usd_amount_in: curr.usd_amount_in,
        usd_amount_out: curr.usd_amount_out,
      });
    }, []);
  }
  return [];
};

export const transformTvlOverTimeForOneAddress = (
  data: IAddressTvlWithDecimals[] | undefined
): IAddressTvl[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((address) => ({
      address: address.address,
      asset: address.asset,
      period: address.period,
      balance: address.balance / 10 ** address.decimals,
      usd_balance: address.usd_balance,
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
      usd_balance: address.usd_balance,
    }));
  }
  return [];
};

export const transformTotalTvl = (
  data: ITotalTvl[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsTotalTvl
): Serie[] => {
  const { timeframe, conf } = arg;
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

export const transformUSDInValues = (
  data: ITotalActivity[] | undefined
): number[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (data.length < 2) {
      return [0, ...data.map((d) => d.usd_amount_in)];
    }

    return data.map((d) => d.usd_amount_in);
  }
  return [0, 0];
};

export const transformTvlOverTimeValuesForOneAddress = (
  data: IAddressTvlWithDecimals[] | undefined
): number[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (Array.from(new Set(data.map((d) => d.asset))).length > 1) {
      const periods = Array.from(new Set(data.map((d) => d.period)));
      const merged = periods.map((period) => {
        const dataForPeriod = data.filter((d) => d.period === period);
        return dataForPeriod.reduce(
          (accu: IAddressTvlWithDecimals, curr) => ({
            ...accu,
            balance:
              accu.usd_balance / 10 ** accu.decimals +
              curr.usd_balance / 10 ** curr.decimals,
            usd_balance: accu.usd_balance + curr.usd_balance,
          }),
          {
            address: dataForPeriod[0].address,
            asset: null,
            period,
            balance: 0,
            usd_balance: 0,
            decimals: 0,
          }
        );
      });
      return [merged[0].usd_balance, merged[merged.length - 1].usd_balance];
    }
    return [data[0].usd_balance, data[data.length - 1].usd_balance];
  }
  return [0, 0];
};

export const transformUsdInValuesForOneAddress = (
  data: IAddress[] | undefined
): number[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (Array.from(new Set(data.map((d) => d.asset))).length > 1) {
      const periods = Array.from(new Set(data.map((d) => d.period)));
      const merged = periods.map((period) => {
        const dataForPeriod = data.filter((d) => d.period === period);
        return dataForPeriod.reduce(
          (accu: IAddress, curr) => ({
            ...accu,
            usd_amount_in: accu.usd_amount_in + curr.usd_amount_in,
          }),
          {
            address: dataForPeriod[0].address,
            amount_in: 0,
            amount_out: 0,
            asset: null,
            bounced_count: 0,
            num_users: 0,
            period,
            triggers_count: 0,
            usd_amount_in: 0,
            usd_amount_out: 0,
          }
        );
      });
      return [merged[0].usd_amount_in, merged[merged.length - 1].usd_amount_in];
    }
    return [data[0].usd_amount_in, data[data.length - 1].usd_amount_in];
  }
  return [0, 0];
};
