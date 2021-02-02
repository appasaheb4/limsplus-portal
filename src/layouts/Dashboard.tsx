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
import Contexts from "@lp/library/stores"

const Dashboard = observer(({ children }) => {
  const rootStore = React.useContext(Contexts.rootStore)
  const history: any = useHistory()

  // useEffect(() => {
  //   async function isLogin() {
  //     const isLogin = await rootStore.isLogin()
  //     if (!isLogin) {
  //       history.push("/")
  //     } else {
  //     }
  //   }
  //   isLogin()
  // }, [rootStore.userStore.login])

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
