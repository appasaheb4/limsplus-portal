/* eslint-disable */
import React, { useState, useEffect,useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { SectionList } from "../components/molecules"

import { useStores, stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"

const Section = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const { loginStore, sectionStore, departmentStore,routerStore,loading } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      sectionStore.updateSection({
        ...sectionStore.section,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])

  useEffect(()=>{
    const status = routerStore.lookupItems
    .find((fileds) => {
      return fileds.fieldName === "STATUS"
    })
    ?.arrValue?.find((statusItem) => statusItem.code === "A")
  if (status) {
    sectionStore && sectionStore.updateSection({
        ...sectionStore.section,
        status: status.code as string,
      })
    setValue("status", status.code as string)
  }
  const environment = routerStore.lookupItems.find((fileds)=>{
    return fileds.fieldName === 'ENVIRONMENT'
  })?. arrValue?.find((environmentItem)=>environmentItem.code === 'P')
  if(environment){
    sectionStore && sectionStore.updateSection({
      ...sectionStore.section,
      environment: environment.code as string
    })
    setValue("environment",environment.code as string)
  }
  },[routerStore.lookupItems])

  const onSubmitSection = () => {
    if (!sectionStore.checkExitsEnvCode) {
      sectionStore.sectionService
        .addSection({ input: { ...sectionStore.section } })
        .then((res) => {
          if (res.createSection.success) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 ${res.createSection.message}`,
            })
          } else {
            LibraryComponents.Atoms.Toast.error({
              message: `😔 Please try again`,
            })
          }
        })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.error({
        message: `😔 Please enter diff code`,
      })
    }
  }

  const tableView = useMemo(
    ()=>(
      <SectionList
            data={sectionStore.listSection || []}
            totalSize={sectionStore.listSectionCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems,
              listDepartment:departmentStore.listDepartment
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
                body: `Update Section!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              sectionStore.fetchSections(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              sectionStore.sectionService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),
    [sectionStore.listSection]
  )

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
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "hidden" : "shown")
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
                    label="Department Code"
                    hasError={errors.departmentCode}
                  >
                    <LibraryComponents.Molecules.AutoCompleteFilterSingleSelect
                    loader={loading}
                    data={{
                      list:departmentStore.listDepartment,
                      displayKey: "name",
                      findKey: "name",
                    }}
                    hasError={errors.name}
                    onFilter={(value: string) => {
                      departmentStore.DepartmentService.filter(
                        {
                          input: {
                            filter: {
                              type: "search",
                              ["name"]: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.name)
                    sectionStore.updateSection({
                      ...sectionStore.section,
                      departmentCode:item.code
                    })
                      departmentStore.updateDepartmentList(
                        departmentStore.listDepartmentCopy
                      )
                      
                    }}
                    />
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="departmentCode"
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
                    value={sectionStore.section?.code}
                    onChange={(code) => {
                      onChange(code)
                      sectionStore.updateSection({
                        ...sectionStore.section,
                        code: code.toUpperCase(),
                      })
                    }}
                    onBlur={(code) => {
                      sectionStore.sectionService
                        .checkExitsEnvCode({
                          input: {
                            code,
                            env: sectionStore.section?.environment,
                          },
                        })
                        .then((res) => {
                          if (res.checkSectionExistsRecord.success) {
                            sectionStore.setExitsEnvCode(true)
                            LibraryComponents.Atoms.Toast.error({
                              message: `😔 ${res.checkSectionExistsRecord.message}`,
                            })
                          } else sectionStore.setExitsEnvCode(false)
                        })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
              {sectionStore.checkExitsEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Name"
                    hasError={errors.name}
                    placeholder={errors.name ? "Please Enter Name" : "Name"}
                    value={sectionStore.section?.name}
                    onChange={(name) => {
                      onChange(name)
                      sectionStore.updateSection({
                        ...sectionStore.section,
                        name,
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
                      errors.shortName ? "Please Enter shortName" : "Short Name"
                    }
                    hasError={errors.shortName}
                    value={sectionStore.section?.shortName}
                    onChange={(shortName) => {
                      onChange(shortName)
                      sectionStore.updateSection({
                        ...sectionStore.section,
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
                  <LibraryComponents.Atoms.Form.Input
                    label="Section In Charge"
                    placeholder={
                      errors.sectionInCharge
                        ? "Please Enter sectionInCharge"
                        : "Section In Charge"
                    }
                    hasError={errors.sectionInCharge}
                    value={sectionStore.section?.sectionInCharge}
                    onChange={(sectionInCharge) => {
                      onChange(sectionInCharge)
                      sectionStore.updateSection({
                        ...sectionStore.section,
                        sectionInCharge,
                      })
                    }}
                  />
                )}
                name="sectionInCharge"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Mobile No"
                    placeholder={
                      errors.mobieNo ? "Please Enter mobile no" : "Mobile No"
                    }
                    value={sectionStore.section?.mobileNo}
                    hasError={errors.mobieNo}
                    onChange={(mobileNo) => {
                      onChange(mobileNo)
                      sectionStore.updateSection({
                        ...sectionStore.section,
                        mobileNo,
                      })
                    }}
                  />
                )}
                name="mobieNo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Contact No"
                    placeholder={
                      errors.contactNo ? "Please Enter contactNo" : "Contact No"
                    }
                    hasError={errors.contactNo}
                    value={sectionStore.section?.contactNo}
                    onChange={(contactNo) => {
                      onChange(contactNo)
                      sectionStore.updateSection({
                        ...sectionStore.section,
                        contactNo,
                      })
                    }}
                  />
                )}
                name="contactNo"
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
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={3}
                    label="FYI line"
                    placeholder={
                      errors.fyiLine ? "Please Enter fyiLine" : "FYI line"
                    }
                    value={sectionStore.section?.fyiLine}
                    onChange={(fyiLine) => {
                      onChange(fyiLine)
                      sectionStore.updateSection({
                        ...sectionStore.section,
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
                    rows={3}
                    label="Work line"
                    placeholder={
                      errors.workLine ? "Please Enter workLine" : "Work line"
                    }
                    hasError={errors.workLine}
                    value={sectionStore.section?.workLine}
                    onChange={(workLine) => {
                      onChange(workLine)
                      sectionStore.updateSection({
                        ...sectionStore.section,
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
                      value={sectionStore.section?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        sectionStore.updateSection({
                          ...sectionStore.section,
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
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={sectionStore.section?.environment}
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
                        sectionStore.updateSection({
                          ...sectionStore.section,
                          environment,
                        })
                        sectionStore.sectionService
                          .checkExitsEnvCode({
                            input: {
                              code: sectionStore.section?.code,
                              env: environment,
                            },
                          })
                          .then((res) => {
                            if (res.checkSectionExistsRecord.success) {
                              sectionStore.setExitsEnvCode(true)
                              LibraryComponents.Atoms.Toast.error({
                                message: `😔 ${res.checkSectionExistsRecord.message}`,
                              })
                            } else sectionStore.setExitsEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : sectionStore.section?.environment || `Select`}
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
              onClick={handleSubmit(onSubmitSection)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {tableView}
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              sectionStore.sectionService
                .deleteSection({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeSection.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.removeSection.message}`,
                    })
                    setModalConfirm({ show: false })
                    sectionStore.fetchSections()
                  }
                })
            } else if (type === "Update") {
              sectionStore.sectionService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateSection.success) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 ${res.updateSection.message}`,
                    })
                    setModalConfirm({ show: false })
                    sectionStore.fetchSections()
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

export default Section
