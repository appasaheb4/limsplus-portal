/* eslint-disable */
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { observer } from "mobx-react"
import moment from "moment"

import { Button } from "reactstrap"

import { toggleSidebar } from "../../redux/actions/sidebarActions"
import { useHistory } from "react-router-dom"
import { Stores } from "../../library/stores/index"
import { Stores as AppStore } from "@lp/library/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as UserStores } from "@lp/features/users/stores"
import { Stores as RootStore } from "@lp/library/stores"

import * as Assets from "@lp/library/assets"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import { RouterFlow } from "@lp/flows"

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

        <Form inline className='mr-9' style={{width:'73%',backgroundColor:`${Stores.appStore.applicationSetting?.shortCutBarColor}`}} >
          <LibraryComponents.Atoms.Buttons.Button
            size="medium"
            type="outline"
            onClick={() => {
              window.location.href = "/dashboard/default"
            }}
          >
            <LibraryComponents.Atoms.Tooltip tooltipText="Dashboard">
              <LibraryComponents.Atoms.Icons.IconContext color="#000" size="22">
                {LibraryComponents.Atoms.Icons.getIconTag(
                  LibraryComponents.Atoms.Icons.IconRi.RiDashboardFill
                )}
              </LibraryComponents.Atoms.Icons.IconContext>
            </LibraryComponents.Atoms.Tooltip>
          </LibraryComponents.Atoms.Buttons.Button>
          {LoginStores.loginStore.login?.shortcutMenu &&
            LoginStores.loginStore.login?.shortcutMenu[
              LoginStores.loginStore.login.role || ""
            ] &&
            LoginStores.loginStore.login?.shortcutMenu[
              LoginStores.loginStore.login.role || ""
            ].map((item) => (
              <>
                <div className="ml-1 m-0.5">
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="outline"
                    onClick={async () => {
                      await RouterFlow.updateSelectedCategory(
                        RootStore,
                        item.category,
                        item.name
                      )
                      history.push(item.path)
                    }}
                  >
                    <LibraryComponents.Atoms.Tooltip tooltipText={item.title}>
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
                        size="22"
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.getIcons(item.icon) ||
                            LibraryComponents.Atoms.Icons.IconBs.BsList
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </LibraryComponents.Atoms.Buttons.Button>
                </div>
              </>
            ))}
        </Form>

        <Collapse navbar>   
          <Nav className="ml-auto items-center" navbar>
            <Button color="primary" className="hidden shadow-sm h-10 sm:block">
              <label>{LoginStores.loginStore.login?.sessionAllowed}</label>
            </Button>
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
                    RootStore.rootStore.setProcessLoading(true)
                    LoginStores.loginStore
                      .removeUser()
                      .then(async (res) => {
                        RootStore.rootStore.setProcessLoading(false)
                        if (res) {
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
