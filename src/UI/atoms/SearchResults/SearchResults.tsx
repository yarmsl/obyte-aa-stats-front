import { Fade, MenuItem, MenuList, Paper, Typography } from '@mui/material';
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
        {searchText.length === 32 && (
          <MenuItem onClick={onAddressClick(searchText)}>
            <Typography
              sx={styles.goToLabel}
            >{`Go to ${searchText}`}</Typography>
          </MenuItem>
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
        {data.length === 0 && searchText.length !== 32 && (
          <Typography sx={styles.nofound} variant='body2'>
            Nothing found
          </Typography>
        )}
      </MenuList>
    </Paper>
  </Fade>
);

export default memo(SearchResults);
