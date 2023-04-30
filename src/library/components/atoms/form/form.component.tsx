import React, {useState, useEffect, Ref} from 'react';
import {ModalClock} from '../..';
import dayjs from 'dayjs';
import '../css/toggle.css';
import classNames from 'classnames';
import DateTimePicker from 'react-datetime-picker';
import '../css/date-time-picker.css';

interface LabelProps {
  htmlFor: string;
  hasError?: boolean;
  style?: any;
  children?: React.ReactNode;
}

export const Label: React.FunctionComponent<LabelProps> = props => (
  <>
    <label
      htmlFor={props.htmlFor}
      className={`${
        props.hasError ? 'text-red-400' : 'text-gray-700'
      } block text-3xs font-medium  mb-1`}
      style={{...props.style}}
    >
      {props.children}
    </label>
  </>
);

interface InputWrapperProps {
  id?: string;
  label?: string;
  className?: string;
  hasError?: boolean;
  style?: any;
  ref?: any;
  children?: React.ReactNode;
}

export const InputWrapper: React.FunctionComponent<InputWrapperProps> = (
  props: InputWrapperProps,
) => (
  <div className={props.className} ref={props.ref}>
    <Label
      htmlFor={props.id || ''}
      hasError={props.hasError}
      style={{...props.style}}
    >
      {props.label}
    </Label>
    {props.children}
  </div>
);

interface InputProps extends InputWrapperProps {
  value?: any;
  defaultValue?: any;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  rows?: number;
  style?: any;
  wrapperStyle?: any;
  hasError?: boolean;
  pattern?: any;
  maxLength?: number;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  inputRef?: any;
}

export const Input = React.forwardRef((props: InputProps, ref: Ref<any>) => {
  const handleKeyPress = e => {
    const key = e.key;
    const regex = props.pattern;
    if (regex && !regex?.test(key)) {
      e.preventDefault();
    }
  };

  return (
    <InputWrapper
      label={props.label}
      id={props.id}
      hasError={props.hasError}
      style={props.wrapperStyle}
      className={props.labelClassName}
    >
      <input
        type={props.type || 'text'}
        id={props.id}
        ref={props.inputRef}
        data-testid='INPT'
        name={props.name}
        style={props.style}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        required={props.required || false}
        disabled={props.disabled || false}
        autoComplete='given-name'
        maxLength={props.maxLength}
        value={props.value}
        onChange={e => props.onChange && props.onChange(e.target.value)}
        onKeyPress={e => handleKeyPress(e)}
        className={`${
          props.className
        } leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2  ${
          props.hasError ? 'border-red ' : 'border-gray-300'
        } rounded-md`}
        onBlur={e => props.onBlur && props.onBlur(e.target.value)}
        onKeyDown={props.onKeyDown}
      />
    </InputWrapper>
  );
});

export const MultilineInput = (props: InputProps) => (
  <InputWrapper label={props.label} id={props.id} className={props.className}>
    <textarea
      id={props.id}
      autoComplete='given-name'
      value={props.value}
      disabled={props.disabled}
      style={props.style}
      rows={props.rows}
      placeholder={props.placeholder}
      onChange={e => props.onChange && props.onChange(e.target.value)}
      onBlur={e => props.onBlur && props.onBlur(e.target.value)}
      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
        props.hasError ? 'border-red ' : 'border-gray-300'
      } rounded-md`}
      defaultValue={props.defaultValue}
    />
  </InputWrapper>
);

interface InputRadioProps extends InputWrapperProps {
  values?: any[];
  value?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  labelStyle?: any;
  onChange?: (e: any) => void;
}

export const InputRadio = (props: InputRadioProps) => (
  <InputWrapper label={props.label} id={props.id} style={props.labelStyle}>
    {props.values?.map((item, key) => (
      <div
        className='flex items-center gap-2'
        key={key}
        onClick={() => {
          props.onChange && props.onChange(item.value);
        }}
      >
        <input
          key={key}
          type='radio'
          id={props.id}
          name={props.name}
          value={item.value}
          checked={item.value == props.value ? true : false}
          onChange={() => props.onChange && props.onChange(item.value)}
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        <Label htmlFor={props.id || ''} style={{marginTop: 6}}>
          {item.label}
        </Label>
      </div>
    ))}
  </InputWrapper>
);

interface InputDateProps extends InputWrapperProps {
  value?: any;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  format?: string;
  use12Hours?: boolean;
  onChange?: (e: any) => void;
  onFocusRemove?: (date: any) => void;
}

export const InputDate = ({
  name,
  value,
  placeholder,
  use12Hours = true,
  label,
  id,
  hasError,
  disabled,
  format,
  onChange,
  onFocusRemove,
}: InputDateProps) => (
  <InputWrapper label={label} id={id} hasError={hasError}>
    <input
      type='date'
      id={id}
      name={name}
      disabled={disabled || false}
      value={value}
      onChange={e => onChange && onChange(e)}
      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
        hasError ? 'border-red ' : 'border-gray-300'
      } rounded-md`}
    />
  </InputWrapper>
);

export const InputDateTime = ({
  name,
  value,
  placeholder,
  use12Hours = true,
  label,
  id,
  hasError,
  disabled,
  format = 'dd-MM-yyyy HH:mm:ss',
  style,
  className,
  onChange,
  onFocusRemove,
}: InputDateProps) => {
  const [date, setDate] = useState(value);

  return (
    <InputWrapper label={label} id={id} hasError={hasError}>
      <div style={style}>
        {use12Hours ? (
          <DateTimePicker
            disabled={disabled}
            onChange={value => {
              setDate(value);
              onChange && onChange(value);
            }}
            onCalendarClose={() => {
              if (value !== date) onFocusRemove && onFocusRemove(date);
            }}
            onClockClose={() => {
              if (value !== date) onFocusRemove && onFocusRemove(date);
            }}
            value={value}
            amPmAriaLabel='AM/PM'
            format={format || 'dd-MM-yyyy hh:mm:ss a'}
            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
              hasError ? 'border-red ' : 'border-gray-300'
            } rounded-md relative z-2`}
          />
        ) : (
          <DateTimePicker
            value={value}
            onChange={value => {
              setDate(value);
              onChange && onChange(value);
            }}
            onCalendarClose={() => {
              if (value !== date) onFocusRemove && onFocusRemove(date);
            }}
            onClockClose={() => {
              if (value !== date) onFocusRemove && onFocusRemove(date);
            }}
            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
              hasError ? 'border-red ' : 'border-gray-300'
            } rounded-md relative z-2`}
            calendarClassName='h-96 z-50 absolute'
          />
        )}
      </div>
    </InputWrapper>
  );
};

export const DatePicker = ({
  name,
  value,
  placeholder,
  use12Hours = true,
  label,
  id,
  hasError,
  disabled,
  format = 'dd-MM-yyyy',
  style,
  className,
  onChange,
  onFocusRemove,
}: InputDateProps) => {
  const [date, setDate] = useState(value);

  return (
    <InputWrapper label={label} id={id} hasError={hasError}>
      <div style={style}>
        <DateTimePicker
          disabled={disabled}
          onChange={value => {
            setDate(value);
            onChange && onChange(value);
          }}
          onCalendarClose={() => {
            if (value !== date) onFocusRemove && onFocusRemove(date);
          }}
          onClockClose={() => {
            if (value !== date) onFocusRemove && onFocusRemove(date);
          }}
          value={value}
          amPmAriaLabel='AM/PM'
          format={format || 'dd-MM-yyyy'}
          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
            hasError ? 'border-red ' : 'border-gray-300'
          } rounded-md relative z-2`}
        />
      </div>
    </InputWrapper>
  );
};

export const CheckBox = props => {
  return (
    <div>
      <input
        key={props.id}
        onClick={props.handleCheckChieldElement}
        type='checkbox'
        checked={props.isChecked}
        value={props.value}
      />{' '}
      {props.value}
    </div>
  );
};

interface SelectOptionProps extends InputWrapperProps {
  value?: any;
  values?: any[];
  name?: string;
  key: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

export const SelectOption = (props: SelectOptionProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <select
      name={props.name}
      className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
      onChange={e => props.onChange && props.onChange(e.target.value)}
      data-testid='SELECT'
      value={props.value}
    >
      <option selected>Select</option>
      {props.values?.map((item: any) => (
        <option key={item[props.key]} value={item[props.key]}>
          {item[props.key]}
        </option>
      ))}
    </select>
  </InputWrapper>
);

interface InputFileProps extends InputWrapperProps {
  value?: any;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  hasError?: boolean;
  onChange?: (e: any) => void;
}

export const InputFile = (props: InputFileProps) => (
  <InputWrapper label={props.label} id={props.id}>
    <input
      type='file'
      id={props.id}
      name={props.name}
      disabled={props.disabled || false}
      accept={props.accept}
      value={props.value}
      onChange={e => props.onChange && props.onChange(e)}
      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
        props.hasError ? 'border-red ' : 'border-gray-300'
      } rounded-md`}
      multiple={props.multiple}
    />
  </InputWrapper>
);

interface ToggleProps extends InputWrapperProps {
  disabled?: boolean;
  isToggleLabel?: boolean;
  defaultChecked?: boolean;
  className?: string;
  icons?: any;
  value?: boolean;
  name?: string;
  onChange?: (e: boolean) => void;
  style?: any;
}

// const CheckedIcon = () => <>On</>
// const UncheckedIcon = () => <>Off</>

export const Toggle = (props: ToggleProps) => {
  const [toggle, setToggle] = useState(props.value);
  const {onChange, disabled, className, isToggleLabel = true} = props;

  useEffect(() => {
    setToggle(props.value);
  }, [props.value]);

  const triggerToggle = () => {
    if (disabled) {
      return;
    }
    setToggle(!toggle);
    if (typeof onChange === 'function') {
      onChange(!toggle);
    }
  };

  const toggleClasses = classNames(
    'wrg-toggle ',
    {
      'wrg-toggle--checked': toggle,
      'wrg-toggle--disabled': disabled,
    },
    className,
  );

  return (
    <InputWrapper label={props.label} id={props.id} style={props.style}>
      <div onClick={triggerToggle} className={toggleClasses}>
        <div
          className={
            'wrg-toggle-container ' + (toggle ? 'bg-green-700' : 'bg-black')
          }
        >
          {isToggleLabel && (
            <>
              <div className='wrg-toggle-check'>
                <span className='text-white ml-1'>Yes</span>
              </div>
              <div className='wrg-toggle-uncheck'>
                <span className='text-white'>No</span>
              </div>
            </>
          )}
        </div>
        <div
          className={`wrg-toggle-circle ${toggle ? 'ml-1' : 'mr-1'}  `}
        ></div>
        <input
          type='checkbox'
          aria-label='Toggle Button'
          className='wrg-toggle-input'
        />
      </div>
    </InputWrapper>
  );
};

interface ClockProps extends InputWrapperProps {
  value?: any;
  onChange?: (e: any) => void;
}

export const Clock = (props: ClockProps) => {
  const [time, setTime] = useState(props.value || dayjs().format('hh:mm a'));
  const [showTime, setShowTime] = useState(false);

  return (
    <InputWrapper label={props.label} id={props.id}>
      <div>
        {showTime && (
          <>
            <ModalClock
              show={true}
              time={time}
              onClick={time => {
                props.onChange && props.onChange(time);
                setTime(time);
              }}
              onClose={() => {
                setShowTime(false);
              }}
            />
          </>
        )}
        <input
          value={time}
          className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
          onClick={() => setShowTime(true)}
        />
      </div>
    </InputWrapper>
  );
};
