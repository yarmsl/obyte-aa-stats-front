import { Typography } from '@mui/material';
import { FC, memo } from 'react';
import { styles } from './styles';

const WaterMark: FC = () => <Typography sx={styles.root}>Obyte</Typography>;

export default memo(WaterMark);
