import { FC, memo } from 'react';
import HomeDashboard from 'UI/organisms/HomeDashboard/HomeDashboard';

import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

const Home: FC = () => (
  <>
    <HelmetTitle title='Home' />
    <HomeDashboard />
  </>
);
export default memo(Home);
