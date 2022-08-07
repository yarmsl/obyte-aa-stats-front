import { Box, MenuItem, Typography } from '@mui/material';
import { usd } from 'lib/currency';
import { HighlightText } from 'lib/HighLightText';
import { FC, memo, useMemo } from 'react';
import { styles } from './styles';

const SearchedItem: FC<ISearchedItemProps> = ({
  label,
  searchText,
  address,
  onClick,
  index,
  arrLength,
  tvl,
  autoFocus,
}) => {
  const focus = useMemo(
    () =>
      (autoFocus === 'up' && index === arrLength - 1) ||
      (autoFocus === 'down' && index === 0),
    [arrLength, autoFocus, index]
  );
  return (
    <MenuItem autoFocus={focus} sx={styles.searchedItem} onClick={onClick}>
      <Box sx={styles.creds}>
        <Typography sx={styles.labelText}>
          <HighlightText text={label} highlight={searchText} />
        </Typography>
        <Typography sx={styles.addressText}>
          <HighlightText text={address} highlight={searchText} />
        </Typography>
      </Box>
      <Typography sx={styles.tvl}>TVL: {usd(tvl, 0, true)}</Typography>
    </MenuItem>
  );
};

export default memo(SearchedItem);
