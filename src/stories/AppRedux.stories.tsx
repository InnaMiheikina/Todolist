import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AppRedux from "../AppRedux";
import {ReduxStoreProviderDecorator} from "../components/store/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AppRedux',
    component: AppRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: { description:'button clicked inside form' },
    },
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppRedux> = (args) => <AppRedux />;

export const AppReduxStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppReduxStories.args = {
  callback: action('button clicked inside form')
};

