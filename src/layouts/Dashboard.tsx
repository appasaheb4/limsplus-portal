/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import Wrapper from "./components/Wrapper"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Settings from "./components/Settings"
import { useHistory } from "react-router-dom"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as RootStore } from "@lp/library/stores"

const Dashboard = observer(({ children }) => {
  const history: any = useHistory()

  useEffect(() => {
    setTimeout(() => {
      RootStore.rootStore.isLogin().then((isLogin) => {
        if (!isLogin) history.push("/")
      })
    }, 1000)
  }, [LoginStores.loginStore.login])

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
})

export default Dashboard
