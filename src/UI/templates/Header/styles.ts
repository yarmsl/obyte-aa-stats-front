import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    boxShadow: 'none',
    bgcolor: 'background.default',
    p: '0px 25px',
    minHeight: '64px',
    transition: 'box-shadow 250ms ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1366px',
  },
  shadow: {
    boxShadow: '8px 8px 16px #cccfd4, -8px -8px 16px #ffffff',
  },
};
