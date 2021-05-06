import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import store from "./redux/store/index"
import Routes from "./routes/Routes"
   
// import { configure } from "mobx"

import { Stores as RootStore } from "./library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import * as Banner from "@lp/features/banner"
import * as Deginisation from "@lp/features/collection/deginisation"
import * as Lab from "@lp/features/collection/labs"
import * as Role from "@lp/features/collection/roles"
import * as Department from "@lp/features/collection/department"
import * as User from "@lp/features/users"
import * as RoleMappping from "@lp/features/settings/mapping/role"
import * as Communication from "@lp/features/communication"

import hydrateStore from "@lp/library/modules/startup"

// configure({
//   useProxies: "never",
// })

const App = observer(() => {
  const loader = async () => {
    await Banner.startup()
    await Deginisation.startup()
    await Lab.startup()
    await Role.startup()
    await Department.startup()
    await User.startup()
    await RoleMappping.startup()
    await Communication.startup()
    await hydrateStore("loginStore", LoginStore.loginStore)
    await hydrateStore("routerStore", RootStore.routerStore)
  }

  React.useEffect(() => {
    loader()
  }, [])
  return (
    <>
      <Provider store={store}>
        <Routes />
        <ReduxToastr
          timeOut={5000}
          newestOnTop={true}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </Provider>
      <label>test</label>
      <LibraryComponents.Atoms.ToastsContainer
        position={LibraryComponents.Atoms.ToastsContainerPosition.BOTTOM_RIGHT}
        store={LibraryComponents.Atoms.ToastsStore}
        className="h-20"
      />
      {RootStore.rootStore.processLoading && <LibraryComponents.Atoms.ModelLoader />}
    </>
  )
})

export default App
