import { coinIcon } from './constants';

export const longPeriodsUiControls: IUiControls[] = [
  { label: '30 Days', value: 30, timeframe: 'daily' },
  { label: '90 Days', value: 90, timeframe: 'daily' },
  { label: '1 Year', value: 365, timeframe: 'daily' },
  { label: 'All period', value: 0, timeframe: 'daily' },
];

export const shortPeriodsUiControls: IUiControls[] = [
  { label: 'Today', value: 1, timeframe: 'hourly' },
  { label: 'Yesterday', value: 2, timeframe: 'hourly' },
  { label: '7 Days', value: 7, timeframe: 'daily' },
  { label: '30 Days', value: 30, timeframe: 'daily' },
];

export const totalGraphActivitiesUiControls: IUiSelects<ITotalWithTvlActivity>[] =
  [
    {
      label: 'USD in',
      value: 'usd_amount_in',
      color: '#ffa16f',
      timeframe: 'daily',
      group: 'usd',
      type: 'currency',
    },
    {
      label: 'USD out',
      value: 'usd_amount_out',
      color: '#03809c',
      timeframe: 'daily',
      group: 'usd',
      type: 'currency',
    },
    {
      label: 'TVL',
      value: 'usd_balance',
      color: 'red',
      timeframe: 'hourly',
      group: null,
      type: 'currency',
    },
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

export const agentGraphUiControls: IUiSelects<IAddressGraphData>[] = [
  {
    label: 'USD in',
    value: 'usd_amount_in',
    color: '#ffa16f',
    timeframe: 'daily',
    group: 'usd',
    type: 'currency',
  },
  {
    label: 'USD out',
    value: 'usd_amount_out',
    color: '#03809c',
    timeframe: 'daily',
    group: 'usd',
    type: 'currency',
  },
  {
    label: 'TVL',
    value: 'usd_balance',
    color: '#d5265b',
    timeframe: 'hourly',
    group: null,
    type: 'currency',
  },
  {
    label: 'Users',
    value: 'num_users',
    color: 'blue',
    timeframe: 'daily',
    group: null,
    type: 'amount',
  },
  {
    label: 'Triggers',
    value: 'triggers_count',
    color: 'teal',
    timeframe: 'daily',
    group: null,
    type: 'amount',
  },
];
