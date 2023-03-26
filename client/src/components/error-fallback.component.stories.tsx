import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ErrorFallback } from './error-fallback.component';

const Index = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    handleErrorReport: { action: 'handleErrorReport' },
  },
} as ComponentMeta<typeof ErrorFallback>;

export default Index;

const Template: ComponentStory<typeof ErrorFallback> = args => <ErrorFallback {...args} />;

export const Default = Template.bind({});
Default.args = {
  error: new Error('Some Test Message'),
};
