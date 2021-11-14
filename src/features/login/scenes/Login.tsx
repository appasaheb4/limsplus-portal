/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Col, Container, Row } from "reactstrap"
import * as Assets from "@lp/library/assets"
import * as Bootstrap from "react-bootstrap"
import dayjs from "dayjs"
import { useForm, Controller } from "react-hook-form"
import { FormHelper } from "@lp/helper"
import * as LibraryUtils from "@lp/library/utils"

import { useHistory } from "react-router-dom"

import { Stores as BannerStores } from "@lp/features/collection/banner/stores"
import { useStores } from "@lp/stores"

export const Login = observer(() => {
  const { userStore, loginStore, rootStore, labStore, roleStore } = useStores()
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
  }, [])

  useEffect(() => {
    rootStore.isLogin().then((isLogin) => {
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
  }, [loginStore.login])

  const onLogin = async (data: any) => {
    const loginFailedCount = loginStore.loginFailedCount || 0
    if (loginFailedCount > 4) {
      loginStore.LoginService.accountStatusUpdate({
        input: {
          userId: loginStore.inputLogin?.userId,
          status: "I",
        },
      }).then((res) => {
        if (res.userAccountStatusUpdate.success) {
          LibraryComponents.Atoms.Toast.error({
            message: `😔 ${res.userAccountStatusUpdate.message}`,
          })
          loginStore.updateLoginFailedCount(0)
        }
      })
    } else {
      loginStore.LoginService.onLogin({
        input: {
          user: loginStore.inputLogin,
          loginActivity: {
            device: width <= 768 ? "Mobile" : "Desktop",
          },
        },
      })
        .then((res) => {
          if (res.login.success == 1) {
            loginStore.updateLoginFailedCount(0)
            console.log({ res })
            if (!res.login.data.user.passChanged) {
              setModalChangePassword({ show: true })
            } else {
              if (res.login.data.user.noticeBoard !== undefined) {
                setNoticeBoard({
                  show: true,
                  userInfo: res.login.data.user,
                  data: res.login.data.user.noticeBoard,
                })
              } else {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.login.message}`,
                })
                loginStore.saveLogin(res.login.data.user)
                loginStore.clearInputUser()
                setTimeout(() => {
                  history.push("/dashboard/default")
                }, 1000)
              }
            }
          } else if (res.login.success == 2) {
            setModalSessionAllowed({
              show: true,
              data: res.login.data.loginActivityListByUserId,
            })
          } else {
            loginStore.updateLoginFailedCount(loginFailedCount + 1)
            LibraryComponents.Atoms.Toast.error({
              message: `😔 ${res.login.message}`,
            })
          }
        })
        .catch((error) => {
          loginStore.updateLoginFailedCount(loginFailedCount + 1)
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
                        value={loginStore.inputLogin?.userId}
                        onChange={(userId) => {
                          onChange(userId)
                          loginStore.updateInputUser({
                            ...loginStore.inputLogin,
                            userId: userId.toUpperCase(),
                          })
                        }}
                        onBlur={(userId) => {
                          if (userId) {
                            userStore.UsersService.checkExitsUserId(
                              userId.trim()
                            ).then((res) => {
                              if (res.checkUserExitsUserId.success) {
                                const {
                                  data: { user },
                                } = res.checkUserExitsUserId
                                setValue("lab", user.defaultLab)
                                clearErrors("lab")
                                if (user.role.length == 1)
                                  setValue("role", user.role[0].code)
                                clearErrors("role")
                                loginStore.updateInputUser({
                                  ...loginStore.inputLogin,
                                  lab: user.defaultLab,
                                  role:
                                    user.role.length == 1 ? user.role[0].code : "",
                                })
                                labStore.fetchListLab()
                                roleStore.fetchListRole()
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
                    defaultValue={loginStore.inputLogin?.userId}
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
                        value={loginStore.inputLogin?.password}
                        onChange={(password) => {
                          onChange(password)
                          loginStore.updateInputUser({
                            ...loginStore.inputLogin,
                            password,
                          })
                        }}
                      />
                    )}
                    name="password"
                    rules={{ required: true, pattern: FormHelper.patterns.password }}
                    defaultValue={loginStore.inputLogin?.password}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Lab"
                        hasError={errors.lab}
                      >
                        <select
                          value={loginStore.inputLogin?.lab}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.lab ? "border-red-500" : "border-gray-300"
                          } rounded-md`}
                          onChange={(e) => {
                            const lab = e.target.value
                            onChange(lab)
                            loginStore.updateInputUser({
                              ...loginStore.inputLogin,
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
                    defaultValue={loginStore.inputLogin?.lab}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Role"
                        hasError={errors.role}
                      >
                        <select
                          value={loginStore.inputLogin?.role}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.role ? "border-red-500" : "border-gray-300"
                          } rounded-md`}
                          onChange={(e) => {
                            const role = e.target.value
                            onChange(role)
                            loginStore.updateInputUser({
                              ...loginStore.inputLogin,
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
                    defaultValue={loginStore.inputLogin?.role}
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
              loginStore.saveLogin(noticeBoard.userInfo)
              loginStore.clearInputUser()
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
            loginStore.LoginService.forgotPassword({ input: { ...userInfo } }).then(
              (res) => {
                if (res.userForgotPassword.success) {
                  setModalForgotPassword({ show: false })
                  loginStore.updateForgotPassword(undefined)
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.userForgotPassword.message}`,
                  })
                } else {
                  LibraryComponents.Atoms.Toast.error({
                    message: `😔 ${res.userForgotPassword.message}`,
                  })
                }
              }
            )
          }}
          onClose={() => {
            setModalForgotPassword({ show: false })
          }}
        />
        <LibraryComponents.Molecules.ModalChangePassword
          {...modalChangePassword}
          onClick={() => {
            const exipreDate = new Date(
              dayjs(new Date()).add(30, "days").format("YYYY-MM-DD")
            )
            let body = Object.assign(loginStore.inputLogin, userStore.changePassword)
            body = {
              ...body,
              exipreDate,
            }
            userStore.UsersService.changePassword({ input: { ...body } }).then(
              (res) => {
                if (res.userChnagePassword.success) {
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
                    message: `😊 ${res.userChnagePassword.message}`,
                  })
                  setModalChangePassword({ show: false })
                } else {
                  LibraryComponents.Atoms.Toast.error({
                    message: `😔 ${res.userChnagePassword.message}`,
                  })
                }
              }
            )
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
                userId: loginStore.inputLogin?.userId,
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
