import async from '@/layouts/components/async.component';
const PrivacyPolicy = async(() => import('../screens/privacy-policy.screen'));
export const privacyPolicyRoutes = {
  path: '/privacy-policy',
  name: 'Privacy Policy',
  component: PrivacyPolicy,
  children: null,
};
