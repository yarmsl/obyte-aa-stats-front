import { FC, memo } from 'react';
import AgentDashboard from 'UI/organisms/AgentDashboard/AgentDashboard';
import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

const Agent: FC = () => (
  <>
    <HelmetTitle title='agent' />
    <AgentDashboard />
  </>
);

export default memo(Agent);
