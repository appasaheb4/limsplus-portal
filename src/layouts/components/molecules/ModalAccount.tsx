import React, { useState } from "react"
import { observer } from "mobx-react"
import * as Assets from "@lp/library/assets"
import * as LibraryComponents from "@lp/library/components"

import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as AssetsStores } from "@lp/features/assets/stores"

interface ModalAccountProps {
  show: boolean
  onClose?: () => void
}

const ModalAccount = observer((props: ModalAccountProps) => {
  const [modalFileUpload, setModalFileUpload] = useState<any>()
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
          source={
            LoginStores.loginStore.login?.image ||
            Assets.defaultAvatar
          }
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
            <LibraryComponents.Atoms.Form.Input
              label="Lab"
              id="lab"
              placeholder="Lab"
              disabled={true}
              value={LoginStores.loginStore.login?.lab}
            />
            <LibraryComponents.Atoms.Form.Input
              label="Role"
              id="role"
              placeholder="Role"
              disabled={true}
              value={LoginStores.loginStore.login?.role}
            />
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
              LibraryComponents.Atoms.ToastsStore.success(`Image upload successfully!`) 
            }else{
                LibraryComponents.Atoms.ToastsStore.error(`Image not upload. Please try again!`) 
            }
          })
        }}
        onClose={() => setModalFileUpload({ show: false })}
      />
    </>
  )
})
export default ModalAccount
