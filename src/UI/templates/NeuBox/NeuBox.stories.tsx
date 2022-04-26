import { ComponentStory, ComponentMeta } from '@storybook/react';

import NeuBox from './NeuBox';

export default {
  title: 'templates/NeuBox',
  component: NeuBox,
} as ComponentMeta<typeof NeuBox>;

const Template: ComponentStory<typeof NeuBox> = (args) => <NeuBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'content',
};
