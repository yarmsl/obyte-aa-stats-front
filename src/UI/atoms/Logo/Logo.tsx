import { Box, ButtonBase, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';

const Logo: FC<ILogoProps> = ({ title, subtitle }) => {
  const nav = useNavigate();
  return (
    <ButtonBase sx={styles.root} onClick={() => nav('/')}>
      <Box sx={styles.logo} />
      {title && (
        <Box sx={styles.credits}>
          <Typography sx={styles.title} component='h1'>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={styles.subtitle} component='h2'>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </ButtonBase>
  );
};

export default memo(Logo);
