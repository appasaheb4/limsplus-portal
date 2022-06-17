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
  icon: 'Icons.IconRi.RiSettings5Fill',
  children: [
    {
      path: '/settings/role',
      name: 'Role',
      icon: 'Icons.IconGi.GiKeyring',
      component: Role,
    },
    {
      path: '/settings/users',
      name: 'User',
      icon: 'Icons.IconFa.FaUsersCog',
      component: User,
    },
    {
      path: '/settings/loginActivity',
      name: 'Login Activity',
      icon: 'Icons.IconFi.FiActivity',
      component: LoginActivity,
    },
    {
      path: '/settings/mapping/roleMapping',
      name: 'Role Mapping',
      icon: 'Icons.IconRi.RiShieldKeyholeFill',
      component: RoleMapping,
    },
    {
      path: '/settings/shortcutMenu',
      name: 'Shortcut Menu',
      icon: 'Icons.IconCg.CgShortcut',
      component: ShortcutMenu,
    },
    {
      path: '/settings/environment',
      name: 'Environment',
      icon: 'Icons.Iconmd.MdSettingsInputComponent',
      component: Environment,
    },
    {
      path: '/settings/noticeBoards',
      name: 'Notice Boards',
      icon: 'Icons.IconFa.FaClipboardList',
      component: NoticeBoards,
    },
  ],
};
