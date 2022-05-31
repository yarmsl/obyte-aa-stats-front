import { FC, memo } from 'react';
import TurnoverValueWidget from 'UI/atoms/TurnoverValueWidget/TurnoverValueWidget';
import TvlValueWidget from 'UI/atoms/TvlValueWidget/TvlValueWidget';
import ValueWidget from 'UI/atoms/ValueWidget/ValueWidget';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import TotalGraphConnected from 'UI/molecules/TotalGraph/TotalGraphConnected';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const HomeDashboardLayout: FC<IHomeDashboardLayoutProps> = ({
  layouts,
  handleLayouts,
}) => (
  <>
    <DragLayout
      cols={{ xxs: 1, xs: 2, sm: 3, md: 3, lg: 4 }}
      margin={[25, 25]}
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
        <ValueWidget title='Widget title' value={32.324} unit='%' />
      </NeuBox>
      <NeuBox key='widget-chart'>
        <TotalGraphConnected />
      </NeuBox>
    </DragLayout>
    <AgentsTableConnected />
  </>
);

export default memo(HomeDashboardLayout);
