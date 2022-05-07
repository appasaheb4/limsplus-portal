import React from 'react';
import {render} from '@utils';
import {
  CheckBox,
  MultilineInput,
  Input,
  InputDate,
  InputDateTime,
  InputFile,
  SelectOption,
  InputRadio,
  Toggle,
  InputWrapper,
  Label,
  Clock,
} from './form.component';

it('render checkBox correctly', () => {
  const checkBox = render(
    <CheckBox className='w-40' onClick={() => jest.fn()}>
      Permanent Address
    </CheckBox>,
  );
  expect(checkBox).toMatchSnapshot();
});

it('render  multilineInput correctly', () => {
  const multilineInput = render(
    <MultilineInput className='w-40' onBlur={() => jest.fn()} />,
  );
  expect(multilineInput).toMatchSnapshot();
});

it('render  input correctly', () => {
  const input = render(<Input className='w-40' onBlur={() => jest.fn()} />);
  expect(input).toMatchSnapshot();
});
it('render  inputDate correctly', () => {
  const inputDate = render(
    <InputDate className='w-40' onChange={() => jest.fn()} />,
  );
  expect(inputDate).toMatchSnapshot();
});

it('render  inputDateTime correctly', () => {
  const inputDateTime = render(
    <InputDateTime className='w-40' onChange={() => jest.fn()} />,
  );
  expect(inputDateTime).toMatchSnapshot();
});

it('render  inputFile correctly', () => {
  const inputFile = render(
    <InputFile className='w-40' onChange={() => jest.fn()} />,
  );
  expect(inputFile).toMatchSnapshot();
});

it('render  selectOption correctly', () => {
  const selectOption = render(
    <SelectOption key='' className='w-40' onChange={() => jest.fn()} />,
  );
  expect(selectOption).toMatchSnapshot();
});
it('render  inputRadio correctly', () => {
  const inputRadio = render(
    <InputRadio className='w-40' onChange={() => jest.fn()} />,
  );
  expect(inputRadio).toMatchSnapshot();
});
it('render  toggle correctly', () => {
  const toggle = render(<Toggle className='w-40' onChange={() => jest.fn()} />);
  expect(toggle).toMatchSnapshot();
});
it('render  inputWrapper correctly', () => {
  const inputWrapper = render(
    <InputWrapper className='w-40' label='Iam Input Wrapper' />,
  );
  expect(inputWrapper).toMatchSnapshot();
});

it('render  label correctly', () => {
  const label = render(<Label hasError={false} htmlFor='' />);
  expect(label).toMatchSnapshot();
});

it('render  clock correctly', () => {
  const clock = render(<Clock hasError={false} className='w-10' />);
  expect(clock).toMatchSnapshot();
});
