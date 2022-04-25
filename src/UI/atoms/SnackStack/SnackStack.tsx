import { SnackbarCloseReason } from '@mui/material';
import { FC, memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeSnackAction } from 'store/SnackStack';
import { ISnackStackProps } from './types';
import SnackStackLayout from './SnackStackLayout';

const SnackStack: FC<ISnackStackProps> = ({
  anchorOrigin = undefined,
  spacing = 1,
  maxSnack = 5,
}) => {
  const { snackBarsStack } = useAppSelector((st) => st.snackStack);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (id: string) => dispatch(closeSnackAction(id)),
    [dispatch]
  );

  const handleCloseByTimeout = useCallback(
    (
      event: Event | React.SyntheticEvent<unknown, Event>,
      reason: SnackbarCloseReason,
      id: string
    ) => {
      if (reason === 'timeout') {
        handleClose(id);
      }
    },
    [handleClose]
  );

  const top = useMemo(() => {
    switch (anchorOrigin?.vertical) {
      case 'top':
        return 0;
      default:
        return 'auto';
    }
  }, [anchorOrigin?.vertical]);

  const bottom = useMemo(() => {
    switch (anchorOrigin?.vertical) {
      case 'top':
        return 'auto';
      default:
        return 0;
    }
  }, [anchorOrigin?.vertical]);

  const left = useMemo(() => {
    switch (anchorOrigin?.horizontal) {
      case 'right':
        return 'auto';
      case 'center':
        return '50%';
      default:
        return 0;
    }
  }, [anchorOrigin?.horizontal]);

  const right = useMemo(() => {
    switch (anchorOrigin?.horizontal) {
      case 'left':
        return 'auto';
      case 'center':
        return '50%';
      default:
        return 0;
    }
  }, [anchorOrigin?.horizontal]);

  const transform = useMemo(() => {
    switch (anchorOrigin?.horizontal) {
      case 'center':
        return 'translateX(-50%)';
      default:
        return 'none';
    }
  }, [anchorOrigin?.horizontal]);

  const cuttedSnackStack = useMemo(
    () => snackBarsStack.slice(-maxSnack),
    [maxSnack, snackBarsStack]
  );

  return (
    <SnackStackLayout
      cuttedSnackStack={cuttedSnackStack}
      anchorOrigin={anchorOrigin}
      spacing={spacing}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      transform={transform}
      handleClose={handleClose}
      handleCloseByTimeout={handleCloseByTimeout}
    />
  );
};

export default memo(SnackStack);
