import { Box, Button, ButtonGroup } from '@mui/material';
import { memo, MouseEvent, TouchEvent, useCallback, useMemo } from 'react';
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

  const groups = useMemo(
    () =>
      config.reduce((accu: Record<string, IUiSelects<V>[]>, curr) => {
        if (curr.group) {
          if (curr.group in accu) {
            accu[curr.group].push(curr);
          } else {
            accu[curr.group] = [curr];
          }
        }
        return accu;
      }, {}),
    [config]
  );

  const groupsKeys = useMemo(() => Object.keys(groups), [groups]);

  const isGroups = useMemo(() => groupsKeys.length > 0, [groupsKeys.length]);

  const buttons = useMemo(
    () => config.filter((c) => c.group == null),
    [config]
  );

  const groupColor = useCallback(
    (i: number) => ((i + 1) % 2 === 0 ? 'primary' : 'secondary'),
    []
  );

  const singleColor = useCallback((i: number) => {
    const switcher = i + 1 < 3 ? i + 1 : (i + 1) % 3;
    switch (switcher) {
      case 1:
        return 'error';
      case 2:
        return 'info';
      default:
        return 'success';
    }
  }, []);

  return (
    <Box
      sx={styles.root}
      onTouchStart={stopPropagate}
      onMouseDown={stopPropagate}
    >
      {isGroups &&
        groupsKeys.map((key, i) => (
          <ButtonGroup
            key={key}
            size='small'
            color={groupColor(i)}
            sx={styles.group}
          >
            {groups[key].map(({ value, label }) => (
              <Button
                variant={isSelected(value) ? 'contained' : 'text'}
                key={String(value)}
                onClick={handler(value)}
                sx={styles.gbutton}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        ))}

      {buttons.map(({ label, value }, i) => (
        <Button
          key={String(value)}
          variant={isSelected(value) ? 'contained' : 'text'}
          onClick={handler(value)}
          color={singleColor(i)}
          sx={styles.button}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default memo(SelectButtons) as typeof SelectButtons;
