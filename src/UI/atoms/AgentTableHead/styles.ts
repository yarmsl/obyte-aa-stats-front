import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '42px',
  },
  label: {
    fontSize: { xs: '14px', sm: '16px' },
    fontWeight: 300,
    whiteSpace: 'nowrap',
    mr: '5px',
  },
  column: {
    width: '150px',
    display: 'flex',
    alignItems: 'center',
  },
};
