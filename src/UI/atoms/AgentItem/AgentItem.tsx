/* eslint-disable camelcase */
import { Box, Divider, Typography } from '@mui/material';
import { usd } from 'lib/currency';
import { useMedia } from 'lib/useMedia';
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
  const { isMobile } = useMedia();
  const fraction = useMemo(() => (isMobile ? 0 : 2), [isMobile]);
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
        <Box sx={styles.cell}>{usd(usd_amount_in, fraction, true)}</Box>
        <Box sx={styles.cell}>{usd(usd_amount_out, fraction, true)}</Box>
        <Box sx={styles.cell}>
          {usd_balance === -1 ? 'no data' : usd(usd_balance, fraction, true)}
        </Box>
      </Box>
      <Divider sx={styles.divider} />
    </>
  );
};

export default memo(AgentItem);
