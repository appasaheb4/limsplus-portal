/* eslint-disable */
import React, {  useState,useMemo } from "react"
import { observer } from "mobx-react"
import {Toast,Header,PageHeading,PageHeadingLabDetails,Buttons,Grid,List
  ,Form,Svg,ModalConfirm} 
  from "@/library/components"
import { SalesTeamList } from "../components"
import {lookupItems,lookupValue} from "@/library/utils"

import * as Utils from "../util"
import {SalesTeamHoc} from "../hoc"
import { useForm, Controller } from "react-hook-form"
import {  useStores } from "@/stores"
import {AutoCompleteFilterSingleSelectSalesTerrority
  ,AutoCompleteFilterSingleSelectEmpolyeCode,
  AutoCompleteFilterSingleSelectReportingTo
} 
from "../components"
import { RouterFlow } from "@/flows"

export const SalesTeam = SalesTeamHoc(observer(() => {
  const {
    loginStore,
    userStore,
    salesTeamStore,
    administrativeDivisions,
    routerStore,
    loading
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("environment", loginStore.login.environment)
  setValue("environment", salesTeamStore.salesTeam?.environment)
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  const onSubmitSalesTeam = () => {
    if (!salesTeamStore.checkExistsEnvCode) {
      salesTeamStore.salesTeamService
        .addSalesTeam({ input: { ...salesTeamStore.salesTeam } })
        .then((res) => {
          if (res.createSalesTeam.success) {
            Toast.success({
              message: `😊 ${res.createSalesTeam.message}`,
            })
          }
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
    } else {
      Toast.warning({
        message: `😔 Please use diff emp code`,
      })
    }
  }

  const tableView = useMemo(
    ()=>(
      <SalesTeamList
            data={salesTeamStore.listSalesTeam || []}
            totalSize={salesTeamStore.listSalesTeamCount}
            extraData={{
              lookupItems: routerStore.lookupItems,
              listAdministrativeDiv: administrativeDivisions.listAdministrativeDiv,
              userList: userStore.userList,
              userStore: userStore,
              filterUsersItems: Utils.filterUsersItems,
            }}
            isDelete={RouterFlow.checkPermission(
              routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              routerStore.userPermission,
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
            onFilter={(type, filter, page, limit) => {
              salesTeamStore.salesTeamService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),[salesTeamStore.listSalesTeam]
  )



  return (
    <>
      <Header>
        <PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(routerStore.userPermission, "Add") && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "hidden" : "shown")
          }
        >
          <Grid cols={2}>
            <List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Sales Hierarchy"
                    hasError={errors.salesHierarchy}
                  >
                    <select
                    value={salesTeamStore.salesTeam?.salesHierarchy}
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
                      {lookupItems(
                        routerStore.lookupItems,
                        "SALES_HIERARCHY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="salesHierarchy"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Sales Territory"
                    hasError={errors.salesTerritory}
                  >
                    <AutoCompleteFilterSingleSelectSalesTerrority
                    onSelect={(item)=>{
                      salesTeamStore.updateSalesTeam({
                        ...salesTeamStore.salesTeam,
                        salesTerritory:item.country
                      })
                    }}
                    />
                  </Form.InputWrapper>
                )}
                name="salesTerritory"
                rules={{ required: false }}
                defaultValue=""
              />

              {userStore && userStore.userList && (
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.InputWrapper
                      label="Employee code"
                      hasError={errors.empDetails}
                    >
                      <AutoCompleteFilterSingleSelectEmpolyeCode
                      onSelect={(item)=>{
                        onChange(item.empCode)
                          setValue("empName", item.fullName)
                          salesTeamStore.updateSalesTeam({
                            ...salesTeamStore.salesTeam,
                            empCode: item.empCode,
                            empName: item.fullName,
                          })
                          salesTeamStore.salesTeamService
                            .checkExistsEnvCode({
                              input: {
                                code: item.empCode,
                                env: salesTeamStore.salesTeam?.environment,
                              },
                            })
                            .then((res) => {
                              if (res.checkSalesTeamsExistsRecord.success) {
                                salesTeamStore.updateExistsEnvCode(true)
                                Toast.error({
                                  message: `😔 ${res.checkSalesTeamsExistsRecord.message}`,
                                })
                              } else salesTeamStore.updateExistsEnvCode(false)
                            })
                      }}
                      />
                    </Form.InputWrapper>
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
            </List>
            <List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
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
                  <Form.InputWrapper
                    label="Reporting To"
                    hasError={errors.userDetials}
                  >
                   <AutoCompleteFilterSingleSelectReportingTo
                   onSelect={(item)=>{
                    onChange(item.code)
                    salesTeamStore.updateSalesTeam({
                      ...salesTeamStore.salesTeam,
                      reportingTo:item.empCode
                    })
                   }}
                   />
                  </Form.InputWrapper>
                )}
                name="userDetials"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper label="Environment">
                    <select
                      value={salesTeamStore.salesTeam?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      disabled={
                        loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
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
                              Toast.error({
                                message: `😔 ${res.checkSalesTeamsExistsRecord.message}`,
                              })
                            } else salesTeamStore.updateExistsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {loginStore.login &&
                        loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : salesTeamStore.salesTeam?.environment || `Select`}
                      </option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="environment"
                rules={{ required: true }}
                defaultValue=""
              />
            </List>
          </Grid>
          <br />
          <List direction="row" space={3} align="center">
            <Buttons.Button
              size="medium"
              type="solid"
              icon={Svg.Save}
              onClick={handleSubmit(onSubmitSalesTeam)}
            >
              Save
            </Buttons.Button>
            <Buttons.Button
              size="medium"
              type="outline"
              icon={Svg.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </Buttons.Button>
          </List>
        </div>
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">
          {tableView}
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              salesTeamStore.salesTeamService
                .deleteSalesTeam({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeSalesTeam.success) {
                    Toast.success({
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
                    Toast.success({
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
}))
export default SalesTeam
