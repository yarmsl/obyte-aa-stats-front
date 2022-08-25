import { FC, memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import { descriptionByAddressSelector } from 'store/Obyte';
import AgentDashboard from 'UI/organisms/AgentDashboard/AgentDashboard';
import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

const Agent: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const getDescription = useAppSelector(descriptionByAddressSelector);
  const title = useMemo(
    () => getDescription(address),
    [address, getDescription]
  );

  return (
    <>
      <HelmetTitle title={`Obyte | ${title}`} />
      <AgentDashboard />
    </>
  );
};

export default memo(Agent);
