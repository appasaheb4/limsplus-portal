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

import * as Utils from "../utils"
import * as Models from "../models"
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
  //const [errors, setErrors] = useState<Models.Login>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
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
  } = useForm()

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    BannerStores.bannerStore.fetchListBanner()
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
        status: "Disable",
      }).then((res) => {
        LibraryComponents.Atoms.Toast.error({
          message: `😔 Your account is disable. Please contact admin`,
        })
        Stores.loginStore.updateLoginFailedCount(0)
      })
    } else {
      Stores.loginStore.LoginService.onLogin({
        login: Stores.loginStore.inputLogin,
        loginActivity: {
          device: width <= 768 ? "Mobile" : "Desktop",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            Stores.loginStore.updateLoginFailedCount(0)
            if (res.data.data.passChanged !== true) {
              setModalChangePassword({ show: true })
            } else {
              if (res.data.data.noticeBoard !== undefined) {
                setNoticeBoard({
                  show: true,
                  userInfo: res.data.data,
                  data: res.data.data.noticeBoard,
                })
              } else {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 Welcome ${res.data.data.fullName}`,
                })
                Stores.loginStore.saveLogin(res.data.data)
                Stores.loginStore.clearInputUser()
                setTimeout(() => {
                  history.push("/dashboard/default")
                }, 1000)
              }
            }
          } else if (res.status === 203) {
            Stores.loginStore.updateLoginFailedCount(loginFailedCount + 1)
            LibraryComponents.Atoms.Toast.error({
              message: `😔 ${res.data.data.message}`,
            })
            if (
              res.data.data.message ===
                "Your session allowed all used.Please logout other session" &&
              res.data.data.loginActivityActiveUserByUserId
            ) {
              setModalSessionAllowed({
                show: true,
                data: res.data.data.loginActivityActiveUserByUserId,
              })
            }
          }
        })
        .catch(() => {
          console.log({ failed: loginFailedCount })
          Stores.loginStore.updateLoginFailedCount(loginFailedCount + 1)
          LibraryComponents.Atoms.Toast.error({
            message: `😔 User not found. Please enter correct information!`,
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
                  {BannerStores.bannerStore.listBanner.map((item, key) => (
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
                                if(user.role.length == 1)  setValue("role", user.role[0].code)
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
                                  message: `😔 User not found!`,
                                })
                              }
                            })
                          }
                        }}
                      />
                    )}
                    name="userId"
                    rules={{ required: true }}
                    defaultValue=""
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
                    rules={{ required: true }}
                    defaultValue=""
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
                          className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                            errors.lab ? "border-red-500" : "border-gray-200"
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
                          className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                            errors.role ? "border-red-500" : "border-gray-200"
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
                <div className="mt-4">
                  {errorsMsg &&
                    Object.entries(errorsMsg).map((item, index) => (
                      <h6 className="text-red-700" key={index}>
                        {_.upperFirst(item.join(" : "))}
                      </h6>
                    ))}
                </div>
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
            Stores.loginStore.LoginService.forgotPassword(userInfo).then(
              (res: any) => {
                if (res.status == 200) {
                  setModalForgotPassword({ show: false })
                  Stores.loginStore.updateForgotPassword(undefined)
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 res.data.data`,
                  })
                } else {
                  LibraryComponents.Atoms.Toast.error({
                    message: `😔 ${res.data.data}`,
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
              moment(new Date()).add(30, "days").format("YYYY-MM-DD HH:mm")
            )
            let body = Object.assign(
              Stores.loginStore.inputLogin,
              UserStores.userStore.changePassword
            )
            body = {
              ...body,
              exipreDate,
            }
            UserStores.userStore.UsersService.changePassword(body).then((res) => {
              console.log({ res })
              if (res.status === 200) {
                Stores.loginStore.updateLogin({
                  ...Stores.loginStore.login,
                  exipreDate,
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
              const firstArr = data.slice(0, index) || []
              const secondArr = data.slice(index + 1) || []
              const finalArray = [...firstArr, ...secondArr]
              setModalSessionAllowed({
                show: finalArray.length > 0 ? true : false,
                data: finalArray,
              })
            })
          }}
          onClose={() => {}}
        />
      </Container>
    </>
  )
})

export default Login
