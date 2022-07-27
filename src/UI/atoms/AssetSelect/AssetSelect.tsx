import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { coinIcon } from 'conf/constants';
import { assetsIconsConf } from 'conf/uiControls';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { ChangeEventHandler, FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { assetSelector, assetsSelector, handleAsset } from 'store/UI';
import { styles } from './styles';

const AssetSelect: FC = () => {
  const dispatch = useAppDispatch();
  const asset = useAppSelector(assetSelector);
  const assets = useAppSelector(assetsSelector);
  const { setUrl } = useStateUrlParams();
  const onAssetChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      const value =
        e.target.value === 'null' ? null : (e.target.value as assetsTypes);
      dispatch(handleAsset(value));
      setUrl({ asset: value });
    },
    [dispatch, setUrl]
  );

  const getAssetIcon = useCallback(
    (assetValue: assetsTypes) =>
      assetsIconsConf.find((aic) => aic.assets.some((a) => a === assetValue))
        ?.icon || null,
    []
  );

  return (
    <TextField
      size='medium'
      variant='standard'
      color='secondary'
      select
      autoComplete='off'
      value={asset || 'null'}
      onChange={onAssetChange}
      sx={styles.root}
      SelectProps={{ MenuProps: { sx: styles.menu } }}
    >
      <MenuItem value='all'>
        <Box sx={styles.item}>
          <Box sx={styles.icon} />
          <Typography sx={styles.label}>all assets</Typography>
        </Box>
      </MenuItem>
      <MenuItem value='null'>
        <Box sx={styles.item}>
          <Box sx={styles.icon}>
            <img src={`${coinIcon}GBYTE.svg`} alt='G-BYTE' />
          </Box>
          <Typography sx={styles.label}>G-BYTE</Typography>
        </Box>
      </MenuItem>
      {assets.map((ast) => (
        <MenuItem key={ast} value={ast || 'null'}>
          <Box sx={styles.item}>
            <Box sx={styles.icon}>
              {getAssetIcon(ast) && (
                <img
                  src={`${coinIcon}${getAssetIcon(ast)}`}
                  alt={ast || undefined}
                />
              )}
            </Box>
            <Typography sx={styles.label}>{ast}</Typography>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default memo(AssetSelect);
