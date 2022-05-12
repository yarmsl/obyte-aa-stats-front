import { memo, lazy, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './UI/templates/MainLayout/MainLayout';
import NotFound from './pages/NotFound/NotFound';

const Home = lazy(() => import('pages/Home/Home'));
const Agent = lazy(() => import('pages/Agent/Agent'));

const Router: FC = () => (
  <Routes>
    <Route path='*' element={<MainLayout />}>
      <Route path='' element={<Home />} />
      <Route path='aa/:address' element={<Agent />} />
      <Route path='*' element={<NotFound />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default memo(Router);
