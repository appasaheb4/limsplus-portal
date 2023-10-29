import React, { useState, useEffect, Ref } from 'react';
import { ModalClock } from '../..';
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
        props.hasError ? 'text-red-400' : 'text-current'
      } block text-3xs font-medium  mb-1`}
      style={{ ...props.style }}
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
      style={{ ...props.style }}
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
  isAutoFocus?: boolean;
  input2isBlurEnable?: boolean;
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
        autoFocus={props?.isAutoFocus || false}
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
        onKeyDown={props.onKeyDown && props.onKeyDown}
      />
    </InputWrapper>
  );
});

export const InputPassword = React.forwardRef(
  (props: InputProps, ref: Ref<any>) => {
    const [isSecure, setSecure] = useState(true);
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
        <div className='flex items-center relative'>
          <input
            type={isSecure ? 'password' : 'text'}
            id={props.id}
            ref={props.inputRef}
            data-testid='INPT'
            autoFocus={props?.isAutoFocus || false}
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
            onKeyDown={props.onKeyDown && props.onKeyDown}
          />
          <div className='flex absolute right-2'>
            {isSecure ? (
              <svg
                className='h-6 text-gray-700'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
                onClick={() => setSecure(!isSecure)}
              >
                <path
                  fill='currentColor'
                  d='M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z'
                ></path>
              </svg>
            ) : (
              <svg
                className='h-6 text-gray-700'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 640 512'
                onClick={() => setSecure(!isSecure)}
              >
                <path
                  fill='currentColor'
                  d='M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z'
                ></path>
              </svg>
            )}
          </div>
        </div>
      </InputWrapper>
    );
  },
);

export const Input1 = React.forwardRef((props: InputProps, ref: Ref<any>) => {
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
        autoFocus={props?.isAutoFocus || false}
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
        onBlur={e => props.onBlur && props.onBlur(e)}
        onKeyDown={props.onKeyDown}
      />
    </InputWrapper>
  );
});

export const Input2 = React.forwardRef((props: InputProps, ref: Ref<any>) => {
  const [isBlur, setIsBlur] = useState(true);
  const handleKeyPress = e => {
    const key = e.key;
    const regex = props.pattern;
    if (regex && !regex?.test(key)) {
      e.preventDefault();
    }
  };

  const handleBlur = (value: string) => {
    props.onBlur && isBlur && props.onBlur(value);
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
        autoFocus={props?.isAutoFocus || false}
        name={props.name}
        style={props.style}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        required={props.required || false}
        disabled={props.disabled || false}
        autoComplete='given-name'
        maxLength={props.maxLength}
        value={props.value}
        onChange={e => {
          setIsBlur(true);
          props.onChange && props.onChange(e.target.value);
        }}
        onKeyPress={e => handleKeyPress(e)}
        className={`${
          props.className
        } leading-4 p-2  focus:outline-none focus:ring  block w-full shadow-sm sm:text-base  border-2  ${
          props.hasError ? 'border-red ' : 'border-gray-300'
        } rounded-md`}
        onKeyDown={(e: any) => {
          if (e.keyCode == 13) {
            setIsBlur(false);
            props.onBlur && props.onBlur(e.target.value);
          }
          props.onKeyDown && props.onKeyDown(e);
        }}
        onBlur={e => {
          handleBlur(e.target.value);
        }}
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

export const MultilineInput1 = (props: InputProps) => (
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
      onBlur={e => props.onBlur && props.onBlur(e)}
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
        <Label htmlFor={props.id || ''} style={{ marginTop: 6 }}>
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
  const { onChange, disabled, className, isToggleLabel = true } = props;

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
