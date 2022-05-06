interface IUiControls {
  label: string;
  value: number;
}
interface UIState {
  darkMode: boolean;
  homeLayouts: ReactGridLayout.Layouts;
  homeLayoutsCache: ReactGridLayout.Layouts;
  graphControls: IUiControls;
}
