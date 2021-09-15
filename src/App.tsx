import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"

import store from "./redux/store/index"
import Routes from "./routes/Routes"

// toast
import "react-toastify/dist/ReactToastify.css"

import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import hydrateStore from "@lp/library/modules/startup"
import {ApolloProvider,client} from '@lp/library/modules/apolloClient'


const App = observer(() => {
  const loader = async () => {
    await hydrateStore("loginStore", LoginStore.loginStore)
    await hydrateStore("routerStore", stores.routerStore)
    await hydrateStore("appStore", stores.appStore)
  }

  React.useEffect(() => {
    loader()
  }, [])

  return (
    <>
      <ApolloProvider client={client}>
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
        <LibraryComponents.Atoms.ToastContainer />
        {stores.loading && <LibraryComponents.Atoms.ModelLoader />}
      </ApolloProvider>
    </>
  )
})

export default App
