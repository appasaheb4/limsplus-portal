import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as Services from "@lp/features/users/services"
import Contexts from "@lp/library/stores"
import { useHistory } from "react-router-dom"

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
                rootStore.loginStore.login,
                rootStore.userStore.changePassword
              )
              rootStore.setProcessLoading(true)
              Services.changePassword(body).then((res) => {
                rootStore.setProcessLoading(false)
                console.log({ res })
                if (res.status === 200) {
                  rootStore.loginStore.updateLogin({
                    ...rootStore.loginStore.login,
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
              rootStore.loginStore.updateLogin({
                ...rootStore.loginStore.login,
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
