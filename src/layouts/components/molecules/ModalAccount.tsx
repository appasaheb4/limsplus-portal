import React, { useState } from "react"
import { observer } from "mobx-react"
import * as Assets from "@lp/library/assets"
import * as LibraryComponents from "@lp/library/components"

import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as AssetsStores } from "@lp/features/assets/stores"
import { Stores as UserStores } from "@lp/features/users/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { useHistory } from "react-router-dom"
interface ModalAccountProps {
  show: boolean
  onClose?: () => void
}

const ModalAccount = observer((props: ModalAccountProps) => {
  const history: any = useHistory()
  const [modalFileUpload, setModalFileUpload] = useState<any>()
  console.log({ login: LoginStores.loginStore.login })

  return (
    <>
      <LibraryComponents.Molecules.Modals.SlideIn
        show={!!props.show} //
        onClose={() => props.onClose && props.onClose()}
      >
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading title="Account" />
        </LibraryComponents.Atoms.Header>

        <LibraryComponents.Atoms.Image
          widht={200}
          height={200}
          source={LoginStores.loginStore.login?.image || Assets.defaultAvatar}
          onClick={() =>
            setModalFileUpload({ show: true, title: "Profile image select" })
          }
        />

        <div className="flex justify-center">
          <label className="font-bold text-1xl">
            {" "}
            {LoginStores.loginStore.login?.fullName}
          </label>
        </div>
        <div className="p-2">
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <div className="bg-gray-500 rounded-md p-2 items-stretch">
              <label className="text-white">
                Lab : {LoginStores.loginStore.login?.lab}
              </label>
              <br />
              <label className="text-white">
                Role: {LoginStores.loginStore.login?.role}
              </label>
            </div>
            {LoginStores.loginStore.login?.labList !== undefined &&
              LoginStores.loginStore.login?.labList?.length > 1 && (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label={`Switch Lab`}
                  id="labChange"
                >
                  <select
                    name="defualtLab"
                    value={LoginStores.loginStore.login?.lab}
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                      LoginStores.loginStore.updateLogin({
                        ...LoginStores.loginStore.login,
                        lab,
                      })
                      history.push("/dashboard/default")
                      LibraryComponents.Atoms.ToastsStore.success(
                        `Your lab change successfully`
                      )
                      props.onClose && props.onClose()
                      // RootStore.rootStore.setProcessLoading(true)
                      // UserStores.userStore.UsersService.switchAccess({
                      //   type: "lab",
                      //   lab,
                      //   id: LoginStores.loginStore.login?._id,
                      // }).then((res: any) => {
                      //   RootStore.rootStore.setProcessLoading(false)
                      //   console.log({ res })
                      // })
                    }}
                  >
                    {LoginStores.loginStore.login?.labList?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
            {LoginStores.loginStore.login?.roleList !== undefined &&
              LoginStores.loginStore.login?.roleList?.length > 1 && (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label={`Switch Role`}
                  id="roleChange"
                >
                  <select
                    name="roleChange"
                    value={LoginStores.loginStore.login?.role}
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const role = e.target.value
                      RootStore.rootStore.setProcessLoading(true)
                      UserStores.userStore.UsersService.switchAccess({
                        type: "role",
                        role,
                        id: LoginStores.loginStore.login?._id,
                      }).then((res: any) => {
                        RootStore.rootStore.setProcessLoading(false)
                        if (res.status === 200) {
                          LoginStores.loginStore.updateLogin({
                            ...LoginStores.loginStore.login,
                            role,
                          })
                          const router = JSON.parse(res.data.data.router[0])
                          RootStore.routerStore.updateUserRouter(router)
                          LibraryComponents.Atoms.ToastsStore.success(
                            `Your role change successfully`
                          )
                          history.push("/dashboard/default")
                          props.onClose && props.onClose()
                        } else {
                          LibraryComponents.Atoms.ToastsStore.error(
                            res.data.data.errorMessage
                          )
                        }
                      })
                    }}
                  >
                    {LoginStores.loginStore.login?.roleList?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.description}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
          </LibraryComponents.Atoms.List>
        </div>
      </LibraryComponents.Molecules.Modals.SlideIn>
      <LibraryComponents.Molecules.ModalFileUpload
        {...modalFileUpload}
        onClick={(image: any) => {
          console.log({ image, login: LoginStores.loginStore.login })
          AssetsStores.assetsStore.AssetsService.uploadImage({
            image,
            id: LoginStores.loginStore.login?._id,
            folder: "users",
          }).then((res: any) => {
            setModalFileUpload({ show: false })
            if (res.status === 200) {
              LoginStores.loginStore.updateLogin({
                ...LoginStores.loginStore.login,
                image: res.data.data.image,
              })
              LibraryComponents.Atoms.ToastsStore.success(
                `Image upload successfully!`
              )
            } else {
              LibraryComponents.Atoms.ToastsStore.error(
                `Image not upload. Please try again!`
              )
            }
          })
        }}
        onClose={() => setModalFileUpload({ show: false })}
      />
    </>
  )
})
export default ModalAccount
