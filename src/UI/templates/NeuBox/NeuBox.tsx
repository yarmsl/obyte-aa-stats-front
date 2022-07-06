import { Box } from '@mui/material';
import { useNeuBoxShadow } from 'lib/useNeuBoxShadow';
import { FC, forwardRef, memo } from 'react';
import { useAppSelector } from 'store';
import { darkModeSelector } from 'store/UI';

const NeuBox: FC<INeuBoxProps> = forwardRef(
  ({ children, style, className, ...props }, ref) => {
    const darkMode = useAppSelector(darkModeSelector);
    const { boxShadow } = useNeuBoxShadow();
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
