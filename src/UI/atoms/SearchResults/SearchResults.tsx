import { Fade, MenuItem, MenuList, Paper } from '@mui/material';
import { FC, memo } from 'react';
import { v4 } from 'uuid';
import SearchedItem from './SearchedItem';
import { styles } from './styles';

const SearchResults: FC<ISearchResultsProps> = ({
  open,
  data,
  onAddressClick,
  searchText,
}) => (
  <Fade in={open}>
    <Paper sx={styles.root}>
      <MenuList sx={styles.menu}>
        {searchText.length > 1 && data.length === 0 && (
          <MenuItem
            onClick={onAddressClick(searchText)}
          >{`Go to ${searchText}`}</MenuItem>
        )}
        {data.map(({ address, label }) => (
          <SearchedItem
            onClick={onAddressClick(address)}
            key={v4()}
            address={address}
            label={label}
            searchText={searchText}
          />
        ))}
      </MenuList>
    </Paper>
  </Fade>
);

export default memo(SearchResults);
