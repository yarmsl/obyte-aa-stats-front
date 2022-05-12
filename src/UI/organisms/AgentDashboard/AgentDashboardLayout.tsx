import { FC, memo } from 'react';
import AgentInfoWidget from 'UI/atoms/AgentInfoWidget/AgentInfoWidget';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const AgentDashboardLayout: FC<IAgentDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => (
  <DragLayout
    cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
    margin={[30, 30]}
    rowHeight={150}
    isBounded
    layouts={layouts}
    onLayoutChange={handleLayouts}
    measureBeforeMount
  >
    <NeuBox key='widget-1'>
      <AgentInfoWidget />
    </NeuBox>
    <NeuBox key='widget-chart'>chart</NeuBox>
    <NeuBox key='widget-table'>table</NeuBox>
  </DragLayout>
);

export default memo(AgentDashboardLayout);
