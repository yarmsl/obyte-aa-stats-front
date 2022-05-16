import { FC, memo } from 'react';
// import { useGetDefinitionQuery } from 'store/Obyte/Obyte.service';
import HomeDashboard from 'UI/organisms/HomeDashboard/HomeDashboard';

import HelmetTitle from '../../UI/atoms/Helmet/Helmet';

const Home: FC = () => (
  // const { data } = useGetDefinitionQuery('MMN3JBJWTT7ZZL7I7K66GSZQ3MHTPW47');

  // console.log(data);

  <>
    <HelmetTitle title='Home' />
    <HomeDashboard />
  </>
);
export default memo(Home);
