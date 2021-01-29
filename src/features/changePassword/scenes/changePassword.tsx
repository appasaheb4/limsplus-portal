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
                rootStore.userStore.login,
                rootStore.userStore.changePassword
              )
              Services.changePassword(body).then((res) => {
                console.log({ res })
                if (res.status === 200) {
                  rootStore.userStore.updateLogin({
                    ...rootStore.userStore.login,
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
              rootStore.userStore.updateLogin({
                ...rootStore.userStore.login,
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
