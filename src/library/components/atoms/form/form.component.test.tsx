import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CheckBox,
  Input,
  Toggle,
  MultilineInput,
  Label,
  InputDate,
  InputDateTime,
  InputFile,
  InputRadio,
  InputWrapper,
} from './form.component';

describe('Checkbox component', () => {
  it('render checkbox correctly', () => {
    const checkbox = render(<CheckBox />);
    expect(checkbox).toMatchSnapshot();
  });
});

describe('Input component', () => {
  it('render input correctly', () => {
    const inputComp = render(
      <Input
        type='text'
        value='test'
        onChange={val => jest.fn()}
        onBlur={value => jest.fn()}
        onKeyDown={val => jest.fn()}
      />,
    );
    const input = inputComp.getByTestId('INPT');
    fireEvent.change(input, {target: {value: 'check'}});
    userEvent.type(input, 'value');
    fireEvent.blur(input);
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    fireEvent.keyPress(input, {key: 'Enter', keyCode: 13});

    expect(input).toMatchSnapshot();
  });
});
describe('Toggle component', () => {
  it('render toggle correctly', () => {
    const toggle = render(<Toggle />);
    expect(toggle).toMatchSnapshot();
  });
});

// describe('SelectOption component', () => {
//   it('render selectOption correctly', () => {
//     const select = render(
//       <SelectOption key='test' onChange={value => jest.fn()} value='test' />,
//     );
//     const selectOption = select.getByTestId('SELECT');
//     fireEvent.change(selectOption, {target: {value: 'check'}});
//     userEvent.type(selectOption, 'value');
//     expect(select).toMatchSnapshot();
//   });
// });
describe('MultilineInput component', () => {
  it('render multilineInput correctly', () => {
    const multi = render(<MultilineInput />);
    expect(multi).toMatchSnapshot();
  });
});

// describe('Clock component', () => {
//   it('render clock correctly', () => {
//     const clock = render(
//       <Clock value='2022-02-20' onChange={value => jest.fn()} />,
//     );
//     expect(clock).toMatchSnapshot();
//   });
// });
describe('Label component', () => {
  it('render label correctly', () => {
    const label = render(<Label htmlFor='vsdvrf' />);
    expect(label).toMatchSnapshot();
  });
});

describe('InputDate component', () => {
  it('render inputDate correctly', () => {
    const inputDate = render(<InputDate />);
    expect(inputDate).toMatchSnapshot();
  });
});
describe('InputDateTime component', () => {
  it('render inputDateTime correctly', () => {
    const inputDateTime = render(<InputDateTime />);
    expect(inputDateTime).toMatchSnapshot();
  });
});

describe('InputFile component', () => {
  it('render inputFile correctly', () => {
    const inputFile = render(<InputFile />);
    expect(inputFile).toMatchSnapshot();
  });
});
describe('InputRadio component', () => {
  it('render inputRadio correctly', () => {
    const inputRadio = render(<InputRadio />);
    expect(inputRadio).toMatchSnapshot();
  });
});

describe('InputWrapper component', () => {
  it('render inputWrapper correctly', () => {
    const inputWrapper = render(<InputWrapper />);
    expect(inputWrapper).toMatchSnapshot();
  });
});
