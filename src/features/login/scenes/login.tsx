/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Col, Container, Row } from "reactstrap"
import * as Assets from "@lp/library/assets"
import * as Bootstrap from "react-bootstrap"
import * as Utils from "@lp/library/utils"
import * as Models from "../models"
import * as Features from "@lp/features"
import { useHistory } from "react-router-dom"
import { ModalNoticeBoard } from "../components"
import * as Services from "../services"

import { Stores } from "@lp/features/login/stores"
import { Stores as BannerStores } from "@lp/features/banner/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as UserStore } from "@lp/features/users/stores"

import hydrateStore from "@lp/library/modules/startup"

const Login = observer(() => {
  const history = useHistory()
  const [errors, setErrors] = useState<Models.ILogin>()
  const [noticeBoard, setNoticeBoard] = useState<any>({})
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [labRoleList, setlabRoleList] = useState({ labList: [], roleList: [] })

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    RootStore.rootStore.isLogin().then((isLogin) => {
      if (isLogin) {
        history.push("/dashboard/default")
      } else {
        history.push("/")
      }
    })
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [Stores.loginStore.login])

  return (
    <>
      <Container fluid className="bg-gray-600">
        <Row className="h-screen items-center">
          <Col md="7">
            <div className="flex flex-col justify-center items-center">
              <img src={Assets.logo} className="w-20 h-15" alt="logo" />
              <div className="mt-2 mb-2">
                <Bootstrap.Carousel>
                  {BannerStores.bannerStore.listBanner.map((item, key) => (
                    <Bootstrap.Carousel.Item interval={5000} key={key}>
                      <img
                        key={key}
                        src={item.image}
                        className="img-thumbnail img-fluid"
                        alt="First slide"
                      />
                    </Bootstrap.Carousel.Item>
                  ))}
                </Bootstrap.Carousel>
              </div>
            </div>
          </Col>
          <Col md="5">
            <div className="bg-white p-6 flex flex-col rounded-md">
              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.Input
                  label="User Id"
                  id="userId"
                  placeholder="User Id"
                  value={Stores.loginStore.inputLogin?.userId}
                  onChange={(userId) => {
                    setErrors({
                      ...errors,
                      userId: Utils.validate.single(
                        userId,
                        Utils.constraintsLogin.userId
                      ),
                    })
                    Stores.loginStore.updateInputUser({
                      ...Stores.loginStore.inputLogin,
                      userId,
                    })
                  }}
                  onBlur={(userId) => {
                    RootStore.rootStore.setProcessLoading(true)
                    UserStore.userStore.UsersService.checkExitsUserId(userId).then(
                      (res) => {
                        RootStore.rootStore.setProcessLoading(false)
                        if (res.length > 0) {
                          res = res[0]
                          setlabRoleList({ labList: res.lab, roleList: res.role })
                        } else {
                          LibraryComponents.Atoms.ToastsStore.error(
                            "User not found!"
                          )
                        }
                      }
                    )
                  }}
                />
                {errors?.userId && (
                  <span className="text-red-600 font-medium relative">
                    {errors.userId}
                  </span>
                )}
                <LibraryComponents.Atoms.Form.Input
                  type="password"
                  label="Password"
                  id="password"
                  placeholder="Password"
                  value={Stores.loginStore.inputLogin?.password}
                  onChange={(password) => {
                    setErrors({
                      ...errors,
                      password: Utils.validate.single(
                        password,
                        Utils.constraintsLogin.password
                      ),
                    })
                    Stores.loginStore.updateInputUser({
                      ...Stores.loginStore.inputLogin,
                      password,
                    })
                  }}
                />
                {errors?.password && (
                  <span className="text-red-600 font-medium relative">
                    {errors.password}
                  </span>
                )}

                <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="lab">
                  <select
                    name="lab"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                      setErrors({
                        ...errors,
                        lab: Utils.validate.single(lab, Utils.constraintsLogin.lab),
                      })
                      Stores.loginStore.updateInputUser({
                        ...Stores.loginStore.inputLogin,
                        lab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {labRoleList.labList.map((item: any) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                {errors?.lab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.lab}
                  </span>
                )}
                <LibraryComponents.Atoms.Form.InputWrapper label="Role" id="role">
                  <select
                    name="role"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const role = e.target.value
                      setErrors({
                        ...errors,
                        role: Utils.validate.single(
                          role,
                          Utils.constraintsLogin.role
                        ),
                      })
                      Stores.loginStore.updateInputUser({
                        ...Stores.loginStore.inputLogin,
                        role,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {labRoleList.roleList.map((item: any) => (
                      <option key={item.code} value={item.code}>
                        {item.description}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                {errors?.lab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.lab}
                  </span>
                )}
              </LibraryComponents.Atoms.List>
              <br />
              <LibraryComponents.Atoms.List direction="row" space={3} align="center">
                <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  type="solid"
                  icon={LibraryComponents.Atoms.Icons.Check}
                  onClick={async () => {
                    const loginFailedCount = Stores.loginStore.loginFailedCount || 0
                    if (
                      Utils.validate(
                        Stores.loginStore.inputLogin,
                        Utils.constraintsLogin
                      ) === undefined
                    ) {
                      RootStore.rootStore.setProcessLoading(true)
                      if (loginFailedCount > 4) {
                        Services.accountStatusUpdate({
                          userId: Stores.loginStore.inputLogin?.userId,
                          status: "Disable",
                        }).then((res) => {
                          RootStore.rootStore.setProcessLoading(false)
                          LibraryComponents.Atoms.ToastsStore.error(
                            "Your account is disable. Please contact admin"
                          )
                          Stores.loginStore.updateLoginFailedCount(0)
                        })
                      } else {
                        Services.onLogin({
                          login: Stores.loginStore.inputLogin,
                          loginActivity: {
                            device: width <= 768 ? "Mobile" : "Desktop",
                          },
                        })
                          .then((res) => {
                            console.log({ res })
                            RootStore.rootStore.setProcessLoading(false)
                            if (res.status === 200) {
                              Stores.loginStore.updateLoginFailedCount(0)
                              if (res.data.data.noticeBoard !== undefined) {
                                setNoticeBoard({
                                  show: true,
                                  userInfo: res.data.data,
                                  data: res.data.data.noticeBoard,
                                })
                              } else {
                                LibraryComponents.Atoms.ToastsStore.success(
                                  `Welcome ${res.data.data.fullName}`
                                )
                                Stores.loginStore.saveLogin(res.data.data)
                                history.push("/dashboard/default")
                              }
                            } else if (res.status === 203) {
                              console.log({ failed: loginFailedCount })
                              Stores.loginStore.updateLoginFailedCount(
                                loginFailedCount + 1
                              )
                              LibraryComponents.Atoms.ToastsStore.error(
                                res.data.data.message
                              )
                            }
                          })
                          .catch(() => {
                            console.log({ failed: loginFailedCount })
                            Stores.loginStore.updateLoginFailedCount(
                              loginFailedCount + 1
                            )
                            LibraryComponents.Atoms.ToastsStore.error(
                              "User not found. Please enter correct information!"
                            )
                          })
                      }
                    } else {
                      LibraryComponents.Atoms.ToastsStore.warning(
                        "Please enter all information!"
                      )
                    }
                  }}
                >
                  Login
                </LibraryComponents.Atoms.Buttons.Button>
                <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  type="outline"
                  icon={LibraryComponents.Atoms.Icons.Remove}
                  onClick={() => {
                    window.location.reload()
                  }}
                >
                  Clear
                </LibraryComponents.Atoms.Buttons.Button>
              </LibraryComponents.Atoms.List>
            </div>
          </Col>
        </Row>
        <ModalNoticeBoard
          {...noticeBoard}
          click={async (action) => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            })
            if (action !== "login") {
              LibraryComponents.Atoms.ToastsStore.warning(`Please use diff lab`)
              setTimeout(() => {
                window.location.reload()
              }, 3000)
            } else {
              LibraryComponents.Atoms.ToastsStore.success(
                `Welcome ${noticeBoard.userInfo.fullName}`
              )    
              Stores.loginStore.saveLogin(noticeBoard.userInfo)
              //await hydrateStore("loginStore", Stores.loginStore)
              history.push("/dashboard/default")
            }
          }}
          onClose={() => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            })
          }}
        />
      </Container>
    </>
  )
})

export default Login
