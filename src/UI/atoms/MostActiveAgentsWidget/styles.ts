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
  top1: {
    fontSize: 16,
    fontWeight: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  top2: {
    fontSize: 14,
    fontWeight: 300,
    opacity: 0.8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  top3: {
    fontSize: 12,
    fontWeight: 300,
    opacity: 0.6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
