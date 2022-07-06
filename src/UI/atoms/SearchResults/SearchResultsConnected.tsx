import { FC, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { fullFlattenDefinedDataSelector } from 'store/Obyte';
import SearchResults from './SearchResults';

const SearchResultsConnected: FC<ISearchResultsConnectedProps> = ({
  open,
  searchText,
  onClose,
}) => {
  const nav = useNavigate();
  const fullFlattenDefinedData = useAppSelector(fullFlattenDefinedDataSelector);

  const handleAgentsPageReplaceFabric = useCallback(
    (address: string) => () => {
      nav(`aa/${address}`);
      onClose();
    },
    [nav, onClose]
  );

  const searchedData = useMemo(() => {
    if (searchText.length > 1) {
      return [
        ...fullFlattenDefinedData.filter(
          (data) =>
            data.address.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        ),
        ...fullFlattenDefinedData.filter(
          (data) =>
            data.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        ),
      ].slice(0, 25);
    }
    return [];
  }, [fullFlattenDefinedData, searchText]);

  return (
    <SearchResults
      open={open}
      data={searchedData}
      onAddressClick={handleAgentsPageReplaceFabric}
      searchText={searchText}
    />
  );
};

export default memo(SearchResultsConnected);
