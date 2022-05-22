import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '42px',
  },
  label: {
    fontWeight: 300,
    mr: '5px',
  },
  column: {
    width: '150px',
    display: 'flex',
    alignItems: 'center',
  },
};
