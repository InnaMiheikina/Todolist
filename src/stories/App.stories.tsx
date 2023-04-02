import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";
import App from "../App";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/App',
    component: App,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App demo={true}  />;

export const AppStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppStories.args = {}

