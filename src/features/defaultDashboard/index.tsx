/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"

import BarChart from "./BarChart"
import Feed from "./Feed"
import Header from "./Header"
import LineChart from "./LineChart"
import Projects from "./Projects"
import Statistics from "./Statistics"
import moment from "moment"
import { useHistory } from "react-router-dom"

// registration

import { stores, useStores } from "@lp/stores"

const Default = observer(() => {
  const { userStore, loginStore } = useStores()
  const [modalChangePassword, setModalChangePassword] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const history = useHistory()

  useEffect(() => {
    if (loginStore.login) {
      const date1 = dayjs(loginStore.login.exipreDate)
      const date2 = dayjs(new Date())
      let days = date1.diff(date2, "day")
      //console.log({ days })

      if (days >= 0 && days <= 5 && userStore.changePassword?.tempHide !== true) {
        userStore.updateChangePassword({
          ...userStore.changePassword,
          subTitle: `Please change you password. Your remaining exipre days ${days}`,
        })
        setModalChangePassword({ show: true })
      }
      if (days < 0) {
        setModalConfirm({
          type: "accountexpire",
          show: true,
          title: "Your account expire.Please contact to admin. ",
        })
      }
    }
  }, [loginStore])

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
            let exipreDate = new Date(dayjs(new Date()).add(30, "days").format("YYYY-MM-DD"))
            userStore.UsersService.changePassword({
              input: {
                _id: loginStore.login._id,
                userId: loginStore.login.userId,
                oldPassword: userStore.changePassword.oldPassword,
                newPassword: userStore.changePassword.confirmPassword,
                exipreDate,
              },
            }).then((res) => {
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
              } else  {
                LibraryComponents.Atoms.Toast.error({
                  message: `😔 ${res.data.data.message}`,
                })
            }
          });
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
      </Container>
      <LibraryComponents.Atoms.ModalConfirm
        {...modalConfirm}
        click={(type) => {
          if (type === "accountexpire") {
            loginStore.LoginService.accountStatusUpdate({
              input: {
                userId: stores.loginStore.login.userId,
                status: "I",
              },
            }).then((res) => {
              if (res.userAccountStatusUpdate.success) {
                stores.loginStore
                  .removeUser()
                  .then((res) => {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.logout.message}`,
                    })
                    if (res.logout.success) {
                      history.push("/")
                    }
                  })
                  .catch(() => {
                    alert("Please try again")
                  })
              }
            })
          }
        }}
      />
    </>
  )
})

export default Default
