import { useMedia } from 'lib/useMedia';
import { FC, memo } from 'react';
import AgentInfoWidget from 'UI/atoms/AgentInfoWidget/AgentInfoWidget';
import AgentTurnoverValueWidget from 'UI/atoms/AgentTurnoverValueWidget/AgentTurnoverValueWidget';
import AgentTvlValueWidget from 'UI/atoms/AgentTvlValueWidget/AgentTvlValueWidget';
import AgentGraphConnected from 'UI/molecules/AgentGraph/AgentGraphConnected';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import DragBox from 'UI/templates/DragBox/DragBox';

const AgentDashboardLayout: FC<IAgentDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => {
  const { isPortable } = useMedia();
  return (
    <>
      <AgentInfoWidget />
      <DragLayout
        cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
        margin={isPortable ? [10, 10] : [25, 25]}
        rowHeight={165}
        isBounded
        layouts={layouts}
        onLayoutChange={handleLayouts}
        measureBeforeMount
      >
        <DragBox key='widget-1'>
          <AgentTvlValueWidget />
        </DragBox>
        <DragBox key='widget-2'>
          <AgentTurnoverValueWidget />
        </DragBox>
        <DragBox key='widget-chart'>
          <AgentGraphConnected />
        </DragBox>
      </DragLayout>
      <AgentsTableConnected />
    </>
  );
};

export default memo(AgentDashboardLayout);
