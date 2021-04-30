import async from "../layouts/components/Async"

// Landing
import login from "@lp/features/login/scenes/login"

// Dashboards
const DefaultDashboard = async(() => import("@lp/features/Default"))

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

// User
const User = async(() => import("@lp/features/users/scenes/Users"))

// Settings
const RoleMapping = async(
  () => import("@lp/features/settings/mapping/role/scenes/RoleMapping")
)
const LoginActivity = async(
  () => import("@lp/features/settings/loginActivity/scenes/LoginActivity")
)

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

// Routes
const loginRoutes = {
  path: "/",
  name: "Login",
  icon: "log-in-outline",
  component: login,
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
  ],
}

// Dashboard specific routes
export const dashboardRouter = [
  dashboardRoutes,
  collectionRoutes,
  communicationRoutes,
  settingsRoutes,
]

// Landing specific routes
export const loginRouter = [loginRoutes]

// All routes
export default [
  dashboardRoutes,
  collectionRoutes,
  communicationRoutes,
  settingsRoutes,
]
