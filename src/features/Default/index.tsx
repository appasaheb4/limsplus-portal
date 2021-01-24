import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { observer } from "mobx-react";
import Contexts from "@lp/library/stores";
import * as Clients from "@lp/library/clients";
import * as Services from "@lp/features/users/services";
import * as LibraryComponents from "@lp/library/components";

import Appointments from "./Appointments";
import BarChart from "./BarChart";
import Calendar from "./Calendar";
import Feed from "./Feed";
import Header from "./Header";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Projects from "./Projects";
import Statistics from "./Statistics";

const Default = observer(() => {
  const [changePassword, setChangePassword] = useState(false);
  const rootStore = React.useContext(Contexts.rootStore);

  useEffect(() => {
    Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
      if (isLogin) {
        if (isLogin.changePass !== true) setChangePassword(true);
      }
    });
  }, []);
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
              Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
                Clients.storageClient.setItem("isLogin", {
                  ...isLogin,
                  changePass: true,
                });
                const body = Object.assign(
                  isLogin,
                  rootStore.userStore.changePassword
                );
                Services.changePassword(body).then((res) => {
                  if (res) {
                    LibraryComponents.ToastsStore.success(`Password changed!`);
                  } else {
                    LibraryComponents.ToastsStore.error(
                      `Please enter correct old password`
                    );
                  }
                });
              });
              setChangePassword(false);
            }}
            close={() => {
              Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
                Clients.storageClient.setItem("isLogin", {
                  ...isLogin,
                  changePass: true,
                });
              });
              setChangePassword(false);
              console.log("close");
            }}
          />
        )}
      </Container>
    </>
  );
});

export default Default;
