/* eslint-disable no-unused-vars */
interface IAgentTableHeadProps {
  onChangeSortType: (dataKey: keyof IMergedTopAA) => () => void;
  isSortSelected: (dataKey: keyof IMergedTopAA) => boolean;
}

interface IAgentTableHeadConf {
  label: string;
  value: keyof IMergedTopAA;
  sort: boolean;
}
