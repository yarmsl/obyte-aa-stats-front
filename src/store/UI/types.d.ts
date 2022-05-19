interface UIState {
  darkMode: boolean;
  homeLayouts: ReactGridLayout.Layouts;
  homeLayoutsCache: ReactGridLayout.Layouts;
  agentLayouts: ReactGridLayout.Layouts;
  agentLayoutsCache: ReactGridLayout.Layouts;
  totalGraphPeriodControls: IUiControls;
  totalGraphActivitiesControls: IUiSelects<ITotalWithTvlActivity>[];
  agentsTablePeriodControls: IUiControls;
  asset: assetsTypes | null;
  aaTopTableSortType: topAATypes;
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
}
