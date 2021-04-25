/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { NavLink, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { observer } from "mobx-react"
import { Stores as LoginStores } from "@lp/features/login/stores"

import { Badge, Collapse } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

import * as LibraryComponents from "@lp/library/components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import * as Assets from "@lp/library/assets"

import * as localStorage from "@lp/library/clients/storage-client"

// import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as RootStore } from "@lp/library/stores"

import hydrateStore from "@lp/library/modules/startup"
import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const initOpenRoutes = (location) => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname
  let _routes = {}
  if (RootStore.routerStore.userRouter)
    RootStore.routerStore.userRouter.forEach((route: any, index) => {
      const isActive = pathName.indexOf(route.path) === 0
      const isOpen = route.open
      const isHome = route.containsHome && pathName === "/" ? true : false

      _routes = Object.assign({}, _routes, {
        [index]: isActive || isOpen || isHome,
      })
    })
  return _routes
}

const SidebarCategory = withRouter(
  ({
    title,
    badgeColor,
    badgeText,
    isOpen,
    children,
    onClick,
    icon,
    location,
    to,
  }) => {
    const getSidebarItemClass = (path) => {
      return location.pathname.indexOf(path) !== -1 ||
        (location.pathname === "/" && path === "/dashboard")
        ? "active"
        : ""
    }
    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <span
          data-toggle="collapse"
          className={
            "flex items-center sidebar-link " + (!isOpen ? "collapsed" : "")
          }
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
          {icon !== undefined ? (
            <LibraryComponents.Atoms.Icons.EvaIcon
              size="medium"
              icon={icon || "list"}
              color="#ffffff"
            />
          ) : null}
          <span className="align-middle">{title}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse isOpen={isOpen}>
          <ul id="item" className={"sidebar-dropdown list-unstyled"}>
            {children}
          </ul>
        </Collapse>
      </li>
    )
  }
)

interface SidebarItemProps {
  name: string
  category: string
  title: string
  badgeColor: string
  badgeText: string
  icon: any
  location: any
  to: string
  onChangeItem: (category: string, item: string) => void
}

const SidebarItem = withRouter((props: SidebarItemProps) => {
  const getSidebarItemClass = (path) => {
    return props.location.pathname === path ? "active" : ""
  }
  return (
    <li
      className={"sidebar-item " + getSidebarItemClass(props.to)}
      onClick={() => {
        props.onChangeItem && props.onChangeItem(props.category, props.name)
      }}
    >
      <NavLink to={props.to} className="sidebar-link" activeClassName="active">
        <span className="flex items-center">
          {props.icon ? (
            <LibraryComponents.Atoms.Icons.EvaIcon
              size="medium"
              icon={props.icon || "list"}
              color="#ffffff"
            />
          ) : null}
          {props.title}
        </span>
        {props.badgeColor && props.badgeText ? (
          <Badge color={props.badgeColor} size={18} className="sidebar-badge">
            {props.badgeText}
          </Badge>
        ) : null}
      </NavLink>
    </li>
  )
})

const Sidebar = observer(({ location, sidebar, layout }) => {
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location))

  useEffect(() => {
    setOpenRoutes(initOpenRoutes(location))
  }, [RootStore.routerStore.userRouter])

  const toggle = (index) => {
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openRoutes) =>
          Object.assign({}, openRoutes, { [item]: false })
        )
    )
    // Toggle selected element
    setOpenRoutes((openRoutes) =>
      Object.assign({}, openRoutes, { [index]: !openRoutes[index] })
    )
  }

  return (
    <>
      <nav
        className={
          "sidebar" +
          (!sidebar.isOpen ? " toggled" : "") +
          (sidebar.isSticky ? " sidebar-sticky" : "")
        }
      >
        <div className="sidebar-content">
          <PerfectScrollbar>
            <a className="flex sidebar-brand items-center" href="/">
              <img
                src={Assets.appIcon}
                alt="appIcon"
                style={{ width: 40, height: 40 }}
              />
              <span className="align-middle ml-2">{`Lims Plus`}</span>
            </a>
            {RootStore.routerStore.userRouter && (
              <ul className="sidebar-nav">
                {RootStore.routerStore.userRouter.map((category: any, index) => {
                  return (
                    <React.Fragment key={index}>
                      {category.children ? (
                        <SidebarCategory
                          name={category.name}
                          title={category.title}
                          badgeColor={category.badgeColor}
                          badgeText={category.badgeText}
                          icon={category.icon}
                          to={category.path}
                          isOpen={openRoutes[index]}
                          onClick={() => toggle(index)}
                        >
                          {category.children.map((route, index) => (
                            <SidebarItem
                              key={index}
                              category={category.name}
                              name={route.name}
                              title={route.title}
                              to={route.path}
                              badgeColor={route.badgeColor}
                              badgeText={route.badgeText}
                              icon={route.icon}
                              onChangeItem={async (category, item) => {
                                RootStore.routerStore.updateSelectedCategory({
                                  ...RootStore.routerStore.selectedUserCategory,
                                  category,
                                  item,
                                })
                                await localStorage.setItem(
                                  `__persist_mobx_stores_routerStore_SelectedCategory__`,
                                  {
                                    category,
                                    item,
                                  }
                                )
                                const permission = RouterFlow.getPermission(
                                  toJS(RootStore.routerStore.userRouter),
                                  category,
                                  item
                                )
                                const selectedComp = await RouterFlow.selectedComponents(
                                  toJS(RootStore.routerStore.userRouter),
                                  category,
                                  item
                                )
                                RootStore.routerStore.updateSelectedComponents(
                                  selectedComp
                                )
                                RootStore.routerStore.updateUserPermission(
                                  permission
                                )
                                await hydrateStore(
                                  "routerStore",
                                  RootStore.routerStore
                                )
                              }}
                            />
                          ))}
                        </SidebarCategory>
                      ) : (
                        <SidebarItem
                          name={category.name}
                          title={category.title}
                          to={category.path}
                          icon={category.icon}
                          badgeColor={category.badgeColor}
                          badgeText={category.badgeText}
                          onChangeItem={async (category, item) => {
                            RootStore.routerStore.updateSelectedCategory({
                              ...RootStore.routerStore.selectedUserCategory,
                              category,
                              item,
                            })
                            await localStorage.setItem(
                              `__persist_mobx_stores_routerStore_SelectedCategory__`,
                              {
                                category,
                                item,
                              }
                            )  
                            const permission = await RouterFlow.getPermission(
                              toJS(RootStore.routerStore.userRouter),
                              category,
                              item
                            )
                            const selectedComp = await RouterFlow.selectedComponents(
                              toJS(RootStore.routerStore.userRouter),
                              category,
                              item
                            )
                            RootStore.routerStore.updateSelectedComponents(
                              selectedComp
                            )
                            RootStore.routerStore.updateUserPermission(permission)
                            await hydrateStore("routerStore", RootStore.routerStore)
                          }}
                        />
                      )}
                    </React.Fragment>
                  )
                })}
              </ul>
            )}
            {!layout.isBoxed && !sidebar.isSticky ? (
              <div className="sidebar-bottom d-none d-lg-block">
                <div className="media">
                  <img
                    className="rounded-circle mr-3"
                    src="https://sdk.bitmoji.com/render/panel/e2bf4bbb-7b41-4138-ac9b-db17e6512022-AWVtX3FR0FfbGPb2vgeTVs0KNs5wkA-v1.png?transparent=1&amp;palette=1"
                    alt={LoginStores.loginStore.login?.fullName}
                    width="40"
                    height="40"
                  />
                  <div className="media-body">
                    <h5 className="mb-1">
                      {LoginStores.loginStore.login?.fullName}
                    </h5>
                    <div>
                      <FontAwesomeIcon icon={faCircle} className="text-success" />{" "}
                      Online
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </PerfectScrollbar>
        </div>
      </nav>
    </>
  )
})

export default withRouter(
  connect((store: any) => ({
    sidebar: store.sidebar,
    layout: store.layout,
  }))(Sidebar)
)
