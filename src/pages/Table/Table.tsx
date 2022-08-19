import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC, memo } from 'react';
import { useAppSelector } from 'store';
import { dd4Table } from 'store/Obyte';

const TableDD: FC = () => {
  const dd = useAppSelector(dd4Table);
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>base_aa</TableCell>
            <TableCell>address</TableCell>
            <TableCell width={120}>xAsset</TableCell>
            <TableCell width={120}>yAsset</TableCell>
            <TableCell>description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dd.map((data) =>
            data.addresses.map((address, i) => (
              <TableRow hover key={address.address}>
                <TableCell>{i === 0 ? data.baseaa : null}</TableCell>
                <TableCell>{address.address}</TableCell>
                <TableCell
                  sx={
                    address.xAsset !== 'no data'
                      ? { color: 'secondary.main' }
                      : undefined
                  }
                >
                  {address.xAsset}
                </TableCell>
                <TableCell
                  sx={
                    address.yAsset !== 'no data'
                      ? { color: 'secondary.main' }
                      : undefined
                  }
                >
                  {address.yAsset}
                </TableCell>
                <TableCell>{i === 0 ? data.description : null}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableDD);
