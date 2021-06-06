import async from "../layouts/components/Async"

// Landing
import login from "@lp/features/login/scenes/login"
import PrivacyPolicy from "@lp/features/privacyPolicy/scences/PrivacyPolicy"

// Dashboards
const DefaultDashboard = async(() => import("@lp/features/defaultDashboard"))

// Banner
const Banner = async(() => import("@lp/features/banner/scenes/banner"))

// Collection
const CollectionLab = async(() => import("@lp/features/collection/labs/scenes/Lab"))
const CollectionDeginisation = async(
  () => import("@lp/features/collection/deginisation/scenes/deginisation")
)
const CollectionDepartment = async(
  () => import("@lp/features/collection/department/scenes/department")
)
const CollectionRole = async(
  () => import("@lp/features/collection/roles/scenes/role")
)
// Collection Master

// master
const MasterAnalyte = async(
  () => import("@lp/features/collection/masterAnalyte/scenes/MasterAnalyte")
)
const TestAnalyteMapping = async(
  () =>
    import(
      "@lp/features/collection/testAnalyteMapping/scenes/TestAnalyteMapping"
    )
)
const MasterPanel = async(
  () => import("@lp/features/collection/masterPanel/scenes/MasterPanel")
)
const TestPanelMapping = async(
  () =>
    import("@lp/features/collection/testPanelMapping/scenes/TestPanelMapping")
)
const MasterPackage = async(
  () => import("@lp/features/collection/masterPackage/scenes/MasterPackage")
)
const TestMaster = async(
  () => import("@lp/features/collection/testMaster/scenes/TestMaster")
)
const Lookup = async(() => import("@lp/features/collection/lookup/scenes/Lookup"))
const Section = async(()=> import("@lp/features/collection/section/scenes/Section"))

// User
const User = async(() => import("@lp/features/users/scenes/Users"))

// Communication
const HostCommunication = async(
  () => import("@lp/features/communication/scenes/HostCommunication")
)
const SegmentMapping = async(
  () =>
    import("@lp/features/communication/scenes/mapping/segmentMapping/SegmentMapping")
)
const ConversationMapping = async(
  () =>
    import(
      "@lp/features/communication/scenes/mapping/conversationMapping/ConversationMapping"
    )
)
const InterfaceManager = async(
  () => import("@lp/features/communication/scenes/InterfaceManager")
)

// Settings
const RoleMapping = async(
  () => import("@lp/features/settings/mapping/role/scenes/RoleMapping")
)
const LoginActivity = async(
  () => import("@lp/features/settings/loginActivity/scenes/LoginActivity")
)
const ShortcutMenu = async(
  () => import("@lp/features/settings/shortcutMenu/scenes/ShortcutMenu")
)
const EnvironmentSettings = async(
  () =>
    import("@lp/features/settings/environmentSettings/scenes/EnvironmentSettings")
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
      path: "/collection/role",
      name: "Role",
      icon: "LibraryComponents.Atoms.Icons.IconGi.GiKeyring",
      component: CollectionRole,
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
      component: ConversationMapping,
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
      name: "Environment Settings",
      icon: "LibraryComponents.Atoms.Icons.Iconmd.MdSettingsInputComponent",
      component: EnvironmentSettings,
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
