import React, { useEffect } from "react"

import Wrapper from "./components/Wrapper"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Settings from "./components/Settings"
import * as Clients from "@lp/library/clients"
import { useHistory } from "react-router-dom"

const Dashboard = ({ children }) => {
  const history: any = useHistory()
  useEffect(() => {
    async function fetchData() {
      await Clients.storageClient
        .getItem("isLogin")
        .then((isLogin) => {
          if (!isLogin) {
            history.push("/")
          }
        })
        .catch(() => {
          history.push("/")
        })
    }
    fetchData()
  }, [history])
  return (
    <React.Fragment>
      <Wrapper>
        <Sidebar />
        <Main className={null}>
          <Navbar />
          <Content>{children}</Content>
          <Footer />
        </Main>
      </Wrapper>
      <Settings />
    </React.Fragment>
  )
}

export default Dashboard
