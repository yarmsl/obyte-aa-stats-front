import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    p: { xs: '5px 16px 0px', sm: '10px 24px 5px' },
    display: 'flex',
    alignItems: 'center',
  },
  titleBox: {
    width: { xs: 'calc(100% - 130px)', md: 'calc(100% - 340px)' },
  },
  title: {
    fontSize: { xs: '18px', md: '24px' },
    fontWeight: { xs: 500, md: 700 },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  divider: {
    mt: '5px',
    borderColor: 'secondary.main',
  },
  linksWrapper: {
    width: { xs: '130px', md: '340px' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: { xs: '5px', md: '15px' },
  },
  link: {
    display: 'flex',
  },
  linkText: {
    ml: '5px',
    display: { xs: 'none', md: 'unset' },
  },
};
