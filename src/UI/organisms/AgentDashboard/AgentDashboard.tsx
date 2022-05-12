import { FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  agentLayoutsSelector,
  cacheAgentLayout,
  clearCacheAgentLayout,
} from 'store/UI';
import { cleanUndef } from 'lib/clearUndef';
import { equals } from 'ramda';
import AgentDashboardLayout from './AgentDashboardLayout';

const AgentDashboard: FC = () => {
  const dispatch = useAppDispatch();
  const agentLayouts = useAppSelector(agentLayoutsSelector);
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

  return (
    <AgentDashboardLayout
      layouts={agentLayouts}
      handleLayouts={handleLayouts}
    />
  );
};

export default memo(AgentDashboard);
