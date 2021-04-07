import async from "../layouts/components/Async"

import { Layout as LayoutIcon, Sliders as SlidersIcon } from "react-feather"

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
const ChangePassword = async(
  () => import("@lp/features/changePassword/scenes/changePassword")
)
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
const EncodeCharacter = async(
  () => import("@lp/features/communication/scenes/EncodeCharacter")
)

// Routes
const loginRoutes = {
  path: "/",
  name: "Login",
  component: login,
  children: null,
}

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  header: "Dashboard",
  icon: SlidersIcon,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: DefaultDashboard,
    },
  ],
}

const bannerRoutes = {
  path: "/banner",
  name: "Banner",
  icon: LayoutIcon,
  children: [
    {
      path: "/banner/banner",
      name: "Banner",
      component: Banner,
    },
  ],
}

const collectionRoutes = {
  path: "/collection",
  name: "Collection",
  icon: LayoutIcon,
  children: [
    {
      path: "/collection/lab",
      name: "Lab",
      component: CollectionLab,
    },
    {
      path: "/collection/deginisation",
      name: "Deginisation",
      component: CollectionDeginisation,
    },
    {
      path: "/collection/department",
      name: "Department",
      component: CollectionDepartment,
    },
    {
      path: "/collection/role",
      name: "Role",
      component: CollectionRole,
    },
  ],
}

const userRoutes = {
  path: "/user",
  name: "User",
  icon: LayoutIcon,
  children: [
    {
      path: "/user/user",
      name: "User",
      component: User,
    },
  ],
}

const communicationRoutes = {
  path: "/communication",
  name: "Communication",
  icon: LayoutIcon,
  children: [
    {
      path: "/communication/encodeCharacter",
      name: "Interface Manager",
      component: EncodeCharacter,
    },
    {
      path: "/communication/mapping/conversationMapping",
      name: "Conversation Mapping",
      component: ConversationMapping,
    },
    {  
      path: "/communication/hostCommunication",
      name: "Host Communication",
      component: HostCommunication,
    },
    {
      path: "/communication/mapping/segmentMapping",
      name: "Data Segment Mapping",
      component: SegmentMapping,
    },
  ],
}

const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: LayoutIcon,
  children: [
    {
      path: "/settings/loginActivity",
      name: "Login Activity",
      component: LoginActivity,
    },
    {
      path: "/settings/mapping/roleMapping",
      name: "Role Mapping",
      component: RoleMapping,
    },
    {
      path: "/settings/changePassword",
      name: "Change Password",
      component: ChangePassword,
    },
  ],
}

// Dashboard specific routes
export const dashboardRouter = [
  dashboardRoutes,
  bannerRoutes,
  collectionRoutes,
  userRoutes,
  communicationRoutes,
  settingsRoutes,
]

// Landing specific routes
export const loginRouter = [loginRoutes]

// All routes
export default [
  dashboardRoutes,
  bannerRoutes,
  collectionRoutes,
  userRoutes,
  communicationRoutes,
  settingsRoutes,
]
