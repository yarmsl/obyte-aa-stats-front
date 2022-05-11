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
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  handleActivities: (value: keyof ITotalActivity) => () => void;
  isSelectedActivities: (value: keyof ITotalActivity) => boolean;
  isLoading: boolean;
}
