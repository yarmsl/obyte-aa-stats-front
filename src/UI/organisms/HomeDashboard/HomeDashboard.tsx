import { FC, memo, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  cacheHomeLayout,
  clearCacheHomeLayout,
  homeLayoutsSelector,
  initialHomeSearchParamsSelector,
} from 'store/UI';
import { cleanUndef } from 'lib/clearUndef';
import { equals } from 'ramda';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import HomeDashboardLayout from './HomeDashboardLayout';

const HomeDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const homeLayouts = useAppSelector(homeLayoutsSelector);
  const initialHomeSearchParams = useAppSelector(
    initialHomeSearchParamsSelector
  );
  const { setUrl } = useStateUrlParams();

  const handleLayouts = useCallback(
    (curr, allLayouts: ReactGridLayout.Layouts) => {
      cleanUndef(allLayouts);
      if (equals(homeLayouts, allLayouts)) {
        dispatch(clearCacheHomeLayout());
        return;
      }
      dispatch(cacheHomeLayout(allLayouts));
    },
    [dispatch, homeLayouts]
  );

  useEffect(() => {
    setUrl(initialHomeSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeDashboardLayout layouts={homeLayouts} handleLayouts={handleLayouts} />
  );
};

export default memo(HomeDashboard);
