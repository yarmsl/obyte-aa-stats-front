import { Button, ButtonGroup } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';
import { styles } from './styles';

const ActionButtons: FC<IActionButtonsProps> = ({
  config,
  isSelected,
  handler,
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );

  return (
    <ButtonGroup
      onTouchStart={stopPropagate}
      onMouseDown={stopPropagate}
      size='small'
      color='secondary'
      sx={styles.root}
    >
      {config.map(({ label, value }) => (
        <Button
          variant={isSelected(value) ? 'contained' : 'text'}
          key={value}
          onClick={handler(value)}
          sx={styles.button}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default memo(ActionButtons);
