import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    cursor: 'pointer',
  },
  agent: {
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: '12px',
    letterSpacing: -0.2,
    lineHeight: 1.2,
    width: '100%',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  address: {
    fontSize: '10px',
    fontWeight: 300,
    color: 'primary.main',
    alignSelf: 'flex-start',
  },
  cell: {
    width: '150px',
  },
  divider: {
    mx: '10px',
  },
};
