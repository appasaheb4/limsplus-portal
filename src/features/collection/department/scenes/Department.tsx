/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Container } from "reactstrap"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

export const Department = observer(() => {
  const {
    loginStore,
    labStore,
    userStore,
    departmentStore,
    routerStore,
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()

  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddDepartment, setHideAddDepartment] = useState<boolean>(true)

  useEffect(() => {
    reset()
  }, [labStore.listLabs, userStore && userStore.userList])

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      departmentStore.updateDepartment({
        ...departmentStore.department,
        lab: loginStore.login.lab,
        environment: loginStore.login.environment,
      })
      setValue("lab", loginStore.login.lab)
      setValue("environment", loginStore.login.environment)
    }
  }, [loginStore.login])
  const onSubmitDepartment = () => {
    if (!departmentStore.checkExitsCode) {
      departmentStore.DepartmentService.adddepartment({
        input: {
          ...departmentStore.department,
        },
      }).then((res) => {
        if (res.createDepartment.success) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 ${res.createDepartment.message}`,
          })
        }
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
            title={routerStore.selectedComponents?.title || ""}
          />
          <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
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
                        value={departmentStore.department?.lab}
                        disabled={
                          loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.lab ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const lab = e.target.value
                          onChange(lab)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            lab,
                          })
                          departmentStore.DepartmentService.checkExitsLabEnvCode({
                            input: {
                              code: departmentStore.department?.code,
                              env: departmentStore.department?.environment,
                              lab,
                            },
                          }).then((res) => {
                            if (res.checkDepartmentExistsRecord.success) {
                              departmentStore.setExitsCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkDepartmentExistsRecord.message}`,
                              })
                            } else departmentStore.setExitsCode(false)
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {labStore.listLabs.map((item: any) => (
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
                      value={departmentStore.department?.code}
                      onChange={(code) => {
                        onChange(code)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          code: code.toUpperCase(),
                        })
                      }}
                      onBlur={(code) => {
                        departmentStore.DepartmentService.checkExitsLabEnvCode({
                          input: {
                            code,
                            env: departmentStore.department?.environment,
                            lab: departmentStore.department?.lab,
                          },
                        }).then((res) => {
                          if (res.checkDepartmentExistsRecord.success) {
                            departmentStore.setExitsCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkDepartmentExistsRecord.message}`,
                            })
                          } else departmentStore.setExitsCode(false)
                        })
                      }}
                    />
                  )}
                  name="code"
                  rules={{ required: true }}
                  defaultValue=""
                />
                {departmentStore.checkExitsCode && (
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
                      value={departmentStore.department?.name}
                      onChange={(name) => {
                        onChange(name)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          name: name.toUpperCase(),
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
                      value={departmentStore.department?.shortName}
                      onChange={(shortName) => {
                        onChange(shortName)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
                          shortName: shortName.toUpperCase(),
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
                          errors.hod ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const hod = e.target.value
                          onChange(hod)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            hod,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {userStore &&
                          userStore.userList &&
                          userStore.userList.map((item: any, key: number) => (
                            <option key={key} value={item.fullName}>
                              {item.fullName}
                            </option>
                          ))}
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
                      value={departmentStore.department?.mobileNo}
                      onChange={(mobileNo) => {
                        onChange(mobileNo)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
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
                      value={departmentStore.department?.contactNo}
                      onChange={(contactNo) => {
                        onChange(contactNo)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
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
                      value={departmentStore.department?.openingTime}
                      onChange={(openingTime) => {
                        onChange(openingTime)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
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
                      value={departmentStore.department?.closingTime}
                      onChange={(closingTime) => {
                        onChange(closingTime)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
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
                        value={departmentStore.department?.autoRelease}
                        onChange={(autoRelease) => {
                          onChange(autoRelease)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                        value={departmentStore.department?.requireReceveInLab}
                        onChange={(requireReceveInLab) => {
                          onChange(requireReceveInLab)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                        value={departmentStore.department?.requireScainIn}
                        onChange={(requireScainIn) => {
                          onChange(requireScainIn)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                        value={departmentStore.department?.routingDept}
                        onChange={(routingDept) => {
                          onChange(routingDept)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                      value={departmentStore.department?.fyiLine}
                      onChange={(fyiLine) => {
                        onChange(fyiLine)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
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
                      value={departmentStore.department?.workLine}
                      onChange={(workLine) => {
                        onChange(workLine)
                        departmentStore.updateDepartment({
                          ...departmentStore.department,
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
                        value={departmentStore.department?.status}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const status = e.target.value
                          onChange(status)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
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
                    <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                      <select
                        value={departmentStore.department?.environment}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        disabled={
                          loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          const environment = e.target.value
                          onChange(environment)
                          departmentStore.updateDepartment({
                            ...departmentStore.department,
                            environment,
                          })
                          departmentStore.DepartmentService.checkExitsLabEnvCode({
                            input: {
                              code: departmentStore.department?.code,
                              env: environment,
                              lab: departmentStore.department?.lab,
                            },
                          }).then((res) => {
                            if (res.checkDepartmentExistsRecord.success) {
                              departmentStore.setExitsCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkDepartmentExistsRecord.message}`,
                              })
                            } else departmentStore.setExitsCode(false)
                          })
                        }}
                      >
                        <option selected>
                          {loginStore.login && loginStore.login.role !== "SYSADMIN"
                            ? `Select`
                            : departmentStore.department?.environment || `Select`}
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
              data={departmentStore.listDepartment || []}
              totalSize={departmentStore.listDepartmentCount}
              extraData={{
                lookupItems: routerStore.lookupItems,
              }}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                "Delete"
              )}
              isEditModify={RouterFlow.checkPermission(
                routerStore.userPermission,
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
                departmentStore.fetchListDepartment(page, limit)
              }}
            />
          </div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "Delete") {
                departmentStore.DepartmentService.deletedepartment({
                  input: { id: modalConfirm.id },
                }).then((res: any) => {
                  if (res.removeDepartment.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeDepartment.message}`,
                    })
                    setModalConfirm({ show: false })
                    departmentStore.fetchListDepartment()
                  }
                })
              } else if (type === "Update") {
                departmentStore.DepartmentService.updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                }).then((res: any) => {
                  if (res.updateDepartment.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateDepartment.message}`,
                    })
                    setModalConfirm({ show: false })
                    departmentStore.fetchListDepartment()
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
