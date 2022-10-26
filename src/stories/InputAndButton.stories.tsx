import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {InputAndButton} from "../components/InputAndButton";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/InputAndButton',
    component: InputAndButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: { description:'button clicked inside form' },
    },
} as ComponentMeta<typeof InputAndButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputAndButton> = (args) => <InputAndButton {...args} />;

export const InputAndButtonStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputAndButtonStories.args = {
  callback: action('button clicked inside form')
};


export const InputAndButtonDisableStories = Template.bind({});
InputAndButtonDisableStories.args = {
    callback: action('button clicked inside form'),
    disabled:true
};

