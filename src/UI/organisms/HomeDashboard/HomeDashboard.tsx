import { FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { cacheHomeLayout } from 'store/UI';
import HomeDashboardLayout from './HomeDashboardLayout';

const HomeDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { homeLayouts } = useAppSelector((st) => st.ui);

  const handleLayouts = useCallback(
    (curr, allLayouts: ReactGridLayout.Layouts) => {
      dispatch(cacheHomeLayout(allLayouts));
    },
    [dispatch]
  );

  return (
    <HomeDashboardLayout layouts={homeLayouts} handleLayouts={handleLayouts} />
  );
};

export default memo(HomeDashboard);
