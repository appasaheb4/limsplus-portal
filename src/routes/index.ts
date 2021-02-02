import async from "../layouts/components/Async"

import { Layout as LayoutIcon, Sliders as SlidersIcon } from "react-feather"

// Landing
import login from "@lp/features/login/scenes/login"

// Dashboards
const defaultDashboard = async(() => import("@lp/features/Default"))

// Banner
const banner = async(() => import("@lp/features/banner/scenes/banner"))

// Collection
const collection_Lab = async(() => import("@lp/features/collection/labs/scenes/Lab"))
const collection_Deginisation = async(
  () => import("@lp/features/collection/deginisation/scenes/deginisation")
)
const collection_Department = async(
  () => import("@lp/features/collection/department/scenes/department")
)
const collection_Role = async(
  () => import("@lp/features/collection/labs/scenes/Lab")
)

// User
const user = async(() => import("@lp/features/users/scenes/user"))
const changePassword = async(
  () => import("@lp/features/changePassword/scenes/changePassword")
)

// Mapping
const userMapping = async(() => import("@lp/features/mapping/user/scenes/user"))
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
      component: defaultDashboard,
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
      component: banner,
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
      component: collection_Lab,
    },
    {
      path: "/collection/deginisation",
      name: "Deginisation",
      component: collection_Deginisation,
    },
    {
      path: "/collection/department",
      name: "Department",
      component: collection_Department,
    },
    {
      path: "/collection/role",
      name: "Role",
      component: collection_Role,
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
      component: user,
    },
    {
      path: "/user/changePassword",
      name: "Change Password",
      component: changePassword,
    },
  ],
}

const mappingRoutes = {
  path: "/mapping",
  name: "Mapping",
  icon: LayoutIcon,
  children: [
    {
      path: "/mapping/userMapping",
      name: "User Mapping",
      component: userMapping,
    },
  ],
}

const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: LayoutIcon,
  children: [
    {
      path: "/settings/mapping/userMapping",
      name: "User Mapping",
      component: userMapping,
    },
  ],
}

// Dashboard specific routes
export const dashboardRouter = [
  dashboardRoutes,
  bannerRoutes,
  collectionRoutes,
  userRoutes,
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
  settingsRoutes,
]

export const UserPermission = [
  {
    path: "banner",
    name: "Banner",
    component: banner,
  },
  {
    path: "collection",
    name: "Collection Lab",
    component: collection_Lab,
  },
  {
    path: "collection",
    name: "Collection Deginisation",
    component: collection_Deginisation,
  },
  {
    path: "collection",
    name: "Collection Department",
    component: collection_Department,
  },
  {
    path: "collection",
    name: "Collection Role",
    component: collection_Role,
  },
  {
    path: "user",
    name: "Users",
    component: user,
  },
]
