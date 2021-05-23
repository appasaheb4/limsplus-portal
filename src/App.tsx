import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import store from "./redux/store/index"
import Routes from "./routes/Routes"

// toast
import "react-toastify/dist/ReactToastify.css"

// import { configure } from "mobx"

import { Stores as RootStore } from "./library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"



import hydrateStore from "@lp/library/modules/startup"

// configure({
//   useProxies: "never",
// })

const App = observer(() => {
  const loader = async () => {
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
      <LibraryComponents.Atoms.ToastsContainer
        position={LibraryComponents.Atoms.ToastsContainerPosition.BOTTOM_RIGHT}
        store={LibraryComponents.Atoms.ToastsStore}
        className="h-20"
      />
      <LibraryComponents.Atoms.ToastContainer />
      {RootStore.rootStore.processLoading && <LibraryComponents.Atoms.ModelLoader />}
    </>
  )
})

export default App
