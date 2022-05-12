import { FC, memo } from 'react';
import ValueWidget from 'UI/atoms/ValueWidget/ValueWidget';
import AgentsTableConnected from 'UI/molecules/AgentsTable/AgentsTableConnected';
import TotalGraphConnected from 'UI/molecules/TotalGraph/TotalGraphConnected';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const HomeDashboardLayout: FC<IHomeDashboardLayoutProps> = ({
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
      <ValueWidget title='Widget title' value={1277} unit='$' />
    </NeuBox>
    <NeuBox key='widget-2'>
      <ValueWidget title='Widget title' value={44} unit='B' />
    </NeuBox>
    <NeuBox key='widget-3'>
      <ValueWidget title='Widget title' value={32.324} unit='%' />
    </NeuBox>
    <NeuBox key='widget-chart'>
      <TotalGraphConnected />
    </NeuBox>
    <NeuBox key='widget-table'>
      <AgentsTableConnected />
    </NeuBox>
  </DragLayout>
);

export default memo(HomeDashboardLayout);
