import async from "../layouts/components/Async"

import { Layout as LayoutIcon, Sliders as SlidersIcon } from "react-feather"

// Landing
import Login from "@lp/features/login/scenes/login"

// Dashboards
const Default = async(() => import("@lp/features/Default"))

// Banner
const Banner = async(() => import("@lp/features/banner/scenes/banner"))

// Collection
const Collection_Lab = async(() => import("@lp/features/collection/labs/scenes/Lab"))
const Collection_Deginisation = async(
  () => import("@lp/features/collection/deginisation/scenes/deginisation")
)
const Collection_Department = async(
  () => import("@lp/features/collection/department/scenes/department")
)
const Collection_Role = async(
  () => import("@lp/features/collection/labs/scenes/Lab")
)

// User
const User = async(() => import("@lp/features/users/scenes/Users"))
const ChangePassword = async(
  () => import("@lp/features/changePassword/scenes/changePassword")
)

// Routes
const loginRoutes = {
  path: "/",
  name: "Login",
  component: Login,
  children: null,
}

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  header: "Dashboard",
  icon: SlidersIcon,
  children: [
    {
      path: "/dashboard",
      name: "Default",
      component: Default,
    },
  ],
}

const bannerRoutes = {
  path: "/banner",
  name: "Banner",
  icon: LayoutIcon,
  children: [
    {
      path: "/banner",
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
      component: Collection_Lab,
    },
    {
      path: "/collection/deginisation",
      name: "Deginisation",
      component: Collection_Deginisation,
    },
    {
      path: "/collection/department",
      name: "Department",
      component: Collection_Department,
    },
    {
      path: "/collection/role",
      name: "Role",
      component: Collection_Role,
    },
  ],
}

const userRoutes = {
  path: "/user",
  name: "User",
  icon: LayoutIcon,
  children: [
    {
      path: "/user",
      name: "User",
      component: User,
    },
    {
      path: "/user/changePassword",
      name: "Change Password",
      component: ChangePassword,
    },
  ],
}

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  bannerRoutes,
  collectionRoutes,
  userRoutes,
]

// Landing specific routes
export const login = [loginRoutes]

// All routes
export default [dashboardRoutes, bannerRoutes, collectionRoutes, userRoutes]
