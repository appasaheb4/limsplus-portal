/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as FeatureComponents from "../components"
import * as Models from "../models"
import * as Utils from "../utils"
import moment from "moment"

import { Container } from "reactstrap"

import { Stores } from "../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const Users = observer(() => {
  const [errors, setErrors] = useState<Models.Users>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddUser, setAddUser] = useState<boolean>(true)

  return (
    <>
      <Container fluid>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={stores.routerStore.selectedComponents?.title || ""}
          />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(
          toJS(stores.routerStore.userPermission),
          "Add"
        ) && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddUser}
            onClick={(status) => setAddUser(!hideAddUser)}
          />
        )}
        <div className=" mx-auto  flex-wrap">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddUser ? "hidden" : "shown")
            }
          >
            <LibraryComponents.Atoms.Grid cols={2}>
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
                  value={Stores.userStore.user.userId}
                  onChange={(userId) => {
                    setErrors({
                      ...errors,
                      userId: Utils.validate.single(
                        userId,
                        Utils.constraintsUser.userId
                      ),
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      userId,
                    })
                  }}
                  onBlur={(userId) => {
                    Stores.userStore.UsersService.checkExitsUserId(userId).then(
                      (res) => {
                        if (res)
                          if (res) Stores.userStore.setExitsUserId(true)
                          else Stores.userStore.setExitsUserId(false)
                      }
                    )
                  }}
                />
                {errors?.userId && (
                  <span className="text-red-600 font-medium relative">
                    {errors.userId}
                  </span>
                )}
                {Stores.userStore.checkExitsUserId && (
                  <span className="text-red-600 font-medium relative">
                    UserId already exits. Please use other userid.
                  </span>
                )}
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Default Lab"
                  id="defaultLab"
                >
                  <select
                    name="defualtLab"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const defaultLab = e.target.value
                      setErrors({
                        ...errors,
                        defaultLab: Utils.validate.single(
                          defaultLab,
                          Utils.constraintsUser.defaultLab
                        ),
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        defaultLab,
                      })
                      const lab: any = LabStore.labStore.listLabs.find(
                        (item) => item.code == defaultLab
                      )
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        lab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LabStore.labStore.listLabs.map((item: any, index: number) => (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                {errors?.defaultLab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.defaultLab}
                  </span>
                )}
                <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="labs">
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: [{ code: Stores.userStore.user.defaultLab }],
                      list: LabStore.labStore.listLabs,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    onUpdate={(items) => {
                      setErrors({
                        ...errors,
                        lab: Utils.validate.single(items, Utils.constraintsUser.lab),
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        lab: items,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
                {errors?.lab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.lab}
                  </span>
                )}
                <LibraryComponents.Atoms.Form.Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={Stores.userStore.user.password}
                  onChange={(password) => {
                    setErrors({
                      ...errors,
                      password: Utils.validate.single(
                        password,
                        Utils.constraintsUser.password
                      ),
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      password,
                    })
                  }}
                />
                {errors?.password && (
                  <span className="text-red-600 font-medium relative">
                    {errors.password}
                  </span>
                )}
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Deginisation"
                  id="deginisation"
                >
                  <select
                    name="deginisation"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const deginisation = e.target.value
                      setErrors({
                        ...errors,
                        deginisation:
                          deginisation !== ""
                            ? Utils.validate.single(
                                deginisation,
                                Utils.constraintsUser.deginisation
                              )
                            : "Deginisation requried",
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        deginisation,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {DeginisationStore.deginisationStore.listDeginisation.map(
                      (item: any) => (
                        <option key={item.description} value={item.code}>
                          {item.description}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
                {errors?.deginisation && (
                  <span className="text-red-600 font-medium relative">
                    {errors.deginisation}
                  </span>
                )}
                <LibraryComponents.Atoms.Form.InputRadio
                  label="Status"
                  name="status"
                  values={["Active", "Retired", "Disable"]}
                  value={Stores.userStore.user.status}
                  onChange={(status) => {
                    setErrors({
                      ...errors,
                      status:
                        status !== ""
                          ? Utils.validate.single(
                              status,
                              Utils.constraintsUser.status
                            )
                          : "Status requried",
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      status,
                    })
                  }}
                />
              </LibraryComponents.Atoms.List>
              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.Input
                  label="Full Name"
                  id="fullName"
                  placeholder="Full Name"
                  value={Stores.userStore.user.fullName}
                  onChange={(fullName) => {
                    setErrors({
                      ...errors,
                      fullName:
                        fullName !== ""
                          ? Utils.validate.single(
                              fullName,
                              Utils.constraintsUser.fullName
                            )
                          : "Full Name required!",
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      fullName,
                    })
                  }}
                />
                {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {errors.fullName}
                  </span>
                )}

                <LibraryComponents.Atoms.Form.Input
                  label="Mobile No"
                  id="mobileNo"
                  placeholder="Mobile No"
                  value={Stores.userStore.user.mobileNo}
                  onChange={(mobileNo) => {
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      mobileNo,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Input
                  type="mail"
                  label="Email"
                  id="email"
                  placeholder="Email"
                  value={Stores.userStore.user.email}
                  onChange={(email) => {
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      email,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Department"
                  id="department"
                >
                  <LibraryComponents.Molecules.AutoCompleteCheckTwoTitleKeys
                    data={{
                      defulatValues: [],
                      list: DepartmentStore.departmentStore.listDepartment,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    titleKey={{ key1: "code", key2: "name" }}
                    onUpdate={(items) => {
                      setErrors({
                        ...errors,
                        department: Utils.validate.single(
                          items,
                          Utils.constraintsUser.department
                        ),
                      })
                      console.log({ items })

                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        department: items,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>

                {errors?.department && (
                  <span className="text-red-600 font-medium relative">
                    {errors.department}
                  </span>
                )}

                <LibraryComponents.Atoms.List space={3} direction="row">
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Exipre Date"
                    id="exipreData"
                    value={moment(Stores.userStore.user.exipreDate).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e: any) => {
                      let date = new Date(e.target.value)
                      date = new Date(
                        moment(date)
                          .add(Stores.userStore.user.exipreDays, "days")
                          .format("YYYY-MM-DD HH:mm")
                      )
                      const formatDate = moment(date).format("YYYY-MM-DD HH:mm")
                      setErrors({
                        ...errors,
                        exipreDate: Utils.validate.single(
                          formatDate,
                          Utils.constraintsUser.exipreDate
                        ),
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        exipreDate: new Date(formatDate),
                      })
                    }}
                  />
                  {errors?.exipreDate && (
                    <span className="text-red-600 font-medium relative">
                      {errors.exipreDate}
                    </span>
                  )}

                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Exipre Days"
                    id="exipreDays"
                    placeholder="Exipre Days"
                    value={Stores.userStore.user.exipreDays}
                    onChange={(exipreDays) => {
                      setErrors({
                        ...errors,
                        exipreDays:
                          exipreDays !== ""
                            ? Utils.validate.single(
                                exipreDays,
                                Utils.constraintsUser.exipreDays
                              )
                            : "Exipre Days required!",
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        exipreDays,
                      })
                    }}
                  />

                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="solid"
                    onClick={() => {
                      const date = new Date(
                        moment(Stores.userStore.user.exipreDate)
                          .add(Stores.userStore.user.exipreDays, "days")
                          .format("YYYY-MM-DD HH:mm")
                      )
                      const exipreDate = new Date(
                        moment(date).format("YYYY-MM-DD HH:mm")
                      )
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        exipreDate,
                      })
                    }}
                  >
                    Apply Days
                  </LibraryComponents.Atoms.Buttons.Button>
                  {errors?.exipreDays && (
                    <span className="text-red-600 font-medium relative">
                      {errors.exipreDays}
                    </span>
                  )}
                </LibraryComponents.Atoms.List>

                <LibraryComponents.Atoms.Form.InputWrapper label="Role" id="role">
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: [],
                      list: RoleStore.roleStore.listRole,
                      displayKey: "description",
                      findKey: "code",
                    }}
                    onUpdate={(items) => {
                      setErrors({
                        ...errors,
                        role: Utils.validate.single(
                          items,
                          Utils.constraintsUser.role
                        ),
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        role: items,
                      })
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
                {errors?.role && (
                  <span className="text-red-600 font-medium relative">
                    {errors.role}
                  </span>
                )}
              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
            <br />

            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icon.Save}
                onClick={() => {
                  if (
                    Utils.validate(Stores.userStore.user, Utils.constraintsUser) ===
                      undefined &&
                    !Stores.userStore.checkExitsUserId
                  ) {
                    
                    Stores.userStore.UsersService.addUser(
                      Stores.userStore.user
                    ).then((res: any) => {
                      console.log({ res })
                      
                      if (res.status === LibraryModels.StatusCode.CREATED) {
                        LibraryComponents.Atoms.Toast.success({message:`😊 User created.`})
                        Stores.userStore.clear()
                        Stores.userStore.loadUser()
                      } else {
                        LibraryComponents.Atoms.Toast.warning({
                         message: "😔 User not created.Please try again."
                        })
                      }
                    })
                  } else {
                    LibraryComponents.Atoms.Toast.warning({
                      message:"😔 Please enter all information!"
                  })
                  }
                }}
              >
                Save
              </LibraryComponents.Atoms.Buttons.Button>
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Atoms.Icon.Remove}
                onClick={() => {
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <div
            className="p-2 rounded-lg shadow-xl overflow-scroll"
            style={{ overflowX: "scroll" }}
          >
            <FeatureComponents.Molecules.UserList
              data={Stores.userStore.userList || []}
              isDelete={RouterFlow.checkPermission(
                toJS(stores.routerStore.userPermission),
                "Delete"
              )}
              isEditModify={RouterFlow.checkPermission(
                toJS(stores.routerStore.userPermission),
                "Edit/Modify"
              )}
              onDelete={(selectedUser) => setModalConfirm(selectedUser)}
              onSelectedRow={(rows) => {
                setModalConfirm({
                  show: true,
                  type: "Delete",
                  id: rows,
                  title: "Are you sure?",
                  body: `Delete selected items!`,
                })
              }}
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: "Update",
                  data: { value, dataField, id },
                  title: "Are you sure?",
                  body: `Update user!`,
                })
              }}
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                
                Stores.userStore.UsersService.deleteUser(modalConfirm.id).then(
                  (res: any) => {
                    if (res.status === 200) {
                      
                      LibraryComponents.Atoms.Toast.success({message:`😊 User deleted.`})
                      setModalConfirm({ show: false })
                      Stores.userStore.loadUser()
                    }
                  }  
                )
              } else if (type === "Update") {
                
                Stores.userStore.UsersService.updateSingleFiled(
                  modalConfirm.data
                ).then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({message:`😊 User updated.`})
                    setModalConfirm({ show: false })
                    setTimeout(() => {
                      window.location.reload()
                    }, 1000)
                  }
                })
              }
            }}
            onClose={() => setModalConfirm({ show: false })}
          />
        </div>
      </Container>
    </>
  )
})

export default Users
