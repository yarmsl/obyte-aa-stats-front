import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface mediaQueries {
  isMobile: boolean;
  isTablet: boolean;
  isPortable: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isDownThan1160: boolean;
}

export const useMedia = (): mediaQueries => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isPortable = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isDownThan1160 = useMediaQuery('(max-width:1160px)');

  return {
    isMobile,
    isTablet,
    isPortable,
    isLaptop,
    isDesktop,
    isDownThan1160,
  };
};
