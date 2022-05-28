interface UIState {
  darkMode: boolean;
  homeLayouts: ReactGridLayout.Layouts;
  homeLayoutsCache: ReactGridLayout.Layouts;
  agentLayouts: ReactGridLayout.Layouts;
  agentLayoutsCache: ReactGridLayout.Layouts;
  totalGraphPeriodControls: IUiControls;
  totalGraphActivitiesControls: IUiSelects<ITotalWithTvlActivity>[];
  agentsTablePeriodControls: IUiControls;
  agentsTableDataLimit: number;
  agentsTableSortType: topAATypes;
  agentsTableSortByTvl: boolean;
  asset: UiAssetTypes;
  assets: assetsTypes[];
  agentGraphActivitiesControls: IUiSelects<IAddressGraphData>[];
  agentGraphPeriodControl: IUiControls;
}

interface IUiControls {
  label: string;
  value: number;
  timeframe?: tfTypes;
}

interface IUiSelects<V> {
  label: string;
  value: keyof V;
  color: string;
  timeframe?: tfTypes;
  group: string | null;
  type: 'currency' | 'amount';
}

type UiAssetTypes = assetsTypes | 'all';
