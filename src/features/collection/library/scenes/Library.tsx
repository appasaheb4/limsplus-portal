/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { LibraryList } from "../components"

import { useForm, Controller } from "react-hook-form"

import * as Models from "../models"
//import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/library/stores"
import { Stores as PanelMasterStore } from "@lp/features/collection/masterPanel/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

export const Library = observer(() => {
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
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
          Stores.libraryStore.updateLibrary({
            ...Stores.libraryStore.library,
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

  const onSubmitLibrary = (data) => {
    console.log("click")
    console.log({ data })
    Stores.libraryStore.libraryService
      .addLibrary(Stores.libraryStore.library)
      .then(() => {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 Library created.`,
        })
      })
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(stores.routerStore.userPermission),
        "Add"
      ) && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")}
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
                    label="Code"
                    placeholder={errors.code ? "Please enter code" : "Code"}
                    value={Stores.libraryStore.library?.code}
                    hasError={errors.code}
                    onChange={(code) => {   
                      onChange(code)
                      Stores.libraryStore.updateLibrary({
                        ...Stores.libraryStore.library,
                        code,
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                placeholder={errors.description?"Please Enter description":"Description"}
                hasError={errors.description}
                value={Stores.libraryStore.library?.description}
                onChange={(description) => {
                  onChange(description)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Usage Type" hasError={errors.usageType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.usageType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const usageType = e.target.value
                    onChange(usageType)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      usageType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "USAGE_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="usageType"
               rules={{ required: false }}
               defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Library Type" hasError={errors.libraryType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.libraryType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const libraryType = e.target.value
                    onChange(libraryType)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      libraryType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "LIBRARY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="libraryType"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Comment Type" hasError={errors.commentType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.commentType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const commentType = e.target.value
                    onChange(commentType)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      commentType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "COMMENT_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="commentType"
               rules={{ required: false }}
               defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab" hasError={errors.lab}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.lab
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const lab = e.target.value
                    onChange(lab)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      lab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStores.labStore.listLabs &&
                    LabStores.labStore.listLabs.map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.code} - ${item.name}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="lab"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Department" hasError={errors.department}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.department
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const department = e.target.value
                    onChange(department)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      department,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment &&
                    DepartmentStore.departmentStore.listDepartment.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="department"
               rules={{ required: false }}
               defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Comments Target" hasError={errors.commentsTarget}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.commentsTarget
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const commentsTarget = e.target.value
                    onChange(commentsTarget)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      commentsTarget,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "COMMENTS_TARGET").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="commentsTarget"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Details"
                placeholder={errors.details?"Please Enter Details":"Detials"}
                hasError={errors.details}
                value={Stores.libraryStore.library?.details}
                onChange={(details) => {
                  onChange(details)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    details,
                  })
                }}
              />
              )}
              name="details"
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Parameter" hasError={errors.parameter}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.parameter
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const parameter = e.target.value
                    onChange(parameter)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      parameter,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "PARAMETER").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="parameter"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Action" hasError={errors.action}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.action
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const action = e.target.value
                    onChange(action)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      action,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "ACTION").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="action"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Results" hasError={errors.results}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.results
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const results = e.target.value
                    onChange(results)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      results,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "RESULTS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="results"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Value"
                placeholder={errors.value?"Please Enter value":"Value"}
                hasError={errors.value}
                value={Stores.libraryStore.library?.value}
                onChange={(value) => {
                  onChange(value)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Reflex" hasError={errors.reflex}>
                <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                  placeholder="Search by panel name or panel code"
                  data={{
                    defulatValues: [],
                    list: PanelMasterStore.masterPanelStore.listMasterPanel || [],
                    displayKey: ["panelName", "panelCode"],
                    findKey: ["panelName", "panelCode"],
                  }}
                  onUpdate={(items) => {
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      reflex: items,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="reflex"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Analyte"
                placeholder={errors.analyte?"Please Enter analyte":"Analyte"}
                hasError={errors.analyte}
                value={Stores.libraryStore.library?.analyte}
                onChange={(analyte) => {
                  onChange(analyte)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
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
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Rule"
                placeholder={errors.rule?"Please Enter rule":"Rule"}
                hasError={errors.rule}
                value={Stores.libraryStore.library?.rule}
                onChange={(rule) => {
                  onChange(rule)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.status
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
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
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Toggle
                label="AbNormal"
                hasError={errors.abNormal}
                value={Stores.libraryStore.library?.abNormal}
                onChange={(abNormal) => {
                  onChange(abNormal)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    abNormal,
                  })
                }}
              />
              )}
              name="abNormal"
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
                label="Organism Group"
                placeholder={errors.organismGroup?"Please Enter organismGroup":"Organism Group"}
                hasError={errors.organismGroup}
                value={Stores.libraryStore.library?.organismGroup}
                onChange={(organismGroup) => {
                  onChange(organismGroup)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
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
              <LibraryComponents.Atoms.Form.Input
                label="Organism Class"
                placeholder={errors.organismClass?"Please Enter organismClass":"Organism Class"}
                hasError={errors.organismClass}
                value={Stores.libraryStore.library?.organismClass}
                onChange={(organismClass) => {
                  onChange(organismClass)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
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
              <LibraryComponents.Atoms.Form.Input
                label="LO Age"
                placeholder={errors.loAge?"Please Enter loAge":"LO Age"}
                hasError={errors.loAge}
                value={Stores.libraryStore.library?.loAge}
                onChange={(loAge) => {
                  onChange(loAge)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    loAge,
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
              <LibraryComponents.Atoms.Form.Input
                label="HI Age"
                placeholder={errors.hiAge?"Please Enter hiAge":"HI Age"}
                hasError={errors.hiAge}
                value={Stores.libraryStore.library?.hiAge}
                onChange={(hiAge) => {
                  onChange(hiAge)
                  Stores.libraryStore.updateLibrary({
                    ...Stores.libraryStore.library,
                    hiAge,
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Sex" hasError={errors.sex}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.sex
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const sex = e.target.value
                    onChange(sex)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      sex,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SEX").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sex"
              rules={{ required: false }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Sex Action" hasError={errors.sexAction}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.sexAction
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const sexAction = e.target.value
                    onChange(sexAction)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      sexAction,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SEX_ACTION").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sexAction"
              rules={{ required: false }}
              defaultValue=""
            />
             <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment" hasError={errors.environment}>
                <select
                  value={Stores.libraryStore.library?.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.libraryStore.updateLibrary({
                      ...Stores.libraryStore.library,
                      environment,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
              onClick={handleSubmit(onSubmitLibrary)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <LibraryList
            data={Stores.libraryStore.listLibrary || []}
            extraData={{
              listLookup:LookupStore.lookupStore.listLookup,
              library:Stores.libraryStore.library,
              listLabs:LabStores.labStore.listLabs,
              listDepartment:DepartmentStore.departmentStore.listDepartment,
              listMasterPanel:PanelMasterStore.masterPanelStore.listMasterPanel,
              updateLibraryStore: Stores.libraryStore.updateLibrary,
              lookupItems: stores.routerStore.lookupItems
            }}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.libraryStore.libraryService
                .deleteLibrary(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Library deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.libraryStore.fetchLibrary()
                  }
                })
            } else if (type === "Update") {
              Stores.libraryStore.libraryService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Library updated.`,
                    })
                    setModalConfirm({ show: false })
                    window.location.reload()
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
})

export default Library
