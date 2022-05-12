import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { assetsConf } from 'conf/uiControls';
import { ChangeEventHandler, FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { assetSelector, handleAsset } from 'store/UI';
import { styles } from './styles';

const AssetSelect: FC = () => {
  const dispatch = useAppDispatch();
  const asset = useAppSelector(assetSelector);
  const onAssetChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => dispatch(handleAsset(e.target.value as assetsTypes)),
    [dispatch]
  );
  return (
    <TextField
      size='small'
      variant='standard'
      color='secondary'
      select
      autoComplete='off'
      value={asset || 'null'}
      onChange={onAssetChange}
    >
      {assetsConf.map(({ value, label, icon }) => (
        <MenuItem key={value} value={value}>
          <Box sx={styles.item}>
            <Box sx={styles.icon}>
              <img src={icon} alt={label} />
            </Box>
            <Typography sx={styles.label}>{label}</Typography>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default memo(AssetSelect);
