import React, { useState } from "react"
import { observer } from "mobx-react"
import * as Clients from "@lp/library/clients"
import * as LibraryComponents from "@lp/library/components"
import * as Services from "@lp/features/users/services"
import Contexts from "@lp/library/stores"
import { useHistory } from "react-router-dom"

const ChangePassword = observer(() => {
  const history = useHistory()
  const rootStore = React.useContext(Contexts.rootStore)
  const [changePassword, setChangePassword] = useState(true)
  
  // useEffect(() => {
  //   Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
  //     if (isLogin) {
  //       if (isLogin.changePass !== true) setChangePassword(true);
  //     }
  //   });
  // }, []);
  
  return (
    <>
      <div className="max-w-xl mx-auto  py-20  flex-wrap p-4  bg-gray-100 ">
        {changePassword && (
          <LibraryComponents.Modal.ModalChangePassword
            click={() => {
              Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
                Clients.storageClient.setItem("isLogin", {
                  ...isLogin,
                  changePass: true,
                })  
                const body = Object.assign(
                  isLogin,
                  rootStore.userStore.changePassword
                )
                Services.changePassword(body).then((res) => {
                  if (res) {
                    LibraryComponents.ToastsStore.success(`Password changed!`)
                    history.push("/dashboard/default")
                    setChangePassword(false)
                  } else {
                    LibraryComponents.ToastsStore.error(
                      `Please enter correct old password`
                    )
                  }
                })
              })
            }}
            close={() => {
              Clients.storageClient.getItem("isLogin").then((isLogin: any) => {
                Clients.storageClient.setItem("isLogin", {
                  ...isLogin,
                  changePass: true,
                })
              })
              history.push("/dashboard/default")
              setChangePassword(false)
            }}
          />
        )}
      </div>
    </>
  )
})

export default ChangePassword
