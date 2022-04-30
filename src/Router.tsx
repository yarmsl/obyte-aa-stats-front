import { memo, lazy, FC, useMemo } from 'react';
import { Route, Routes as MainRouter, HashRouter } from 'react-router-dom';
import { isGhPages } from 'conf/constants';
import MainLayout from './UI/templates/MainLayout/MainLayout';
import NotFound from './pages/NotFound/NotFound';

const Home = lazy(() => import('pages/Home/Home'));

const Router: FC = () => {
  const Routes = useMemo(() => (isGhPages ? HashRouter : MainRouter), []);
  return (
    <Routes>
      <Route path='*' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default memo(Router);
