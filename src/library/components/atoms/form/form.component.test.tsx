import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {
  CheckBox,
  Input,
  Toggle,
  SelectOption,
  MultilineInput,
  Clock,
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
        defaultValue='test'
      />,
    );
    const input = inputComp.getByTestId('INPT');
    fireEvent.change(input, {target: {value: 'test'}});
    expect(input).toMatchSnapshot();
  });
});
// describe('Toggle component', () => {
//   it('render toggle correctly', () => {
//     const toggle = render(<Toggle />);
//     expect(toggle).toMatchSnapshot();
//   });
// });

// describe('SelectOption component', () => {
//   it('render selectOption correctly', () => {
//     const select = render(<SelectOption key='vd' />);
//     expect(select).toMatchSnapshot();
//   });
// });
// describe('MultilineInput component', () => {
//   it('render multilineInput correctly', () => {
//     const multi = render(<MultilineInput />);
//     expect(multi).toMatchSnapshot();
//   });
// });

// describe('Clock component', () => {
//   it('render clock correctly', () => {
//     const clock = render(<Clock />);
//     expect(clock).toMatchSnapshot();
//   });
// });
// describe('Label component', () => {
//   it('render label correctly', () => {
//     const label = render(<Label htmlFor='vsdvrf' />);
//     expect(label).toMatchSnapshot();
//   });
// });

// describe('InputDate component', () => {
//   it('render inputDate correctly', () => {
//     const inputDate = render(<InputDate />);
//     expect(inputDate).toMatchSnapshot();
//   });
// });
// describe('InputDateTime component', () => {
//   it('render inputDateTime correctly', () => {
//     const inputDateTime = render(<InputDateTime />);
//     expect(inputDateTime).toMatchSnapshot();
//   });
// });

// describe('InputFile component', () => {
//   it('render inputFile correctly', () => {
//     const inputFile = render(<InputFile />);
//     expect(inputFile).toMatchSnapshot();
//   });
// });
// describe('InputRadio component', () => {
//   it('render inputRadio correctly', () => {
//     const inputRadio = render(<InputRadio />);
//     expect(inputRadio).toMatchSnapshot();
//   });
// });

// describe('InputWrapper component', () => {
//   it('render inputWrapper correctly', () => {
//     const inputWrapper = render(<InputWrapper />);
//     expect(inputWrapper).toMatchSnapshot();
//   });
// });
