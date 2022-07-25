import { FC, memo, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  agentLayoutsSelector,
  cacheAgentLayout,
  clearCacheAgentLayout,
  initialAgentPageSearchParamsSelector,
} from 'store/UI';
import { cleanUndef } from 'lib/clearUndef';
import { equals } from 'ramda';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useParams } from 'react-router-dom';
import AgentDashboardLayout from './AgentDashboardLayout';

const AgentDashboard: FC = () => {
  const { address = '' } = useParams<{ address: string }>();
  const dispatch = useAppDispatch();
  const { setUrl } = useStateUrlParams();
  const agentLayouts = useAppSelector(agentLayoutsSelector);
  const initialAgentPageSearchParams = useAppSelector(
    initialAgentPageSearchParamsSelector
  );
  const handleLayouts = useCallback(
    (curr, allLayouts: ReactGridLayout.Layouts) => {
      cleanUndef(allLayouts);
      if (equals(agentLayouts, allLayouts)) {
        dispatch(clearCacheAgentLayout());
        return;
      }
      dispatch(cacheAgentLayout(allLayouts));
    },
    [dispatch, agentLayouts]
  );

  useEffect(() => {
    if (address) setUrl(initialAgentPageSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <AgentDashboardLayout
      layouts={agentLayouts}
      handleLayouts={handleLayouts}
    />
  );
};

export default memo(AgentDashboard);
