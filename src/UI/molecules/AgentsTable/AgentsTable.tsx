import { Box, Typography } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import Loading from 'UI/atoms/Loading/Loading';
import { styles } from './styles';
import 'rsuite-table/dist/css/rsuite-table.min.css';

const AgentsTable: FC<IAgentsTableProps> = ({
  data,
  isLoading,
  onChangeSortType,
  onNavigate,
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Autonomous Agents Top</Typography>
      </Box>
      <Table
        onTouchStart={stopPropagate}
        onMouseDown={stopPropagate}
        fillHeight
        virtualized
        data={data}
        loading={isLoading}
        onSortColumn={onChangeSortType}
        onRowClick={onNavigate}
        renderLoading={() => <Loading fullscreen />}
      >
        <Column width={200} align='center' fixed>
          <HeaderCell>Address</HeaderCell>
          <Cell dataKey='address' />
        </Column>

        <Column width={160}>
          <HeaderCell>Bytes In</HeaderCell>
          <Cell dataKey='amount_in' />
        </Column>

        <Column width={160}>
          <HeaderCell>Bytes Out</HeaderCell>
          <Cell dataKey='amount_out' />
        </Column>

        <Column sortable width={130}>
          <HeaderCell>USD in</HeaderCell>
          <Cell dataKey='usd_amount_in' />
        </Column>

        <Column sortable minWidth={130} flexGrow={1}>
          <HeaderCell>USD out</HeaderCell>
          <Cell dataKey='usd_amount_out' />
        </Column>

        <Column sortable width={100}>
          <HeaderCell>Users</HeaderCell>
          <Cell dataKey='num_users' />
        </Column>

        <Column sortable width={100}>
          <HeaderCell>Triggers</HeaderCell>
          <Cell dataKey='triggers_count' />
        </Column>
      </Table>
      <WaterMark />
    </Box>
  );
};

export default memo(AgentsTable);
