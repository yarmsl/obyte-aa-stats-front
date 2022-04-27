import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: 'calc(100% - 31px)',
    position: 'relative',
  },
  header: {
    width: 'calc(100% - 120px)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
};
