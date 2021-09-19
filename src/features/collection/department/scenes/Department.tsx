/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Container } from "reactstrap"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"
import Storage from "@lp/library/modules/storage"
import { useStores } from "@lp/stores"
import { Stores } from "../stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"

export const Department = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddDepartment, setHideAddDepartment] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.departmentStore.updateDepartment({
        ...Stores.departmentStore.department,
        lab: stores.loginStore.login.lab,
        environment: stores.loginStore.login.environment,
      })
      setValue("lab", stores.loginStore.login.lab)
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  const onSubmitDepartment = () => {
    if (!Stores.departmentStore.checkExitsCode) {
      Stores.departmentStore.DepartmentService.adddepartment(
        Stores.departmentStore.department
      ).then(() => {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 Department created.`,
        })
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter diff code!",
      })
    }
  }

  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={stores.routerStore.selectedComponents?.title || ""}
          />
          <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddDepartment}
            onClick={() => setHideAddDepartment(!hideAddDepartment)}
          />
        )}
        <div className="mx-auto">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddDepartment ? "shown" : "shown")
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
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Lab"
                      id="lab"
                      hasError={errors.lab}
                    >
                      <select
                        value={Stores.departmentStore.department?.lab}
                        disabled={
                          stores.loginStore.login &&
                          stores.loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.lab ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const lab = e.target.value
                          onChange(lab)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            lab,
                          })
                          Stores.departmentStore.DepartmentService.checkExitsLabEnvCode(
                            Stores.departmentStore.department?.code || "",
                            Stores.departmentStore.department?.environment || "",
                            lab
                          ).then((res) => {
                            if (res.success) {
                              Stores.departmentStore.setExitsCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.message}`,
                              })
                            } else Stores.departmentStore.setExitsCode(false)
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LabStore.labStore.listLabs.map((item: any) => (
                          <option key={item.name} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="lab"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Code"
                      id="code"
                      hasError={errors.code}
                      placeholder={errors.code ? "Please Enter Code" : "Code"}
                      value={Stores.departmentStore.department?.code}
                      onChange={(code) => {
                        onChange(code)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          code:code.toUpperCase(),
                        })
                      }}
                      onBlur={(code) => {
                        Stores.departmentStore.DepartmentService.checkExitsLabEnvCode(
                          code,
                          Stores.departmentStore.department?.environment || "",
                          Stores.departmentStore.department?.lab || ""
                        ).then((res) => {
                          if (res.success) {
                            Stores.departmentStore.setExitsCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.message}`,
                            })
                          } else Stores.departmentStore.setExitsCode(false)
                        })
                      }}
                    />
                  )}
                  name="code"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {Stores.departmentStore.checkExitsCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Name"
                      name="name"
                      hasError={errors.name}
                      placeholder={errors.name ? "Please Enter Name" : "Name"}
                      value={Stores.departmentStore.department?.name}
                      onChange={(name) => {
                        onChange(name)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          name:name.toUpperCase(),
                        })
                      }}
                    />
                  )}
                  name="name"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Short Name"
                      placeholder={
                        errors.shortName ? "Please Enter Short Name" : "Short Name"
                      }
                      hasError={errors.shortName}
                      value={Stores.departmentStore.department?.shortName}
                      onChange={(shortName) => {
                        onChange(shortName)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          shortName:shortName.toUpperCase(),
                        })
                      }}
                    />
                  )}
                  name="shortName"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="HOD"
                      hasError={errors.hod}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.hod
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const hod = e.target.value
                          onChange(hod)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            hod,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {UserStore.userStore.userList &&
                          UserStore.userStore.userList.map(
                            (item: any, key: number) => (
                              <option key={key} value={item.fullName}>
                                {item.fullName}
                              </option>
                            )
                          )}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="hod"
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
                    <LibraryComponents.Atoms.Form.Input
                      label="Mobile No"
                      placeholder={
                        errors.mobileNo ? "Please Enter MobileNo" : "MobileNo"
                      }
                      hasError={errors.mobileNo}
                      value={Stores.departmentStore.department?.mobileNo}
                      onChange={(mobileNo) => {
                        onChange(mobileNo)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          mobileNo,
                        })
                      }}
                    />
                  )}
                  name="mobileNo"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Input
                      label="Contact No"
                      placeholder={
                        errors.contactNo ? "Please Enter contactNo" : "contactNo"
                      }
                      hasError={errors.contactNo}
                      value={Stores.departmentStore.department?.contactNo}
                      onChange={(contactNo) => {
                        onChange(contactNo)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
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
                    <LibraryComponents.Atoms.Form.Clock
                      label="Opening Time"
                      hasError={errors.openingTime}
                      value={Stores.departmentStore.department?.openingTime}
                      onChange={(openingTime) => {
                        onChange(openingTime)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          openingTime,
                        })
                      }}
                    />
                  )}
                  name="openingTime"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.Clock
                      label="Closing Time"
                      hasError={errors.closingTime}
                      value={Stores.departmentStore.department?.closingTime}
                      onChange={(closingTime) => {
                        onChange(closingTime)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          closingTime,
                        })
                      }}
                    />
                  )}
                  name="closingTime"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <LibraryComponents.Atoms.Grid cols={4}>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Auto Release"
                        hasError={errors.autoRelease}
                        value={Stores.departmentStore.department?.autoRelease}
                        onChange={(autoRelease) => {
                          onChange(autoRelease)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            autoRelease,
                          })
                        }}
                      />
                    )}
                    name="autoRelease"
                    rules={{ required: false }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Require receve in lab"
                        hasError={errors.requireReceveInLab}
                        value={Stores.departmentStore.department?.requireReceveInLab}
                        onChange={(requireReceveInLab) => {
                          onChange(requireReceveInLab)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            requireReceveInLab,
                          })
                        }}
                      />
                    )}
                    name="requireReceveInLab"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Require Scain In"
                        hasError={errors.requireScainIn}
                        value={Stores.departmentStore.department?.requireScainIn}
                        onChange={(requireScainIn) => {
                          onChange(requireScainIn)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            requireScainIn,
                          })
                        }}
                      />
                    )}
                    name="requireScainIn"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Toggle
                        label="Routing Dept"
                        hasError={errors.routingDept}
                        value={Stores.departmentStore.department?.routingDept}
                        onChange={(routingDept) => {
                          onChange(routingDept)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            routingDept,
                          })
                        }}
                      />
                    )}
                    name="routingDept"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </LibraryComponents.Atoms.Grid>
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
                    <LibraryComponents.Atoms.Form.MultilineInput
                      rows={2}
                      label="FYI line"
                      placeholder={
                        errors.fyiLine ? "Please Enter fyiLine" : "fyiLine"
                      }
                      hasError={errors.fyiLine}
                      value={Stores.departmentStore.department?.fyiLine}
                      onChange={(fyiLine) => {
                        onChange(fyiLine)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          fyiLine,
                        })
                      }}
                    />
                  )}
                  name="fyiLine"
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.MultilineInput
                      rows={2}
                      label="Work line"
                      placeholder={
                        errors.workLine ? "Please Enter workLine" : "workLine"
                      }
                      hasError={errors.workLine}
                      value={Stores.departmentStore.department?.workLine}
                      onChange={(workLine) => {
                        onChange(workLine)
                        Stores.departmentStore.updateDepartment({
                          ...Stores.departmentStore.department,
                          workLine,
                        })
                      }}
                    />
                  )}
                  name="workLine"
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
                        value={Stores.departmentStore.department?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            status,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {LibraryUtils.lookupItems(
                          stores.routerStore.lookupItems,
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
                  rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                      <select
                        value={Stores.departmentStore.department?.environment}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? "border-red-500  "
                            : "border-gray-300"
                        } rounded-md`}
                        disabled={
                          stores.loginStore.login &&
                          stores.loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          const environment = e.target.value
                          onChange(environment)
                          Stores.departmentStore.updateDepartment({
                            ...Stores.departmentStore.department,
                            environment,
                          })
                          Stores.departmentStore.DepartmentService.checkExitsLabEnvCode(
                            Stores.departmentStore.department?.code || "",
                            environment,
                            Stores.departmentStore.department?.lab || ""
                          ).then((res) => {
                            if (res.success) {
                              Stores.departmentStore.setExitsCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.message}`,
                              })
                            } else Stores.departmentStore.setExitsCode(false)
                          })
                        }}
                      >
                        <option selected>
                          {stores.loginStore.login &&
                          stores.loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : Stores.departmentStore.department?.environment ||
                              `Select`}
                        </option>
                        {LibraryUtils.lookupItems(
                          stores.routerStore.lookupItems,
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
              </LibraryComponents.Atoms.List>
            </LibraryComponents.Atoms.Grid>
            <br />

            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icon.Save}
                onClick={handleSubmit(onSubmitDepartment)}
              >
                Save
              </LibraryComponents.Atoms.Buttons.Button>
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Atoms.Icon.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-auto">
            <FeatureComponents.Molecules.DepartmentList
              data={Stores.departmentStore.listDepartment || []}
              totalSize={Stores.departmentStore.listDepartmentCount}
              extraData={{
                lookupItems: stores.routerStore.lookupItems,
              }}
              isDelete={RouterFlow.checkPermission(
                stores.routerStore.userPermission,
                "Delete"
              )}
              isEditModify={RouterFlow.checkPermission(
                stores.routerStore.userPermission,
                "Edit/Modify"
              )}
              onDelete={(selectedItem) => setModalConfirm(selectedItem)}
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
                  body: `Update department!`,
                })
              }}
              onPageSizeChange={(page, limit) => {
                Stores.departmentStore.fetchListDepartment(page, limit)
              }}
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                Stores.departmentStore.DepartmentService.deletedepartment(
                  modalConfirm.id
                ).then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Department deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.departmentStore.fetchListDepartment()
                  }
                })
              } else if (type === "Update") {
                Stores.departmentStore.DepartmentService.updateSingleFiled(
                  modalConfirm.data
                ).then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Department updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.departmentStore.fetchListDepartment()
                    window.location.reload()
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

export default Department
