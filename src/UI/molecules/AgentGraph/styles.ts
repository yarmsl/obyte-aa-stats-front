import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: { xs: 'calc(100% - 49px)', sm: 'calc(100% - 31px)' },
    position: 'relative',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-end', sm: 'center' },
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    '&>p': {
      mr: '10px',
    },
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
    userSelect: 'none',
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
