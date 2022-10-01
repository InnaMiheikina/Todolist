import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../components/store/ReduxStoreProviderDecorator";
import App from "../App";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/App',
    component: App,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: { description:'button clicked inside form' },
    },
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App />;

export const AppStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppStories.args = {
  callback: action('button clicked inside form')
};

