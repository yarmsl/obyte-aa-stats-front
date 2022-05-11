interface UIState {
  darkMode: boolean;
  homeLayouts: ReactGridLayout.Layouts;
  homeLayoutsCache: ReactGridLayout.Layouts;
  totalGraphPeriodControls: IUiControls;
  totalGraphActivitiesControls: IUiSelects<ITotalActivity>[];
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
