import { Story, Meta } from '@storybook/react';

import TypingMultiline, { TypingMultilineProps } from '../TypingMultiline';

export default {
  title: 'Example/TypingMultiline',
  component: TypingMultiline,
} as Meta;

const Template: Story<TypingMultilineProps> = (args) => <TypingMultiline {...args} />;

export const Default = Template.bind({});
Default.args = {
  strs: ['타이핑 컴포넌트!', '여러 줄도 한 번에!'],
  preDelay: 1000,
  cursor: true,
};
