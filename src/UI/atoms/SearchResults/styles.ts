import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    position: 'absolute',
  },
  menu: {
    maxHeight: '350px',
    overflowY: 'auto',
    width: '100%',
    overflowX: 'hidden',
    borderRadius: 1,
    bgcolor: 'background.paper',
  },
  searchedItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  labelText: {
    width: '100%',
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  addressText: {
    width: '100%',
    fontSize: '10px',
    fontWeight: 300,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  goToLabel: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: { xs: 'unset', md: '10px' },
  },
  nofound: {
    p: '8px 16px',
    fontSize: { xs: 'unset', md: '12px' },
  },
};
