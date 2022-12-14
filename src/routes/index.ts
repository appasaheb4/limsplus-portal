import {dashboardRoutes} from '@/features/default-dashboard/routers/default-dashboard.router';
import {communicationRoutes} from '@/features/communication/routers/communication.router';
import {settingsRoutes} from '@/features/settings/routers/settings.router';
import {registrationRoutes} from '@/features/registration/routers/registration.router';
import {resultEntryRoutes} from '@/features/result-entry/routers/result-entry.router';
import {patientReportsRoutes} from '@/features/patient-reports/routers/patient-reports.router';
import {reportBuilderRoutes} from '@/features/report-builder/routers/report-builder.router';
import {collectionRoutes} from '@/features/master/routers/masters.router';
import {loginRoutes} from '@/features/login/routers/login.router';
import {privacyPolicyRoutes} from '@/features/privacy-policy/routers/privacy-policy.router';
import {accountReceivableRoutes} from '@features/account-receivable/routers/account-receivable.router';
import {validationRoutes} from '@features/validation/routers/validation.router';

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
  accountReceivableRoutes,
  validationRoutes,
];
