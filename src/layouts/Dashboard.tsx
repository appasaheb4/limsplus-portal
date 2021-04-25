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

import { Stores as LoginStore } from "@lp/features/login/stores"

import { toJS } from "mobx"

import hydrateStore from "@lp/library/modules/startup"
import { RouterFlow } from "@lp/flows"

const Dashboard = observer(({ children }) => {
  const history: any = useHistory()

  const router = async () => {
    let router: any = toJS(LoginStore.loginStore.login)
    if (router) {
      router = JSON.parse(router.roleMapping.router[0])
      //await hydrateStore("loginStore", LoginStore.loginStore)
      //await hydrateStore("routerStore", RootStore.routerStore)
      RootStore.routerStore.updateUserRouter(router)
    }
  }
  const permission = async () => {
    let selectedCategory: any = await localStorage.getItem(
      `__persist_mobx_stores_routerStore_SelectedCategory__`
    )
    selectedCategory = JSON.parse(selectedCategory)
    if (selectedCategory !== null) {
      const permission = await RouterFlow.getPermission(
        toJS(RootStore.routerStore.userRouter),
        selectedCategory.category,
        selectedCategory.item
      )
      const selectedComp = await RouterFlow.selectedComponents(
        toJS(RootStore.routerStore.userRouter),
        selectedCategory.category,
        selectedCategory.item
      )  
      console.log({ selectedComp })

      RootStore.routerStore.updateSelectedComponents(selectedComp)
      RootStore.routerStore.updateUserPermission(permission)
    } else {
      history.push("/dashboard/default")
    }
  }

  useEffect(() => {
    router()
    setTimeout(() => {
      permission()
    }, 1000)
  }, [])

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
