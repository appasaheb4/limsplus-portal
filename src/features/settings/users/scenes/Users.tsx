/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { UserList } from "../components"
import dayjs from "dayjs"
import { Container } from "reactstrap"
import { FormHelper } from "@lp/helper"

import { useForm, Controller } from "react-hook-form"
import {UsersHoc} from "../hoc"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const Users = UsersHoc(observer(() => {
  const {
    loginStore,
    routerStore,
    userStore,
    labStore,
    deginisationStore,
    departmentStore,
    roleStore,
    loading,
  } = useStores()

  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddUser, setAddUser] = useState<boolean>(true)
  const [modalChangePasswordByadmin, setModalChangePasswordByAdmin] = useState<any>()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("environment", loginStore.login.environment)
  setValue("status", userStore.user?.status)
  setValue("environment", userStore.user?.environment)
  

  const onSubmitUser = (data: any) => {
    if (!userStore.checkExitsUserId && !userStore.checkExistsEmpCode) {
      userStore &&
        userStore.UsersService.addUser({
          input: {
            ...userStore.user,
            createdBy: loginStore.login.userId,
          },
        }).then((res: any) => {
          if (res.createUser.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createUser.message}`,
            })
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          } else {
            LibraryComponents.Atoms.Toast.error({
              message: `😔 ${res.createUser.message}`,
            })
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter userid or emp code!",
      })
    }
  }

  const tableView = useMemo(
    () => (
      <UserList
        data={(userStore && userStore.userList) || []}
        totalSize={userStore && userStore.userListCount}
        extraData={{
          lookupItems: routerStore.lookupItems,
          listLabs: labStore.listLabs,
          listDeginisation: deginisationStore.listDeginisation,
          listDepartment: departmentStore.listDepartment,
          listRole: roleStore.listRole,
          userStore,
        }}
        isDelete={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          "Delete"
        )}
        isEditModify={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
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
        onUpdateImage={(value: any, dataField: string, id: string) => {
          setModalConfirm({
            show: true,
            type: "UpdateImage",
            data: { value, dataField, id },
            title: "Are you sure?",
            body: `UpdateImage!`,
          })
        }}
        onChangePassword={(id: string, userId: string, email: string) => {
          setModalChangePasswordByAdmin({
            show: true,
            type: "changePassword",
            data: { id, userId, email },
            title: "Are You Sure?",
            body: `UpdatePassword!`,
          })
        }}
        onPageSizeChange={(page, limit) => {
          userStore.loadUser(page, limit)
        }}
        onFilter={(type, filter, page, limit) => {
          userStore.UsersService.filter({
            input: { type, filter, page, limit },
          })
        }}
      />
    ),
    [userStore.userList]
  )

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddUser}
          onClick={(status) => setAddUser(!hideAddUser)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddUser ? "hidden" : "shown")
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
                    value={(userStore && userStore.user.userId) || ""}
                    onChange={(userId) => {
                      onChange(userId)
                      userStore.updateUser({
                        ...userStore.user,
                        userId: userId.toUpperCase(),
                      })
                    }}
                    onBlur={(userId) => {
                      if (userId) {
                        userStore.UsersService.checkExitsUserId(userId).then(
                          (res) => {
                            if (res.checkUserExitsUserId.success)
                              userStore.setExitsUserId(true)
                            else userStore.setExitsUserId(false)
                          }
                        )
                      }
                    }}
                  />
                )}
                name="userId"
                rules={{ required: true }}
                defaultValue=""
              />
              {userStore && userStore.checkExitsUserId && (
                <span className="text-red-600 font-medium relative">
                  UserId already exits. Please use other userid.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Emp Code"
                    placeholder={
                      errors.empCode ? "Please enter emp code" : "Emp Code"
                    }
                    hasError={errors.empCode}
                    value={(userStore && userStore.user.empCode) || ""}
                    onChange={(empCode) => {
                      onChange(empCode)
                      userStore.updateUser({
                        ...userStore.user,
                        empCode: empCode.toUpperCase(),
                      })
                    }}
                    onBlur={(empCode) => {
                      if (empCode) {
                        userStore.UsersService.findUserByEmpCode(empCode)
                          .then((res) => {
                            if (res.checkUserByEmpCode.success)
                              userStore.setExistsEmpCodeStatus(true)
                            else userStore.setExistsEmpCodeStatus(false)
                          })
                          .catch((error) => {
                            userStore.setExistsEmpCodeStatus(false)
                          })
                      }
                    }}
                  />
                )}
                name="empCode"
                rules={{ required: true }}
                defaultValue=""
              />
              {userStore && userStore.checkExistsEmpCode && (
                <span className="text-red-600 font-medium relative">
                  Emp code already exits. Please use other emp code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    hasError={errors.defaultLab}
                    label="Default Lab"
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                      loader={loading}
                      placeholder="Search by default lab name"
                      data={{
                        list: labStore.listLabs,
                        displayKey: "name",
                        findKey: "name",
                      }}
                      hasError={errors.name}
                      onFilter={(value: string) => {
                        labStore.LabService.filter({
                          input: {
                            type: "filter",
                            filter: {
                              name: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        })
                      }}
                      onSelect={(item) => {
                        onChange(item.name)
                        userStore.updateUser({
                          ...userStore.user,
                          defaultLab: item.code,
                        })
                        const lab: any = labStore.listLabs.find(
                          (item) => item.code == item.code
                        )
                        setValue("labs", lab)
                        userStore.updateUser({
                          ...userStore.user,
                          lab,
                        })
                        labStore.updateLabList(labStore.listLabsCopy)
                      }}
                    />
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
                          { code: userStore && userStore.user.defaultLab },
                        ],
                        list: labStore.listLabs,
                        displayKey: "name",
                        findKey: "code",
                      }}
                      hasError={errors.labs}
                      onUpdate={(items) => {
                        onChange(items)
                        userStore.updateUser({
                          ...userStore.user,
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
                    value={userStore && userStore.user.password}
                    onChange={(password) => {
                      onChange(password)
                      userStore.updateUser({
                        ...userStore.user,
                        password,
                      })
                    }}
                  />
                )}
                name="password"
                rules={{ required: true, pattern: FormHelper.patterns.password }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Deginisation"
                    hasError={errors.deginisation}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                      loader={loading}
                      placeholder="Search by deginisation name"
                      data={{
                        list: deginisationStore.listDeginisation,
                        displayKey: "description",
                        findKey: "description",
                      }}
                      hasError={errors.deginisation}
                      onFilter={(value: string) => {
                        deginisationStore.DeginisationService.filter({
                          input: {
                            type: "filter",
                            filter: {
                              description: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        })
                      }}
                      onSelect={(item) => {
                        onChange(item.code)
                        userStore.updateUser({
                          ...userStore.user,
                          deginisation: item.description,
                        })
                        deginisationStore.updateListDeginisation(
                          deginisationStore.listDeginisationCopy
                        )
                      }}
                    />
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
                    label="Department"
                    hasError={errors.department}
                  >
                    <LibraryComponents.Molecules.AutoCompleteCheckTwoTitleKeys
                      data={{
                        defulatValues: [],
                        list: departmentStore.listDepartment,
                        displayKey: "name",
                        findKey: "code",
                      }}
                      hasError={errors.department}
                      titleKey={{ key1: "code", key2: "name" }}
                      onUpdate={(items) => {
                        onChange(items)
                        userStore.updateUser({
                          ...userStore.user,
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
                        list: roleStore.listRole,
                        displayKey: "description",
                        findKey: "code",
                      }}
                      hasError={errors.role}
                      onUpdate={(items) => {
                        onChange(items)
                        userStore.updateUser({
                          ...userStore.user,
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

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Validation Level"
                    hasError={errors.validationLevel}
                  >
                    <select
                      value={userStore && userStore.user?.validationLevel}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.validationLevel ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const validationLevel = e.target.value
                        onChange(validationLevel)
                        userStore.updateUser({
                          ...userStore.user,
                          validationLevel: parseInt(validationLevel),
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
                        <option key={item.description} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="validationLevel"
                rules={{ required: false }}
                defaultValue=""
              />
              {/* <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Workstation"
                      placeholder={
                        errors.workstation
                          ? "Please enter workstation"
                          : "Workstation"
                      }
                      hasError={errors.workstation}
                      value={userStore && userStore.user.workstation}
                      onChange={(workstation) => {
                        onChange(workstation)
                        userStore.updateUser({
                          ...userStore.user,
                          workstation: [workstation],
                        })
                      }}
                    />
                  )}
                  name="workstation"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Ip Address"
                      placeholder={
                        errors.ipAddress ? "Please enter ipAddress" : "Ip Address"
                      }
                      hasError={errors.ipAddress}
                      value={userStore && userStore.user.ipAddress}
                      onChange={(ipAddress) => {
                        onChange(ipAddress)
                        userStore.updateUser({
                          ...userStore.user,
                          ipAddress: [ipAddress],
                        })
                      }}
                    />
                  )}
                  name="ipAddress"
                  rules={{ required: false }}
                  defaultValue=""
                /> */}
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
                    value={userStore && userStore.user.fullName}
                    onChange={(fullName) => {
                      onChange(fullName)
                      userStore.updateUser({
                        ...userStore.user,
                        fullName: fullName.toUpperCase(),
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
                      errors.mobileNo ? "Please enter mobile no" : "Mobile No"
                    }
                    hasError={errors.mobileNo}
                    value={userStore && userStore.user.mobileNo}
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      userStore.updateUser({
                        ...userStore.user,
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
                    label="Contact No"
                    placeholder={
                      errors.contactNo ? "Please enter contact no" : "Contact No"
                    }
                    hasError={errors.contactNo}
                    value={userStore && userStore.user.contactNo}
                    onChange={(contactNo) => {
                      onChange(contactNo)
                      userStore.updateUser({
                        ...userStore.user,
                        contactNo,
                      })
                    }}
                  />
                )}
                name="contactNo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="mail"
                    label="Email"
                    placeholder={errors.email ? "Please enter email" : "Email"}
                    hasError={errors.email}
                    value={userStore && userStore.user.email}
                    onChange={(email) => {
                      onChange(email)
                      userStore.updateUser({
                        ...userStore.user,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="User Degree"
                    placeholder={
                      errors.userDegree ? "Please enter user degree" : "User Degree"
                    }
                    hasError={errors.userDegree}
                    value={userStore && userStore.user.userDegree}
                    onChange={(userDegree) => {
                      onChange(userDegree)
                      userStore.updateUser({
                        ...userStore.user,
                        userDegree: userDegree.toUpperCase(),
                      })
                    }}
                  />
                )}
                name="userDegree"
                rules={{ required: false }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Birthday Date"
                    hasError={errors.dateOfBirth}
                    value={userStore && userStore.user.dateOfBirth}
                    onChange={(dateOfBirth) => {
                      onChange(dateOfBirth)
                      userStore.updateUser({
                        ...userStore.user,
                        dateOfBirth,
                      })
                    }}
                  />
                )}
                name="dateOfBirth"
                rules={{ required: true }}
                defaultValue={userStore && userStore.user.dateOfBirth}
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Marriage Anniversary Date"
                    hasError={errors.marriageAnniversary}
                    value={userStore && userStore.user.marriageAnniversary}
                    onChange={(marriageAnniversary) => {
                      onChange(marriageAnniversary)
                      userStore.updateUser({
                        ...userStore.user,
                        marriageAnniversary,
                      })
                    }}
                  />
                )}
                name="marriageAnniversary"
                rules={{ required: true }}
                defaultValue={dayjs(
                  userStore && userStore.user.marriageAnniversary
                ).format("YYYY-MM-DD")}
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Exipre Date"
                    hasError={errors.exipreDate}
                    value={userStore && userStore.user.exipreDate}
                    onChange={(exipreDate) => {
                      onChange(exipreDate)
                      userStore.updateUser({
                        ...userStore.user,
                        exipreDate,
                      })
                    }}
                  />
                )}
                name="exipreDate"
                rules={{ required: true }}
                defaultValue={dayjs(userStore && userStore.user.exipreDate).format(
                  "YYYY-MM-DD"
                )}
              />
              <LibraryComponents.Atoms.List space={4} direction="row">
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      type="number"
                      label="Exipre Days"
                      placeholder={
                        errors.expireDays
                          ? "Please enter exipre days"
                          : "Exipre Days"
                      }
                      hasError={errors.expireDays}
                      value={userStore && userStore.user.expireDays}
                      onChange={(expireDays) => {
                        onChange(expireDays)
                        userStore.updateUser({
                          ...userStore.user,
                          expireDays: parseInt(expireDays),
                        })
                      }}
                    />
                  )}
                  name="expireDays"
                  rules={{ required: false }}
                  defaultValue={userStore && userStore.user.expireDays}
                />
                <div className="mt-3">
                  <LibraryComponents.Atoms.Buttons.Button
                    size="medium"
                    type="solid"
                    onClick={() => {
                      const date = new Date(
                        dayjs(userStore && userStore.user.exipreDate)
                          .add(userStore && userStore.user.expireDays, "days")
                          .format("YYYY-MM-DD HH:mm")
                      )
                      userStore.updateUser({
                        ...userStore.user,
                        exipreDate: date,
                      })
                    }}
                  >
                    Apply Days
                  </LibraryComponents.Atoms.Buttons.Button>
                </div>
              </LibraryComponents.Atoms.List>

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Confidential"
                    value={userStore && userStore.user?.confidential}
                    onChange={(confidential) => {
                      onChange(confidential)
                      userStore.updateUser({
                        ...userStore.user,
                        confidential,
                      })
                    }}
                  />
                )}
                name="confidential"
                rules={{ required: false }}
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    label="Date Creation"
                    disabled={true}
                    value={userStore && userStore.user.dateOfEntry}
                  />
                )}
                name="dateOfEntry"
                rules={{ required: false }}
                defaultValue={userStore && userStore.user.dateOfEntry}
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Created By"
                    disabled={true}
                    placeholder={
                      errors.createdBy ? "Please enter created by" : "Created By"
                    }
                    hasError={errors.createdBy}
                    value={(loginStore.login && loginStore.login.userId) || ""}
                  />
                )}
                name="createdBy"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputFile
                    label="Signature"
                    placeholder="File"
                    onChange={(e) => {
                      const signature = e.target.files[0]
                      onChange(signature)
                      userStore.updateUser({
                        ...userStore.user,
                        signature,
                      })
                    }}
                  />
                )}
                name="signature"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputFile
                    label="Picture"
                    placeholder="File"
                    onChange={(e) => {
                      const picture = e.target.files[0]
                      onChange(picture)
                      userStore.updateUser({
                        ...userStore.user,
                        picture,
                      })
                    }}
                  />
                )}
                name="picture"
                rules={{ required: false }}
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
                      value={userStore && userStore.user?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        userStore.updateUser({
                          ...userStore.user,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="status"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={userStore && userStore.user?.environment}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        userStore.updateUser({
                          ...userStore.user,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : (userStore && userStore.user?.environment) || `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="environment"
                rules={{ required: true }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Confirguration"
                    value={userStore && userStore.user?.confirguration}
                    onChange={(confirguration) => {
                      onChange(confirguration)
                      userStore.updateUser({
                        ...userStore.user,
                        confirguration,
                      })
                    }}
                  />
                )}
                name="confirguration"
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Form.InputWrapper
                label="Access Permission"
                hasError={errors.environment}
                style={{ fontWeight: "bold" }}
              >
                <div className="flex flex-row gap-4">
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Mobile"
                        value={
                          userStore && userStore.user?.systemInfo?.accessInfo?.mobile
                        }
                        onChange={(mobile) => {
                          onChange(mobile)
                          userStore.updateUser({
                            ...userStore.user,
                            systemInfo: {
                              ...userStore.user.systemInfo,
                              accessInfo: {
                                ...userStore.user.systemInfo.accessInfo,
                                mobile,
                              },
                            },
                          })
                        }}
                      />
                    )}
                    name="confirguration"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Desktop"
                        value={
                          userStore &&
                          userStore.user?.systemInfo?.accessInfo?.desktop
                        }
                        onChange={(desktop) => {
                          onChange(desktop)
                          userStore.updateUser({
                            ...userStore.user,
                            systemInfo: {
                              ...userStore.user.systemInfo,
                              accessInfo: {
                                ...userStore.user.systemInfo.accessInfo,
                                desktop,
                              },
                            },
                          })
                        }}
                      />
                    )}
                    name="confirguration"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </div>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitUser)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">{tableView}</div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              userStore &&
                userStore.UsersService.deleteUser({
                  input: { id: modalConfirm.id },
                }).then((res: any) => {
                  if (res.removeUser.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeUser.message}`,
                    })
                    setModalConfirm({ show: false })
                    userStore.loadUser()
                  }
                })
            } else if (type === "Update") {
              userStore &&
                userStore.UsersService.updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateUser.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateUser.message}`,
                    })
                    setModalConfirm({ show: false })
                    userStore.loadUser()
                  }
                })
            } else {
              userStore &&
                userStore.UsersService.uploadImage({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateUserImages.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateUserImages.message}`,
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

        <LibraryComponents.Molecules.ModalChangePasswordByAdmin
          {...modalChangePasswordByadmin}
          onClick={() => {
            const exipreDate = new Date(
              dayjs(new Date()).add(30, "days").format("YYYY-MM-DD HH:mm")
            )
            const body = {
              userId: modalChangePasswordByadmin.data.userId,
              password: userStore.changePassword?.confirmPassword,
              email: modalChangePasswordByadmin.data.email,
              exipreDate: exipreDate,
            }
            userStore &&
              userStore.UsersService.changepasswordByAdmin({
                input: { ...body },
              }).then((res) => {
                if (res.userChnagePasswordByAdmin.success) {
                  setModalChangePasswordByAdmin({ show: false })
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 ${res.userChnagePasswordByAdmin.message}`,
                  })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.Toast.error({
                    message: `😔 ${res.userChnagePasswordByAdmin.message}`,
                  })
                }
              })
          }}
          onClose={() => {
            setModalChangePasswordByAdmin({ show: false })
          }}
        />
      </div>
    </>
  )
}))

export default Users
