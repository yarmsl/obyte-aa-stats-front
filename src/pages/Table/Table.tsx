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
            <TableCell>description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dd.map((data) => (
            <TableRow hover key={data.baseaa}>
              <TableCell>{data.baseaa}</TableCell>
              <TableCell>{data.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableDD);
