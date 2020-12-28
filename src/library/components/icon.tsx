import React from "react";

export interface IconProps {
  type?: "solid" | "inverse";
  size?: "small" | "medium" | "large";
  buttonOffset?: boolean;
  small?: boolean;
}

const getIconClass = (props: IconProps) => {
  const iconSizeClass =
    props.size === "small"
      ? `h-3 w-3`
      : props.size === "large"
      ? `h-6 h-6`
      : "h-5 w-5";

  const iconColorClass =
    props.type === "solid" ? "text-gray-600" : "text-white";

  return `${
    props.buttonOffset && "-ml-1 -mt-1 mr-2"
  } ${iconSizeClass} ${iconColorClass}`;
};

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
  );
};

export const Remove: React.FunctionComponent<IconProps> = (
  props: IconProps
) => {
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
  );
};

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
  );
};

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
);

export const Spinner: React.FunctionComponent<IconProps> = (
  props: IconProps
) => (
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
);

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
);
