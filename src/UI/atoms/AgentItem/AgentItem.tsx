/* eslint-disable camelcase */
import { Box, Divider, ListItemText, MenuItem } from '@mui/material';
import { FC, memo, useMemo } from 'react';

const AgentItem: FC<IAgentItemProps> = ({
  address,
  agent,
  usd_amount_in,
  usd_amount_out,
  usd_balance,
  onNavigate,
}) => {
  const isAgent = useMemo(() => agent !== address, [address, agent]);
  return (
    <>
      <Box>
        <Box sx={{ width: '260px' }}>
          <MenuItem
            sx={{ borderRadius: 2, height: '100%', width: '100%' }}
            onClick={onNavigate(address)}
          >
            <ListItemText
              primary={agent}
              secondary={isAgent ? address : undefined}
            />
          </MenuItem>
        </Box>
        <Box sx={{ width: '150px' }}>{usd_amount_in}</Box>
        <Box sx={{ width: '150px' }}>{usd_amount_out}</Box>
        <Box sx={{ width: '150px' }}>{usd_balance}</Box>
      </Box>
      <Divider sx={{ mx: '10px' }} />
    </>
  );
};

export default memo(AgentItem);
