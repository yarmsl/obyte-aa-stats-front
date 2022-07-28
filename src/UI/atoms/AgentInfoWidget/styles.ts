import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    p: { xs: '5px 16px 0px', sm: '10px 24px 5px' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: { xs: '18px', md: '24px' },
    fontWeight: { xs: 500, md: 700 },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  linksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: { xs: '5px', md: '15px' },
  },
  link: {
    display: 'flex',
    gap: '5px',
  },
  linkText: {
    display: { xs: 'none', md: 'unset' },
  },
};
