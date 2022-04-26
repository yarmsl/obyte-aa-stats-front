import { memo, useMemo } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from 'UI/atoms/Logo/Logo';
import { useScroll } from 'lib/useScroll';
import { styles } from './styles';

const Header: React.FC = () => {
  const scrollTop = useScroll();
  const shadow = useMemo(
    () => ({
      ...styles.root,
      ...styles.shadow,
    }),
    []
  );
  return (
    <AppBar color='transparent' sx={scrollTop ? styles.root : shadow}>
      <Toolbar sx={styles.header}>
        <Logo title='Obyte' subtitle='Autonomous Agents Statistics' />
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
