/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import { UserList } from "../components"
import moment from "moment"

import { useForm, Controller } from "react-hook-form"

import Storage from "@lp/library/modules/storage"

import { Container } from "reactstrap"

import { Stores } from "../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const Users = observer(() => {
  //const [errors, setErrors] = useState<Models.Users>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddUser, setAddUser] = useState<boolean>(true)

  const [lookupItems, setLookupItems] = useState<any[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      if (items) {
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.userStore.updateUser({
            ...Stores.userStore.user,
            status: status.code as string,
          })
        }
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  

  const onSubmitUser = (data: any) => {
    console.log({ data })
  }

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
              "p-2 rounded-lg shadow-xl " + (hideAddUser ? "shown" : "shown")
            }
          >
            <LibraryComponents.Atoms.Grid cols={3}>
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
                      label="User Id"
                      placeholder={errors.userId ? "Please enter userId" : "UserId"}
                      hasError={errors.userId}
                      value={Stores.userStore.user.userId}
                      onChange={(userId) => {
                        onChange(userId)
                        Stores.userStore.updateUser({
                          ...Stores.userStore.user,
                          userId,
                        })
                      }}
                      onBlur={(userId) => {
                        if (userId) {
                          Stores.userStore.UsersService.checkExitsUserId(
                            userId  
                          ).then((res) => {
                            if (!res.success) Stores.userStore.setExitsUserId(true)
                            else Stores.userStore.setExitsUserId(false)
                          })
                        }
                      }}
                    />
                  )}
                  name="userId"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {Stores.userStore.checkExitsUserId && (
                  <span className="text-red-600 font-medium relative">
                    UserId already exits. Please use other userid.
                  </span>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      hasError={errors.defaultLab}
                      label="Default Lab"
                    >
                      <select
                        className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                          errors.defaultLab
                            ? "border-red-500  focus:border-red-500"
                            : "border-gray-200"
                        } rounded-md`}
                        onChange={(e) => {
                          const defaultLab = e.target.value
                          onChange(defaultLab)
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
                        {LabStore.labStore.listLabs.map(
                          (item: any, index: number) => (
                            <option key={item.name} value={item.code}>
                              {item.name}
                            </option>
                          )
                        )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="defaultLab"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Lab"
                      hasError={errors.labs}
                    >
                      <LibraryComponents.Molecules.AutocompleteCheck
                        data={{
                          defulatValues: [
                            { code: Stores.userStore.user.defaultLab },
                          ],
                          list: LabStore.labStore.listLabs,
                          displayKey: "name",
                          findKey: "code",
                        }}
                        hasError={errors.labs}
                        onUpdate={(items) => {
                          onChange(items)
                          Stores.userStore.updateUser({
                            ...Stores.userStore.user,
                            lab: items,
                          })
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="labs"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Password"
                      type="password"
                      placeholder={
                        errors.password ? "Please enter password" : "Password"
                      }
                      hasError={errors.password}
                      value={Stores.userStore.user.password}
                      onChange={(password) => {
                        onChange(password)
                        Stores.userStore.updateUser({
                          ...Stores.userStore.user,
                          password,
                        })
                      }}
                    />
                  )}
                  name="password"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Deginisation"
                      hasError={errors.deginisation}
                    >
                      <select
                        className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                          errors.deginisation
                            ? "border-red-500  focus:border-red-500"
                            : "border-gray-200"
                        } rounded-md`}
                        onChange={(e) => {
                          const deginisation = e.target.value
                          onChange(deginisation)
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
                  )}
                  name="deginisation"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Status"
                      hasError={errors.status}
                    >
                      <select
                        className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                          errors.status
                            ? "border-red-500  focus:border-red-500"
                            : "border-gray-200"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          Stores.userStore.updateUser({
                            ...Stores.userStore.user,
                            status,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {`${item.value} - ${item.code}`}
                            </option>
                          )
                        )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="status"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.List>
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
                      label="Full Name"
                      placeholder={
                        errors.fullName ? "Please enter full name" : "Full Name"
                      }
                      hasError={errors.fullName}
                      value={Stores.userStore.user.fullName}
                      onChange={(fullName) => {
                        onChange(fullName)
                        Stores.userStore.updateUser({
                          ...Stores.userStore.user,
                          fullName,
                        })
                      }}
                    />
                  )}
                  name="fullName"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Mobile No"
                      placeholder={
                        errors.userId ? "Please enter mobile no" : "Mobile No"
                      }
                      hasError={errors.mobileNo}
                      value={Stores.userStore.user.mobileNo}
                      onChange={(mobileNo) => {
                        onChange(mobileNo)
                        Stores.userStore.updateUser({
                          ...Stores.userStore.user,
                          mobileNo,
                        })
                      }}
                    />
                  )}
                  name="mobileNo"
                  rules={{ required: true }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      type="mail"
                      label="Email"
                      placeholder={errors.userId ? "Please enter email" : "Email"}
                      hasError={errors.email}
                      value={Stores.userStore.user.email}
                      onChange={(email) => {
                        Stores.userStore.updateUser({
                          ...Stores.userStore.user,
                          email,
                        })
                      }}
                    />
                  )}
                  name="email"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Department"
                      hasError={errors.department}
                    >
                      <LibraryComponents.Molecules.AutoCompleteCheckTwoTitleKeys
                        data={{
                          defulatValues: [],
                          list: DepartmentStore.departmentStore.listDepartment,
                          displayKey: "name",
                          findKey: "code",
                        }}
                        hasError={errors.department}
                        titleKey={{ key1: "code", key2: "name" }}
                        onUpdate={(items) => {
                          onChange(items)
                          Stores.userStore.updateUser({
                            ...Stores.userStore.user,
                            department: items,
                          })
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="department"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <LibraryComponents.Atoms.List space={3} direction="row">
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.InputDate
                        label="Exipre Date"
                        hasError={errors.exipreDate}
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
                          onChange(new Date(formatDate))
                          Stores.userStore.updateUser({
                            ...Stores.userStore.user,
                            exipreDate: new Date(formatDate),
                          })
                        }}
                      />
                    )}
                    name="exipreDate"
                    rules={{ required: true }}
                    defaultValue={moment(Stores.userStore.user.exipreDate).format(
                      "YYYY-MM-DD"
                    )}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        type="number"
                        label="Exipre Days"
                        placeholder={
                          errors.exipreDays
                            ? "Please enter exipre days"
                            : "Exipre Days"
                        }
                        hasError={errors.exipreDays}
                        value={Stores.userStore.user.exipreDays}
                        onChange={(exipreDays) => {
                          onChange(exipreDays)
                          Stores.userStore.updateUser({
                            ...Stores.userStore.user,
                            exipreDays,
                          })
                        }}
                      />
                    )}
                    name="exipreDays"
                    rules={{ required: true }}
                    defaultValue={Stores.userStore.user.exipreDays}
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
                </LibraryComponents.Atoms.List>

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Role"
                      hasError={errors.role}
                    >
                      <LibraryComponents.Molecules.AutocompleteCheck
                        data={{
                          defulatValues: [],
                          list: RoleStore.roleStore.listRole,
                          displayKey: "description",
                          findKey: "code",
                        }}
                        hasError={errors.role}
                        onUpdate={(items) => {
                          onChange(items)
                          Stores.userStore.updateUser({
                            ...Stores.userStore.user,
                            role: items,
                          })
                        }}
                      />
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="role"
                  rules={{ required: true }}
                  defaultValue=""
                />
              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
            <br />

            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icon.Save}
                onClick={handleSubmit(onSubmitUser)}
                // onClick={() => {
                //   if (
                //     Utils.validate(Stores.userStore.user, Utils.constraintsUser) ===
                //       undefined &&
                //     !Stores.userStore.checkExitsUserId
                //   ) {
                //     Stores.userStore.UsersService.addUser(
                //       Stores.userStore.user
                //     ).then((res: any) => {
                //       console.log({ res })

                //       if (res.status === LibraryModels.StatusCode.CREATED) {
                //         LibraryComponents.Atoms.Toast.success({
                //           message: `😊 User created.`,
                //         })
                //         Stores.userStore.clear()
                //         Stores.userStore.loadUser()
                //       } else {
                //         LibraryComponents.Atoms.Toast.warning({
                //           message: "😔 User not created.Please try again.",
                //         })
                //       }
                //     })
                //   } else {
                //     LibraryComponents.Atoms.Toast.warning({
                //       message: "😔 Please enter all information!",
                //     })
                //   }
                // }}
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
            <UserList
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
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 User deleted.`,
                      })
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
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 User updated.`,
                    })
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
