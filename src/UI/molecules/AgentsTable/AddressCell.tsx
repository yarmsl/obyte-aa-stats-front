import { ListItemText, MenuItem } from '@mui/material';
import { FC, memo } from 'react';
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
}) => (
  <Cell {...props}>
    <MenuItem onClick={onNavigate(rowData.address)}>
      <ListItemText primary={rowData.agent} secondary={rowData.address} />
    </MenuItem>
  </Cell>
);

export default memo(AddressCell);
