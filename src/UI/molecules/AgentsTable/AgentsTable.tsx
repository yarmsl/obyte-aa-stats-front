import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import mock from '../../../mock/MOCK_DATA.json';
import { styles } from './styles';
import 'rsuite-table/dist/css/rsuite-table.css';

const AgentsTable: FC = () => {
  const data = useMemo(() => mock as IMockData[], []);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Table Title</Typography>
        <ButtonGroup size='small' color='secondary'>
          <Button>some</Button>
          <Button>controls</Button>
        </ButtonGroup>
      </Box>
      <Table onMouseDown={(e) => e.stopPropagation()} virtualized data={data}>
        <Column width={70} align='center' fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey='id' />
        </Column>

        <Column width={130}>
          <HeaderCell>Amount In</HeaderCell>
          <Cell dataKey='amount_in' />
        </Column>

        <Column width={130}>
          <HeaderCell>Amount Out</HeaderCell>
          <Cell dataKey='amount_out' />
        </Column>

        <Column width={200}>
          <HeaderCell>Triggers</HeaderCell>
          <Cell dataKey='triggers_count' />
        </Column>

        <Column width={200}>
          <HeaderCell>USD in</HeaderCell>
          <Cell dataKey='usd_amount_in' />
        </Column>

        <Column minWidth={200} flexGrow={1}>
          <HeaderCell>USD out</HeaderCell>
          <Cell dataKey='usd_amount_out' />
        </Column>
      </Table>
      <WaterMark />
    </Box>
  );
};

export default memo(AgentsTable);
