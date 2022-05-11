import { Button, ButtonGroup } from '@mui/material';
import { memo, MouseEvent, TouchEvent, useCallback } from 'react';

const SelectButtons = <V,>({
  config,
  isSelected,
  handler,
}: ISelectButtonsProps<V>): JSX.Element => {
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
          variant={isSelected(value) ? 'contained' : 'text'}
          key={String(value)}
          onClick={handler(value)}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default memo(SelectButtons) as typeof SelectButtons;
