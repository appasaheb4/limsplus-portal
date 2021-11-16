import async from "../layouts/components/Async"

// Landing
import login from "@lp/features/login/scenes/Login"
import PrivacyPolicy from "@lp/features/privacyPolicy/scences/PrivacyPolicy"

// Dashboards
const DefaultDashboard = async(() => import("@lp/features/defaultDashboard"))

// Collection
const Banner = async(() => import("@lp/features/collection/banner/scenes/banner"))
const CollectionLab = async(() => import("@lp/features/collection/labs/scenes/Lab"))
const CollectionDeginisation = async(
  () => import("@lp/features/collection/deginisation/scenes/deginisation")
)

const CollectionDepartment = async(
  () => import("@lp/features/collection/department/scenes/Department")
)

// master
const MasterAnalyte = async(
  () => import("@lp/features/collection/masterAnalyte/scenes/MasterAnalyte")
)
const TestAnalyteMapping = async(
  () =>
    import("@lp/features/collection/testAnalyteMapping/scenes/TestAnalyteMapping")
)
const MasterPanel = async(
  () => import("@lp/features/collection/masterPanel/scenes/MasterPanel")
)
const TestPanelMapping = async(
  () => import("@lp/features/collection/testPanelMapping/scenes/TestPanelMapping")
)
const MasterPackage = async(
  () => import("@lp/features/collection/masterPackage/scenes/MasterPackage")
)
const TestMaster = async(
  () => import("@lp/features/collection/testMaster/scenes/TestMaster")
)
const Lookup = async(() => import("@lp/features/collection/lookup/scenes/Lookup"))
const Section = async(() => import("@lp/features/collection/section/scenes/Section"))
const SampleContainer = async(
  () => import("@lp/features/collection/sampleContainer/scenes/SampleContainer")
)
const SampleType = async(
  () => import("@lp/features/collection/sampleType/scenes/SampleType")
)
const TestSampleMapping = async(
  () => import("@lp/features/collection/testSampleMapping/scenes/TestSampleMapping")
)
const Methods = async(() => import("@lp/features/collection/methods/scenes/Methods"))
const Doctors = async(() => import("@lp/features/collection/doctors/scenes/Doctors"))
const RegistrationLocation = async(
  () =>
    import(
      "@lp/features/collection/registrationLocations/scenes/RegistrationLocations"
    )
)
const CorporateClients = async(
  () => import("@lp/features/collection/corporateClients/scenes/CorporateClients")
)
const DeliverySchedule = async(
  () => import("@lp/features/collection/deliverySchedule/scenes/DeliverySchedule")
)

const AdministrativeDivisions = async(
  () =>
    import(
      "@lp/features/collection/administrativeDivisions/scenes/AdministrativeDivisions"
    )
)
const SalesTeam = async(
  () => import("@lp/features/collection/salesTeam/scenes/SalesTeam")
)
const PossibleResults = async(
  () => import("@lp/features/collection/possibleResults/scenes/PossibleResults")
)
const Library = async(() => import("@lp/features/collection/library/scenes/Library"))
const PriceList = async(
  () => import("@lp/features/collection/priceList/scenes/PriceList")
)
const ReferenceRanges = async(
  () => import("@lp/features/collection/referenceRanges/scenes/ReferenceRanges")
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
const User = async(() => import("@lp/features/users/scenes/Users"))
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
  icon: "LibraryComponents.Atoms.Icons.IconRi.RiDashboardFill",
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      icon: "LibraryComponents.Atoms.Icons.IconRi.RiDashboard3Fill",
      component: DefaultDashboard,
    },
  ],
}

const collectionRoutes = {
  path: "/collection",
  name: "Collection",
  icon: "LibraryComponents.Atoms.Icons.IconBs.BsFillCollectionFill",
  badgeColor: "#ffffff",
  children: [
    {
      path: "/collection/banner",
      name: "Banner",
      icon: "LibraryComponents.Atoms.Icons.IconIm.ImImages",
      component: Banner,
    },
    {
      path: "/collection/lab",
      name: "Lab",
      icon: "LibraryComponents.Atoms.Icons.IconIm.ImLab",
      component: CollectionLab,
    },
    {
      path: "/collection/deginisation",
      name: "Deginisation",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaUserMd",
      component: CollectionDeginisation,
    },
    {
      path: "/collection/department",
      name: "Department",
      icon: "LibraryComponents.Atoms.Icons.IconFc.FcDepartment",
      component: CollectionDepartment,
    },
    {
      path: "/collection/masterAnalyte",
      name: "Analyte Master",
      icon: "LibraryComponents.Atoms.Icons.Iconio.IoMdAnalytics",
      component: MasterAnalyte,
    },
    {
      path: "/collection/testAnalyteMapping",
      name: "Test Analyte Mapping",
      icon: "LibraryComponents.Atoms.Icons.Iconio.IoIosAnalytics",
      component: TestAnalyteMapping,
    },
    {
      path: "/collection/masterPanel",
      name: "Panel Master",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaSolarPanel",
      component: MasterPanel,
    },
    {
      path: "/collection/testPanelMapping",
      name: "Test Panel Mapping",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaLayerGroup",
      component: TestPanelMapping,
    },
    {
      path: "/collection/masterPackage",
      name: "Package Master",
      icon: "LibraryComponents.Atoms.Icons.IconFi.FiPackage",
      component: MasterPackage,
    },
    {
      path: "/collection/testMaster",
      name: "Test Master",
      icon: "LibraryComponents.Atoms.Icons.Iconsi.SiMinetest",
      component: TestMaster,
    },
    {
      path: "/collection/lookup",
      name: "Lookup",
      icon: "LibraryComponents.Atoms.Icons.Iconmd.MdLooks",
      component: Lookup,
    },
    {
      path: "/collection/section",
      name: "Section",
      icon: "LibraryComponents.Atoms.Icons.IconBs.BsGrid3X3",
      component: Section,
    },
    {
      path: "/collection/sampleContainer",
      name: "Sample Container",
      icon: "LibraryComponents.Atoms.Icons.Iconai.AiOutlineContainer",
      component: SampleContainer,
    },
    {
      path: "/collection/sampleType",
      name: "Sample Type",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaBuromobelexperte",
      component: SampleType,
    },
    {
      path: "/collection/testSampleMapping",
      name: "Test Sample Mapping",
      icon: "LibraryComponents.Atoms.Icons.Iconio.IoIosGitCompare",
      component: TestSampleMapping,
    },
    {
      path: "/collection/methods",
      name: "Methods",
      icon: "LibraryComponents.Atoms.Icons.Iconvsc.VscSymbolMethod",
      component: Methods,
    },
    {
      path: "/collection/doctors",
      name: "Doctors",
      icon: "LibraryComponents.Atoms.Icons.IconGi.GiHospitalCross",
      component: Doctors,
    },
    {
      path: "/collection/registrationLocations",
      name: "Registartion Locations",
      icon: "LibraryComponents.Atoms.Icons.IconRi.RiMap2Line",
      component: RegistrationLocation,
    },
    {
      path: "/collection/corporateClients",
      name: "Corporate Clients",
      icon: "LibraryComponents.Atoms.Icons.IconFi.FiUsers",
      component: CorporateClients,
    },
    {
      path: "/collection/deliverySchedule",
      name: "Delivery Schedule",
      icon: "LibraryComponents.Atoms.Icons.Iconai.AiOutlineSchedule",
      component: DeliverySchedule,
    },
    {
      path: "/collection/administrativeDivisions",
      name: "Administrative Divisions",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaAddressCard",
      component: AdministrativeDivisions,
    },
    {
      path: "/collection/salesTeam",
      name: "Sales Team",
      icon: "LibraryComponents.Atoms.Icons.IconRi.RiTeamLine",
      component: SalesTeam,
    },
    {
      path: "/collection/possibleResults",
      name: "Possible Results",
      icon: "LibraryComponents.Atoms.Icons.Iconai.AiOutlineSolution",
      component: PossibleResults,
    },
    {
      path: "/collection/library",
      name: "Library",
      icon: "LibraryComponents.Atoms.Icons.Iconhi.HiLibrary",
      component: Library,
    },
    {
      path: "/collection/priceList",
      name: "PriceList",
      icon: "LibraryComponents.Atoms.Icons.IconGi.GiPriceTag",
      component: PriceList,
    },
    {
      path: "/collection/referenceRanges",
      name: "ReferenceRanges",
      icon: "LibraryComponents.Atoms.Icons.Iconvsc.VscReferences",
      component: ReferenceRanges,
    },
  ],
}

const communicationRoutes = {
  path: "/communication",
  name: "Communication",
  icon: "LibraryComponents.Atoms.Icons.IconFa.FaCommentDots",
  children: [
    {
      path: "/communication/interfaceManager",
      name: "Interface Manager",
      icon: "LibraryComponents.Atoms.Icons.IconCg.CgCommunity",
      component: InterfaceManager,
    },
    {
      path: "/communication/mapping/conversationMapping",
      name: "Conversation Mapping",
      icon: "LibraryComponents.Atoms.Icons.IconGi.GiConversation",
      component: DataConversation,
    },
    {
      path: "/communication/hostCommunication",
      name: "Host Communication",
      icon: "LibraryComponents.Atoms.Icons.IconRi.RiGhostSmileLine",
      component: HostCommunication,
    },
    {
      path: "/communication/mapping/segmentMapping",
      name: "Data Segment Mapping",
      icon: "LibraryComponents.Atoms.Icons.IconGi.GiDatabase",
      component: SegmentMapping,
    },
  ],
}
  
const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: "LibraryComponents.Atoms.Icons.IconRi.RiSettings5Fill",
  children: [
    {
      path: "/settings/role",
      name: "Role",
      icon: "LibraryComponents.Atoms.Icons.IconGi.GiKeyring",
      component: Role,
    },
    {
      path: "/settings/users",
      name: "User",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaUsersCog",
      component: User,
    },
    {
      path: "/settings/loginActivity",
      name: "Login Activity",
      icon: "LibraryComponents.Atoms.Icons.IconFi.FiActivity",
      component: LoginActivity,
    },
    {
      path: "/settings/mapping/roleMapping",
      name: "Role Mapping",
      icon: "LibraryComponents.Atoms.Icons.IconRi.RiShieldKeyholeFill",
      component: RoleMapping,
    },
    {
      path: "/settings/shortcutMenu",
      name: "Shortcut Menu",
      icon: "LibraryComponents.Atoms.Icons.IconCg.CgShortcut",
      component: ShortcutMenu,
    },
    {
      path: "/settings/environmentSettings",
      name: "Environment",
      icon: "LibraryComponents.Atoms.Icons.Iconmd.MdSettingsInputComponent",
      component: Environment,
    },
    {
      path: "/settings/noticeBoards",
      name: "Notice Boards",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaClipboardList",
      component: NoticeBoards,
    },
  ],
}

const registrationRoutes = {
  path: "/registration",
  name: "Registration",
  icon: "LibraryComponents.Atoms.Icons.IconRi.RiUserAddLine",
  children: [
    {
      path: "/registration/patient",
      name: "Patient Registration",
      icon: "LibraryComponents.Atoms.Icons.IconFa.FaAddressCard",
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
