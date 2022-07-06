import { Box, ClickAwayListener, TextField } from '@mui/material';
import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultsConnected from '../SearchResults/SearchResultsConnected';
import { styles } from './styles';

const Search: FC<ISearchProps> = ({ isPortable = false }) => {
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setOpen(true);
    setSearchText(e.currentTarget.value);
  }, []);

  const handleClose = useCallback(() => {
    setSearchText('');
    setOpen(false);
  }, []);

  useEffect(() => {
    if (searchText.length === 0 && open) setOpen(false);
  }, [open, searchText.length]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={styles.root}>
        <TextField
          autoComplete='off'
          fullWidth
          sx={styles.field}
          InputProps={{
            sx: styles.input,
            startAdornment: <SearchIcon />,
          }}
          size={isPortable ? 'medium' : 'small'}
          value={searchText}
          onChange={handleChange}
          placeholder='address or description'
        />
        <SearchResultsConnected
          open={open}
          searchText={searchText}
          onClose={handleClose}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default memo(Search);
