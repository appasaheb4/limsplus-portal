import React, { useState } from "react"
import { observer } from "mobx-react"
import * as Assets from "@lp/library/assets"
import * as LibraryComponents from "@lp/library/components"

import { stores, useStores } from "@lp/stores"

import { useHistory } from "react-router-dom"
interface ModalAccountProps {
  show: boolean
  onClose?: () => void
}

const ModalAccount = observer((props: ModalAccountProps) => {
  const { userStore, loginStore } = useStores()
  const history: any = useHistory()
  const [modalFileUpload, setModalFileUpload] = useState<any>()

  return (
    <>
      <LibraryComponents.Molecules.ModalTransition
        show={!!props.show}
        onClose={() => props.onClose && props.onClose()}
      >
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading title="Account" />
        </LibraryComponents.Atoms.Header>

        <LibraryComponents.Atoms.Image
          widht={200}
          height={200}
          source={loginStore.login?.picture || Assets.defaultAvatar}
          onClick={() =>
            setModalFileUpload({ show: true, title: "Profile image select" })
          }
        />

        <div className="flex justify-center">
          <label className="font-bold text-1xl"> {loginStore.login?.fullName}</label>
        </div>
        <div className="p-2">
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <div className="bg-gray-500 rounded-md p-2 items-stretch">
              <label className="text-white">Lab : {loginStore.login?.lab}</label>
              <br />
              <label className="text-white">Role: {loginStore.login?.role}</label>
              <br />
              <label className="text-white">
                Environment: {loginStore.login?.environment}
              </label>
            </div>
            {loginStore.login?.labList !== undefined &&
              loginStore.login?.labList?.length > 1 && (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label={`Switch Lab`}
                  id="labChange"
                >
                  <select
                    name="defualtLab"
                    value={loginStore.login?.lab}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                      loginStore.updateLogin({
                        ...loginStore.login,
                        lab,
                      })
                      history.push("/dashboard/default")
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Your lab change successfully`,
                      })
                      props.onClose && props.onClose()
                    }}
                  >
                    {loginStore.login?.labList?.map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
            {loginStore.login?.roleList !== undefined &&
              loginStore.login?.roleList?.length > 1 && (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label={`Switch Role`}
                  id="roleChange"
                >
                  <select
                    name="roleChange"
                    value={loginStore.login?.role}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const role = e.target.value
                      userStore.UsersService.switchAccess({
                        input: {
                          role,
                        },
                      }).then((res: any) => {
                        if (res.userSwitchAccess.success) {
                          loginStore.updateLogin({
                            ...loginStore.login,
                            role,
                          })
                          const router = JSON.parse(
                            res.userSwitchAccess.data.roleMapping.router[0]
                          )
                          stores.routerStore.updateUserRouter(router)
                          LibraryComponents.Atoms.Toast.success({
                            message: `😊 ${res.userSwitchAccess.message}`,
                          })
                          history.push("/dashboard/default")
                          props.onClose && props.onClose()
                        } else {
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 ${res.userSwitchAccess.message}`,
                          })
                        }
                      })
                    }}
                  >
                    {loginStore.login?.roleList?.map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {item.description}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
          </LibraryComponents.Atoms.List>
        </div>
      </LibraryComponents.Molecules.ModalTransition>
      <LibraryComponents.Molecules.ModalFileUpload
        {...modalFileUpload}
        onClick={(picture: any) => {
          userStore.UsersService.uploadImage({
            input: {  
              picture,
              _id: loginStore.login?._id
            },
          }).then((res: any) => {
            console.log({res});
            
            setModalFileUpload({ show: false })
            if (res.updateUserImages.success) {
              loginStore.updateLogin({
                ...loginStore.login,
                picture: res.updateUserImages.data.picture,
              })
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.updateUserImages.message}`,
              })
            } else {   
              LibraryComponents.Atoms.Toast.error({
                message: `😔 ${res.updateUserImages.message}`,
              })
            }
          })
        }}
        onClose={() => setModalFileUpload({ show: false })}
      />
    </>
  )
})
export default ModalAccount
