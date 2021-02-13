/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import { observer } from "mobx-react"
import Contexts from "@lp/library/stores"
import * as Services from "@lp/features/users/services"
import * as LibraryComponents from "@lp/library/components"

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

const Default = observer(() => {
  const [changePassword, setChangePassword] = useState(false)
  const rootStore = React.useContext(Contexts.rootStore)

  useEffect(() => {
    const diffInDays = moment(rootStore.loginStore.login?.exipreDate).diff(
      moment(new Date()),
      "days"
    )
    if (diffInDays <= 5 && rootStore.userStore.changePassword?.tempHide !== true) {
      rootStore.userStore.updateChangePassword({
        ...rootStore.userStore.changePassword,
        subTitle: `Please change you password. Your remaining exipre days ${diffInDays}`,
      })
      setChangePassword(true)
    }
    if (
      rootStore.loginStore.login?.passChanged !== true &&
      rootStore.userStore.changePassword?.tempHide !== false
    )
      setChangePassword(true)
  }, [rootStore.loginStore.login])

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
                rootStore.loginStore.login,
                rootStore.userStore.changePassword
              )
              body = {
                ...body,
                exipreDate,
              }
              Services.changePassword(body).then((res) => {
                console.log({ res })
                if (res.status === 200) {
                  rootStore.loginStore.updateLogin({
                    ...rootStore.loginStore.login,
                    exipreDate,
                    passChanged: true,
                  })
                  rootStore.userStore.updateChangePassword({
                    ...rootStore.userStore.changePassword,
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
              rootStore.loginStore.updateLogin({
                ...rootStore.loginStore.login,
                passChanged: true,
              })
              rootStore.userStore.updateChangePassword({
                ...rootStore.userStore.changePassword,
                tempHide: true,
              })
              setChangePassword(false)
              console.log("close")
            }}
          />
        )}
      </Container>
    </>
  )
})

export default Default
