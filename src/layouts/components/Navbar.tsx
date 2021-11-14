/* eslint-disable */
import React, { useState } from "react"
import { connect } from "react-redux"
import { observer } from "mobx-react"
import dayjs from "dayjs"

import { toggleSidebar } from "../../redux/actions/sidebarActions"
import { useHistory } from "react-router-dom"
import { stores, useStores } from "@lp/stores"

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
  const { userStore, loginStore } = useStores()
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
          {loginStore.login?.shortcutMenu &&
            loginStore.login?.shortcutMenu[loginStore.login.role || ""] &&
            loginStore.login?.shortcutMenu[loginStore.login.role || ""].map(
              (item) => (
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
              )
            )}
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
                // userStore.UsersService.loginActivityList({
                //   input: {
                //     userId: loginStore.login.userId,
                //     loginActivityId: loginStore.login.loginActivityId,
                //   },
                // }).then((res) => {
                //   if (!res.success) alert(res.message)
                //   else {
                //     loginStore.updateLogin({
                //       ...loginStore.login,
                //       loginActivityList: res.data.loginActivityList,
                //       sessionAllowed: res.data.sessionAllowed,
                //     })

                //   }
                // })
                if (loginStore.login.loginActivityList.length > 0) {
                  setModalSessionAllowed({
                    show: true,
                    data: loginStore.login.loginActivityList,
                  })
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: `😊 Single system login.`,
                  })
                }
              }}
            >
              <label className="inline w-8 text-center" style={{ width: "40px" }}>
                {loginStore.login?.sessionAllowed}
              </label>
            </LibraryComponents.Atoms.Buttons.Button>
            <UncontrolledDropdown nav inNavbar>
              <span className="d-none d-sm-inline-block">
                <DropdownToggle nav>
                  <div className="flex items-center">
                    <img
                      className="rounded-circle mr-3"
                      src={loginStore.login?.picture || Assets.defaultAvatar}
                      alt={loginStore.login?.fullName}
                      width="40"
                      height="40"
                    />
                    <span className="text-dark">{loginStore.login?.fullName}</span>
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
                    loginStore
                      .removeUser()
                      .then((res) => {
                        if (res.logout.success) {
                          LibraryComponents.Atoms.Toast.success({
                            message: `😊 ${res.logout.message}`,
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
            dayjs(new Date()).add(30, "days").format("YYYY-MM-DD HH:mm")
          )
          let body = Object.assign(loginStore.login, userStore.changePassword)
          body = {
            ...body,
            exipreDate,
          }
          userStore.UsersService.changePassword(body).then((res) => {
            console.log({ res })
            if (res.status === 200) {
              loginStore.updateLogin({
                ...loginStore.login,
                exipreDate,
                passChanged: true,
              })
              userStore.updateChangePassword({
                ...userStore.changePassword,
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
          loginStore.updateLogin({
            ...loginStore.login,
            passChanged: true,
          })
          userStore.updateChangePassword({
            ...userStore.changePassword,
            tempHide: true,
          })
          setModalChangePassword({ show: false })
        }}
      />
      <LibraryComponents.Molecules.ModalSessionAllowed
        {...modalSessionAllowed}
        onClick={(data: any, item: any, index: number) => {
          loginStore.LoginService.sessionAllowedLogout({
            input: {
              _id: item._id,
              userId: loginStore.login?.userId,
              accessToken: item.user.accessToken,
            },
          }).then(async (res) => {
            if (res.usersSessionAllowedLogout.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.usersSessionAllowedLogout.message}`,
              })
              const firstArr = data.slice(0, index) || []
              const secondArr = data.slice(index + 1) || []
              const finalArray = [...firstArr, ...secondArr]
              setModalSessionAllowed({
                show: finalArray.length > 0 ? true : false,
                data: finalArray,
              })
              loginStore.updateLogin({
                ...loginStore.login,
                sessionAllowed: res.usersSessionAllowedLogout.data.sessionAllowed,
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
