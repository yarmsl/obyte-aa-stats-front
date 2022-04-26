import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
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
    justifyContent: 'center',
  },
  value: {
    fontSize: '30px',
    fontWeight: 700,
  },
  logo: {
    position: 'absolute',
    right: '-20px',
    top: '50%',
    transform: 'rotate(270deg)',
    color: 'rgba(0,0,0,.1)',
  },
};
