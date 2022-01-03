/* eslint-disable */
import React, { useEffect, useState, useMemo } from "react"
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

import { toJS } from "mobx"

import Storage from "@lp/library/modules/storage"

import { stores, useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

import * as Banner from "@lp/features/collection/banner"
import * as Deginisation from "@lp/features/collection/deginisation"
import * as Lab from "@lp/features/collection/labs"
import * as Role from "@lp/features/settings/roles"
import * as Department from "@lp/features/collection/department"
import * as User from "@lp/features/settings/users"
import * as RoleMappping from "@lp/features/settings/mapping/role"
import * as Environment from "@lp/features/settings/environment"
import * as Lookup from "@lp/features/collection/lookup"
import * as MasterAnalyte from "@lp/features/collection/masterAnalyte"
import * as TestMaster from "@lp/features/collection/testMaster"
import * as PanelMaster from "@lp/features/collection/masterPanel"
import * as SampleContainer from "@lp/features/collection/sampleContainer"
import * as SampleType from "@lp/features/collection/sampleType"
import * as TestSampleMapping from "@lp/features/collection/testSampleMapping"
import * as TestAnalyteMapping from "@lp/features/collection/testAnalyteMapping"
import * as TestPanelMapping from "@lp/features/collection/testPanelMapping"
import * as PackageMaster from "@lp/features/collection/masterPackage"
import * as Methods from "@lp/features/collection/methods"
import * as Doctors from "@lp/features/collection/doctors"
import * as RegistrationLocations from "@lp/features/collection/registrationLocations"
import * as CorporateClients from "@lp/features/collection/corporateClients"
import * as DeliverySchdule from "@lp/features/collection/deliverySchedule"
import * as AdministrativeDivisions from "@lp/features/collection/administrativeDivisions"
import * as SalesTeam from "@lp/features/collection/salesTeam"
import * as Section from "@lp/features/collection/section"
import * as PossibleResults from "@lp/features/collection/possibleResults"
import * as Library from "@lp/features/collection/library"
import * as PriceList from "@lp/features/collection/priceList"
import * as ReferenceRanges from "@lp/features/collection/referenceRanges"
import * as SegmentMapping from "@lp/features/communication/segmentMapping"

// communication
import * as InterfaceManager from "@lp/features/communication/interfaceManager"
import * as DataConveration from "@lp/features/communication/dataConversation"

// registration
import * as PatientRegistration from "@lp/features/registration"
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
      )
        await MasterAnalyte.startup()
      if (
        pathname === "/collection/testMaster" ||
        pathname === "/collection/testSampleMapping" ||
        pathname === "/collection/testAnalyteMapping" ||
        pathname === "/collection/testPanelMapping"
      )
        await TestMaster.startup()
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
      if (pathname === "/collection/doctors") await Doctors.startup()
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
      if (pathname === "/collection/referenceRanges") await ReferenceRanges.startup()

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
