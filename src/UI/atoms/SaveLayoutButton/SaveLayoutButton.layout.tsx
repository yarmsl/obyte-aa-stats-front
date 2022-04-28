import { FC, memo } from 'react';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const SaveLayoutButtonLayout: FC<ISaveLayoutButtonLayoutProps> = ({ save }) => (
  <IconButton onClick={save}>
    <SaveIcon />
  </IconButton>
);

export default memo(SaveLayoutButtonLayout);
