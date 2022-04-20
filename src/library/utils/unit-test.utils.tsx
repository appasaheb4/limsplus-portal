import React from 'react';
import {render as renderComponent} from '@testing-library/react';

const Providers = ({children}: any) => {
  return <div>{children}</div>;
};

const render = (Component: JSX.Element) => {
  return renderComponent(Component, {wrapper: Providers});
};

export {render, Providers};
