import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    px: '30px',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    mb: '5px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
  tableHead: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '42px',
  },
  table: {
    '&>div': {
      display: 'flex',
      justifyContent: 'space-evenly',
      height: '42px',
      borderRadius: 2,
      transition: 'background-color 250ms ease-in-out',
      fontSize: '14px',
      fontWeight: 300,
      '&:hover': {
        bgcolor: 'primary.light',
      },
      '&>*': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  loading: {
    my: '10px',
  },
};
