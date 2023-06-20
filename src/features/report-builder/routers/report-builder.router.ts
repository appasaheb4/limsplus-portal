import async from '@/layouts/components/async.component';
const ReportSettings = async(
  () => import('../report-settings/screens/report-settings.screen'),
);
const ReportTemplate = async(
  () => import('../report-template/screens/report-template.screen'),
);

export const reportBuilderRoutes = {
  path: '/report-builder',
  name: 'Report Builder',
  icon: 'HiDocumentReport',
  children: [
    {
      path: '/report-builder/report-settings',
      name: 'Report Settings',
      icon: 'RiListSettingsFill',
      component: ReportSettings,
    },
    {
      path: '/report-builder/report-template',
      name: 'Report Template',
      icon: 'ImInsertTemplate',
      component: ReportTemplate,
    },
  ],
};
