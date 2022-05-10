import { Serie } from '@nivo/line';

export interface ILineChartProps {
  data: Serie[];
  mini?: boolean;
  lineWidth?: number;
}
