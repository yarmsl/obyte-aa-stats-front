import { Button, ButtonGroup } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';

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
    >
      {config.map(({ label, value }) => (
        <Button
          variant={isSelected(value) ? 'contained' : 'outlined'}
          key={value}
          onClick={handler({ label, value })}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default memo(ActionButtons);
