import { Serie } from '@nivo/line';

export interface ILineChartProps {
  data: Serie[];
  lineWidth?: number;
  small?: boolean;
  precision?:
    | 'day'
    | 'hour'
    | 'millisecond'
    | 'second'
    | 'minute'
    | 'month'
    | 'year';
  xType?: xAxisTypes;
  yType?: yAxisTypes;
}

export type xAxisTypes = 'time' | 'linear';
export type yAxisTypes = 'currency' | 'amount';
