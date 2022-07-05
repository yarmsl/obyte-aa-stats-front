/* eslint-disable no-unused-vars */
import { Serie } from '@nivo/line';

export interface ITotalGraphProps {
  data: Serie[];
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  handleActivities: (value: keyof ITotalWithTvlActivity) => () => void;
  isSelectedActivities: (value: keyof ITotalWithTvlActivity) => boolean;
  isLoading: boolean;
  presicion: 'hour' | 'day';
  actionButtonsConf: IUiControls[];
  serieLength: number;
  isDataSerieLessThan1: boolean;
  isEveryValOfSerieIsNull: boolean;
}
