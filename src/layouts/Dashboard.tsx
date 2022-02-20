/* eslint-disable */
import React, { useEffect, useState, useMemo } from "react"
import { observer } from "mobx-react"
import {ModalIdleTimeout} from "@/library/components"
import Wrapper from "./components/Wrapper"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Settings from "./components/Settings"
import { useHistory } from "react-router-dom"
import { useIdleTimer } from "react-idle-timer"

import { toJS } from "mobx"

import Storage from "@/library/modules/storage"

import { stores, useStores } from "@/stores"

import { RouterFlow } from "@/flows"

import * as Banner from "@/features/master/banner"
import * as Deginisation from "@/features/master/deginisation"
import * as Lab from "@/features/master/labs"
import * as Role from "@/features/settings/roles"
import * as Department from "@/features/master/department"
import * as User from "@/features/settings/users"
import * as RoleMappping from "@/features/settings/mapping/role"
import * as Environment from "@/features/settings/environment"
import * as Lookup from "@/features/master/lookup"
import * as MasterAnalyte from "@/features/master/masterAnalyte"
import * as TestMaster from "@/features/master/testMaster"
import * as PanelMaster from "@/features/master/masterPanel"
import * as SampleContainer from "@/features/master/sampleContainer"
import * as SampleType from "@/features/master/sampleType"
import * as TestSampleMapping from "@/features/master/testSampleMapping"
import * as TestAnalyteMapping from "@/features/master/testAnalyteMapping"
import * as TestPanelMapping from "@/features/master/testPanelMapping"
import * as PackageMaster from "@/features/master/masterPackage"
import * as Methods from "@/features/master/methods"
import * as Doctors from "@/features/master/doctors"
import * as RegistrationLocations from "@/features/master/registrationLocations"
import * as CorporateClients from "@/features/master/corporateClients"
import * as DeliverySchdule from "@/features/master/deliverySchedule"
import * as AdministrativeDivisions from "@/features/master/administrativeDivisions"
import * as SalesTeam from "@/features/master/salesTeam"
import * as Section from "@/features/master/section"
import * as PossibleResults from "@/features/master/possibleResults"
import * as Library from "@/features/master/library"
import * as PriceList from "@/features/master/priceList"
import * as ReferenceRanges from "@/features/master/referenceRanges"
import * as SegmentMapping from "@/features/communication/segmentMapping"

// communication
import * as InterfaceManager from "@/features/communication/interfaceManager"
import * as DataConveration from "@/features/communication/dataConversation"

// registration
import * as PatientRegistration from "@/features/registration"
const Dashboard = observer(({ children }) => {
  const { loginStore } = useStores()
  const history: any = useHistory()
  const [isLogined, setIsLogined] = useState<boolean>(false)
  const [modalIdleTime, setModalIdleTime] = useState<any>()

  const loadApi = async (pathname?: string) => {
    const currentLocation = window.location
    pathname = pathname || currentLocation.pathname
    //console.log({ beforeStore: pathname })
    //console.log({ pathname })
    if (pathname !== "/" && stores && loginStore.login) {
      //console.log({ loginafter: pathname })
      // common use api
      await Deginisation.startup()
      await Lab.startup()
      await Role.startup()
      await Department.startup()
      await User.startup()
      await Lookup.startup()
      // lookup item fetch
      RouterFlow.getLookupValues(pathname).then((items) => {
        stores.routerStore.updateLookupItems(items)
      })

      // specific api load
      if (pathname === "/collection/banner") await Banner.startup()
      if (
        pathname === "/collection/masterAnalyte" ||
        pathname === "/collection/testAnalyteMapping" ||
        pathname === "/collection/possibleResults" ||
        pathname === "/collection/referenceRanges"
      ){
        await MasterAnalyte.startup()
        await Methods.startup()
        await InterfaceManager.startup()
      }
      if (
        pathname === "/collection/testMaster" ||
        pathname === "/collection/testSampleMapping" ||
        pathname === "/collection/testAnalyteMapping" ||
        pathname === "/collection/testPanelMapping"
      ){
        await TestMaster.startup()
        await Methods.startup()
      }
      if (
        pathname === "/collection/masterPanel" ||
        pathname === "/collection/testPanelMapping" ||
        pathname === "/collection/masterPackage" ||
        pathname === "/collection/library" ||
        pathname === "/collection/priceList"
      ) {  
        await PanelMaster.startup()
        await Methods.startup()
      }

      if (
        pathname === "/collection/sampleContainer" ||
        pathname === "/collection/testSampleMapping"
      )
        await SampleContainer.startup()
      if (
        pathname === "/collection/sampleType" ||
        pathname === "/collection/testSampleMapping"
      )
        await SampleType.startup()
      if (pathname === "/collection/testSampleMapping") {
        await TestSampleMapping.startup()
        await Department.startup()
      }
      if (pathname === "/collection/testAnalyteMapping")
        await TestAnalyteMapping.startup()
      if (pathname === "/collection/testPanelMapping")
        await TestPanelMapping.startup()
      if (pathname === "/collection/masterPackage") await PackageMaster.startup()
      if (pathname === "/collection/methods") await Methods.startup()
      if (pathname === "/collection/doctors") {
        await Doctors.startup()
        await AdministrativeDivisions.startup()
      } 
      if (pathname === "/collection/registrationLocations")
        await RegistrationLocations.startup()
      if (
        pathname === "/collection/corporateClients" ||
        pathname === "/collection/registrationLocations" ||
        pathname === "/collection/priceList"
      )
        await CorporateClients.startup()
      if (
        pathname === "/collection/deliverySchedule" ||
        pathname === "/collection/testMaster" ||
        pathname === "/collection/masterPanel"
      )
        await DeliverySchdule.startup()
      if (
        pathname === "/collection/administrativeDivisions" ||
        pathname === "/collection/salesTeam" ||
        pathname === "/collection/lab"
      )
        await AdministrativeDivisions.startup()
      if (pathname === "/collection/salesTeam" || pathname === "/collection/lab")
        await SalesTeam.startup()
      if (pathname === "/collection/section") await Section.startup()
      if (pathname === "/collection/possibleResults") await PossibleResults.startup()
      if (pathname === "/collection/library") await Library.startup()
      if (pathname === "/collection/priceList") await PriceList.startup()
      if (pathname === "/collection/referenceRanges"){
        await ReferenceRanges.startup()
        await InterfaceManager.startup()
      }  
      if (pathname === "/settings/environment") await Environment.startup()
      if (pathname === "/settings/mapping/roleMapping") await RoleMappping.startup()
      if (pathname === "/communication/interfaceManager")
        await InterfaceManager.startup()
      if (pathname === "/communication/mapping/conversationMapping")
        await DataConveration.startup()
      if (pathname === "/communication/mapping/segmentMapping") {
        await InterfaceManager.startup()
        await SegmentMapping.startup()
      }
      // registration
      if (pathname === "/registration/patient") {
        await PatientRegistration.startup()
        await Doctors.startup()
        await AdministrativeDivisions.startup()
        await RegistrationLocations.startup()
        await CorporateClients.startup()
        await PanelMaster.startup()
      }
      stores
    }
    stores.appStore.updateLoadApi({ count: 1 })
  }

  const router = async () => {
    let router: any = toJS(loginStore.login)
    // console.log({router});
    if (router?.userId) {
      if (router && !stores.routerStore.userRouter) {
        router = JSON.parse(router.roleMapping.router[0])
        stores.routerStore.updateUserRouter(router)
      }
    } else {
      loginStore.removeLocalSession().then(() => {
        history.push("/")
      })
    }
  }
  const permission = async () => {
    let selectedCategory: any = await Storage.getItem(
      `__persist_mobx_stores_routerStore_SelectedCategory__`
    )
    if (selectedCategory !== null) {
      const permission = await RouterFlow.getPermission(
        toJS(stores.routerStore.userRouter),
        selectedCategory.category,
        selectedCategory.item
      )
      const selectedComp = await RouterFlow.selectedComponents(
        toJS(stores.routerStore.userRouter),
        selectedCategory.category,
        selectedCategory.item
      )
      stores.routerStore.updateSelectedComponents(selectedComp)
      stores.routerStore.updateUserPermission(permission)
    } else {
      history.push("/dashboard/default")
    }
  }

  useEffect(() => {
    // buz reload page after not showing delete and update so added settimout
    stores.rootStore.isLogin().then((isLogin) => {
      if (isLogin) {
        router()
        setTimeout(() => {
          permission()
        }, 1000)
      }
    })
  }, [])

  // issue come realod then going default dashboard page so added dependancy
  useEffect(() => {
    setTimeout(() => {
      stores.rootStore.isLogin().then((isLogin) => {
        if (!isLogin && !isLogined) history.push("/")
        else {
          let count = 0
          history.listen(async (location, action) => {
            loadApi()
            count = 1
          })
          count == 0 && loadApi()
        }
      })
    }, 1000)
  }, [loginStore.login])

  // idel time
  const handleOnIdle = (event) => {
    // console.log("user is idle", event)
    console.log("last active", getLastActiveTime())
    setIsLogined(true)
    loginStore
      .removeUser()
      .then(async (res) => {
        if (res.logout.success) {
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

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * (loginStore.login?.sessionTimeoutCount || 10),
    onIdle: handleOnIdle,
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
      <ModalIdleTimeout
        {...modalIdleTime}
        onClick={() => {
          history.push("/")
        }}
      />
    </React.Fragment>
  )
})

export default Dashboard
