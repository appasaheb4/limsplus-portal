/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
import React, {CSSProperties, Ref} from 'react';
import {IconProps} from '../svg.component';
import {Buttons, Icons} from '../..';

export interface ButtonProps {
  type?: 'solid' | 'outline';
  onClick?: () => void;
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
  icon?: React.FunctionComponent<IconProps>;
  pill?: boolean;
  disabled?: boolean;
  id?: string;
  innerRef?: any;
  className?: string;
  buttonClass?: string;
  buttonStyle?: any;
  children?: React.ReactNode;
}

export const Button = React.forwardRef((props: ButtonProps, ref: Ref<any>) => {
  const buttonSizeClass =
    props.size === 'small'
      ? 'px-2 py-1 text-xs'
      : props.size === 'large'
      ? 'px-4 py-2 text-base'
      : 'px-3 py-2 text-sm';

  const buttonColorClass =
    props.type === 'solid'
      ? 'text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
      : 'text-gray-600 border border-gray-400 hover:shadow-lg';

  const roundedClass = props.pill ? 'rounded-full' : 'rounded-lg';

  const Icon = props.icon;

  return (
    <div className={`${props.className}`} style={props.style}>
      <button
        onClick={props.onClick}
        type='button'
        disabled={props.disabled}
        id={props.id}
        ref={props.innerRef}
        style={props.buttonStyle}
        className={`${props.buttonClass} inline-flex items-center ${buttonSizeClass} ${roundedClass} shadow-sm   font-medium ${buttonColorClass} disabled:opacity-50 disabled:cursor-not-allowed text-center `}
      >
        {Icon && (
          <Icon
            size={props.size}
            type={props.type === 'solid' ? 'inverse' : 'solid'}
            buttonOffset
          />
        )}
        {props.children}
      </button>
    </div>
  );
});

interface ButtonCircleAddRemoveProps {
  show?: boolean;
  type?: 'solid' | 'outline';
  onClick: (status: boolean) => void;
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
  icon?: React.FunctionComponent<IconProps>;
  pill?: boolean;
  disabled?: boolean;
}

export const ButtonCircleAddRemove: React.FunctionComponent<
  ButtonCircleAddRemoveProps
> = props => {
  return (
    <>
      {props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: '#454CBF',
            alignItems: 'center',
            width: 60,
            height: 60,
            position: 'fixed',
            bottom: 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(true)}
        >
          <Icons.EvaIcon icon='plus-outline' size='large' color='#ffffff' />
        </Buttons.CircleButton>
      )}

      {!props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: '#454CBF',
            alignItems: 'center',
            width: 60,
            height: 60,
            position: 'fixed',
            bottom: 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(false)}
        >
          <Icons.EvaIcon icon='minus-outline' size='large' color='#ffffff' />
        </Buttons.CircleButton>
      )}
    </>
  );
};

export const ButtonCircleAddRemoveBottom: React.FunctionComponent<
  ButtonCircleAddRemoveProps
> = props => {
  return (
    <>
      {props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: '#454CBF',
            alignItems: 'center',
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: props.style?.bottom || 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(true)}
          isDisable={props.disabled || false}
        >
          <Icons.EvaIcon icon='plus-outline' size='large' color='#ffffff' />
        </Buttons.CircleButton>
      )}

      {!props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: '#454CBF',
            alignItems: 'center',
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: props.style?.bottom || 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(false)}
        >
          <Icons.EvaIcon icon='minus-outline' size='large' color='#ffffff' />
        </Buttons.CircleButton>
      )}
    </>
  );
};

interface CircleButtonProps {
  isDisable?: boolean;
  style?: CSSProperties;
  onClick: () => void;
  children?: React.ReactNode;
}

export const CircleButton: React.FunctionComponent<
  CircleButtonProps
> = props => (
  <div
    style={props.style}
    className={`rounded-full h-7 w-7 border border-gray-300 text-gray-400 flex justify-center items-center ${
      props.isDisable ? 'opacity-50 cursor-not-allowed ' : ' '
    } `}
    onClick={props.isDisable ? undefined : props.onClick}
  >
    {props.children}
  </div>
);

interface ButtonIconProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const ButtonIcon = ({title, icon, onClick}: ButtonIconProps) => (
  <div
    className='rounded-full  border border-gray-300 text-gray-400 flex justify-center items-center'
    onClick={() => onClick()}
  >
    {icon}
  </div>
);
