import { Box } from '@mui/material';
import { FC, forwardRef, memo } from 'react';
import { useAppSelector } from 'store';

const NeuBox: FC<INeuBoxProps> = forwardRef(
  ({ children, style, className, ...props }, ref) => {
    const { darkMode } = useAppSelector((st) => st.ui);
    return (
      <Box
        style={style}
        className={className}
        sx={{
          width: '100%',
          height: '100%',
          p: '10px',
          transition: 'all 250ms',
          boxShadow: darkMode
            ? '16px 16px 32px #0e152e, -16px -16px 32px #141d3e'
            : '16px 16px 32px #cccfd4,-16px -16px 32px #ffffff',
          borderRadius: 4,
          backgroundColor: 'background.default',
          '& .react-resizable-handle': {
            bottom: '4px!important',
            right: '4px!important',
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
