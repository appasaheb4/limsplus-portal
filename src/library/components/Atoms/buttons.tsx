import React, { CSSProperties } from "react"
import { IconProps } from "./svg"
import {Buttons,Icons} from "@lp/library/components"
import {Styles} from "@lp/config"

interface ButtonProps {
  type?: "solid" | "outline"
  onClick?: () => void
  style?: CSSProperties
  size?: "small" | "medium" | "large"
  icon?: React.FunctionComponent<IconProps>
  pill?: boolean
  disabled?: string
  children?: React.ReactNode
}    
   
export const Button: React.FunctionComponent<ButtonProps> = (
  props: ButtonProps
): JSX.Element => {
  const buttonSizeClass =
    props.size === "small"
      ? `px-2 py-1 text-xs`
      : props.size === "large"
      ? `px-4 py-2 text-base`
      : "px-3 py-2 text-sm"

  const buttonColorClass =
    props.type === "solid"
      ? "text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
      : "text-gray-600 border border-gray-400 hover:shadow-lg"

  const roundedClass = props.pill ? "rounded-full" : "rounded-lg"

  const Icon = props.icon

  return (
    <button
      onClick={props.onClick}
      type="button"
      disabled={!!props.disabled}
      title={props.disabled}
      className={`inline-flex items-center ${buttonSizeClass} ${roundedClass} shadow-sm   font-medium ${buttonColorClass} disabled:opacity-50 disabled:cursor-not-allowed text-center`}
    >
      {Icon && (
        <Icon
          size={props.size}
          type={props.type === "solid" ? "inverse" : "solid"}
          buttonOffset
        />
      )}
      {props.children}
    </button>
  )
}

interface ButtonCircleAddRemoveProps {
  show?: boolean
  type?: "solid" | "outline"
  onClick: (status: boolean) => void
  style?: CSSProperties
  size?: "small" | "medium" | "large"
  icon?: React.FunctionComponent<IconProps>
  pill?: boolean
  disabled?: string
}

export const ButtonCircleAddRemove: React.FunctionComponent<ButtonCircleAddRemoveProps> = (
  props
) => {
  return (
    <>
      {props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: Styles.COLORS.PRIMARY,
            alignItems: "center",
            width: 60,
            height: 60,
            position: "fixed",
            bottom: 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(true)}
        >
          <Icons.EvaIcon
            icon="plus-outline"
            size="large"
            color={Styles.COLORS.WHITE}
          />
        </Buttons.CircleButton>
      )}

      {!props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: Styles.COLORS.PRIMARY,
            alignItems: "center",
            width: 60,
            height: 60,
            position: "fixed",
            bottom: 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(false)}
        >
          <Icons.EvaIcon
            icon="minus-outline"
            size="large"
            color={Styles.COLORS.WHITE}
          />
        </Buttons.CircleButton>
      )}
    </>
  )
}

export const ButtonCircleAddRemoveBottom: React.FunctionComponent<ButtonCircleAddRemoveProps> = (
  props
) => {
  return (  
    <>
      {props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: Styles.COLORS.PRIMARY,
            alignItems: "center",
            width: 60,
            height: 60,
            position: "absolute",
            bottom: props.style?.bottom || 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(true)}
        >
          <Icons.EvaIcon
            icon="plus-outline"
            size="large"
            color={Styles.COLORS.WHITE}
          />
        </Buttons.CircleButton>
      )}

      {!props.show && (
        <Buttons.CircleButton
          style={{
            backgroundColor: Styles.COLORS.PRIMARY,
            alignItems: "center",
            width: 60,
            height: 60,
            position: "absolute",
            bottom: props.style?.bottom || 60,
            right: 40,
            zIndex: 1,
          }}
          onClick={() => props.onClick(false)}
        >
          <Icons.EvaIcon
            icon="minus-outline"
            size="large"
            color={Styles.COLORS.WHITE}
          />
        </Buttons.CircleButton>
      )}
    </>
  )
}

interface CircleButtonProps {
  style?: CSSProperties;
  onClick: () => void;
}

export const CircleButton: React.FunctionComponent<CircleButtonProps> = (props) => (
  <div
    style={props.style}
    className="rounded-full h-7 w-7 border border-gray-300 text-gray-400 flex justify-center items-center"
    onClick={props.onClick}
  >
    {props.children}
  </div>
);
