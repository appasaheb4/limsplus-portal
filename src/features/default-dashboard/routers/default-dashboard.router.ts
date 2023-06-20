import async from '@/layouts/components/async.component';
const DefaultDashboard = async(() => import('..'));

export const dashboardRoutes = {
  path: '/dashboard',
  name: 'Dashboard',
  header: 'Dashboard',
  icon: 'RiDashboardFill',
  children: [
    {
      path: '/dashboard/default',
      name: 'Default',
      icon: 'RiDashboard3Fill',
      component: DefaultDashboard,
    },
  ],
};
