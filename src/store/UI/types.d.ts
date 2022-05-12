interface UIState {
  darkMode: boolean;
  homeLayouts: ReactGridLayout.Layouts;
  homeLayoutsCache: ReactGridLayout.Layouts;
  agentLayouts: ReactGridLayout.Layouts;
  agentLayoutsCache: ReactGridLayout.Layouts;
  totalGraphPeriodControls: IUiControls;
  totalGraphActivitiesControls: IUiSelects<ITotalActivity>[];
  asset: assetsTypes | null;
  aaTopTableSortType: topAATypes;
}

interface IUiControls {
  label: string;
  value: number;
}

interface IUiSelects<V> {
  label: string;
  value: keyof V;
  color: string;
}
