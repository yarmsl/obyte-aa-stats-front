import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: '100%',
    pr: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  },
  head: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
  divider: {
    mt: '5px',
    borderColor: 'secondary.main',
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  skeleton: {
    width: 'calc(100% + 20px)',
    height: 'calc(100% + 20px)',
    position: 'absolute',
    borderRadius: 2,
    top: -10,
    left: -10,
    bottom: 0,
    right: 0,
  },
  mostActiveAA: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    gap: '5px',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    width: '50px',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  top: {
    display: 'flex',
    overflow: 'hidden',
    fontSize: 14,
    '&>p:first-of-type': {
      minWidth: '20px',
      fontSize: 'inherit',
    },
    '&>p:last-of-type': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 'inherit',
    },
  },
  tooltip: {
    backgroundColor: '#1a223f',
  },
  tooltipBox: {
    display: 'flex',
    flexDirection: 'column',
    '&>div': {
      display: 'flex',
    },
  },
};
