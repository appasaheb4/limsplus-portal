import React, { useState } from "react"
import * as LibraryComponents from "@lp/library/components"
import * as Models from "@lp/features/users/models"
import * as Utils from "@lp/library/utils"
import Contexts from "@lp/library/stores"

interface ModalProps {
  title?: string
  click: () => void
  close: () => void
}

export default function ModalChangePassword(props: ModalProps) {
  const rootStore = React.useContext(Contexts.rootStore)
  const [errors, setErrors] = useState<Models.ChangePassword>()

  // useEffect(() => {
  //   setShowModal(props.show);
  // }, [props]);

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">Change Password</h3>
                <button
                  className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.close()}
                >
                  <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <LibraryComponents.List
                  direction="col"
                  space={4}
                  justify="stretch"
                  fill
                >
                  <LibraryComponents.Form.Input
                    type="password"
                    label="Old Password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={rootStore.userStore.changePassword?.oldPassword}
                    onChange={(oldPassword) => {
                      setErrors({
                        ...errors,
                        oldPassword: Utils.validate.single(
                          oldPassword,
                          Utils.constraintsChangePassword.oldPassword
                        ),
                      })
                      rootStore.userStore.updateChangePassword({
                        ...rootStore.userStore.changePassword,
                        oldPassword,
                      })
                    }}
                  />
                  {errors?.oldPassword && (
                    <span className="text-red-600 font-medium relative">
                      {errors.oldPassword}
                    </span>
                  )}
                  <LibraryComponents.Form.Input
                    type="password"
                    label="New Password"
                    name="newPassword"
                    placeholder="New Password"
                    value={rootStore.userStore.changePassword?.newPassword}
                    onChange={(newPassword) => {
                      setErrors({
                        ...errors,
                        newPassword:
                          rootStore.userStore.changePassword?.oldPassword !==
                          newPassword
                            ? Utils.validate.single(
                                newPassword,
                                Utils.constraintsChangePassword.newPassword
                              )
                            : "Please use diff password!",
                      })
                      rootStore.userStore.updateChangePassword({
                        ...rootStore.userStore.changePassword,
                        newPassword,
                      })
                    }}
                  />
                  {errors?.newPassword && (
                    <span className="text-red-600 font-medium relative">
                      {errors.newPassword}
                    </span>
                  )}
                  <LibraryComponents.Form.Input
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={rootStore.userStore.changePassword?.confirmPassword}
                    onChange={(confirmPassword) => {
                      setErrors({
                        ...errors,
                        confirmPassword:
                          rootStore.userStore.changePassword?.newPassword !==
                          confirmPassword
                            ? "Please enter same password!"
                            : Utils.validate.single(
                                confirmPassword,
                                Utils.constraintsChangePassword.confirmPassword
                              ),
                      })
                      rootStore.userStore.updateChangePassword({
                        ...rootStore.userStore.changePassword,
                        confirmPassword,
                      })
                    }}
                  />
                  {errors?.confirmPassword && (
                    <span className="text-red-600 font-medium relative">
                      {errors.confirmPassword}
                    </span>
                  )}
                </LibraryComponents.List>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => props.close()}
                >
                  Later
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => {
                    if (
                      Utils.validate(
                        rootStore.userStore.changePassword,
                        Utils.constraintsChangePassword
                      ) === undefined &&
                      !Utils.checkNotUndefined(errors)
                    ) {
                      props.click()
                    } else {
                      LibraryComponents.ToastsStore.warning(
                        "Please enter all information!"
                      )
                    }
                  }}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  )
}
