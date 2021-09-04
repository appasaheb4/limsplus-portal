import React, { useEffect } from "react"
import * as LibraryComponents from "@lp/library/components"
// import * as Models from "@lp/features/users/models"
// import * as Utils from "@lp/library/utils"
import { FormHelper } from "@lp/helper"
import { useForm, Controller } from "react-hook-form"
import { Stores as UserStores } from "@lp/features/users/stores"

interface ModalProps {
  show: boolean
  title?: string
  onClick: () => void
  onClose: () => void
}

export default function ModalChangePassword(props: ModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm()
  const [showModal, setShowModal] = React.useState(props.show)

  const onSubmitModalChangePassword = () => {
    if (UserStores.userStore.changePassword) {
      props.onClick()
    } else {
      LibraryComponents.Atoms.Toast.error({
        message: `😔 Please enter all information!`,
      })
    }
  }
  useEffect(() => {
    setShowModal(props.show)
  }, [props])

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t p-2">
                  <div className="flex-col">
                    <h3 className="text-3xl font-semibold">Change Password</h3>
                    <br />
                    <h6>{UserStores.userStore.changePassword?.subTitle}</h6>
                  </div>

                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.onClose && props.onClose()}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative  flex-auto p-3">
                  <LibraryComponents.Atoms.List
                    direction="col"
                    space={4}
                    justify="stretch"
                    fill
                  >
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          type="password"
                          label="Old Password"
                          name="oldPassword"
                          hasError={errors.oldPassword}
                          placeholder={
                            errors.oldPassword
                              ? "Please Enter Old Password"
                              : "Old Password"
                          }
                          value={UserStores.userStore.changePassword?.oldPassword}
                          onChange={(oldPassword) => {
                            onChange(oldPassword)
                            UserStores.userStore.updateChangePassword({
                              ...UserStores.userStore.changePassword,
                              oldPassword,
                            })
                          }}
                        />
                      )}
                      name="oldPassword"
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                      }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          type="password"
                          label="New Password"
                          name="newPassword"
                          placeholder={
                            errors.newPassword
                              ? "Please Enter New Password"
                              : "New Password"
                          }
                          hasError={errors.newPassword}
                          value={UserStores.userStore.changePassword?.newPassword}
                          onChange={(newPassword) => {
                            onChange(newPassword)
                            UserStores.userStore.updateChangePassword({
                              ...UserStores.userStore.changePassword,
                              newPassword,
                            })
                          }}
                        />
                      )}
                      name="newPassword"
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                      }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <LibraryComponents.Atoms.Form.Input
                          type="password"
                          label="Confirm Password"
                          name="confirmPassword"
                          placeholder={
                            errors.confirmPassword
                              ? "Please Enter Confirm Password"
                              : "Confirm Password"
                          }
                          hasError={errors.confirmPassword}
                          value={
                            UserStores.userStore.changePassword?.confirmPassword
                          }
                          onChange={(confirmPassword) => {
                            onChange(confirmPassword)
                            UserStores.userStore.updateChangePassword({
                              ...UserStores.userStore.changePassword,
                              confirmPassword,
                            })
                          }}
                        />
                      )}
                      name="confirmPassword"
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                        validate: (value) =>
                          value === UserStores.userStore.changePassword?.newPassword,
                      }}
                      defaultValue=""
                    />
                  </LibraryComponents.Atoms.List>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end  border-t border-solid border-gray-300 rounded-b p-2">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => props.onClose && props.onClose()}
                  >
                    Later
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={handleSubmit(onSubmitModalChangePassword)}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}
