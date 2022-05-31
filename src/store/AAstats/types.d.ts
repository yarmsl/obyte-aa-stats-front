type tfTypes = 'hourly' | 'daily';
type topAATypes =
  | 'usd_amount_in'
  | 'usd_amount_out'
  | 'triggers_count'
  | 'num_users';

interface IAAStatsReq {
  address: string;
  asset?: assetsTypes;
  timeframe: tfTypes;
  from: number;
  to: number;
  period?: number;
  limit: number;
}

interface IAddress {
  address: string;
  amount_in: number;
  amount_out: number;
  usd_amount_in: number;
  usd_amount_out: number;
  triggers_count: number;
  bounced_count: number;
  num_users: number;
  period: number;
  asset: assetsTypes;
}
type IAddressTvl = Pick<IAddress, 'address' | 'period' | 'asset'> & {
  usd_balance: number;
  balance: number;
};
type ITotalActivity = Omit<IAddress, 'address'>;
type ITotalWithTvlActivity = ITotalActivity & { usd_balance: number };
type ITotalTvl = Pick<topAAbyTvlRes, 'period' | 'balance' | 'usd_balance'>;

type IAddressGraphData = Omit<IAddress, 'address'> & {
  usd_balance: number;
};

type topAAbyTvlRes = Pick<IAddress, 'address'> & {
  period: number;
  balance?: number;
  usd_balance: number;
};

interface IAsset {
  period: number;
  asset: string;
  total_balance: number;
  total_usd_balance: number;
}

type IAAStatsAddressReq = Omit<IAAStatsReq, 'period' | 'limit' | 'asset'>;
type IAAStatsTvlReq = Omit<IAAStatsReq, 'period' | 'limit'>;

type IAAStatsTotalTvl = Pick<
  IAAStatsReq,
  'asset' | 'from' | 'to' | 'timeframe'
> & { conf: IUiSelects<ITotalWithTvlActivity> };
type IAAStatsTotalTvlValuesReq = Pick<IAAStatsReq, 'from' | 'to' | 'asset'>;
type IAAStatsTotalActivity = Pick<
  IAAStatsReq,
  'asset' | 'from' | 'to' | 'timeframe'
> & { slices: IUiSelects<ITotalActivity>[] };
type IAAStatsUSDInValuesReq = Pick<IAAStatsReq, 'from' | 'to' | 'timeframe'>;
type IAAStatsTopAAbyTvlReq = Pick<IAAStatsReq, 'asset' | 'period'>;
type IAAStatsTopAAbyTypeReq = Omit<IAAStatsReq, 'address' | 'period'> & {
  type: topAATypes;
};
type IAAStatsTopAssetsReq = Pick<IAAStatsReq, 'limit' | 'period'>;

type IRenderAddress = Pick<IAddress, 'address'> & {
  usd_amount_in: string;
  usd_amount_out: string;
};

type IRenderTvlValues = Pick<ITotalTvl, 'period'> & { usd_balance: string };

type IRenderAATvl = Pick<topAAbyTvlRes, 'address'> & {
  usd_balance: string;
};
