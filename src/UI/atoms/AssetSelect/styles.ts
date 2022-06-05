import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '120px',
    maxWidth: '120px',
  },
  item: {
    display: 'flex',
  },
  icon: {
    width: '20px',
    minWidth: '20px',
    height: '20px',
    mr: '10px',
    '& svg': {
      width: '20px%',
      height: '20px%',
      objectFit: 'cover',
    },
  },
  label: {
    fontSize: '14px',
    fontWeight: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
