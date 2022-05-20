import { ListItemText, MenuItem } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { Cell, RowDataType } from 'rsuite-table';

interface IAddressCellProps {
  rowData: RowDataType;
  // eslint-disable-next-line no-unused-vars
  onNavigate: (address: string) => () => void;
}

const AddressCell: FC<IAddressCellProps> = ({
  rowData,
  onNavigate,
  ...props
}) => {
  const isAgent = useMemo(
    () => rowData.agent !== rowData.address,
    [rowData.address, rowData.agent]
  );
  return (
    <Cell {...props}>
      <MenuItem sx={{ borderRadius: 2 }} onClick={onNavigate(rowData.address)}>
        <ListItemText
          primary={rowData.agent}
          secondary={isAgent ? rowData.address : undefined}
        />
      </MenuItem>
    </Cell>
  );
};

export default memo(AddressCell);
