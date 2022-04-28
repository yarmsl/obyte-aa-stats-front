import { FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  cacheHomeLayout,
  clearCacheHomeLayout,
  homeLayoutsSelector,
} from 'store/UI';
import { isEqual } from 'lodash';
import { cleanUndef } from 'lib/clearUndef';
import HomeDashboardLayout from './HomeDashboardLayout';

const HomeDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const homeLayouts = useAppSelector(homeLayoutsSelector);
  const handleLayouts = useCallback(
    (curr, allLayouts: ReactGridLayout.Layouts) => {
      cleanUndef(allLayouts);
      if (isEqual(homeLayouts, allLayouts)) {
        dispatch(clearCacheHomeLayout());
        return;
      }
      dispatch(cacheHomeLayout(allLayouts));
    },
    [dispatch, homeLayouts]
  );

  return (
    <HomeDashboardLayout layouts={homeLayouts} handleLayouts={handleLayouts} />
  );
};

export default memo(HomeDashboard);
