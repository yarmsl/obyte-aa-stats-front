type tfTypes = 'hourly' | 'daily';
type topAATypes =
  | 'usd_amount_in'
  | 'usd_amount_out'
  | 'triggers_count'
  | 'num_users';

interface IAAStatsReq {
  address: string;
  asset?: assetsTypes | null;
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
}

type ITotalActivity = Omit<IAddress, 'address'> & { period: number };
type ITotalWithTvlActivity = ITotalActivity & { usd_balance: number };
type ITotalTvl = Pick<topAAbyTvlRes, 'period' | 'balance' | 'usd_balance'>;

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

type IAAStatsAddressReq = Omit<IAAStatsReq, 'period' | 'limit'>;
type IAAStatsTvlReq = Omit<IAAStatsReq, 'timeframe' | 'period' | 'limit'>;
type IAAStatsTotalTvl = Pick<
  IAAStatsReq,
  'asset' | 'from' | 'to' | 'timeframe'
> & { conf: IUiSelects<ITotalWithTvlActivity> };
type IAAStatsTotalTvlValuesReq = Pick<IAAStatsReq, 'from' | 'to' | 'asset'>;
type IAAStatsTotalActivity = Pick<
  IAAStatsReq,
  'asset' | 'from' | 'to' | 'timeframe'
> & { slices: IUiSelects<ITotalActivity>[] };
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
