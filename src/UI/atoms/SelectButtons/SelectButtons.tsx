import { Button, ButtonGroup } from '@mui/material';
import { memo, MouseEvent, TouchEvent, useCallback } from 'react';
import { styles } from './styles';

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
      sx={styles.root}
    >
      {config.map(({ label, value }) => (
        <Button
          variant={isSelected(value) ? 'contained' : 'text'}
          key={String(value)}
          onClick={handler(value)}
          sx={styles.button}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default memo(SelectButtons) as typeof SelectButtons;
