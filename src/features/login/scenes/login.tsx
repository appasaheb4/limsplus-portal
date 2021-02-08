/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Col, Container, Row } from "reactstrap"
import * as Assets from "@lp/library/assets"
import * as Bootstrap from "react-bootstrap"
import Contexts from "@lp/library/stores"
import * as Utils from "@lp/library/utils"
import * as ModelsUser from "@lp/features/users/models"
import * as Features from "@lp/features"
import { useHistory } from "react-router-dom"
import { ModalNoticeBoard } from "../components"

const Login = observer(() => {
  const history = useHistory()
  const rootStore = React.useContext(Contexts.rootStore)
  const [errors, setErrors] = useState<ModelsUser.Login>()
  const [noticeBoard, setNoticeBoard] = useState<any>({})

  useEffect(() => {
    rootStore.isLogin().then((isLogin) => {
      if (isLogin) {
        history.push("/dashboard/default")
      } else {
        history.push("/")
      }
    })
  }, [rootStore.userStore.login?.fullName])

  return (
    <>
      <Container fluid className="bg-gray-600">
        <Row className="h-screen items-center">
          <Col md="7">
            <div className="flex flex-col justify-center items-center">
              <img src={Assets.logo} className="w-20 h-15" alt="logo" />
              <div className="mt-2 mb-2">
                <Bootstrap.Carousel>
                  {rootStore.bannerStore.listBanner.map((item, key) => (
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
              <h2 className="text-2xl text-white font-bold">Lims Plus</h2>
            </div>
          </Col>
          <Col md="5">
            <div className="bg-white p-6 flex flex-col rounded-md">
              <LibraryComponents.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Form.Input
                  label="User Id"
                  id="userId"
                  placeholder="User Id"
                  value={rootStore.userStore.inputLogin.userId}
                  onChange={(userId) => {
                    setErrors({
                      ...errors,
                      userId: Utils.validate.single(
                        userId,
                        Utils.constraintsLogin.userId
                      ),
                    })
                    rootStore.userStore.updateInputUser({
                      ...rootStore.userStore.inputLogin,
                      userId,
                    })
                  }}
                />
                {errors?.userId && (
                  <span className="text-red-600 font-medium relative">
                    {errors.userId}
                  </span>
                )}
                <LibraryComponents.Form.Input
                  type="password"
                  label="Password"
                  id="password"
                  placeholder="Password"
                  value={rootStore.userStore.inputLogin.password}
                  onChange={(password) => {
                    setErrors({
                      ...errors,
                      password: Utils.validate.single(
                        password,
                        Utils.constraintsLogin.password
                      ),
                    })
                    rootStore.userStore.updateInputUser({
                      ...rootStore.userStore.inputLogin,
                      password,
                    })
                  }}
                />
                {errors?.password && (
                  <span className="text-red-600 font-medium relative">
                    {errors.password}
                  </span>
                )}
                <LibraryComponents.Form.InputWrapper label="Lab" id="lab">
                  <select
                    name="lab"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                      setErrors({
                        ...errors,
                        lab: Utils.validate.single(lab, Utils.constraintsLogin.lab),
                      })
                      rootStore.userStore.updateInputUser({
                        ...rootStore.userStore.inputLogin,
                        lab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {rootStore.labStore.listLabs.map((item: any) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Form.InputWrapper>
                {errors?.lab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.lab}
                  </span>
                )}
                <LibraryComponents.Form.InputWrapper label="Role" id="role">
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
                      rootStore.userStore.updateInputUser({
                        ...rootStore.userStore.inputLogin,
                        role,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {rootStore.roleStore.listRole.map((item: any) => (
                      <option key={item.code} value={item.code}>
                        {item.description}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Form.InputWrapper>
                {errors?.lab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.lab}
                  </span>
                )}
              </LibraryComponents.List>
              <br />
              <LibraryComponents.List direction="row" space={3} align="center">
                <LibraryComponents.Button
                  size="medium"
                  type="solid"
                  icon={LibraryComponents.Icons.Check}
                  onClick={() => {
                    if (
                      Utils.validate(
                        rootStore.userStore.inputLogin,
                        Utils.constraintsLogin
                      ) === undefined
                    ) {
                      rootStore.setProcessLoading(true)
                      Features.Users.Pipes.onLogin(rootStore.userStore.inputLogin)
                        .then((res) => {
                          console.log({ res })
                          rootStore.setProcessLoading(false)
                          if (res.status === 200) {
                            if (res.data.data.noticeBoard !== undefined) {
                              setNoticeBoard({
                                show: true,
                                userInfo: res.data.data,
                                data: res.data.data.noticeBoard,
                              })
                            } else {
                              LibraryComponents.ToastsStore.success(
                                `Welcome ${res.data.data.fullName}`
                              )
                              rootStore.userStore.updateLogin(res.data.data)
                              rootStore.userStore.clearInputLogin()
                              history.push("/dashboard/default")
                            }
                          } else if (res.status === 203) {
                            LibraryComponents.ToastsStore.error(
                              "User not found. Please enter correct information!"
                            )
                          }
                        })
                        .catch(() => {
                          LibraryComponents.ToastsStore.error(
                            "User not found. Please enter correct information!"
                          )
                        })
                    } else {
                      LibraryComponents.ToastsStore.warning(
                        "Please enter all information!"
                      )
                    }
                  }}
                >
                  Login
                </LibraryComponents.Button>
                <LibraryComponents.Button
                  size="medium"
                  type="outline"
                  icon={LibraryComponents.Icons.Remove}
                  onClick={() => {
                    rootStore.userStore.clearLogin()
                  }}
                >
                  Clear
                </LibraryComponents.Button>
              </LibraryComponents.List>
            </div>
          </Col>
        </Row>
        <ModalNoticeBoard
          {...noticeBoard}
          click={(action) => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            })
            if (action !== "login") {
              rootStore.userStore.clearInputLogin()
              LibraryComponents.ToastsStore.warning(`Please use diff lab`)
            } else {
              LibraryComponents.ToastsStore.success(
                `Welcome ${noticeBoard.userInfo.fullName}`
              )
              rootStore.userStore.updateLogin(noticeBoard.userInfo)
              rootStore.userStore.clearInputLogin()
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
