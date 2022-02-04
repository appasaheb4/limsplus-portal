/* eslint-disable */
import React, { useEffect, useState,useMemo } from "react"
import { observer } from "mobx-react"
import {Toast,Header,PageHeading,PageHeadingLabDetails,Buttons,Grid,List
  ,Form,Svg,ModalConfirm,AutoCompleteFilterSingleSelect,AutoCompleteCheckMultiFilterKeys} 
  from "@lp/library/components"
import {lookupItems} from "@lp/library/utils"
import { LibraryList } from "../components"

import { useForm, Controller } from "react-hook-form"
import {LibraryHoc} from "../hoc"
import { useStores } from "@lp/stores"
import {AutoCompleteFilterSingleSelectDepartment} from "../components"
import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const Library = LibraryHoc(observer(() => {
  const {
    loginStore,
    libraryStore,
    labStore,
    departmentStore,
    masterPanelStore,
    lookupStore,
    routerStore,
    loading
  } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  setValue("lab", loginStore.login.lab)
  setValue("environment", loginStore.login.environment)
  setValue("status", libraryStore.library?.status)
  setValue("environment",libraryStore.library?.environment)

  const onSubmitLibrary = (data) => {
    if (!libraryStore.checkExistsLabEnvCode) {
      libraryStore.libraryService
        .addLibrary({ input: { ...libraryStore.library } })
        .then((res) => {
          if (res.createLibrary.success) {
            Toast.success({
              message: `😊 ${res.createLibrary.message}`,
            })
          }
        })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      Toast.warning({
        message: `😔 Please enter diff code`,
      })
    }
  }

  const tableView = useMemo(
    ()=>(
      <LibraryList
            data={libraryStore.listLibrary || []}
            totalSize={libraryStore.listLibraryCount}
            extraData={{
              listLookup: lookupStore.listLookup,
              library: libraryStore.library,
              listLabs: labStore.listLabs,
              listDepartment: departmentStore.listDepartment,
              listMasterPanel: masterPanelStore.listMasterPanel,
              updateLibraryStore: libraryStore.updateLibrary,
              lookupItems: routerStore.lookupItems,
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
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
                body: `Update item!`,
              })
            }}
            onVersionUpgrade={(item) => {
              setModalConfirm({
                show: true,
                type: "versionUpgrade",
                data: item,
                title: "Are you version upgrade?",
                body: `Version upgrade this record`,
              })
            }}
            onDuplicate={(item) => {
              setModalConfirm({
                show: true,
                type: "duplicate",
                data: item,
                title: "Are you duplicate?",
                body: `Duplicate this record`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              libraryStore.fetchLibrary(page, limit)
            }}
            onFilter={(type, filter, page, limit) => {
              libraryStore.libraryService.filter({
                input: { type, filter, page, limit },
              })
            }}
          />
    ),[libraryStore.listLibrary]
  )

  return (
    <>
      <Header>
        <PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "hidden" : "shown")}
        >
          <Grid cols={3}>
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
                    label="Code"
                    placeholder={errors.code ? "Please enter code" : "Code"}
                    value={libraryStore.library?.code}
                    hasError={errors.code}
                    onChange={(code) => {
                      onChange(code)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        code,
                      })
                    }}
                    onBlur={(code) => {
                      libraryStore.libraryService
                        .checkExistsLabEnvCode({
                          input: {
                            code,
                            env: libraryStore.library?.environment,
                            lab: libraryStore.library?.lab,
                          },
                        })
                        .then((res) => {
                          if (res.checkLibrarysExistsRecord.success) {
                            libraryStore.updateExistsLabEnvCode(true)
                            Toast.error({
                              message: `😔 ${res.checkLibrarysExistsRecord.message}`,
                            })
                          } else libraryStore.updateExistsLabEnvCode(false)
                        })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
              {libraryStore.checkExistsLabEnvCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.MultilineInput
                    rows={3}
                    label="Description"
                    placeholder={
                      errors.description ? "Please Enter description" : "Description"
                    }
                    hasError={errors.description}
                    value={libraryStore.library?.description}
                    onChange={(description) => {
                      onChange(description)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        description,
                      })
                    }}
                  />
                )}
                name="description"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Usage Type"
                    hasError={errors.usageType}
                  >
                    <select
                    value={libraryStore.library?.usageType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.usageType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const usageType = e.target.value
                        onChange(usageType)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          usageType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "USAGE_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="usageType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Library Type"
                    hasError={errors.libraryType}
                  >
                    <select
                    value={libraryStore.library?.libraryType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.libraryType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const libraryType = e.target.value
                        onChange(libraryType)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          libraryType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "LIBRARY_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="libraryType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Comment Type"
                    hasError={errors.commentType}
                  >
                    <select
                    value={libraryStore &&libraryStore.library?.commentType}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.commentType ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const commentType = e.target.value
                        onChange(commentType)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          commentType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "COMMENT_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="commentType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Lab"
                    hasError={errors.lab}
                  >
                    <AutoCompleteFilterSingleSelect
                    loader={loading}
                    placeholder="Search by name"
                    disable={
                      loginStore.login &&
                      loginStore.login.role !== "SYSADMIN"
                        ? true
                        : false
                    }
                    data={{
                      list:labStore.listLabs,
                      displayKey: "name",
                      findKey: "name",
                    }}
                    hasError={errors.name}
                    onFilter={(value: string) => {
                      labStore.LabService.filter(
                        {
                          input: {
                            type: "filter",
                            filter: {
                              name: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        }
                      )
                    }}
                    onSelect={(item) => {
                      onChange(item.name)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        lab:item.code,
                      })
                      labStore.updateLabList(
                        labStore.listLabsCopy
                      )
                      libraryStore.libraryService
                        .checkExistsLabEnvCode({
                          input: {
                            code: libraryStore.library.code,
                            env: libraryStore.library?.environment,
                            lab:item.code,
                          },
                        })
                        .then((res) => {
                          if (res.checkLibrarysExistsRecord.success) {
                            libraryStore.updateExistsLabEnvCode(true)
                            Toast.error({
                              message: `😔 ${res.checkLibrarysExistsRecord.message}`,
                            })
                          } else libraryStore.updateExistsLabEnvCode(false)
                        })
                      
                    }}
                    />
                  </Form.InputWrapper>
                )}
                name="lab"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Department"
                    hasError={errors.department}
                  >
                     <AutoCompleteFilterSingleSelectDepartment
                     onSelect={(item)=>{
                       libraryStore.updateLibrary({
                         ...libraryStore.library,
                         department:item.code
                       })
                     }}
                     />
                  </Form.InputWrapper>
                )}
                name="department"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Comments Target"
                    hasError={errors.commentsTarget}
                  >
                    <select
                    value={libraryStore &&libraryStore.library?.commentsTarget}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.commentsTarget
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const commentsTarget = e.target.value
                        onChange(commentsTarget)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          commentsTarget,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "COMMENTS_TARGET"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="commentsTarget"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.MultilineInput
                    rows={3}
                    label="Details"
                    placeholder={errors.details ? "Please Enter Details" : "Detials"}
                    hasError={errors.details}
                    value={libraryStore.library?.details}
                    onChange={(details) => {
                      onChange(details)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        details,
                      })
                    }}
                  />
                )}
                name="details"
                rules={{ required: false }}
                defaultValue=""
              />
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
                  <Form.InputWrapper
                    label="Parameter"
                    hasError={errors.parameter}
                  >
                    <select
                    value={libraryStore.library?.parameter}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.parameter ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const parameter = e.target.value
                        onChange(parameter)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          parameter,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "PARAMETER"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="parameter"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Action"
                    hasError={errors.action}
                  >
                    <select
                    value={libraryStore.library?.action}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.action ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const action = e.target.value
                        onChange(action)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          action,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "ACTION"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="action"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Results"
                    hasError={errors.results}
                  >
                    <select
                    value={libraryStore.library?.results}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.results ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const results = e.target.value
                        onChange(results)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          results,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "RESULTS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="results"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
                    label="Value"
                    placeholder={errors.value ? "Please Enter value" : "Value"}
                    hasError={errors.value}
                    value={libraryStore.library?.value}
                    onChange={(value) => {
                      onChange(value)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        value,
                      })
                    }}
                  />
                )}
                name="value"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Reflex"
                    hasError={errors.reflex}
                  >
                    <AutoCompleteCheckMultiFilterKeys
                      placeholder="Search by panel name or panel code"
                      data={{
                        defulatValues: [],
                        list: masterPanelStore.listMasterPanel || [],
                        displayKey: ["panelName", "panelCode"],
                        findKey: ["panelName", "panelCode"],
                      }}
                      onUpdate={(items) => {
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          reflex: items,
                        })
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name="reflex"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
                    label="Analyte"
                    placeholder={errors.analyte ? "Please Enter analyte" : "Analyte"}
                    hasError={errors.analyte}
                    value={libraryStore.library?.analyte}
                    onChange={(analyte) => {
                      onChange(analyte)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        analyte,
                      })
                    }}
                  />
                )}
                name="analyte"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.MultilineInput
                    rows={3}
                    label="Rule"
                    placeholder={errors.rule ? "Please Enter rule" : "Rule"}
                    hasError={errors.rule}
                    value={libraryStore.library?.rule}
                    onChange={(rule) => {
                      onChange(rule)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        rule,
                      })
                    }}
                  />
                )}
                name="rule"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Status"
                    hasError={errors.status}
                  >
                    <select
                    value={libraryStore && libraryStore.library?.status}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        onChange(status)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          status,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="status"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Toggle
                    label="AbNormal"
                    hasError={errors.abNormal}
                    value={libraryStore.library?.abNormal}
                    onChange={(abNormal) => {
                      onChange(abNormal)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        abNormal,
                      })
                    }}
                  />
                )}
                name="abNormal"
                rules={{ required: false }}
                defaultValue=""
              />
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
                    label="Organism Group"
                    placeholder={
                      errors.organismGroup
                        ? "Please Enter organismGroup"
                        : "Organism Group"
                    }
                    hasError={errors.organismGroup}
                    value={libraryStore.library?.organismGroup}
                    onChange={(organismGroup) => {
                      onChange(organismGroup)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        organismGroup,
                      })
                    }}
                  />
                )}
                name="organismGroup"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
                    label="Organism Class"
                    placeholder={
                      errors.organismClass
                        ? "Please Enter organismClass"
                        : "Organism Class"
                    }
                    hasError={errors.organismClass}
                    value={libraryStore.library?.organismClass}
                    onChange={(organismClass) => {
                      onChange(organismClass)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        organismClass,
                      })
                    }}
                  />
                )}
                name="organismClass"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
                    label="LO Age"
                    placeholder={errors.loAge ? "Please Enter loAge" : "LO Age"}
                    hasError={errors.loAge}
                    value={libraryStore.library?.loAge}
                    onChange={(loAge) => {
                      onChange(loAge)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        loAge: parseInt(loAge),
                      })
                    }}
                  />
                )}
                name="loAge"
                rules={{ required: false }}
                defaultValue=""
              />   
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.Input
                    label="HI Age"
                    placeholder={errors.hiAge ? "Please Enter hiAge" : "HI Age"}
                    hasError={errors.hiAge}
                    value={libraryStore.library?.hiAge}
                    onChange={(hiAge) => {
                      onChange(hiAge)
                      libraryStore.updateLibrary({
                        ...libraryStore.library,
                        hiAge: parseInt(hiAge),
                      })
                    }}
                  />
                )}
                name="hiAge"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Sex"
                    hasError={errors.sex}
                  >
                    <select
                    value={libraryStore.library?.sex}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sex ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sex = e.target.value
                        onChange(sex)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          sex,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(routerStore.lookupItems, "SEX").map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        )
                      )}
                    </select>
                  </Form.InputWrapper>
                )}
                name="sex"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Sex Action"
                    hasError={errors.sexAction}
                  >
                    <select
                    value={libraryStore.library?.sexAction}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sexAction ? "border-red-500  " : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const sexAction = e.target.value
                        onChange(sexAction)
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          sexAction,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "SEX_ACTION"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name="sexAction"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <Form.InputWrapper
                    label="Environment"
                    hasError={errors.environment}
                  >
                    <select
                      value={libraryStore.library?.environment}
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
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          environment,
                        })
                        libraryStore.libraryService
                          .checkExistsLabEnvCode({
                            input: {
                              code: libraryStore.library.code,
                              env: environment,
                              lab: libraryStore.library.lab,
                            },
                          })
                          .then((res) => {
                            if (res.checkLibrarysExistsRecord.success) {
                              libraryStore.updateExistsLabEnvCode(true)
                              Toast.error({
                                message: `😔 ${res.checkLibrarysExistsRecord.message}`,
                              })
                            } else libraryStore.updateExistsLabEnvCode(false)
                          })
                      }}
                    >
                      <option selected>
                        {loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : libraryStore.library?.environment || `Select`}
                      </option>
                      {lookupItems(
                        routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
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
              onClick={handleSubmit(onSubmitLibrary)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          {tableView}
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              libraryStore.libraryService
                .deleteLibrary({ input: { id: modalConfirm.id } })
                .then((res: any) => {
                  if (res.removeLibrary.success) {
                    Toast.success({
                      message: `😊 ${res.removeLibrary.message}`,
                    })
                    setModalConfirm({ show: false })
                    libraryStore.fetchLibrary()
                  }
                })
            } else if (type === "Update") {
              libraryStore.libraryService
                .updateSingleFiled({
                  input: {
                    _id: modalConfirm.data.id,
                    [modalConfirm.data.dataField]: modalConfirm.data.value,
                  },
                })
                .then((res: any) => {
                  if (res.updateLibrary.success) {
                    Toast.success({
                      message: `😊 ${res.updateLibrary.message}`,
                    })
                    setModalConfirm({ show: false })
                    libraryStore.fetchLibrary()
                  }
                })
            }
          }}
          onClose={() => {
            setModalConfirm({ show: false })
          }}
        />
      </div>
    </>
  )
}))

export default Library
