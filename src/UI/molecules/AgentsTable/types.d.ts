/* eslint-disable no-unused-vars */
interface IAgentsTableProps {
  data: IMergedTopAA[];
  isLoading: boolean;
  onChangeSortType: (dataKey: keyof IMergedTopAA) => () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (address: string) => () => void;
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  isSortSelected: (dataKey: keyof IMergedTopAA) => boolean;
  loaderRef: React.MutableRefObject<null>;
}

type IMergedTopAA = Pick<IRenderAATvl, 'usd_balance'> &
  IRenderAddress & { agent: string };
