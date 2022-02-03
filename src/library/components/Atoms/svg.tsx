import React from "react"

export interface IconProps {
  type?: "solid" | "inverse"
  size?: "small" | "medium" | "large"
  buttonOffset?: boolean
  small?: boolean
  icon?: string
  color?: string
}
  
const getIconClass = (props: IconProps) => {
  const iconSizeClass =
    props.size === "small"
      ? `h-3 w-3`
      : props.size === "large"
      ? `h-6 h-6`
      : "h-5 w-5"

  const iconColorClass = props.type === "solid" ? "text-gray-600" : "text-white"
  return `${
    props.buttonOffset && "-ml-1 -mt-1 mr-2"
  } ${iconSizeClass} ${iconColorClass}`
}

export const Save: React.FunctionComponent<IconProps> = (props: IconProps) => {
  return (
    <svg
      className={getIconClass(props)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
      />
    </svg>
  )
}

export const ReSendPassword: React.FunctionComponent<IconProps> = (
  props: IconProps
) => {
  return (
    <svg
      className={getIconClass(props)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-5l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"
      />
    </svg>
  )
}

export const Add: React.FunctionComponent<IconProps> = (props: IconProps) => {
  return (
    <svg
      className={getIconClass(props)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"
      ></path>
    </svg>
  )
}

export const Remove: React.FunctionComponent<IconProps> = (props: IconProps) => {
  return (
    <svg
      className={`${getIconClass({ ...props, buttonOffset: false })} ${
        props.buttonOffset ? "-ml-1 mr-2" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 13"
      />
    </svg>
  )
}

export const Check: React.FunctionComponent<IconProps> = (props: IconProps) => {
  return (
    <svg
      className={`${getIconClass({ ...props, buttonOffset: false })} ${
        props.buttonOffset ? "-ml-1 mr-2" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        d="M7.197,16.963H7.195c-0.204,0-0.399-0.083-0.544-0.227l-6.039-6.082c-0.3-0.302-0.297-0.788,0.003-1.087
							C0.919,9.266,1.404,9.269,1.702,9.57l5.495,5.536L18.221,4.083c0.301-0.301,0.787-0.301,1.087,0c0.301,0.3,0.301,0.787,0,1.087
							L7.741,16.738C7.596,16.882,7.401,16.963,7.197,16.963z"
      ></path>
    </svg>
  )
}

export const Plus: React.FunctionComponent<IconProps> = (props: IconProps) => (
  <svg
    className={getIconClass(props)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

export const Spinner: React.FunctionComponent<IconProps> = (props: IconProps) => (
  <svg
    className={`animate-spin ${getIconClass(props)}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

export const Tick: React.FunctionComponent<IconProps> = (props) => (
  <svg
    className={`${getIconClass(props)} ${props.small && "w-3 h-3"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
    />
  </svg>
)
   