import { SxProps } from '@mui/material';

export const getStylesByArg = (
  isDownThan1366: boolean
): Record<string, SxProps> => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: isDownThan1366 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isDownThan1366 ? 'flex-end' : 'center',
    gap: '5px',
  },
  headerLeft: {
    width: '100%',
    display: 'flex',
    alignItems: { xs: 'flex-end', sm: 'center' },
    flexDirection: { xs: 'column', sm: 'row' },
    alignSelf: 'flex-start',
    gap: '5px',
  },
  wrapper: {
    width: '100%',
    height: isDownThan1366
      ? { xs: 'calc(100% - 84px)', sm: 'calc(100% - 50px)' }
      : 'calc(100% - 23px)',
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
    userSelect: 'none',
  },
  nodata: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
});
