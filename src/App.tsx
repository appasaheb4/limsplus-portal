import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import store from "./redux/store/index"
import Routes from "./routes/Routes"
import Contexts from "@lp/library/stores"

import * as Banner from '@lp/features/banner';
import * as Deginisation from "@lp/features/collection/deginisation"
import * as Lab from '@lp/features/collection/labs'
import * as Role from '@lp/features/collection/roles'
import * as Department from "@lp/features/collection/department"
import * as User from "@lp/features/users"

const App = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore)

  
  const loader = async () => {
    await Banner.startup();
    await Deginisation.startup();
    await Lab.startup();
    await Role.startup();
    await Department.startup();
    await User.startup();
  };
  
  React.useEffect(() => {
    loader();
  }, []);
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
      {rootStore.processLoading && <LibraryComponents.Modal.Loader />}
    </>
  )
})

export default App
