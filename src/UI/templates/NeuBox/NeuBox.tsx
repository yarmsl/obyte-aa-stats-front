import { Box } from '@mui/material';
import { FC, forwardRef, memo } from 'react';

const NeuBox: FC<INeuBoxProps> = forwardRef(
  ({ children, style, className, ...props }, ref) => (
    <Box
      style={style}
      className={className}
      sx={{
        width: '100%',
        height: '100%',
        p: '10px',
        boxShadow: '16px 16px 32px #cccfd4,-16px -16px 32px #ffffff',
        borderRadius: 4,
        backgroundColor: '#f0f4f9',
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
  )
);

export default memo(NeuBox);
