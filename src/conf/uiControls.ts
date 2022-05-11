export const totalGraphPeriodUiControls: IUiControls[] = [
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
  { label: '1 Year', value: 365 },
  { label: 'All period', value: 0 },
];

export const totalGraphActivitiesUiControls: IUiSelects<ITotalActivity>[] = [
  { label: 'USD in', value: 'usd_amount_in', color: '#ffa16f' },
  { label: 'USD out', value: 'usd_amount_out', color: '#2c3e50' },
];
