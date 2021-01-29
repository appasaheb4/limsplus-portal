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

const Default = observer(() => {
  const [changePassword, setChangePassword] = useState(false)
  const rootStore = React.useContext(Contexts.rootStore)

  useEffect(() => {
    if (rootStore.isLogin() !== true) setChangePassword(true)
  }, [rootStore])
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
              const body = Object.assign(
                rootStore.userStore.login,
                rootStore.userStore.changePassword
              )
              Services.changePassword(body).then((res) => {
                console.log({ res })
                if (res.status === 200) {
                  rootStore.userStore.updateLogin({
                    ...rootStore.userStore.login,
                    passChanged: true,
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
              rootStore.userStore.updateLogin({
                ...rootStore.userStore.login,
                passChanged: true,
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
