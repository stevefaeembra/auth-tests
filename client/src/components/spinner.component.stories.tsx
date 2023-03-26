import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AstrosatSpinner } from './spinner.component';

const Index = {
  title: 'Components/Astrosat Spinner',
  component: AstrosatSpinner,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof AstrosatSpinner>;

export default Index;

const Template: ComponentStory<typeof AstrosatSpinner> = args => <AstrosatSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {};
