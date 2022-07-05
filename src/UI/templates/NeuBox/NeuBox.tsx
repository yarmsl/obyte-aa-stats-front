import { Box } from '@mui/material';
import { useMedia } from 'lib/useMedia';
import { FC, forwardRef, memo, useMemo } from 'react';
import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';

const NeuBox: FC<INeuBoxProps> = forwardRef(
  ({ children, style, className, ...props }, ref) => {
    const darkMode = useAppSelector(darkModeSelector);

    const { isPortable } = useMedia();

    const boxShadow = useMemo(() => {
      const color1 = darkMode ? '#0e152e' : '#cccfd4';
      const color2 = darkMode ? '#141d3e' : '#ffffff';
      const pos1 = isPortable ? '6px 6px 12px' : '16px 16px 32px';
      const pos2 = isPortable ? '-6px -6px 12px' : '-16px -16px 32px';
      return `${pos1} ${color1}, ${pos2} ${color2}`;
    }, [darkMode, isPortable]);

    return (
      <Box
        style={style}
        className={className}
        sx={{
          width: '100%',
          height: '100%',
          p: '10px',
          transition: 'all 250ms',
          boxShadow,
          borderRadius: 2,
          backgroundColor: 'background.default',
          '&.react-grid-item > .react-resizable-handle': {
            bottom: '4px!important',
            right: '4px!important',
            '&::after': {
              borderRight: darkMode
                ? '2px solid #fff'
                : '2px solid rgba(0,0,0,.6)',
              borderBottom: darkMode
                ? '2px solid #fff'
                : '2px solid rgba(0,0,0,.6)',
            },
          },
        }}
        component='div'
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export default memo(NeuBox);
