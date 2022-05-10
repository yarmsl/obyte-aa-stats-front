import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: 'calc(100% - 31px)',
    position: 'relative',
  },
  header: {
    width: 'calc(100% - 20px)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
};
