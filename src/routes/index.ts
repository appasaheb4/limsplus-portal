/* eslint-disable */
import async from '../layouts/components/async.component';
// Landing
import login from '@/features/login/screens/login.screen';
import PrivacyPolicy from '@/features/privacy-policy/screens/privacy-policy.screen';
import {dashboardRoutes} from '@/features/default-dashboard/routers/default-dashboard.router';
import {communicationRoutes} from '@/features/communication/routers/communication.router';
import {settingsRoutes} from '@/features/settings/routers/settings.router';
import {registrationRoutes} from '@features/registration/routers/registration.router';
import {resultEntryRoutes} from '@/features/result-entry/routers/result-entry.router';
import {patientReportsRoutes} from '@/features/patient-reports/routers/patient-reports.router';
import {reportBuilderRoutes} from '@/features/report-builder/routers/report-builder.router';
import {collectionRoutes} from '@/features/master/routers/masters.router';
// Routes
const loginRoutes = {
  path: '/',
  name: 'Login',
  icon: 'log-in-outline',
  component: login,
  children: null,
};

const privacyPolicyRoutes = {
  path: '/privacy-policy',
  name: 'Privacy Policy',
  component: PrivacyPolicy,
  children: null,
};

// Login specific routes
export const loginRouter = [loginRoutes];
export const privacyPolicyRoute = [privacyPolicyRoutes];

// Dashboard specific routes
export const dashboardRouter = [
  dashboardRoutes,
  collectionRoutes,
  communicationRoutes,
  settingsRoutes,
  registrationRoutes,
  resultEntryRoutes,
  patientReportsRoutes,
  reportBuilderRoutes,
];
