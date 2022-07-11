import React from 'react';

import Loader from './loader.component';
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
type State = {component: any};
export default function asyncComponent(importComponent) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  class AsyncComponent extends React.Component<Props, State> {
    component: any;
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }
    async componentDidMount() {
      const {default: component} = await importComponent();
      this.setState({
        component: component,
      });
    }
    render() {
      const {component} = this.state;
      const C = component;
      return C ? <C {...this.props} /> : <Loader />;
    }
  }
  return AsyncComponent;
}
