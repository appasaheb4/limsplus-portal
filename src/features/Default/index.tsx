/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import { observer } from "mobx-react"
import Contexts from "@lp/library/stores"
import * as Services from "@lp/features/users/services"
import * as LibraryComponents from "@lp/library/components"

import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as UserStores } from "@lp/features/users/stores"

import Appointments from "./Appointments"
import BarChart from "./BarChart"
import Calendar from "./Calendar"
import Feed from "./Feed"
import Header from "./Header"
import LineChart from "./LineChart"
import PieChart from "./PieChart"
import Projects from "./Projects"
import Statistics from "./Statistics"
import moment from "moment"
import { useHistory } from "react-router-dom"

import { Stores as LoginStore } from "@lp/features/login/stores"

const Default = observer(() => {
  const [changePassword, setChangePassword] = useState(false)
  const rootStore = React.useContext(Contexts.rootStore)
  const [modalConfirm, setModalConfirm] = useState<any>()
  const history = useHistory()

  useEffect(() => {
    const diffInDays = moment(LoginStores.loginStore.login?.exipreDate).diff(
      moment(new Date()),
      "days"
    )
    if (
      diffInDays >= 0 &&
      diffInDays <= 5 &&
      UserStores.userStore.changePassword?.tempHide !== true
    ) {
      UserStores.userStore.updateChangePassword({
        ...UserStores.userStore.changePassword,
        subTitle: `Please change you password. Your remaining exipre days ${diffInDays}`,
      })
      setChangePassword(true)
    }
    if (diffInDays < 0) {
      setModalConfirm({
        type: "accountexpire",
        show: true,
        title: "Your account expire.Please contact to admin. ",
      })
    }
    if (
      LoginStores.loginStore.login?.passChanged !== true &&
      UserStores.userStore.changePassword?.tempHide !== false
    )
      setChangePassword(true)
  }, [LoginStores.loginStore.login])

  return (
    <>
      <Container fluid className="p-0">
        <Header />
        <Statistics />
        <Row>
          <Col lg="8" className="d-flex">
            <LineChart />
          </Col>
          <Col lg="4" className="d-flex">
            <Feed />
          </Col>
        </Row>
        <Row>
          <Col lg="6" xl="4" className="d-flex">
            <Calendar />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <PieChart />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <Appointments />
          </Col>
        </Row>
        <Row>
          <Col lg="6" xl="8" className="d-flex">
            <Projects />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <BarChart />
          </Col>
        </Row>
        {changePassword && (
          <LibraryComponents.Modal.ModalChangePassword
            click={() => {
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
              Services.changePassword(body).then((res) => {
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
                  LibraryComponents.ToastsStore.success(`Password changed!`)
                  setChangePassword(false)
                } else if (res.status === 203) {
                  LibraryComponents.ToastsStore.error(res.data.data.message)
                } else {
                  LibraryComponents.ToastsStore.error(
                    `Please enter correct old password`
                  )
                }
              })
            }}
            close={() => {
              LoginStores.loginStore.updateLogin({
                ...LoginStores.loginStore.login,
                passChanged: true,
              })
              UserStores.userStore.updateChangePassword({
                ...UserStores.userStore.changePassword,
                tempHide: true,
              })
              setChangePassword(false)
              console.log("close")
            }}
          />
        )}
      </Container>
      <LibraryComponents.Atoms.ModalConfirm
        {...modalConfirm}
        click={(type) => {
          if (type === "accountexpire") {
            LoginStore.loginStore.LoginService.accountStatusUpdate({
              userId: LoginStore.loginStore.inputLogin?.userId,
              status: "Disable",
            }).then((res) => {
              rootStore.setProcessLoading(false)
              LibraryComponents.ToastsStore.error(
                "Your account is disable. Please contact admin"
              )
              LoginStores.loginStore
                .removeUser()
                .then((res) => {
                  if (res) {
                    history.push("/")
                  }
                })
                .catch(() => {
                  alert("Please try again")
                })
            })
          }
        }}
      />
    </>
  )
})

export default Default
