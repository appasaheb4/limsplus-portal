import React, { useState, useEffect } from "react"
import { Container } from "reactstrap"
import { observer } from "mobx-react"
import * as Assets from "@lp/library/assets"

import * as Models from "../../models"
import * as Utils from "../../utils"

import * as LibraryComponents from "@lp/library/components"

import { Stores } from "@lp/features/login/stores"

interface ModalForgotPasswordProps {
  show?: boolean
  data?: any
  onClick: (data: any) => void
  onClose: () => void
}

const ModalForgotPassword = observer((props: ModalForgotPasswordProps) => {
  const [errors, setErrors] = useState<Models.ForgotPassword>()
  const [showModal, setShowModal] = React.useState(props.show)
  useEffect(() => {
    setShowModal(props.show)
  }, [props])

  return (
    <Container>
      {showModal && (
        <>
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div>
                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.onClose()}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                  <div className="items-center justify-center flex mb-2">
                    <img
                      src={Assets.logo}
                      className=" img-thumbnail img-fluid"
                      style={{ width: 70, height: 55, marginRight: 10 }}
                      alt="lims plus"
                    />
                    <h4 className="font-semibold">{`Lims Plus`}</h4>
                  </div>
                  <div>
                    <div className="items-center justify-center flex">
                      <h1 className="text-4xl">Forgot Password</h1>
                    </div>
                  </div>
                </div>

                {/*body*/}
                <div className="relative ml-24 mr-24 p-2 flex-auto">
                  <LibraryComponents.Atoms.List
                    direction="col"
                    space={4}
                    justify="stretch"
                    fill
                  >
                    <LibraryComponents.Atoms.Form.Input
                      label="User Id"
                      id="userId"
                      placeholder="User Id"
                      value={Stores.loginStore.forgotPassword?.userId}
                      onChange={(userId) => {
                        setErrors({
                          ...errors,
                          userId: Utils.validate.single(
                            userId,
                            Utils.constraintsForgotPassword.userId
                          ),
                        })
                        Stores.loginStore.updateForgotPassword({
                          ...Stores.loginStore.forgotPassword,
                          userId,
                        })
                      }}
                    />
                    {errors?.userId && (
                      <span className="text-red-600 font-medium relative">
                        {errors.userId}
                      </span>
                    )}
                    <LibraryComponents.Atoms.Form.Input
                      type="mail"
                      label="Email"
                      id="email"
                      placeholder="Email"
                      value={Stores.loginStore.forgotPassword?.email}
                      onChange={(email) => {
                        setErrors({
                          ...errors,
                          email: Utils.validate.single(
                            email,
                            Utils.constraintsForgotPassword.email
                          ),
                        })
                        Stores.loginStore.updateForgotPassword({
                          ...Stores.loginStore.forgotPassword,
                          email,
                        })
                      }}
                    />
                    {errors?.email && (
                      <span className="text-red-600 font-medium relative">
                        {errors.email}
                      </span>
                    )}
                    <span className="text-center">OR</span>
                    <LibraryComponents.Atoms.Form.Input
                      type="number"
                      label="Mobile Number"
                      id="moNumber"
                      placeholder="Mobile Number"
                      value={Stores.loginStore.forgotPassword?.mobileNo}
                      onChange={(mobileNo) => {
                        setErrors({
                          ...errors,
                          mobileNo: Utils.validate.single(
                            mobileNo,
                            Utils.constraintsForgotPassword.mobileNo
                          ),
                        })
                        Stores.loginStore.updateForgotPassword({
                          ...Stores.loginStore.forgotPassword,
                          mobileNo,
                        })
                      }}
                    />
                    {errors?.mobileNo && (
                      <span className="text-red-600 font-medium relative">
                        {errors.mobileNo}
                      </span>
                    )}
                  </LibraryComponents.Atoms.List>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-2 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-black text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      if (
                        Utils.validate(
                          Stores.loginStore.forgotPassword,
                          Utils.constraintsForgotPassword
                        ) === undefined &&
                        (Stores.loginStore.forgotPassword?.email !== undefined ||
                          Stores.loginStore.forgotPassword?.mobileNo !== undefined)
                      ) {
                        props.onClick(Stores.loginStore.forgotPassword)
                      } else {
                        LibraryComponents.Atoms.ToastsStore.warning(
                          "Please enter all information!"
                        )
                      }
                    }}
                  >
                    Send
                  </button>
                </div>
                <div className="justify-center items-center flex">
                  <p>Powered by Lims Plus Solutions Pvt Ltd.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </Container>
  )
})

export default ModalForgotPassword
