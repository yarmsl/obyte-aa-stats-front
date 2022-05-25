import { FC, memo } from 'react';
import AgentInfoWidget from 'UI/atoms/AgentInfoWidget/AgentInfoWidget';
import AgentGraphConnected from 'UI/molecules/AgentGraph/AgentGraphConnected';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const AgentDashboardLayout: FC<IAgentDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => (
  <DragLayout
    cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
    margin={[25, 25]}
    rowHeight={165}
    isBounded
    layouts={layouts}
    onLayoutChange={handleLayouts}
    measureBeforeMount
  >
    <NeuBox key='widget-1'>
      <AgentInfoWidget />
    </NeuBox>
    <NeuBox key='widget-chart'>
      <AgentGraphConnected />
    </NeuBox>
  </DragLayout>
);

export default memo(AgentDashboardLayout);
