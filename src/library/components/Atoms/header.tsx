import React from "react";

const Header: React.FunctionComponent<any> = (props) => (
  <div className="sticky top-0 z-20 flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-white">
    {props.children}
  </div>
);

export default Header;
