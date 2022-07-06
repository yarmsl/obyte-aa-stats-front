import { MenuItem, Typography } from '@mui/material';
import { HighlightText } from 'lib/HighLightText';
import { FC, memo } from 'react';
import { styles } from './styles';

const SearchedItem: FC<ISearchedItemProps> = ({
  label,
  searchText,
  address,
  onClick,
}) => (
  <MenuItem sx={styles.searchedItem} onClick={onClick}>
    <Typography sx={styles.labelText}>
      <HighlightText text={label} highlight={searchText} />
    </Typography>
    <Typography sx={styles.addressText}>
      <HighlightText text={address} highlight={searchText} />
    </Typography>
  </MenuItem>
);

export default memo(SearchedItem);
