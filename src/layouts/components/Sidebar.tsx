import React, { useState } from "react"
import { NavLink, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { observer } from "mobx-react"
import { Stores as LoginStores } from "@lp/features/login/stores"

import { Badge, Collapse } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import * as Assets from "@lp/library/assets"

import routes from "../../routes/index"

// import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as RootStore } from "@lp/library/stores"

const initOpenRoutes = (location) => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname

  let _routes = {}

  routes.forEach((route: any, index) => {
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
  ({ title, badgeColor, badgeText, isOpen, children, onClick, location, to }) => {
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
          className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
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

const SidebarItem = withRouter(
  ({  title, badgeColor, badgeText, icon: Icon, location, to }) => {
    const getSidebarItemClass = (path) => {
      return location.pathname === path ? "active" : ""
    }
    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <NavLink to={to} className="sidebar-link" activeClassName="active">
          {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
          {title}
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </NavLink>
      </li>
    )
  }
)

const Sidebar = observer(({ location, sidebar, layout }) => {
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location))
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
            <a className="sidebar-brand" href="/">
              <img
                src={Assets.appIcon}
                alt="appIcon"
                style={{ width: 40, height: 40 }}
              />
              <span className="align-middle">Lims Plus</span>
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
                              name={route.name}
                              title={route.title}
                              to={route.path}
                              badgeColor={route.badgeColor}
                              badgeText={route.badgeText}
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
                  {/* <img
                  className="rounded-circle mr-3"
                  src={avatar}
                  alt="Chris Wood"
                  width="40"
                  height="40"
                /> */}
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
