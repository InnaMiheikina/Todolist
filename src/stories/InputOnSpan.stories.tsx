// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {InputOnSpan} from "../components/InputOnSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLISTS/InputOnSpan',
    component: InputOnSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback:{
            description: 'value EditableSpan changed'
        }
    }
} as ComponentMeta<typeof InputOnSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputOnSpan> = (args) => <InputOnSpan {...args} />;

export const InputOnSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputOnSpanStory.args = {
    callback: action('button clicked inside form'),
    title:'jhgfds'
};

