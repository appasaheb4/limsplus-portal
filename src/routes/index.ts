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
  icon: "home",
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      icon: "list",
      component: DefaultDashboard,
    },
  ],
}

const collectionRoutes = {
  path: "/collection",
  name: "Collection",
  icon: "keypad-outline",
  badgeColor: "#ffffff",
  children: [
    {
      path: "/collection/banner",
      name: "Banner",
      icon: "list",
      component: Banner,
    },
    {
      path: "/collection/lab",
      name: "Lab",
      icon: "list",
      component: CollectionLab,
    },
    {
      path: "/collection/deginisation",
      name: "Deginisation",
      icon: "list",
      component: CollectionDeginisation,
    },
    {
      path: "/collection/department",
      name: "Department",
      icon: "list",
      component: CollectionDepartment,
    },
    {
      path: "/collection/role",
      name: "Role",
      icon: "list",
      component: CollectionRole,
    },
  ],
}

const communicationRoutes = {
  path: "/communication",
  name: "Communication",
  icon: "flip-outline",
  children: [
    {
      path: "/communication/interfaceManager",
      name: "Interface Manager",
      icon: "list",
      component: InterfaceManager,
    },
    {
      path: "/communication/mapping/conversationMapping",
      name: "Conversation Mapping",
      icon: "list",
      component: ConversationMapping,
    },
    {
      path: "/communication/hostCommunication",
      name: "Host Communication",
      icon: "list",
      component: HostCommunication,
    },
    {
      path: "/communication/mapping/segmentMapping",
      name: "Data Segment Mapping",
      icon: "list",
      component: SegmentMapping,
    },
  ],
}

const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: "settings-2-outline",
  children: [
    {
      path: "/settings/users",
      name: "User",
      icon: "list",
      component: User,
    },
    {
      path: "/settings/loginActivity",
      name: "Login Activity",
      icon: "list",
      component: LoginActivity,
    },
    {
      path: "/settings/mapping/roleMapping",
      name: "Role Mapping",
      icon: "list",
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
