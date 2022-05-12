/* eslint-disable no-unused-vars */
interface IAgentsTableProps {
  data: IRenderAddress[];
  isLoading: boolean;
  onChangeSortType: (dataKey: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (rowData: any) => void;
}
