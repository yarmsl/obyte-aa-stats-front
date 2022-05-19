import { Box, Typography } from '@mui/material';
import { FC, memo, MouseEvent, TouchEvent, useCallback } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import Loading from 'UI/atoms/Loading/Loading';
import 'rsuite-table/dist/css/rsuite-table.min.css';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import { shortPeriodsUiControls } from 'conf/uiControls';
import { styles } from './styles';
import AddressCell from './AddressCell';

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
          config={shortPeriodsUiControls}
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
        renderLoading={() => <Loading />}
        rowHeight={60}
      >
        <Column verticalAlign='middle' width={300}>
          <HeaderCell align='center'>Agents</HeaderCell>
          <AddressCell rowData={data} onNavigate={onNavigate} />
        </Column>

        <Column
          verticalAlign='middle'
          align='center'
          sortable
          width={130}
          flexGrow={1}
        >
          <HeaderCell>USD in</HeaderCell>
          <Cell dataKey='usd_amount_in' />
        </Column>

        <Column
          verticalAlign='middle'
          align='center'
          sortable
          minWidth={130}
          flexGrow={1}
        >
          <HeaderCell>USD out</HeaderCell>
          <Cell dataKey='usd_amount_out' />
        </Column>
        <Column
          verticalAlign='middle'
          align='center'
          sortable
          minWidth={130}
          flexGrow={1}
        >
          <HeaderCell>TVL</HeaderCell>
          <Cell dataKey='usd_balance' />
        </Column>
      </Table>
      <WaterMark />
    </Box>
  );
};

export default memo(AgentsTable);
