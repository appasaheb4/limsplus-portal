import React, { useState } from "react"
import { connect } from "react-redux"
import { observer } from "mobx-react"
import moment from "moment"

import { toggleSidebar } from "../../redux/actions/sidebarActions"
import { useHistory } from "react-router-dom"

import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as UserStores } from "@lp/features/users/stores"

import * as Assets from "@lp/library/assets"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as Config from "@lp/config"

import * as localStorage from "@lp/library/clients/storage-client"

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
} from "reactstrap"

// import {
//   AlertCircle,
//   Bell,
//   BellOff,
//   Home,
//   MessageCircle,
//   PieChart,
//   Settings,
//   UserPlus,
// } from "react-feather"

// const notifications = [
//   {
//     type: "important",
//     title: "Update completed",
//     description: "Restart server 12 to complete the update.",
//     time: "2h ago",
//   },
//   {
//     type: "default",
//     title: "Lorem ipsum",
//     description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
//     time: "6h ago",
//   },
//   {
//     type: "login",
//     title: "Login from 192.186.1.1",
//     description: "",
//     time: "6h ago",
//   },
//   {
//     type: "request",
//     title: "New connection",
//     description: "Anna accepted your request.",
//     time: "12h ago",
//   },
// ]

// const messages = [
//   {
//     name: "Ashley Briggs",
//     avatar: "",
//     description: "Nam pretium turpis et arcu. Duis arcu tortor.",
//     time: "15m ago",
//   },
//   {
//     name: "Chris Wood",
//     avatar: "",
//     description: "Curabitur ligula sapien euismod vitae.",
//     time: "2h ago",
//   },
//   {
//     name: "Stacie Hall",
//     avatar: "",
//     description: "Pellentesque auctor neque nec urna.",
//     time: "4h ago",
//   },
//   {
//     name: "Bertha Martin",
//     avatar: "",
//     description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
//     time: "5h ago",
//   },
// ]

// interface InputProps {
//   children: any
//   count?: any
//   showBadge?: any
//   header?: any
//   footer?: any
//   icon?: any
// }

// const NavbarDropdown: React.FunctionComponent<InputProps> = ({
//   children,
//   count,
//   showBadge,
//   header,
//   footer,
//   icon: Icon,
// }) => (
//   <UncontrolledDropdown nav inNavbar className="mr-2">
//     <DropdownToggle nav className="nav-icon dropdown-toggle">
//       <div className="position-relative">
//         <Icon className="align-middle" size={18} />
//         {showBadge ? <span className="indicator">{count}</span> : null}
//       </div>
//     </DropdownToggle>
//     <DropdownMenu right className="dropdown-menu-lg py-0">
//       <div className="dropdown-menu-header position-relative">
//         {count} {header}
//       </div>
//       <ListGroup>{children}</ListGroup>
//       <DropdownItem header className="dropdown-menu-footer">
//         <span className="text-muted">{footer}</span>
//       </DropdownItem>
//     </DropdownMenu>
//   </UncontrolledDropdown>
// )

// interface NavbarItemProps {
//   icon: any
//   title?: any
//   description?: any
//   time?: any
//   spacing?: any
// }

// const NavbarDropdownItem: React.FunctionComponent<NavbarItemProps> = ({
//   icon,
//   title,
//   description,
//   time,
// }) => (
//   <ListGroupItem>
//     <Row noGutters className="align-items-center">
//       <Col xs={2}>{icon}</Col>
//       <Col xs={10} className="pl-2">
//         <div className="text-dark">{title}</div>
//         <div className="text-muted small mt-1">{description}</div>
//         <div className="text-muted small mt-1">{time}</div>
//       </Col>
//     </Row>
//   </ListGroupItem>
// )

const NavbarComponent = observer(({ dispatch }) => {
  const history = useHistory()
  const [modalAccount, setModalAccount] = useState<any>()
  const [modalChangePassword, setModalChangePassword] = useState<any>()
  return (
    <>
      <Navbar color="white" light expand>
        <span
          className="sidebar-toggle d-flex mr-2"
          onClick={() => {
            dispatch(toggleSidebar())
          }}
        >
          <i className="hamburger align-self-center" />
        </span>

        <Form inline>
          <LibraryComponents.Atoms.Buttons.Button
            size="medium"
            type="outline"
            onClick={() => {
              window.location.href = "/dashboard/default"
            }}
          >
            <LibraryComponents.Atoms.Icon.EvaIcon
              icon="home-outline"
              size="large"
              color={Config.Styles.COLORS.BLACK}
            />
          </LibraryComponents.Atoms.Buttons.Button>
        </Form>

        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            {/* <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={messages.length}
            showBadge
          >
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.name}
                    />
                  }
                  title={item.name}
                  description={item.description}
                  time={item.time}
                  spacing
                />
              )
            })}
          </NavbarDropdown> */}

            {/* <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              )
            })}
          </NavbarDropdown> */}

            <UncontrolledDropdown nav inNavbar>
              <span className="d-none d-sm-inline-block">
                <DropdownToggle nav>
                  <div className="flex items-center">
                    <img
                      className="rounded-circle mr-3"
                      src={
                        LoginStores.loginStore.login?.image || Assets.defaultAvatar
                      }
                      alt={LoginStores.loginStore.login?.fullName}
                      width="40"
                      height="40"
                    />
                    <span className="text-dark">
                      {LoginStores.loginStore.login?.fullName}
                    </span>
                  </div>
                </DropdownToggle>
              </span>
              <DropdownMenu right>
                <DropdownItem onClick={() => setModalAccount({ show: true })}>
                  Account
                </DropdownItem>
                <DropdownItem onClick={() => setModalChangePassword({ show: true })}>
                  Change Password
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Settings & Privacy</DropdownItem>
                <DropdownItem>Help</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    LoginStores.loginStore
                      .removeUser()
                      .then(async (res) => {
                        if (res) {
                          await localStorage.removeItem(
                            `__persist_mobx_stores_loginStore__`
                          )
                          await localStorage.removeItem(
                            `__persist_mobx_stores_routerStore__`
                          )
                          await localStorage.removeItem(
                            `__persist_mobx_stores_routerStore_SelectedCategory__`
                          )
                          history.push("/")
                        }
                      })
                      .catch(() => {
                        alert("Please try again")
                      })
                  }}
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <FeatureComponents.Molecules.ModalAccount
        {...modalAccount}
        onClose={() => setModalAccount({ show: false })}
      />
      <LibraryComponents.Molecules.ModalChangePassword
        {...modalChangePassword}
        onClick={() => {
          const exipreDate = new Date(
            moment(new Date()).add(30, "days").format("YYYY-MM-DD HH:mm")
          )
          let body = Object.assign(
            LoginStores.loginStore.login,
            UserStores.userStore.changePassword
          )
          body = {
            ...body,
            exipreDate,
          }
          UserStores.userStore.UsersService.changePassword(body).then((res) => {
            console.log({ res })
            if (res.status === 200) {
              LoginStores.loginStore.updateLogin({
                ...LoginStores.loginStore.login,
                exipreDate,
                passChanged: true,
              })
              UserStores.userStore.updateChangePassword({
                ...UserStores.userStore.changePassword,
                tempHide: true,
              })
              LibraryComponents.Atoms.ToastsStore.success(`Password changed!`)
              setModalChangePassword({ show: false })
            } else if (res.status === 203) {
              LibraryComponents.Atoms.ToastsStore.error(res.data.data.message)
            } else {
              LibraryComponents.Atoms.ToastsStore.error(
                `Please enter correct old password`
              )
            }
          })
        }}
        onClose={() => {
          LoginStores.loginStore.updateLogin({
            ...LoginStores.loginStore.login,
            passChanged: true,
          })
          UserStores.userStore.updateChangePassword({
            ...UserStores.userStore.changePassword,
            tempHide: true,
          })
          setModalChangePassword({ show: false })
        }}
      />
    </>
  )
})

export default connect((store: any) => ({
  app: store.app,
}))(NavbarComponent)
