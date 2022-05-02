type tfTypes = 'hourly' | 'daily';
type topAATypes = 'amount_in' | 'amount_out' | 'triggers_count' | 'num_users';

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
  period: number;
  address: string;
  asset: string | null;
  amount_in: number;
  amount_out: number;
  usd_amount_in: number;
  usd_amount_out: number;
  triggers_count: number;
  bounced_count: number;
  num_users: number;
}

interface IAsset {
  period: number;
  asset: string;
  total_balance: number;
  total_usd_balance: number;
}

type IAAStatsAddressReq = Omit<IAAStatsReq, 'period' | 'limit'>;
type IAAStatsTvlReq = Omit<IAAStatsReq, 'timeframe' | 'period' | 'limit'>;
type IAAStatsTopAAbyTvlReq = Pick<IAAStatsReq, 'asset' | 'period'>;
type IAAStatsTopAAbyTypeReq = Omit<IAAStatsReq, 'address' | 'period'> & {
  type: topAATypes;
};
type IAAStatsTopAssetsReq = Pick<IAAStatsReq, 'limit' | 'period'>;
