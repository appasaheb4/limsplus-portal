import async from '@/layouts/components/async.component';
const PanelApproval = async(
  () => import('../panel-approval/screens/panel-approval.screen'),
);

export const validationRoutes = {
  path: '/validation',
  name: 'Validation',
  title: 'PANEL APPROVAL',
  order: 4,
  icon: 'MdOutlineRule',
  children: [
    {
      path: '/validation/panel-approval',
      name: 'Panel Approval',
      icon: 'MdOutlineApproval',
      component: PanelApproval,
    },
  ],
};
