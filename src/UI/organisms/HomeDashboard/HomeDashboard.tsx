import { FC, memo } from 'react';
import ValueWidget from 'UI/atoms/Widget/ValueWidget';
import TotalGraph from 'UI/molecules/TotalGraph/TotalGraph';
import DragLayout from 'UI/templates/DragLayout/DragLayout';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const HomeDashboard: FC = () => (
  <DragLayout
    cols={{ xxs: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
    margin={[30, 30]}
    rowHeight={175}
    isDroppable
    isBounded
    layouts={{
      md: [
        { i: 'a', x: 0, y: 0, w: 1, h: 1, isResizable: false },
        { i: 'b', x: 1, y: 0, w: 1, h: 1, isResizable: false },
        { i: 'c', x: 2, y: 0, w: 1, h: 1, isResizable: false },
        { i: 'e', x: 0, y: 1, w: 3, h: 2, minW: 2, maxW: 3 },
        { i: 'f', x: 0, y: 3, w: 3, h: 2 },
      ],
    }}
  >
    <NeuBox key='a'>
      <ValueWidget title='Widget title' value={1277} unit='$' />
    </NeuBox>
    <NeuBox key='b'>
      <ValueWidget title='Widget title' value={44} unit='B' />
    </NeuBox>
    <NeuBox key='c'>
      <ValueWidget title='Widget title' value={32.324} unit='%' />
    </NeuBox>
    <NeuBox key='e'>
      <TotalGraph />
    </NeuBox>
    <NeuBox key='f'>333333333333333rd</NeuBox>
  </DragLayout>
);

export default memo(HomeDashboard);
