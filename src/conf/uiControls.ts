import { coinIcon } from './constants';

export const totalGraphPeriodUiControls: IUiControls[] = [
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
  { label: '1 Year', value: 365 },
  { label: 'All period', value: 0 },
];

export const agentTopTablePeriodControls: IUiControls[] = [
  { label: 'Today', value: 1, timeframe: 'hourly' },
  { label: 'Yesterday', value: 2, timeframe: 'hourly' },
  { label: '7 Days', value: 7, timeframe: 'daily' },
  { label: '30 Days', value: 30, timeframe: 'daily' },
];

export const totalGraphActivitiesUiControls: IUiSelects<ITotalActivity>[] = [
  { label: 'USD in', value: 'usd_amount_in', color: '#ffa16f' },
  { label: 'USD out', value: 'usd_amount_out', color: '#2c3e50' },
];

export const assetsConf: assetUiControl[] = [
  { value: null, icon: 'GBYTE.svg' },
  { value: 'O-GBYTE-ETH', icon: 'OETH.svg' },
  { value: 'O-GBYTE-WBTC', icon: 'OBIT.svg' },
  { value: 'GRDV2', icon: 'GRD.svg' },
  { value: 'O-GBYTE-USDC', icon: 'OUSD.svg' },
  { value: 'GRGBV2', icon: 'GRB.svg' },
  { value: 'ETH', icon: 'ETH.svg' },
  { value: 'USDC', icon: 'USDC.svg' },
  { value: 'GRETHV2', icon: 'SFETH.svg' },
  { value: 'WBTC', icon: 'WBTC.svg' },
  { value: 'ITH', icon: 'ITH.svg' },
  { value: 'O-OETH-ETH', icon: 'OETH.svg' },
  { value: 'IUSD', icon: 'IUSD.svg' },
  { value: 'GRBV2', icon: 'GRB.svg' },
  { value: 'GRGB', icon: 'GRB.svg' },
  { value: 'IBIT', icon: 'IBIT.svg' },
  { value: 'O-OUSD-USDC', icon: 'OUSD.svg' },
].map((asset) => ({
  value: asset.value as assetsTypes,
  label: asset.value?.replaceAll('-', ' ') || 'bytes',
  icon: `${coinIcon}${asset.icon}`,
}));
