/* eslint-disable */
import async from '../layouts/components/async.component';

// Landing
import login from '@/features/login/screens/login.screen';
import PrivacyPolicy from '@/features/privacy-policy/screens/privacy-policy.screen';

import {dashboardRoutes} from '@/features/default-dashboard/routers/default-dashboard.router';

// Collection
const Banner = async(
  () => import('@/features/master/banner/screens/banner.screen'),
);
const CollectionLab = async(
  () => import('@/features/master/labs/screens/lab.screen'),
);
const CollectionDeginisation = async(
  () => import('@/features/master/deginisation/screens/deginisation.screen'),
);

const CollectionDepartment = async(
  () => import('@/features/master/department/screens/department.screen'),
);

// master
const MasterAnalyte = async(
  () =>
    import('@/features/master/master-analyte/screens/master-analyte.screen'),
);
const TestAnalyteMapping = async(
  () =>
    import(
      '@/features/master/test-analyte-mapping/screens/test-analyte-mapping.screen'
    ),
);
const MasterPanel = async(
  () => import('@/features/master/master-panel/screens/master-panel.screen'),
);
const TestPanelMapping = async(
  () =>
    import(
      '@/features/master/test-panel-mapping/screens/test-panel-mapping.screen'
    ),
);
const MasterPackage = async(
  () =>
    import('@/features/master/master-package/screens/master-package.screen'),
);
const TestMaster = async(
  () => import('@/features/master/test-master/screens/test-master.screen'),
);
const Lookup = async(
  () => import('@/features/master/lookup/screens/lookup.screen'),
);
const Section = async(
  () => import('@/features/master/section/screens/section.screen'),
);
const SampleContainer = async(
  () =>
    import(
      '@/features/master/sample-container/screens/sample-container.screen'
    ),
);
const SampleType = async(
  () => import('@/features/master/sampleType/screens/sample-type.screen'),
);
const TestSampleMapping = async(
  () =>
    import(
      '@/features/master/test-sample-mapping/screens/test-sample-mapping.screen'
    ),
);
const Methods = async(
  () => import('@/features/master/methods/screens/method.screen'),
);
const Doctors = async(
  () => import('@/features/master/doctors/screens/doctor.screen'),
);
const RegistrationLocation = async(
  () =>
    import(
      '@/features/master/registration-locations/screens/registration-location.screen'
    ),
);
const CorporateClients = async(
  () =>
    import(
      '@/features/master/corporate-clients/screens/corporate-clients.screen'
    ),
);
const DeliverySchedule = async(
  () =>
    import(
      '@/features/master/delivery-schedule/screens/delivery-schedule.screen'
    ),
);

const AdministrativeDivisions = async(
  () =>
    import(
      '@/features/master/administrative-divisions/screens/administrative-divisions.screen'
    ),
);
const SalesTeam = async(
  () => import('@/features/master/sales-team/screens/sales-team.screen'),
);
const PossibleResults = async(
  () =>
    import('@/features/master/possible-results/screens/possible-result.screen'),
);
const Library = async(
  () => import('@/features/master/library/screens/library.screen'),
);
const PriceList = async(
  () => import('@/features/master/priceList/screens/price-list.screen'),
);
const ReferenceRanges = async(
  () =>
    import(
      '@/features/master/reference-ranges/screens/reference-ranges.screen'
    ),
);

// Communication
const HostCommunication = async(
  () =>
    import(
      '@/features/communication/host-communication/screens/host-communication.screen'
    ),
);
const SegmentMapping = async(
  () =>
    import(
      '@/features/communication/segment-mapping/screens/SegmentMapping.screen'
    ),
);
const DataConversation = async(
  () =>
    import(
      '@/features/communication/data-conversation/screens/data-conversation.screen'
    ),
);
const InterfaceManager = async(
  () =>
    import(
      '@/features/communication/interface-manager/screens/interface-manager.screen'
    ),
);

// Settings
const Role = async(
  () => import('@/features/settings/roles/screens/role.screen'),
);
const User = async(
  () => import('@/features/settings/users/screens/user.screen'),
);
const RoleMapping = async(
  () => import('@/features/settings/mapping/role/screens/role-mapping.screen'),
);
const LoginActivity = async(
  () =>
    import('@/features/settings/login-activity/screens/login-activity.screen'),
);
const ShortcutMenu = async(
  () =>
    import('@/features/settings/shortcut-menu/screens/short-cut-menu.screen'),
);
const Environment = async(
  () => import('@/features/settings/environment/screens/environment.screen'),
);
const NoticeBoards = async(
  () => import('@/features/settings/notice-board/screens/notice-board.screen'),
);

// Registration
const PatientRegistation = async(
  () =>
    import(
      '@/features/registration/screens/PatientRegistration/patient-registration.screen'
    ),
);

import {resultEntryRoutes} from '@/features/result-entry/routers/result-entry.router';
import {patientReportsRoutes} from '@/features/patient-reports/routers/patient-reports.router';
import {reportBuilderRoutes} from '@/features/report-builder/routers/report-builder.router';

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

const collectionRoutes = {
  path: '/collection',
  name: 'Collection',
  icon: 'Icons.IconBs.BsFillCollectionFill',
  badgeColor: '#ffffff',
  children: [
    {
      path: '/collection/banner',
      name: 'Banner',
      icon: 'Icons.IconIm.ImImages',
      component: Banner,
    },
    {
      path: '/collection/lab',
      name: 'Lab',
      icon: 'Icons.IconIm.ImLab',
      component: CollectionLab,
    },
    {
      path: '/collection/deginisation',
      name: 'Deginisation',
      icon: 'Icons.IconFa.FaUserMd',
      component: CollectionDeginisation,
    },
    {
      path: '/collection/department',
      name: 'Department',
      icon: 'Icons.IconFc.FcDepartment',
      component: CollectionDepartment,
    },
    {
      path: '/collection/masterAnalyte',
      name: 'Analyte Master',
      icon: 'Icons.Iconio.IoMdAnalytics',
      component: MasterAnalyte,
    },
    {
      path: '/collection/testAnalyteMapping',
      name: 'Test Analyte Mapping',
      icon: 'Icons.Iconio.IoIosAnalytics',
      component: TestAnalyteMapping,
    },
    {
      path: '/collection/masterPanel',
      name: 'Panel Master',
      icon: 'Icons.IconFa.FaSolarPanel',
      component: MasterPanel,
    },
    {
      path: '/collection/testPanelMapping',
      name: 'Test Panel Mapping',
      icon: 'Icons.IconFa.FaLayerGroup',
      component: TestPanelMapping,
    },
    {
      path: '/collection/masterPackage',
      name: 'Package Master',
      icon: 'Icons.IconFi.FiPackage',
      component: MasterPackage,
    },
    {
      path: '/collection/testMaster',
      name: 'Test Master',
      icon: 'Icons.Iconsi.SiMinetest',
      component: TestMaster,
    },
    {
      path: '/collection/lookup',
      name: 'Lookup',
      icon: 'Icons.Iconmd.MdLooks',
      component: Lookup,
    },
    {
      path: '/collection/section',
      name: 'Section',
      icon: 'Icons.IconBs.BsGrid3X3',
      component: Section,
    },
    {
      path: '/collection/sampleContainer',
      name: 'Sample Container',
      icon: 'Icons.Iconai.AiOutlineContainer',
      component: SampleContainer,
    },
    {
      path: '/collection/sampleType',
      name: 'Sample Type',
      icon: 'Icons.IconFa.FaBuromobelexperte',
      component: SampleType,
    },
    {
      path: '/collection/testSampleMapping',
      name: 'Test Sample Mapping',
      icon: 'Icons.Iconio.IoIosGitCompare',
      component: TestSampleMapping,
    },
    {
      path: '/collection/methods',
      name: 'Methods',
      icon: 'Icons.Iconvsc.VscSymbolMethod',
      component: Methods,
    },
    {
      path: '/collection/doctors',
      name: 'Doctors',
      icon: 'Icons.IconGi.GiHospitalCross',
      component: Doctors,
    },
    {
      path: '/collection/registrationLocations',
      name: 'Registartion Locations',
      icon: 'Icons.IconRi.RiMap2Line',
      component: RegistrationLocation,
    },
    {
      path: '/collection/corporateClients',
      name: 'Corporate Clients',
      icon: 'Icons.IconFi.FiUsers',
      component: CorporateClients,
    },
    {
      path: '/collection/deliverySchedule',
      name: 'Delivery Schedule',
      icon: 'Icons.Iconai.AiOutlineSchedule',
      component: DeliverySchedule,
    },
    {
      path: '/collection/administrativeDivisions',
      name: 'Administrative Divisions',
      icon: 'Icons.IconFa.FaAddressCard',
      component: AdministrativeDivisions,
    },
    {
      path: '/collection/salesTeam',
      name: 'Sales Team',
      icon: 'Icons.IconRi.RiTeamLine',
      component: SalesTeam,
    },
    {
      path: '/collection/possibleResults',
      name: 'Possible Results',
      icon: 'Icons.Iconai.AiOutlineSolution',
      component: PossibleResults,
    },
    {
      path: '/collection/library',
      name: 'Library',
      icon: 'Icons.Iconhi.HiLibrary',
      component: Library,
    },
    {
      path: '/collection/priceList',
      name: 'PriceList',
      icon: 'Icons.IconGi.GiPriceTag',
      component: PriceList,
    },
    {
      path: '/collection/referenceRanges',
      name: 'ReferenceRanges',
      icon: 'Icons.Iconvsc.VscReferences',
      component: ReferenceRanges,
    },
  ],
};

const communicationRoutes = {
  path: '/communication',
  name: 'Communication',
  icon: 'Icons.IconFa.FaCommentDots',
  children: [
    {
      path: '/communication/interfaceManager',
      name: 'Interface Manager',
      icon: 'Icons.IconCg.CgCommunity',
      component: InterfaceManager,
    },
    {
      path: '/communication/mapping/conversationMapping',
      name: 'Conversation Mapping',
      icon: 'Icons.IconGi.GiConversation',
      component: DataConversation,
    },
    {
      path: '/communication/hostCommunication',
      name: 'Host Communication',
      icon: 'Icons.IconRi.RiGhostSmileLine',
      component: HostCommunication,
    },
    {
      path: '/communication/mapping/segmentMapping',
      name: 'Data Segment Mapping',
      icon: 'Icons.IconGi.GiDatabase',
      component: SegmentMapping,
    },
  ],
};

const settingsRoutes = {
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

const registrationRoutes = {
  path: '/registration',
  name: 'Registration',
  icon: 'Icons.IconRi.RiUserAddLine',
  children: [
    {
      path: '/registration/patient',
      name: 'Patient Registration',
      icon: 'Icons.IconFa.FaAddressCard',
      component: PatientRegistation,
    },
  ],
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
