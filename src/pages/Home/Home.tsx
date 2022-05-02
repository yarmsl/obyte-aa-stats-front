import { FC, memo } from 'react';
import HomeDashboard from 'UI/organisms/HomeDashboard/HomeDashboard';
import obyte from 'obyte';
import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

const Home: FC = () => {
  const client = new obyte.Client();
  console.log(client.api.getDefinition('REX7IFSWGS5RIQG4QP7VD5VR5DZW6C3P'));

  return (
    <>
      <HelmetTitle title='Home' />
      <HomeDashboard />
    </>
  );
};

export default memo(Home);
