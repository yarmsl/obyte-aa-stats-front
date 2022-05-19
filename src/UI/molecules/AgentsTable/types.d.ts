/* eslint-disable no-unused-vars */
interface IAgentsTableProps {
  data: IMergedTopAA[];
  isLoading: boolean;
  onChangeSortType: (dataKey: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (address: string) => () => void;
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
}

type IMergedTopAA = Pick<IRenderAATvl, 'usd_balance'> &
  IRenderAddress & { agent: string };
