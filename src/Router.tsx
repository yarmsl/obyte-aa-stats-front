import { memo, lazy, FC, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { fireNavigationAnalyticsEvent } from 'lib/analytics';
import Table from 'pages/Table/Table';
import MainLayout from './UI/templates/MainLayout/MainLayout';
import NotFound from './pages/NotFound/NotFound';

const Home = lazy(() => import('pages/Home/Home'));
const Agent = lazy(() => import('pages/Agent/Agent'));

const Router: FC = () => {
  const loc = useLocation();

  const fullUrl = useMemo(
    () =>
      `${window.location.protocol}//${window.location.host}${loc.pathname}${loc.search}`,
    [loc.pathname, loc.search]
  );

  useEffect(() => {
    if (!loc.search) return;
    fireNavigationAnalyticsEvent(fullUrl);
  }, [fullUrl, loc.search]);

  return (
    <Routes>
      <Route path='*' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='aa/:address' element={<Agent />} />
        <Route path='_table' element={<Table />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default memo(Router);
