import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import { shortPeriodsUiControls } from 'conf/uiControls';
import AgentItem from 'UI/atoms/AgentItem/AgentItem';
import Loading from 'UI/atoms/Loading/Loading';
import AgentTableHead from 'UI/atoms/AgentTableHead/AgentTableHead';
import { styles } from './styles';

const AgentsTable: FC<IAgentsTableProps> = ({
  data,
  isLoading,
  onChangeSortType,
  onNavigate,
  handlePeriod,
  isSelectedPeriod,
  isSortSelected,
  loaderRef,
}) => (
  <Box sx={styles.wrapper}>
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Autonomous Agents Top</Typography>
        <ActionButtons
          config={shortPeriodsUiControls}
          handler={handlePeriod}
          isSelected={isSelectedPeriod}
          color='primary'
        />
      </Box>
      <AgentTableHead
        isSortSelected={isSortSelected}
        onChangeSortType={onChangeSortType}
      />
      <Box sx={styles.table}>
        {data.map((d) => (
          <AgentItem key={d.address} {...d} onNavigate={onNavigate} />
        ))}
      </Box>
      <Box ref={loaderRef} sx={styles.loading}>
        {isLoading && <Loading />}
      </Box>
    </Box>
  </Box>
);
export default memo(AgentsTable);
