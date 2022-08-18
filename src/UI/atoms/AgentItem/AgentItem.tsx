/* eslint-disable camelcase */
import { Box, Divider, Slide, Typography } from '@mui/material';
import { usd } from 'lib/currency';
import { useMedia } from 'lib/useMedia';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import { descriptionByAddressSelector } from 'store/Obyte';
import { styles } from './styles';

const AgentItem: FC<IAgentItemProps> = ({
  address,
  usd_amount_in,
  usd_amount_out,
  usd_balance,
  onNavigate,
}) => {
  const { address: selectedAddress = '' } = useParams<{ address: string }>();
  const dd = useAppSelector(descriptionByAddressSelector);
  const agent = useMemo(() => dd(address), [dd, address]);
  const isAgent = useMemo(() => agent !== address, [address, agent]);
  const isSelected = useMemo(
    () => selectedAddress === address,
    [address, selectedAddress]
  );
  const { isMobile } = useMedia();
  const fraction = useMemo(() => (isMobile ? 0 : 2), [isMobile]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Slide direction='up' in={show}>
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
          <Box sx={styles.cell}>{usd(usd_balance, fraction, true)}</Box>
        </Box>
      </Slide>
      <Divider sx={styles.divider} />
    </>
  );
};

export default memo(AgentItem);
