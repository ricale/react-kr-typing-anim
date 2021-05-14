import { Story, Meta } from '@storybook/react';

import Typing, { TypingProps } from '../Typing';

export default {
  title: 'Example/Typing',
  component: Typing,
} as Meta;

const Template: Story<TypingProps> = (args) => <Typing {...args} />;

export const Default = Template.bind({});
Default.args = {
  str: '타이핑 컴포넌트!',
  preDelay: 1000,
  cursor: true,
};
