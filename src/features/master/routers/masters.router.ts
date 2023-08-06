import async from '@/layouts/components/async.component';

const Banner = async(() => import('../banner/screens/banner.screen'));
const CollectionLab = async(() => import('../labs/screens/lab.screen'));
const CollectionDeginisation = async(
  () => import('../deginisation/screens/deginisation.screen'),
);

const CollectionDepartment = async(
  () => import('../department/screens/department.screen'),
);

// master
const MasterAnalyte = async(
  () => import('../master-analyte/screens/master-analyte.screen'),
);
const TestAnalyteMapping = async(
  () => import('../test-analyte-mapping/screens/test-analyte-mapping.screen'),
);
const MasterPanel = async(
  () => import('../master-panel/screens/master-panel.screen'),
);
const TestPanelMapping = async(
  () => import('../test-panel-mapping/screens/test-panel-mapping.screen'),
);
const MasterPackage = async(
  () => import('../master-package/screens/master-package.screen'),
);
const TestMaster = async(
  () => import('../test-master/screens/test-master.screen'),
);
const Lookup = async(() => import('../lookup/screens/lookup.screen'));
const Section = async(() => import('../section/screens/section.screen'));
const SampleContainer = async(
  () => import('../sample-container/screens/sample-container.screen'),
);
const SampleType = async(
  () => import('../sample-type/screens/sample-type.screen'),
);
const TestSampleMapping = async(
  () => import('../test-sample-mapping/screens/test-sample-mapping.screen'),
);
const Methods = async(() => import('../methods/screens/method.screen'));
const Doctors = async(() => import('../doctors/screens/doctor.screen'));
const RegistrationLocation = async(
  () =>
    import('../registration-locations/screens/registration-location.screen'),
);
const CorporateClients = async(
  () => import('../corporate-clients/screens/corporate-clients.screen'),
);
const DeliverySchedule = async(
  () => import('../delivery-schedule/screens/delivery-schedule.screen'),
);

const AdministrativeDivisions = async(
  () =>
    import(
      '../administrative-divisions/screens/administrative-divisions.screen'
    ),
);
const SalesTeam = async(
  () => import('../sales-team/screens/sales-team.screen'),
);
const PossibleResults = async(
  () => import('../possible-results/screens/possible-result.screen'),
);
const Library = async(() => import('../library/screens/library.screen'));
const PriceList = async(
  () => import('../price-list/screens/price-list.screen'),
);
const ReferenceRanges = async(
  () => import('../reference-ranges/screens/reference-ranges.screen'),
);

const CommentManager = async(
  () => import('../comment-manager/screens/comment-manager.screen'),
);

export const collectionRoutes = {
  path: '/collection',
  name: 'Collection',
  icon: 'BsFillCollectionFill',
  badgeColor: '#ffffff',
  children: [
    {
      path: '/collection/banner',
      name: 'Banner',
      icon: 'ImImages',
      component: Banner,
    },
    {
      path: '/collection/lab',
      name: 'Lab',
      icon: 'ImLab',
      component: CollectionLab,
    },
    {
      path: '/collection/deginisation',
      name: 'Deginisation',
      icon: 'FaUserMd',
      component: CollectionDeginisation,
    },
    {
      path: '/collection/department',
      name: 'Department',
      icon: 'FcDepartment',
      component: CollectionDepartment,
    },
    {
      path: '/collection/master-analyte',
      name: 'Analyte Master',
      icon: 'IoMdAnalytics',
      component: MasterAnalyte,
    },
    {
      path: '/collection/test-analyte-mapping',
      name: 'Test Analyte Mapping',
      icon: 'IoIosAnalytics',
      component: TestAnalyteMapping,
    },
    {
      path: '/collection/master-panel',
      name: 'Panel Master',
      icon: 'FaSolarPanel',
      component: MasterPanel,
    },
    {
      path: '/collection/test-panel-mapping',
      name: 'Test Panel Mapping',
      icon: 'FaLayerGroup',
      component: TestPanelMapping,
    },
    {
      path: '/collection/master-package',
      name: 'Package Master',
      icon: 'FiPackage',
      component: MasterPackage,
    },
    {
      path: '/collection/test-master',
      name: 'Test Master',
      icon: 'SiMinetest',
      component: TestMaster,
    },
    {
      path: '/collection/lookup',
      name: 'Lookup',
      icon: 'MdLooks',
      component: Lookup,
    },
    {
      path: '/collection/section',
      name: 'Section',
      icon: 'BsGrid3X3',
      component: Section,
    },
    {
      path: '/collection/sample-container',
      name: 'Sample Container',
      icon: 'AiOutlineContainer',
      component: SampleContainer,
    },
    {
      path: '/collection/sample-type',
      name: 'Sample Type',
      icon: 'FaBuromobelexperte',
      component: SampleType,
    },
    {
      path: '/collection/test-sample-mapping',
      name: 'Test Sample Mapping',
      icon: 'IoIosGitCompare',
      component: TestSampleMapping,
    },
    {
      path: '/collection/methods',
      name: 'Methods',
      icon: 'VscSymbolMethod',
      component: Methods,
    },
    {
      path: '/collection/doctors',
      name: 'Doctors',
      icon: 'GiHospitalCross',
      component: Doctors,
    },
    {
      path: '/collection/registration-locations',
      name: 'Registartion Locations',
      icon: 'RiMap2Line',
      component: RegistrationLocation,
    },
    {
      path: '/collection/corporate-clients',
      name: 'Corporate Clients',
      icon: 'FiUsers',
      component: CorporateClients,
    },
    {
      path: '/collection/delivery-schedule',
      name: 'Delivery Schedule',
      icon: 'AiOutlineSchedule',
      component: DeliverySchedule,
    },
    {
      path: '/collection/administrative-divisions',
      name: 'Administrative Divisions',
      icon: 'FaAddressCard',
      component: AdministrativeDivisions,
    },
    {
      path: '/collection/sales-team',
      name: 'Sales Team',
      icon: 'RiTeamLine',
      component: SalesTeam,
    },
    {
      path: '/collection/possible-results',
      name: 'Possible Results',
      icon: 'AiOutlineSolution',
      component: PossibleResults,
    },
    {
      path: '/collection/library',
      name: 'Library',
      icon: 'HiLibrary',
      component: Library,
    },
    {
      path: '/collection/price-list',
      name: 'PriceList',
      icon: 'GiPriceTag',
      component: PriceList,
    },
    {
      path: '/collection/reference-ranges',
      name: 'ReferenceRanges',
      icon: 'VscReferences',
      component: ReferenceRanges,
    },
    {
      path: '/collection/comment-manager',
      name: 'Comment Manager',
      icon: 'BiCommentDetail',
      component: CommentManager,
    },
  ],
};
