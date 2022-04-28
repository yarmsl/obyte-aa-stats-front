import { FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { toggleDarkMode } from 'store/UI';
import DarkModeSwitcherLayout from './DarkModeSwitcherLayout';

const DarkModeSwitcher: FC = () => {
  const { darkMode } = useAppSelector((st) => st.ui);
  const dispatch = useAppDispatch();
  const switchMode = useCallback(() => dispatch(toggleDarkMode()), [dispatch]);

  return <DarkModeSwitcherLayout darkMode={darkMode} switchMode={switchMode} />;
};

export default memo(DarkModeSwitcher);
