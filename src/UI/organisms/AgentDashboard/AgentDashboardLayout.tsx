import { useMedia } from 'lib/useMedia';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import AgentDescription from 'UI/atoms/AgentDescription/AgentDescription';
import AgentInfoWidget from 'UI/atoms/AgentInfoWidget/AgentInfoWidget';
import AgentTurnoverValueWidget from 'UI/atoms/AgentTurnoverValueWidget/AgentTurnoverValueWidget';
import AgentTvlValueWidget from 'UI/atoms/AgentTvlValueWidget/AgentTvlValueWidget';
import AgentGraphConnected from 'UI/molecules/AgentGraph/AgentGraphConnected';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const AgentDashboardLayout: FC<IAgentDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => {
  const { address = '' } = useParams<{ address: string }>();
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
        <NeuBox key='widget-1'>
          <AgentTvlValueWidget />
        </NeuBox>
        <NeuBox key='widget-2'>
          <AgentTurnoverValueWidget />
        </NeuBox>
        <NeuBox key='widget-chart'>
          <AgentGraphConnected />
        </NeuBox>
      </DragLayout>
      {address === '7AUBFK4YAUGUF3RWWYRFXXF7BBWY2V7Y' && <AgentDescription />}
      <AgentsTableConnected />
    </>
  );
};

export default memo(AgentDashboardLayout);
