import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Footer from './footer.component';

const Index = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof Footer>;

export default Index;

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
