import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '42px',
  },
  label: {
    fontSize: { xs: '12px', sm: '16px' },
    fontWeight: 300,
    whiteSpace: 'nowrap',
    mr: { xs: 0, sm: '5px' },
  },
  column: {
    width: { xs: '100px', sm: '150px' },
    display: 'flex',
    alignItems: 'center',
  },
};
