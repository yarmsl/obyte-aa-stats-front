/* eslint-disable no-unused-vars */
interface IAgentItemProps {
  address: string;
  agent: string;
  usd_amount_in: string;
  usd_amount_out: string;
  usd_balance: string;
  onNavigate: (address: string) => () => void;
}
