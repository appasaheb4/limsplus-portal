import React from "react";

interface PageHeadingProps {
  title: string;
  subTitle?: string;
}

const PageHeading: React.FunctionComponent<PageHeadingProps> = (props) => (
  <div>
    <h2 className="text-lg font-bold leading-4 text-gray-900 mt-0">
      {props.title}
    </h2>
    {props.subTitle && (
      <p className="text-xs leading-4 text-gray-500 m-0">{props.subTitle}</p>
    )}
  </div>
);

export default PageHeading;
