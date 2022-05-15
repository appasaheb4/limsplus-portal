/* eslint-disable */
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {
  loginRouter as loginRouters,
  privacyPolicyRoute as privacyPolicyRoutes,
  dashboardRouter as dashboardRoutes,
} from './index';

import DashboardLayout from '../layouts/dashboard.component';
import LandingLayout from '../layouts/landing.component';
import AuthLayout from '../layouts/auth';
import Page404 from '@/features/login/screens/page-404.component';

import ScrollToTop from '@/layouts/components/scroll-to-top.component';

const childRoutes = (Layout, routes) =>
  routes.map(({children, path, component: Component}, index) =>
    children ? (
      // Route item with children
      children.map(({path, component: Component}, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    ),
  );

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(LandingLayout, loginRouters)}
        {childRoutes(LandingLayout, privacyPolicyRoutes)}
        {childRoutes(DashboardLayout, dashboardRoutes)}
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;
