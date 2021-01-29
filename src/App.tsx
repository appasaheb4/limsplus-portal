import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import store from "./redux/store/index"
import Routes from "./routes/Routes"

const App = observer(() => {
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
      <LibraryComponents.ToastsContainer
        position={LibraryComponents.ToastsContainerPosition.BOTTOM_RIGHT}
        store={LibraryComponents.ToastsStore}
        className="h-20"
      />
    </>
  )
})

export default App
