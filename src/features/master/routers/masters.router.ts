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
  () => import('../sampleType/screens/sample-type.screen'),
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
const PriceList = async(() => import('../priceList/screens/price-list.screen'));
const ReferenceRanges = async(
  () => import('../reference-ranges/screens/reference-ranges.screen'),
);

export const collectionRoutes = {
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
