import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as Services from "@lp/features/users/services"
import Contexts from "@lp/library/stores"
import { useHistory } from "react-router-dom"

import {Stores as LoginStores} from '@lp/features/login/stores';
import {Stores as UserStores} from '@lp/features/users/stores';

const ChangePassword = observer(() => {
  const history = useHistory()
  const rootStore = React.useContext(Contexts.rootStore)
  const [changePassword, setChangePassword] = useState(true)

  return (
    <>
      <div className="max-w-xl mx-auto  py-20  flex-wrap p-4  bg-gray-100 ">
        {changePassword && (
          <LibraryComponents.Modal.ModalChangePassword
            click={() => {
              const body = Object.assign(
                LoginStores.loginStore.login,
                UserStores.userStore.changePassword
              )
              rootStore.setProcessLoading(true)
              Services.changePassword(body).then((res) => {
                rootStore.setProcessLoading(false)
                console.log({ res })
                if (res.status === 200) {
                  LoginStores.loginStore.updateLogin({
                    ...LoginStores.loginStore.login,
                    passChanged: true,
                  })
                  LibraryComponents.ToastsStore.success(`Password changed!`)
                  setChangePassword(false)
                  history.push("/dashboard/default")
                } else if (res.status === 203) {
                  LibraryComponents.ToastsStore.error(res.data.data.message)
                } else {
                  LibraryComponents.ToastsStore.error(
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
