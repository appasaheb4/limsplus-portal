import async from '@/layouts/components/async.component';

// Settings
const Role = async(() => import('../roles/screens/role.screen'));
const User = async(() => import('../users/screens/user.screen'));
const RoleMapping = async(
  () => import('../mapping/role/screens/role-mapping.screen'),
);
const LoginActivity = async(
  () => import('../login-activity/screens/login-activity.screen'),
);
const ShortcutMenu = async(
  () => import('../shortcut-menu/screens/short-cut-menu.screen'),
);
const Environment = async(
  () => import('../environment/screens/environment.screen'),
);
const NoticeBoards = async(
  () => import('../notice-board/screens/notice-board.screen'),
);

export const settingsRoutes = {
  path: '/settings',
  name: 'Settings',
  icon: 'RiSettings5Fill',
  children: [
    {
      path: '/settings/role',
      name: 'Role',
      icon: 'GiKeyring',
      component: Role,
    },
    {
      path: '/settings/users',
      name: 'User',
      icon: 'FaUsersCog',
      component: User,
    },
    {
      path: '/settings/login-activity',
      name: 'Login Activity',
      icon: 'FiActivity',
      component: LoginActivity,
    },
    {
      path: '/settings/mapping/role-mapping',
      name: 'Role Mapping',
      icon: 'RiShieldKeyholeFill',
      component: RoleMapping,
    },
    {
      path: '/settings/shortcut-menu',
      name: 'Shortcut Menu',
      icon: 'CgShortcut',
      component: ShortcutMenu,
    },
    {
      path: '/settings/environment',
      name: 'Environment',
      icon: 'MdSettingsInputComponent',
      component: Environment,
    },
    {
      path: '/settings/notice-boards',
      name: 'Notice Boards',
      icon: 'FaClipboardList',
      component: NoticeBoards,
    },
  ],
};
