/* eslint-disable no-unused-vars */
import { Serie } from '@nivo/line';

export interface IMockData {
  id: number;
  amount_in: number;
  amount_out: number;
  timestamp: string;
  triggers_count: number;
  usd_amount_in: number;
  usd_amount_out: number;
}

export interface ITotalGraphProps {
  data: Serie[];
  handlePeriod: (ctrls: IUiControls) => () => void;
  isSelected: (value: number) => boolean;
}
