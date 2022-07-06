/* eslint-disable no-unused-vars */
interface ISearchResultsConnectedProps {
  open: boolean;
  searchText: string;
  onClose: () => void;
}

interface ISearchResultsProps {
  data: ILabeledAddress[];
  open: boolean;
  onAddressClick: (address: string) => () => void;
  searchText: string;
}

interface ISearchedItemProps {
  onClick: () => void;
  address: string;
  label: string;
  searchText: string;
}

interface ILabeledAddress {
  address: string;
  label: string;
}
