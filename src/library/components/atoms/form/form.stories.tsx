import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {
  Label,
  InputWrapper,
  Input,
  MultilineInput,
  InputRadio,
  InputDate,
  InputDateTime,
  SelectOption,
  InputFile,
  Toggle,
} from './form.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Form',
  component: Label,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: {control: 'color'},
  //   },
} as ComponentMeta<typeof Label>;

export const _InputWraaper: ComponentStory<typeof Label> = () => (
  <InputWrapper label='Testing' />
);

export const _Input: ComponentStory<typeof Label> = () => (
  <Input
    label='Analyte Name'
    name='txtAnalyteName'
    placeholder='Analyte Name'
    value=''
    disabled={false}
    onChange={analyteName => {}}
  />
);

export const _MultilineInput: ComponentStory<typeof Label> = () => (
  <MultilineInput
    label='MultiLineInput'
    disabled={false}
    onChange={hex => {
      console.log({hex});
    }}
  />
);

export const _InputRadio: ComponentStory<typeof Label> = () => (
  <InputRadio label='RadioButton' onChange={() => {}} disabled={false} />
);

export const _InputDate: ComponentStory<typeof Label> = () => (
  <InputDate
    label='DateTimeTest'
    disabled={false}
    value=''
    onChange={() => console.log('Date')}
  />
);

export const _InputDateTime: ComponentStory<typeof Label> = () => (
  <InputDateTime label='DateTimePicker' disabled={false} onChange={() => {}} />
);

export const _SelectOption: ComponentStory<typeof Label> = () => (
  <SelectOption label='select ' onChange={() => {}} key=''>
    <option selected>Select</option>
    {[{name: 'bhink'}]?.map((item: any) => (
      <option key={item} value={item}>
        {item.name}
      </option>
    ))}
  </SelectOption>
);

export const _InputFile: ComponentStory<typeof Label> = () => (
  <InputFile
    label='Attachment'
    placeholder='File'
    onChange={e => {
      const attachment = e.target.files[0];
      console.log({attachment});
    }}
  />
);

export const _Toggle: ComponentStory<typeof Label> = () => (
  <Toggle label='ToggleBtn' onChange={() => {}} />
);
