import async from '@/layouts/components/async.component';

const Login = async(() => import('../screens/login.screen'));
export const loginRoutes = {
  path: '/',
  name: 'Login',
  icon: 'log-in-outline',
  component: Login,
  children: null,
};
