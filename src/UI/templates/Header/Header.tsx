import { memo, useMemo } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from 'UI/atoms/Logo/Logo';
import { useScroll } from 'lib/useScroll';
import { useAppSelector } from 'store';
import DarkModeSwitcher from 'UI/atoms/DarkModeSwitcher/DarkModeSwitcher';
import { stylesByMode } from './styles';

const Header: React.FC = () => {
  const scrollTop = useScroll();
  const { darkMode } = useAppSelector((st) => st.ui);
  const styles = useMemo(() => stylesByMode(darkMode), [darkMode]);
  const shadow = useMemo(
    () => ({
      ...styles.root,
      ...styles.shadow,
    }),
    [styles.root, styles.shadow]
  );
  return (
    <AppBar color='transparent' sx={scrollTop ? styles.root : shadow}>
      <Toolbar sx={styles.header}>
        <Logo title='Obyte' subtitle='Autonomous Agents Statistics' />
        <DarkModeSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
