import { useMedia } from 'lib/useMedia';
import { FC, memo } from 'react';
import MostActiveAgentsWidget from 'UI/atoms/MostActiveAgentsWidget/MostActiveAgentsWidget';
import TurnoverValueWidget from 'UI/atoms/TurnoverValueWidget/TurnoverValueWidget';
import TvlValueWidget from 'UI/atoms/TvlValueWidget/TvlValueWidget';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import TotalGraphConnected from 'UI/molecules/TotalGraph/TotalGraphConnected';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const HomeDashboardLayout: FC<IHomeDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => {
  const { isPortable } = useMedia();

  return (
    <>
      <DragLayout
        cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
        margin={isPortable ? [10, 10] : [25, 25]}
        rowHeight={145}
        isBounded
        layouts={layouts}
        onLayoutChange={handleLayouts}
        measureBeforeMount
        compactType='vertical'
      >
        <NeuBox key='widget-1'>
          <TvlValueWidget />
        </NeuBox>
        <NeuBox key='widget-2'>
          <TurnoverValueWidget />
        </NeuBox>
        <NeuBox key='widget-3'>
          <MostActiveAgentsWidget />
        </NeuBox>
        <NeuBox key='widget-chart'>
          <TotalGraphConnected />
        </NeuBox>
      </DragLayout>

      <AgentsTableConnected />
    </>
  );
};

export default memo(HomeDashboardLayout);
