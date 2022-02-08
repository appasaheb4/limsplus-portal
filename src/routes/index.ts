import async from "../layouts/components/Async"

// Landing
import login from "@lp/features/login/scenes/Login"
import PrivacyPolicy from "@lp/features/privacyPolicy/scences/PrivacyPolicy"

// Dashboards
const DefaultDashboard = async(() => import("@lp/features/defaultDashboard"))

// Collection
const Banner = async(() => import("@lp/features/master/banner/scenes/banner"))
const CollectionLab = async(() => import("@lp/features/master/labs/scenes/Lab"))
const CollectionDeginisation = async(
  () => import("@lp/features/master/deginisation/scenes/deginisation")
)

const CollectionDepartment = async(
  () => import("@lp/features/master/department/scenes/Department")
)

// master
const MasterAnalyte = async(
  () => import("@lp/features/master/masterAnalyte/scenes/MasterAnalyte")
)
const TestAnalyteMapping = async(
  () =>
    import("@lp/features/master/testAnalyteMapping/scenes/TestAnalyteMapping")
)
const MasterPanel = async(
  () => import("@lp/features/master/masterPanel/scenes/MasterPanel")
)
const TestPanelMapping = async(
  () => import("@lp/features/master/testPanelMapping/scenes/TestPanelMapping")
)
const MasterPackage = async(
  () => import("@lp/features/master/masterPackage/scenes/MasterPackage")
)
const TestMaster = async(
  () => import("@lp/features/master/testMaster/scenes/TestMaster")
)
const Lookup = async(() => import("@lp/features/master/lookup/scenes/Lookup"))
const Section = async(() => import("@lp/features/master/section/scenes/Section"))
const SampleContainer = async(
  () => import("@lp/features/master/sampleContainer/scenes/SampleContainer")
)
const SampleType = async(
  () => import("@lp/features/master/sampleType/scenes/SampleType")
)
const TestSampleMapping = async(
  () => import("@lp/features/master/testSampleMapping/scenes/TestSampleMapping")
)
const Methods = async(() => import("@lp/features/master/methods/scenes/Methods"))
const Doctors = async(() => import("@lp/features/master/doctors/scenes/Doctors"))
const RegistrationLocation = async(
  () =>
    import(
      "@lp/features/master/registrationLocations/scenes/RegistrationLocations"
    )
)
const CorporateClients = async(
  () => import("@lp/features/master/corporateClients/scenes/CorporateClients")
)
const DeliverySchedule = async(
  () => import("@lp/features/master/deliverySchedule/scenes/DeliverySchedule")
)

const AdministrativeDivisions = async(
  () =>
    import(
      "@lp/features/master/administrativeDivisions/scenes/AdministrativeDivisions"
    )
)
const SalesTeam = async(
  () => import("@lp/features/master/salesTeam/scenes/SalesTeam")
)
const PossibleResults = async(
  () => import("@lp/features/master/possibleResults/scenes/PossibleResults")
)
const Library = async(() => import("@lp/features/master/library/scenes/Library"))
const PriceList = async(
  () => import("@lp/features/master/priceList/scenes/PriceList")
)
const ReferenceRanges = async(
  () => import("@lp/features/master/referenceRanges/scenes/ReferenceRanges")
)

// Communication
const HostCommunication = async(
  () =>
    import("@lp/features/communication/hostCommunication/scences/HostCommunication")
)
const SegmentMapping = async(
  () => import("@lp/features/communication/segmentMapping/scences/SegmentMapping")
)
const DataConversation = async(
  () =>
    import("@lp/features/communication/dataConversation/scences/DataConversation")
)
const InterfaceManager = async(
  () =>
    import("@lp/features/communication/interfaceManager/scences/InterfaceManager")
)

// Settings
const Role = async(() => import("@lp/features/settings/roles/scenes/Role"))
const User = async(() => import("@lp/features/settings/users/scenes/Users"))
const RoleMapping = async(
  () => import("@lp/features/settings/mapping/role/scenes/RoleMapping")
)
const LoginActivity = async(
  () => import("@lp/features/settings/loginActivity/scenes/LoginActivity")
)
const ShortcutMenu = async(
  () => import("@lp/features/settings/shortcutMenu/scenes/ShortcutMenu")
)
const Environment = async(
  () => import("@lp/features/settings/environment/scenes/Environment")
)
const NoticeBoards = async(
  () => import("@lp/features/settings/noticeBoard/scenes/NoticeBoard")
)

// Registration
const PatientRegistation = async(
  () =>
    import(
      "@lp/features/registration/scenes/PatientRegistration/PatientRegistration"
    )
)

// Routes
const loginRoutes = {
  path: "/",
  name: "Login",
  icon: "log-in-outline",
  component: login,
  children: null,
}

const privacyPolicyRoutes = {
  path: "/privacy-policy",
  name: "Privacy Policy",
  component: PrivacyPolicy,
  children: null,
}

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  header: "Dashboard",
  icon: "Icons.IconRi.RiDashboardFill",
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      icon: "Icons.IconRi.RiDashboard3Fill",
      component: DefaultDashboard,
    },
  ],
}

const collectionRoutes = {
  path: "/collection",
  name: "Collection",
  icon: "Icons.IconBs.BsFillCollectionFill",
  badgeColor: "#ffffff",
  children: [
    {
      path: "/collection/banner",
      name: "Banner",
      icon: "Icons.IconIm.ImImages",
      component: Banner,
    },
    {
      path: "/collection/lab",
      name: "Lab",
      icon: "Icons.IconIm.ImLab",
      component: CollectionLab,
    },
    {
      path: "/collection/deginisation",
      name: "Deginisation",
      icon: "Icons.IconFa.FaUserMd",
      component: CollectionDeginisation,
    },
    {
      path: "/collection/department",
      name: "Department",
      icon: "Icons.IconFc.FcDepartment",
      component: CollectionDepartment,
    },
    {
      path: "/collection/masterAnalyte",
      name: "Analyte Master",
      icon: "Icons.Iconio.IoMdAnalytics",
      component: MasterAnalyte,
    },
    {
      path: "/collection/testAnalyteMapping",
      name: "Test Analyte Mapping",
      icon: "Icons.Iconio.IoIosAnalytics",
      component: TestAnalyteMapping,
    },
    {
      path: "/collection/masterPanel",
      name: "Panel Master",
      icon: "Icons.IconFa.FaSolarPanel",
      component: MasterPanel,
    },
    {
      path: "/collection/testPanelMapping",
      name: "Test Panel Mapping",
      icon: "Icons.IconFa.FaLayerGroup",
      component: TestPanelMapping,
    },
    {
      path: "/collection/masterPackage",
      name: "Package Master",
      icon: "Icons.IconFi.FiPackage",
      component: MasterPackage,
    },
    {
      path: "/collection/testMaster",
      name: "Test Master",
      icon: "Icons.Iconsi.SiMinetest",
      component: TestMaster,
    },
    {
      path: "/collection/lookup",
      name: "Lookup",
      icon: "Icons.Iconmd.MdLooks",
      component: Lookup,
    },
    {
      path: "/collection/section",
      name: "Section",
      icon: "Icons.IconBs.BsGrid3X3",
      component: Section,
    },
    {
      path: "/collection/sampleContainer",
      name: "Sample Container",
      icon: "Icons.Iconai.AiOutlineContainer",
      component: SampleContainer,
    },
    {
      path: "/collection/sampleType",
      name: "Sample Type",
      icon: "Icons.IconFa.FaBuromobelexperte",
      component: SampleType,
    },
    {
      path: "/collection/testSampleMapping",
      name: "Test Sample Mapping",
      icon: "Icons.Iconio.IoIosGitCompare",
      component: TestSampleMapping,
    },
    {
      path: "/collection/methods",
      name: "Methods",
      icon: "Icons.Iconvsc.VscSymbolMethod",
      component: Methods,
    },
    {
      path: "/collection/doctors",
      name: "Doctors",
      icon: "Icons.IconGi.GiHospitalCross",
      component: Doctors,
    },
    {
      path: "/collection/registrationLocations",
      name: "Registartion Locations",
      icon: "Icons.IconRi.RiMap2Line",
      component: RegistrationLocation,
    },
    {
      path: "/collection/corporateClients",
      name: "Corporate Clients",
      icon: "Icons.IconFi.FiUsers",
      component: CorporateClients,
    },
    {
      path: "/collection/deliverySchedule",
      name: "Delivery Schedule",
      icon: "Icons.Iconai.AiOutlineSchedule",
      component: DeliverySchedule,
    },
    {
      path: "/collection/administrativeDivisions",
      name: "Administrative Divisions",
      icon: "Icons.IconFa.FaAddressCard",
      component: AdministrativeDivisions,
    },
    {
      path: "/collection/salesTeam",
      name: "Sales Team",
      icon: "Icons.IconRi.RiTeamLine",
      component: SalesTeam,
    },
    {
      path: "/collection/possibleResults",
      name: "Possible Results",
      icon: "Icons.Iconai.AiOutlineSolution",
      component: PossibleResults,
    },
    {
      path: "/collection/library",
      name: "Library",
      icon: "Icons.Iconhi.HiLibrary",
      component: Library,
    },
    {
      path: "/collection/priceList",
      name: "PriceList",
      icon: "Icons.IconGi.GiPriceTag",
      component: PriceList,
    },
    {
      path: "/collection/referenceRanges",
      name: "ReferenceRanges",
      icon: "Icons.Iconvsc.VscReferences",
      component: ReferenceRanges,
    },
  ],
}

const communicationRoutes = {
  path: "/communication",
  name: "Communication",
  icon: "Icons.IconFa.FaCommentDots",
  children: [
    {
      path: "/communication/interfaceManager",
      name: "Interface Manager",
      icon: "Icons.IconCg.CgCommunity",
      component: InterfaceManager,
    },
    {
      path: "/communication/mapping/conversationMapping",
      name: "Conversation Mapping",
      icon: "Icons.IconGi.GiConversation",
      component: DataConversation,
    },
    {
      path: "/communication/hostCommunication",
      name: "Host Communication",
      icon: "Icons.IconRi.RiGhostSmileLine",
      component: HostCommunication,
    },
    {
      path: "/communication/mapping/segmentMapping",
      name: "Data Segment Mapping",
      icon: "Icons.IconGi.GiDatabase",
      component: SegmentMapping,
    },
  ],
}
  
const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: "Icons.IconRi.RiSettings5Fill",
  children: [
    {
      path: "/settings/role",
      name: "Role",
      icon: "Icons.IconGi.GiKeyring",
      component: Role,
    },
    {
      path: "/settings/users",
      name: "User",
      icon: "Icons.IconFa.FaUsersCog",
      component: User,
    },
    {
      path: "/settings/loginActivity",
      name: "Login Activity",
      icon: "Icons.IconFi.FiActivity",
      component: LoginActivity,
    },
    {
      path: "/settings/mapping/roleMapping",
      name: "Role Mapping",
      icon: "Icons.IconRi.RiShieldKeyholeFill",
      component: RoleMapping,
    },
    {
      path: "/settings/shortcutMenu",
      name: "Shortcut Menu",
      icon: "Icons.IconCg.CgShortcut",
      component: ShortcutMenu,
    },
    {  
      path: "/settings/environment",
      name: "Environment",
      icon: "Icons.Iconmd.MdSettingsInputComponent",
      component: Environment,
    },
    {
      path: "/settings/noticeBoards",
      name: "Notice Boards",
      icon: "Icons.IconFa.FaClipboardList",
      component: NoticeBoards,
    },
  ],
}

const registrationRoutes = {
  path: "/registration",
  name: "Registration",
  icon: "Icons.IconRi.RiUserAddLine",
  children: [
    {
      path: "/registration/patient",
      name: "Patient Registration",
      icon: "Icons.IconFa.FaAddressCard",
      component: PatientRegistation,
    },
  ],
}

// Login specific routes
export const loginRouter = [loginRoutes]
export const privacyPolicyRoute = [privacyPolicyRoutes]

// Dashboard specific routes
export const dashboardRouter = [
  dashboardRoutes,
  collectionRoutes,
  communicationRoutes,
  settingsRoutes,
  registrationRoutes,
]

// // All routes
// export default [
//   dashboardRoutes,
//   collectionRoutes,
//   communicationRoutes,
//   settingsRoutes,
// ]
