/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"

import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as UserStores } from "@lp/features/users/stores"

import BarChart from "./BarChart"
import Feed from "./Feed"
import Header from "./Header"
import LineChart from "./LineChart"
import Projects from "./Projects"
import Statistics from "./Statistics"
import moment from "moment"
import { useHistory } from "react-router-dom"

// registration

import { Stores as LoginStore } from "@lp/features/login/stores"

const Default = observer(() => {
  const [modalChangePassword, setModalChangePassword] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const history = useHistory()

  useEffect(() => {
    if (LoginStores.loginStore.login) {
      const date1 = LoginStores.loginStore.login?.exipreDate
      const date2 = dayjs(new Date()).unix()
      console.log({ date1,date2 })    
      const diff = 6; //date1.diff(dayjs(new Date()).unix(), "day")
      console.log({ diff })
      //console.log({diffInDays});   
      if (
        diff >= 0 &&
        diff <= 5 &&
        UserStores.userStore.changePassword?.tempHide !== true
      ) {
        UserStores.userStore.updateChangePassword({
          ...UserStores.userStore.changePassword,
          subTitle: `Please change you password. Your remaining exipre days ${diff}`,
        })
        setModalChangePassword({ show: true })
      }
      if (diff < 0) {
        setModalConfirm({
          type: "accountexpire",
          show: true,
          title: "Your account expire.Please contact to admin. ",
        })
      }
    }
  }, [LoginStores.loginStore])

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
          <Col lg="6" xl="8" className="d-flex">
            <Projects />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <BarChart />
          </Col>
        </Row>

        <LibraryComponents.Molecules.ModalChangePassword
          {...modalChangePassword}
          onClick={() => {
            const exipreDate = new Date(
              moment(new Date()).add(30, "days").format("YYYY-MM-DD HH:mm")
            )
            let body: any = Object.assign(
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
      </Container>
      <LibraryComponents.Atoms.ModalConfirm
        {...modalConfirm}
        click={(type) => {
          if (type === "accountexpire") {
            LoginStore.loginStore.LoginService.accountStatusUpdate({
              userId: LoginStore.loginStore.inputLogin?.userId,
              status: "Disable",
            }).then((res) => {
              LibraryComponents.Atoms.Toast.error({
                message: `😔 Your account is disable. Please contact admin`,
              })
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
