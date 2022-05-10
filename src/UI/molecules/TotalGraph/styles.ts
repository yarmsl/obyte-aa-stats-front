import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: 'calc(100% - 31px)',
    position: 'relative',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
  skeleton: {
    width: 'calc(100% + 20px)',
    height: '100%',
    position: 'absolute',
    top: 10,
    right: -10,
    bottom: -10,
    left: -10,
    borderRadius: 2,
  },
};
