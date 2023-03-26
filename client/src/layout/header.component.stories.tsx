import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './header.component';

const Index = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof Header>;

export default Index;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
