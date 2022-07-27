/* eslint-disable no-unused-vars */
import { Serie } from '@nivo/line';
import { MouseEvent } from 'react';

export interface ITotalGraphProps {
  data: Serie[];
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  handleActivities: (value: keyof ITotalWithTvlActivity) => () => void;
  isSelectedActivities: (value: keyof ITotalWithTvlActivity) => boolean;
  isLoading: boolean;
  presicion: 'hour' | 'day';
  actionButtonsConf: IUiControls[];
  fullDaysBetweenStartAndEnd: number;
  serieLength: number;
  isDataSerieLessThan1: boolean;
  isEveryValOfSerieIsNull: boolean;
  onContextMenu: (e: MouseEvent) => void;
  onContextMenuClose: () => void;
  mouseX: number | null;
  mouseY: number | null;
}
