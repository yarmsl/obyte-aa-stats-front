import { Button, ButtonGroup } from '@mui/material';
import { useMedia } from 'lib/useMedia';
import { FC, memo, MouseEvent, useCallback } from 'react';
import { styles } from './styles';

const ActionButtons: FC<IActionButtonsProps> = ({
  config,
  isSelected,
  handler,
  color = 'secondary',
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { isMobile } = useMedia();

  return (
    <ButtonGroup
      onMouseDown={stopPropagate}
      size='small'
      color={color}
      sx={styles.root}
    >
      {config.map(({ label, labelMobile, value }) => (
        <Button
          variant={isSelected(value) ? 'contained' : 'text'}
          key={value}
          onClick={handler(value)}
          sx={styles.button}
        >
          {isMobile ? labelMobile : label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default memo(ActionButtons);
