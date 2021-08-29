/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Col, Container, Row } from "reactstrap"
import * as Assets from "@lp/library/assets"
import * as Bootstrap from "react-bootstrap"
import moment from "moment"
import { useForm, Controller } from "react-hook-form"
import { FormHelper } from "@lp/helper"
import * as LibraryUtils from "@lp/library/utils"

import { useHistory } from "react-router-dom"

import { Stores } from "@lp/features/login/stores"
import { Stores as BannerStores } from "@lp/features/banner/stores"
import { stores } from "@lp/library/stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as UserStores } from "@lp/features/users/stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as RoleStores } from "@lp/features/collection/roles/stores"

export const Login = observer(() => {
  const history = useHistory()
  const [noticeBoard, setNoticeBoard] = useState<any>({})
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [labRoleList, setlabRoleList] = useState({ labList: [], roleList: [] })

  const [modalForgotPassword, setModalForgotPassword] = useState<any>()
  const [modalChangePassword, setModalChangePassword] = useState<any>()
  const [modalSessionAllowed, setModalSessionAllowed] = useState<any>()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    BannerStores.bannerStore.fetchListAllBanner()
  },[])

  useEffect(() => {
    stores.rootStore.isLogin().then((isLogin) => {
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

  const onLogin = async (data: any) => {
    const loginFailedCount = Stores.loginStore.loginFailedCount || 0
    if (loginFailedCount > 4) {
      Stores.loginStore.LoginService.accountStatusUpdate({
        userId: Stores.loginStore.inputLogin?.userId,
        status: "I",
      }).then((res) => {
        if (res.success) {
          LibraryComponents.Atoms.Toast.error({
            message: `😔 ${res.message}`,
          })
          Stores.loginStore.updateLoginFailedCount(0)
        }
      })
    } else {
      Stores.loginStore.LoginService.onLogin({
        login: Stores.loginStore.inputLogin,
        loginActivity: {
          device: width <= 768 ? "Mobile" : "Desktop",
        },
      })
        .then((res) => {
          console.log({ res })
          if (res.success == 1) {
            Stores.loginStore.updateLoginFailedCount(0)
            if (res.data.user.passChanged !== true) {
              setModalChangePassword({ show: true })
            } else {
              if (res.data.user.noticeBoard !== undefined) {
                setNoticeBoard({
                  show: true,
                  userInfo: res.data.user,
                  data: res.data.user.noticeBoard,
                })
              } else {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.message}`,
                })
                Stores.loginStore.saveLogin(res.data.user)
                Stores.loginStore.clearInputUser()
                setTimeout(() => {
                  history.push("/dashboard/default")
                }, 1000)
              }
            }
          } else if (res.success == 2) {
            setModalSessionAllowed({
              show: true,
              data: res.data.loginActivityListByUserId,
            })
          } else {
            Stores.loginStore.updateLoginFailedCount(loginFailedCount + 1)
            LibraryComponents.Atoms.Toast.error({
              message: `😔 ${res.message}`,
            })
          }
        })
        .catch((error) => {
          Stores.loginStore.updateLoginFailedCount(loginFailedCount + 1)
          LibraryComponents.Atoms.Toast.error({
            message: `😔 ${error.message}`,
          })
        })
    }
  }

  return (
    <>
      <Container fluid className="bg-gray-600">
        <Row className="h-screen items-center">
          <Col md="7">
            <div className="flex flex-col justify-center items-center">
              <img src={Assets.logo} className="w-20 h-15" alt="logo" />
              <div className="mt-2 mb-2">
                <Bootstrap.Carousel>
                  {BannerStores.bannerStore.listAllBanner.map((item, key) => (
                    <Bootstrap.Carousel.Item interval={5000} key={key}>
                      <img
                        key={key}
                        src={item.image}
                        className="img-thumbnail img-fluid"
                        alt={key.toString()}
                      />
                    </Bootstrap.Carousel.Item>
                  ))}
                </Bootstrap.Carousel>
              </div>
            </div>
          </Col>
          <Col md="5">
            <div className="flex mt-2 justify-center items-center">
              <label className="font-bold text-3xl text-white">Login</label>
            </div>
            <div className="bg-white  flex flex-col rounded-md">
              <div className="p-3">
                <LibraryComponents.Atoms.List
                  direction="col"
                  space={4}
                  justify="stretch"
                  fill
                >
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        label="User Id"
                        placeholder={
                          errors.userId ? "Please enter userId" : "UserId"
                        }
                        hasError={errors.userId}
                        value={Stores.loginStore.inputLogin?.userId}
                        onChange={(userId) => {
                          onChange(userId)
                          Stores.loginStore.updateInputUser({
                            ...Stores.loginStore.inputLogin,
                            userId,
                          })
                        }}
                        onBlur={(userId) => {
                          if (userId) {
                            UserStore.userStore.UsersService.checkExitsUserId(
                              userId.trim()
                            ).then((res) => {
                              if (res.success) {
                                const {
                                  data: { user },
                                } = res
                                setValue("lab", user.defaultLab)
                                clearErrors("lab")
                                if (user.role.length == 1)
                                  setValue("role", user.role[0].code)
                                clearErrors("role")
                                Stores.loginStore.updateInputUser({
                                  ...Stores.loginStore.inputLogin,
                                  lab: user.defaultLab,
                                  role:
                                    user.role.length == 1 ? user.role[0].code : "",
                                })
                                LabStores.labStore.fetchListLab()
                                RoleStores.roleStore.fetchListRole()
                                setlabRoleList({
                                  labList: user.lab,
                                  roleList: user.role,
                                })
                              } else {
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.message}`,
                                })
                              }
                            })
                          }
                        }}
                      />
                    )}
                    name="userId"
                    rules={{ required: true }}
                    defaultValue={Stores.loginStore.inputLogin?.userId}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        type="password"
                        label="Password"
                        placeholder={
                          errors.password ? "Please enter password" : "Password"
                        }
                        hasError={errors.password}
                        value={Stores.loginStore.inputLogin?.password}
                        onChange={(password) => {
                          onChange(password)
                          Stores.loginStore.updateInputUser({
                            ...Stores.loginStore.inputLogin,
                            password,
                          })
                        }}
                      />
                    )}
                    name="password"
                    rules={{ required: true, pattern: FormHelper.patterns.password }}
                    defaultValue={Stores.loginStore.inputLogin?.password}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Lab"
                        hasError={errors.lab}
                      >
                        <select
                          value={Stores.loginStore.inputLogin?.lab}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.lab ? "border-red-500" : "border-gray-300"
                          } rounded-md`}
                          onChange={(e) => {
                            const lab = e.target.value
                            onChange(lab)
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
                    )}
                    name="lab"
                    rules={{ required: true }}
                    defaultValue={Stores.loginStore.inputLogin?.lab}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Role"
                        hasError={errors.role}
                      >
                        <select
                          value={Stores.loginStore.inputLogin?.role}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.role ? "border-red-500" : "border-gray-300"
                          } rounded-md`}
                          onChange={(e) => {
                            const role = e.target.value
                            onChange(role)
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
                    )}
                    name="role"
                    rules={{ required: true }}
                    defaultValue={Stores.loginStore.inputLogin?.role}
                  />
                </LibraryComponents.Atoms.List>

                <br />
                <LibraryComponents.Atoms.List
                  direction="row"
                  space={3}
                  align="center"
                >
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="solid"
                    icon={LibraryComponents.Atoms.Icon.Check}
                    onClick={handleSubmit(onLogin)}
                  >
                    Login
                  </LibraryComponents.Atoms.Buttons.Button>
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="solid"
                    icon={LibraryComponents.Atoms.Icon.Remove}
                    onClick={() => {
                      window.location.reload()
                    }}
                  >
                    Clear
                  </LibraryComponents.Atoms.Buttons.Button>
                </LibraryComponents.Atoms.List>
              </div>
              <div className="flex p-4 flex-row items-center justify-around">
                <div className="flex mt-2 justify-center items-center">
                  <a
                    href="#"
                    onClick={() => setModalForgotPassword({ show: true })}
                    className="text-blue-700 mr-2"
                  >
                    {`Forgot Password`}
                  </a>
                  <a
                    onClick={() =>
                      LibraryComponents.Atoms.Toast.warning({
                        message: `
                        PASSWORD REQUIREMENTS: \n
                  Minimum 4 Total Characters
                  Maximum 8 Total Characters
                  Minimum 1 Special Character
                  Minimum 1 Number
                  Minimum 1 Upper case Character
                  Minimum 1 Lower case Character
                  Cannot user previous 4 password
                  Cannot use same password before specify number of days \n
                  `,
                        timer: 50000,
                      })
                    }
                  >
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#000"
                      size="22"
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconGr.GrTooltip
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </a>
                </div>
                <div>
                  <a href="privacy-policy" className="text-blue-700">
                    Privacy and Policy
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <FeatureComponents.Molecules.ModalNoticeBoard
          {...noticeBoard}
          click={async (action) => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            })
            if (action !== "login") {
              LibraryComponents.Atoms.Toast.warning({
                message: `😔 Please use diff lab`,
              })
              setTimeout(() => {
                window.location.reload()
              }, 3000)
            } else {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 Welcome ${noticeBoard.userInfo.fullName}`,
              })
              Stores.loginStore.saveLogin(noticeBoard.userInfo)
              Stores.loginStore.clearInputUser()
              setTimeout(() => {
                history.push("/dashboard/default")
              }, 1000)
            }
          }}
          onClose={() => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            })
          }}
        />
        <FeatureComponents.Molecules.ModalForgotPassword
          {...modalForgotPassword}
          onClick={(userInfo: any) => {
            Stores.loginStore.LoginService.forgotPassword(userInfo).then((res) => {
              if (res.success) {
                setModalForgotPassword({ show: false })
                Stores.loginStore.updateForgotPassword(undefined)
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.message}`,
                })
              } else {
                LibraryComponents.Atoms.Toast.error({
                  message: `😔 ${res.message}`,
                })
              }
            })
          }}
          onClose={() => {
            setModalForgotPassword({ show: false })
          }}
        />
        <LibraryComponents.Molecules.ModalChangePassword
          {...modalChangePassword}
          onClick={() => {
            const exipreDate = new Date(
              moment(new Date()).add(30, "days").format("YYYY-MM-DD HH:mm")
            )
            let body = Object.assign(
              Stores.loginStore.inputLogin,
              UserStores.userStore.changePassword
            )
            body = {
              ...body,
              exipreDate: LibraryUtils.moment(exipreDate).unix(),
            }
            UserStores.userStore.UsersService.changePassword(body).then((res) => {
              console.log({ res })
              if (res.status === 200) {
                Stores.loginStore.updateLogin({
                  ...Stores.loginStore.login,
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
                window.location.reload()
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
            Stores.loginStore.updateLogin({
              ...Stores.loginStore.login,
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
            Stores.loginStore.LoginService.sessionAllowedLogout({
              id: item._id,
              userId: Stores.loginStore.inputLogin?.userId,
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
              }
            })
          }}
          onClose={() => {}}
        />
      </Container>
    </>
  )
})

export default Login
