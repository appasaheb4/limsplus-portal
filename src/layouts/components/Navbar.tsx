/* eslint-disable */
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { observer } from "mobx-react"
import moment from "moment"
import * as LibraryUtils from "@lp/library/utils"

import { Button } from "reactstrap"

import { toggleSidebar } from "../../redux/actions/sidebarActions"
import { useHistory } from "react-router-dom"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as UserStores } from "@lp/features/users/stores"
import { stores } from "@lp/library/stores"

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
  const [modalSessionAllowed, setModalSessionAllowed] = useState<any>()
  return (
    <>
      <Navbar
        style={{
          backgroundColor:
            stores.appStore.applicationSetting?.shortCutBarColor || "white",
        }}
        light
        expand
      >
        <span
          className="sidebar-toggle d-flex mr-2"
          onClick={() => {
            dispatch(toggleSidebar())
          }}
        >
          <i className="hamburger align-self-center" />
        </span>

        <Form inline className="mr-9" style={{ width: "73%" }}>
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
                        stores,
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
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              onClick={() => {
                const elem: any = document.body
                function openFullscreen() {
                  stores.appStore.updateApplicationSetting({
                    ...stores.appStore.applicationSetting,
                    isExpandScreen: true,
                  })
                  if (elem.requestFullscreen) {
                    elem.requestFullscreen()
                  } else if (elem.webkitRequestFullscreen) {
                    /* Safari */
                    elem.webkitRequestFullscreen()
                  } else if (elem.msRequestFullscreen) {
                    /* IE11 */
                    elem.msRequestFullscreen()
                  }
                }
                function closeFullscreen() {
                  if (document.fullscreenElement) {
                    if (document.exitFullscreen) {
                      stores.appStore.updateApplicationSetting({
                        ...stores.appStore.applicationSetting,
                        isExpandScreen: false,
                      })
                      document.exitFullscreen()
                    }
                  }
                }
                openFullscreen()
                closeFullscreen()
              }}
            >
              <LibraryComponents.Atoms.Tooltip
                tooltipText={
                  stores.appStore.applicationSetting?.isExpandScreen
                    ? "Collapse"
                    : "Expand"
                }
              >
                <LibraryComponents.Atoms.Icons.IconContext color="#000" size="22">
                  {LibraryComponents.Atoms.Icons.getIconTag(
                    stores.appStore.applicationSetting?.isExpandScreen
                      ? LibraryComponents.Atoms.Icons.IconCg.CgMinimize
                      : LibraryComponents.Atoms.Icons.Iconai.AiOutlineExpand
                  )}
                </LibraryComponents.Atoms.Icons.IconContext>
              </LibraryComponents.Atoms.Tooltip>
            </LibraryComponents.Atoms.Buttons.Button>
            <div className="ml-2" />
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              onClick={() => {
                UserStores.userStore.UsersService.loginActivityList({
                  userId: LoginStores.loginStore.login.userId,
                  loginActivityId: LoginStores.loginStore.login.loginActivityId,
                }).then((res) => {
                  console.log({ res })
                  if (!res.success) alert(res.message)
                  else {
                    LoginStores.loginStore.updateLogin({
                      ...LoginStores.loginStore.login,
                      loginActivityList: res.data.loginActivityList,
                      sessionAllowed: res.data.sessionAllowed,
                    })
                    setModalSessionAllowed({
                      show: true,  
                      data: res.data.loginActivityList,
                    })
                  }
                })
              }}
            >
              <label className="inline w-8 text-center" style={{width:'40px'}}>
                {LoginStores.loginStore.login?.sessionAllowed}
              </label>
            </LibraryComponents.Atoms.Buttons.Button>
            <UncontrolledDropdown nav inNavbar>
              <span className="d-none d-sm-inline-block">
                <DropdownToggle nav>
                  <div className="flex items-center">
                    <img
                      className="rounded-circle mr-3"
                      src={
                        LoginStores.loginStore.login?.picture || Assets.defaultAvatar
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
                <DropdownItem
                  onClick={() => {
                    LoginStores.loginStore
                      .removeUser()
                      .then((res) => {
                        if (res.success) {
                          LibraryComponents.Atoms.Toast.success({
                            message: `😊 ${res.message}`,
                          })
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
            exipreDate: LibraryUtils.moment(exipreDate).unix(),
          }
          UserStores.userStore.UsersService.changePassword(body).then((res) => {
            console.log({ res })
            if (res.status === 200) {
              LoginStores.loginStore.updateLogin({
                ...LoginStores.loginStore.login,
                exipreDate: LibraryUtils.moment(exipreDate).unix(),
                passChanged: true,
              })
              UserStores.userStore.updateChangePassword({
                ...UserStores.userStore.changePassword,
                tempHide: true,
              })
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Password changed!`,
              })
              setModalChangePassword({ show: false })
            } else if (res.status === 203) {
              LibraryComponents.Atoms.Toast.error({
                message: `😔 ${res.data.data.message}`,
              })
            } else {
              LibraryComponents.Atoms.Toast.error({
                message: `😔 Please enter correct old password`,
              })
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
      <LibraryComponents.Molecules.ModalSessionAllowed
        {...modalSessionAllowed}
        onClick={(data: any, item: any, index: number) => {
          LoginStores.loginStore.LoginService.sessionAllowedLogout({
            id: item._id,
            userId: LoginStores.loginStore.login?.userId,
            accessToken: item.user.accessToken,
          }).then(async (res) => {
            if (res.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.message}`,
              })
              const firstArr = data.slice(0, index) || []
              const secondArr = data.slice(index + 1) || []
              const finalArray = [...firstArr, ...secondArr]
              setModalSessionAllowed({
                show: finalArray.length > 0 ? true : false,
                data: finalArray,
              })
              LoginStores.loginStore.updateLogin({
                ...LoginStores.loginStore.login,
                sessionAllowed: res.data.sessionAllowed,
                loginActivityList: finalArray,
              })
            }
          })
        }}
        onClose={() => {   
          setModalSessionAllowed({ show: false })
        }}
      />
    </>
  )
})

export default connect((store: any) => ({
  app: store.app,
}))(NavbarComponent)
