import { Box, Typography } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import Loading from 'UI/atoms/Loading/Loading';
import 'rsuite-table/dist/css/rsuite-table.min.css';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import { agentTopTablePeriodControls } from 'conf/uiControls';
import { styles } from './styles';

const AgentsTable: FC<IAgentsTableProps> = ({
  data,
  isLoading,
  onChangeSortType,
  onNavigate,
  handlePeriod,
  isSelectedPeriod,
}) => {
  const stopPropagate = useCallback(
    (e: MouseEvent | TouchEvent) => e.stopPropagation(),
    []
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Autonomous Agents Top</Typography>
        <ActionButtons
          config={agentTopTablePeriodControls}
          handler={handlePeriod}
          isSelected={isSelectedPeriod}
        />
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

        <Column sortable width={130}>
          <HeaderCell>USD in</HeaderCell>
          <Cell dataKey='usd_amount_in' />
        </Column>

        <Column sortable minWidth={130} flexGrow={1}>
          <HeaderCell>USD out</HeaderCell>
          <Cell dataKey='usd_amount_out' />
        </Column>
        <Column sortable minWidth={130} flexGrow={1}>
          <HeaderCell>TVL</HeaderCell>
          <Cell dataKey='usd_balance' />
        </Column>
      </Table>
      <WaterMark />
    </Box>
  );
};

export default memo(AgentsTable);
