import React from 'react';
import classNames from 'classnames';

const Main = ({ className, children }) => (
  <div className={classNames('main', className)} key={className}>
    {children}
  </div>
);

export default Main;
