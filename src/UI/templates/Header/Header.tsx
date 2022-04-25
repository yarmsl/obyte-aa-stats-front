import { memo } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from 'UI/atoms/Logo/Logo';
import { styles } from './styles';

const Header: React.FC = () => (
  <AppBar color='transparent' sx={styles.root}>
    <Toolbar sx={styles.header}>
      <Logo title='Obyte' subtitle='Autonomous Agents Statistics' />
    </Toolbar>
  </AppBar>
);

export default memo(Header);
