/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { SalesTeamList } from "../components/molecules"
import * as LibraryUtils from "@lp/library/utils"

import * as Utils from "../util"
import { useForm, Controller } from "react-hook-form"
import { stores, useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const SalesTeam = observer(() => {
  const {
    loginStore,
    userStore,
    salesTeamStore,
    administrativeDivisions,
    routerStore
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      salesTeamStore.updateSalesTeam({
        ...salesTeamStore.salesTeam,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  useEffect(()=>{
    const environment = routerStore.lookupItems
      .find((fileds) => {
        return fileds.fieldName === "ENVIRONMENT"
      })
      ?.arrValue?.find((environmentItem) => environmentItem.code === "P")
    if (environment) {
      salesTeamStore &&
      salesTeamStore.updateSalesTeam({
          ...salesTeamStore.salesTeam,
          environment: environment.code as string,
        })
      setValue("environment", environment.code as string)
    }
  },[routerStore.lookupItems])
  const onSubmitSalesTeam = () => {
    if (!salesTeamStore.checkExistsEnvCode) {
      salesTeamStore.salesTeamService
        .addSalesTeam({ input: { ...salesTeamStore.salesTeam } })
        .then((res) => {
          if (res.createSalesTeam.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createSalesTeam.message}`,
            })
          }
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please use diff emp code`,
      })
    }
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2}>
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
                    label="Sales Hierarchy"
                    hasError={errors.salesHierarchy}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.salesHierarchy ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const salesHierarchy = e.target.value
                        onChange(salesHierarchy)
                        salesTeamStore.updateSalesTeam({
                          ...salesTeamStore.salesTeam,
                          salesHierarchy,
                        })
                      }}
                    >
                      <option selected>Select </option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "SALES_HIERARCHY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="salesHierarchy"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Sales Territory"
                    hasError={errors.salesTerritory}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.salesTerritory
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const salesTerritory = JSON.parse(e.target.value)
                        onChange(salesTerritory)
                        salesTeamStore.updateSalesTeam({
                          ...salesTeamStore.salesTeam,
                          salesTerritory,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {administrativeDivisions.listAdministrativeDiv &&
                        administrativeDivisions.listAdministrativeDiv.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.country}-${item.state}-${item.district}-${item.city}-${item.area}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="salesTerritory"
                rules={{ required: false }}
                defaultValue=""
              />

              {userStore && userStore.userList && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Employee code"
                      hasError={errors.empDetails}
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.empDetails ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const userDetials = JSON.parse(e.target.value) as any
                          onChange(userDetials)
                          setValue("empName", userDetials.empName)
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
                            empCode: userDetials.empCode,
                            empName: userDetials.empName,
                          })
                          salesTeamStore.salesTeamService
                            .checkExistsEnvCode({
                              input: {
                                code: userDetials.empCode,
                                env: salesTeamStore.salesTeam?.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkSalesTeamsExistsRecord.success) {
                                salesTeamStore.updateExistsEnvCode(true)
                                LibraryComponents.Atoms.Toast.error({
                                  message: `😔 ${res.checkSalesTeamsExistsRecord.message}`,
                                })
                              } else salesTeamStore.updateExistsEnvCode(false)
                            })
                        }}
                      >
                        <option selected>Select</option>
                        {Utils.filterUsersItems(
                          toJS(userStore && userStore.userList),
                          "role",
                          "code",
                          "SALES"
                        ).map((item: any, index: number) => (
                          <option key={index} value={JSON.stringify(item)}>
                            {`${item.empCode} -${item.empName}`}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  )}
                  name="empDetails"
                  rules={{ required: true }}
                  defaultValue=""
                />
              )}

              {salesTeamStore.checkExistsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
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
                    label="Employee Name"
                    name="txtEmployeeName"
                    placeholder={
                      errors.empName ? "Please Enter EmployeeName" : "Employee Name"
                    }
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.empName ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    hasError={errors.empName}
                    disabled={true}
                    value={salesTeamStore.salesTeam?.empName}
                  />
                )}
                name="userDetials"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Reporting To"
                    hasError={errors.userDetials}
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.userDetials ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const userDetials = JSON.parse(e.target.value) as any
                        onChange(userDetials)
                        salesTeamStore.updateSalesTeam({
                          ...salesTeamStore.salesTeam,
                          reportingTo: userDetials.empCode,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {userStore &&
                        userStore.userList &&
                        Utils.filterUsersItems(
                          userStore.userList,
                          "role",
                          "code",
                          "SALES"
                        ).map((item: any, index: number) => (
                          <option key={index} value={JSON.stringify(item)}>
                            {`${item.empCode} -${item.empName}`}
                          </option>
                        ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="userDetials"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={salesTeamStore.salesTeam?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
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
                        salesTeamStore.updateSalesTeam({
                          ...salesTeamStore.salesTeam,
                          environment,
                        })
                        salesTeamStore.salesTeamService
                          .checkExistsEnvCode({
                            input: {
                              code: salesTeamStore.salesTeam?.empCode,
                              env: environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkSalesTeamsExistsRecord.success) {
                              salesTeamStore.updateExistsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkSalesTeamsExistsRecord.message}`,
                              })
                            } else salesTeamStore.updateExistsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : salesTeamStore.salesTeam?.environment || `Select`}
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
              onClick={handleSubmit(onSubmitSalesTeam)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">
          <SalesTeamList
            data={salesTeamStore.listSalesTeam || []}
            totalSize={salesTeamStore.listSalesTeamCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              listAdministrativeDiv:administrativeDivisions.listAdministrativeDiv,
              userList:userStore.userList,
              userStore:userStore,
              filterUsersItems:Utils.filterUsersItems
            }}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Edit/Modify"
            )}
            // isEditModify={false}
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
                body: `Update Section!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              salesTeamStore.fetchSalesTeam(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              salesTeamStore.salesTeamService
                .deleteSalesTeam({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeSalesTeam.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeSalesTeam.message}`,
                    })
                    setModalConfirm({ show: false })
                    salesTeamStore.fetchSalesTeam()
                  }
                })
            } else if (type === "Update") {
              salesTeamStore.salesTeamService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateSalesTeam.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateSalesTeam.message}`,
                    })
                    setModalConfirm({ show: false })
                    salesTeamStore.fetchSalesTeam()
                  }
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})
export default SalesTeam
