import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as Services from "@lp/features/users/services"
import { useHistory } from "react-router-dom"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as UserStores } from "@lp/features/users/stores"
import { Stores as RootStore } from "@lp/library/stores"
 
const ChangePassword = observer(() => {
  const history = useHistory()
  const [changePassword, setChangePassword] = useState(true)

  return (
    <>   
      <div className="max-w-xl mx-auto  py-20  flex-wrap p-4  bg-gray-100 ">
        {changePassword && (
          <LibraryComponents.Molecules.ModalChangePassword
            click={() => {
              const body = Object.assign(
                LoginStores.loginStore.login,
                UserStores.userStore.changePassword
              )
              RootStore.rootStore.setProcessLoading(true)
              Services.changePassword(body).then((res) => {
                RootStore.rootStore.setProcessLoading(false)
                console.log({ res })
                if (res.status === 200) {
                  LoginStores.loginStore.updateLogin({
                    ...LoginStores.loginStore.login,
                    passChanged: true,
                  })
                  LibraryComponents.Atoms.ToastsStore.success(`Password changed!`)
                  setChangePassword(false)
                  history.push("/dashboard/default")
                } else if (res.status === 203) {
                  LibraryComponents.Atoms.ToastsStore.error(res.data.data.message)
                } else {
                  LibraryComponents.Atoms.ToastsStore.error(
                    `Please enter correct old password`
                  )
                }
              })
            }}
            close={() => {
              LoginStores.loginStore.updateLogin({
                ...LoginStores.loginStore.login,
                passChanged: true,
              })
              setChangePassword(false)
              history.push("/dashboard/default")
            }}
          />
        )}
      </div>
    </>
  )
})

export default ChangePassword
