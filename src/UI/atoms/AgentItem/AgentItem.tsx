/* eslint-disable camelcase */
import { Box, Divider, Typography } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { styles } from './styles';

const AgentItem: FC<IAgentItemProps> = ({
  address,
  agent,
  usd_amount_in,
  usd_amount_out,
  usd_balance,
  onNavigate,
}) => {
  const { address: selectedAddress = '' } = useParams<{ address: string }>();
  const isAgent = useMemo(() => agent !== address, [address, agent]);
  const isSelected = useMemo(
    () => selectedAddress === address,
    [address, selectedAddress]
  );
  return (
    <>
      <Box
        sx={isSelected ? styles.selected : styles.root}
        onClick={onNavigate(address)}
      >
        <Box sx={styles.agent}>
          <Typography sx={styles.title}>{agent}</Typography>
          <Typography sx={styles.address}>
            {isAgent ? address : undefined}
          </Typography>
        </Box>
        <Box sx={styles.cell}>{usd_amount_in}</Box>
        <Box sx={styles.cell}>{usd_amount_out}</Box>
        <Box sx={styles.cell}>{usd_balance}</Box>
      </Box>
      <Divider sx={styles.divider} />
    </>
  );
};

export default memo(AgentItem);
