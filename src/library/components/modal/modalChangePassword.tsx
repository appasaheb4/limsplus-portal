import React, { useEffect, useState } from "react";
import * as LibraryComponents from "@lp/library/components";
import UsersContext from "@lp/features/users/stores";
import * as Models from "@lp/features/users/models";
import * as Utils from "@lp/library/utils";

interface ModalProps {
  show?: boolean;
  title?: string;
  click: () => void;
}

export default function ModalChangePassword(props: ModalProps) {
  let usersStore = React.useContext(UsersContext);
  const [errors, setErrors] = useState<Models.ChangePassword>();
  const [showModal, setShowModal] = React.useState(props.show);

  // useEffect(() => {
  //   setShowModal(props.show);
  // }, [props]);

  return (
    <>
      {showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Change Password</h3>
                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
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
                      value={usersStore.changePassword?.oldPassword}
                      // onChange={(oldPassword) => {
                      //   // setErrors({
                      //   //   ...errors,
                      //   //   oldPassword: Utils.validate.single(
                      //   //     oldPassword,
                      //   //     Utils.constraintsChangePassword.oldPassword
                      //   //   ),
                      //   // });
                      //   // usersStore.updateChangePassword({
                      //   //   ...usersStore.changePassword,
                      //   //   oldPassword,
                      //   // });
                      // }}
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
                      value={usersStore.changePassword?.newPassword}
                      onChange={(newPassword) => {
                        setErrors({
                          ...errors,
                          oldPassword: Utils.validate.single(
                            newPassword,
                            Utils.constraintsChangePassword.newPassword
                          ),
                        });
                        usersStore.updateChangePassword({
                          ...usersStore.changePassword,
                          newPassword,
                        });
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
                      value={usersStore.changePassword?.confirmPassword}
                      onChange={(confirmPassword) => {
                        setErrors({
                          ...errors,
                          oldPassword: Utils.validate.single(
                            confirmPassword,
                            Utils.constraintsChangePassword.confirmPassword
                          ),
                        });
                        usersStore.updateChangePassword({
                          ...usersStore.changePassword,
                          confirmPassword,
                        });
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
                    onClick={() => setShowModal(false)}
                  >
                    Later
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      setShowModal(false);
                      props.click();
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
      )}
    </>
  );
}
