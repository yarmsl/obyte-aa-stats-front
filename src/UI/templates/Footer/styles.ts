import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    bgcolor: 'background.default',
    minHeight: '64px',
    transition: 'box-shadow 250ms ease-in-out',
  },
  copyright: {
    fontSize: '12px',
    fontWeight: 300,
    userSelect: 'none',
  },
  link: {
    textDecoration: 'none',
  },
};
