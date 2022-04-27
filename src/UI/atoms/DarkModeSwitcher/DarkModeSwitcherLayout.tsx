import { FC, memo } from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkModeSwitcherLayout: FC<IDarkModeSwitcherLayoutProps> = ({
  darkMode,
  switchMode,
}) => (
  <IconButton onClick={switchMode}>
    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
);

export default memo(DarkModeSwitcherLayout);
