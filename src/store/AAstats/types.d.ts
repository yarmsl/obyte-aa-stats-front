type tfTypes = 'hourly' | 'daily';
type topAATypes =
  | 'usd_amount_in'
  | 'usd_amount_out'
  | 'triggers_count'
  | 'num_users';
type topAssetsTypes = 'amount_in' | 'tvl';

interface IAAStatsReq {
  address: string;
  asset?: string | null;
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

type ITotalTvl = Pick<topAAbyTvlRes, 'period' | 'balance' | 'usd_balance'>;

type topAAbyTvlRes = Pick<IAddress, 'period' | 'address' | 'asset'> & {
  balance: number;
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
type IAAStatsTotalTvl = Pick<IAAStatsReq, 'asset' | 'from' | 'to'>;
type IAAStatsTotalActivity = Pick<
  IAAStatsReq,
  'asset' | 'from' | 'to' | 'timeframe'
> & { slices: IUiSelects<ITotalActivity>[] };
type IAAStatsTopAAbyTvlReq = Pick<IAAStatsReq, 'asset' | 'period'>;
type IAAStatsTopAAbyTypeReq = Omit<IAAStatsReq, 'address' | 'period'> & {
  type: topAATypes;
};
type IAAStatsTopAssetsReq = Pick<IAAStatsReq, 'limit' | 'period'> & {
  type: topAssetsTypes;
};
