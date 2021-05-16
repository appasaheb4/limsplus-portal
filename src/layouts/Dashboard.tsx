/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import Wrapper from "./components/Wrapper"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Settings from "./components/Settings"
import { useHistory } from "react-router-dom"
import { useIdleTimer } from "react-idle-timer"

import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import { toJS } from "mobx"

import hydrateStore from "@lp/library/modules/startup"
import { RouterFlow } from "@lp/flows"

const Dashboard = observer(({ children }) => {
  const history: any = useHistory()
  const [modalIdleTime, setModalIdleTime] = useState<any>()
  const [isLogined, setIsLogined] = useState<boolean>(false)

  const router = async () => {
    let router: any = toJS(LoginStore.loginStore.login)
    if (router && !RootStore.routerStore.userRouter) {
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
    console.log({selectedCategory});
    
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
      RootStore.routerStore.updateSelectedComponents(selectedComp)
      RootStore.routerStore.updateUserPermission(permission)
    } else {
      history.push("/dashboard/default")
    }
  }

  useEffect(() => {
    // RootStore.rootStore.isLogin().then((isLogin) => {
    //   if (isLogin) {
    //     router()
    //     setTimeout(() => {
    //       permission()
    //     }, 1000)
    //   }
    // })
    router()
    setTimeout(() => {
      permission()
    }, 1000)
  }, [])

  // issue come realod then going default dashboard page so added dependancy
  useEffect(() => {
    setTimeout(() => {
      RootStore.rootStore.isLogin().then((isLogin) => {
        if (!isLogin && !isLogined) history.push("/")
      })
    }, 1000)
  }, [LoginStores.loginStore.login])

  // useEffect(() => {
  //   RootStore.rootStore.isLogin().then((isLogin) => {
  //     if (!isLogin) history.push("/")
  //   })
  // }, [])

  // idel time
  const handleOnIdle = (event) => {
    // console.log("user is idle", event)
    console.log("last active", getLastActiveTime())
    RootStore.rootStore.setProcessLoading(true)
    setIsLogined(true)
    LoginStores.loginStore
      .removeUser()
      .then(async (res) => {
        RootStore.rootStore.setProcessLoading(false)
        if (res) {
          setModalIdleTime({
            show: true,
            title: "Your Session timeout!",
            subTitle: "Please login again.",
          })
        }
      })
      .catch(() => {
        alert("Your session not timeout. Please try agian.")
      })
  }  

  // const handleOnActive = (event) => {
  //   console.log("user is active", event)
  //   console.log("time remaining", getRemainingTime())
  // }

  // const handleOnAction = (event) => {
  //   console.log("user did something", event)
  // }

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * (LoginStore.loginStore.login?.sessionTimeoutCount || 10),
    onIdle: handleOnIdle,
    // onActive: handleOnActive,
    // onAction: handleOnAction,
    debounce: 500,
  })

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
      <LibraryComponents.Molecules.ModalIdleTimeout
        {...modalIdleTime}
        onClick={() => {
          history.push("/")
        }}
      />
    </React.Fragment>
  )
})

export default Dashboard
