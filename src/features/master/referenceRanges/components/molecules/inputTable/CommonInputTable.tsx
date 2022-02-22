/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import dayjs from "dayjs"
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay,Icons,Buttons} from "@/library/components"
import { lookupItems, getDefaultLookupItem, lookupValue } from "@/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import _ from "lodash"
import { useForm, Controller } from "react-hook-form"
interface CommonInputTableProps {
  data?: any
}

export const CommonInputTable = observer(({ data }: CommonInputTableProps) => {
  const {
    loading,
    refernceRangesStore,
    masterAnalyteStore,
    departmentStore,
    routerStore,
    interfaceManagerStore,
    loginStore,
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()
  setValue("species", refernceRangesStore.referenceRanges?.species)
  setValue("rangeSetOn", refernceRangesStore.referenceRanges?.rangeSetOn)

  const addItem = () => {
    let refRangesInputList = refernceRangesStore.referenceRanges?.refRangesInputList
    refRangesInputList.push({
      rangeId: refernceRangesStore.referenceRanges?.refRangesInputList.length + 1,
      analyteCode: refernceRangesStore.referenceRanges?.analyteCode,
      analyteName: refernceRangesStore.referenceRanges?.analyteName,
      analyteDepartments: refernceRangesStore.referenceRanges?.analyteDepartments,
      department: refernceRangesStore.referenceRanges?.department,
      species: refernceRangesStore.referenceRanges?.species,
      sex: refernceRangesStore.referenceRanges?.sex,
      rangeSetOn: refernceRangesStore.referenceRanges?.rangeSetOn,
      equipmentType: refernceRangesStore.referenceRanges?.equipmentType,
      lab: refernceRangesStore.referenceRanges?.lab,
      picture: refernceRangesStore.referenceRanges?.picture,
      version: 1,
      dateCreation: new Date(),
      dateActive: new Date(),
      dateExpire: new Date(dayjs(new Date()).add(365, "days").format("YYYY-MM-DD")),
      enterBy: loginStore.login.userId,
      status: "A",
      environment: getDefaultLookupItem(routerStore.lookupItems, `ENVIRONMENT`),
      type: "insert",
    })
    refernceRangesStore.updateReferenceRanges({
      ...refernceRangesStore.referenceRanges,
      refRangesInputList,
    })
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <Table striped bordered>
        <thead>
          <tr className="p-0 text-xs">
            <th className="text-white sticky left-0 z-10">Analyte</th>
            <th className="text-white">Department</th>
            <th className="text-white">Species</th>
            <th className="text-white">Sex</th>
            <th className="text-white">Range_Set_On</th>
            <th className="text-white">Equipment_Type</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr>
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.analyte}
                    placeholder="Search by code or name"
                    data={{
                      list: masterAnalyteStore.listMasterAnalyte,
                      displayKey: ["analyteCode", "analyteName"],
                    }}
                    onFilter={(value: string) => {
                      masterAnalyteStore.masterAnalyteService.filterByFields({
                        input: {
                          filter: {
                            fields: ["analyteCode", "analyteName"],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      })
                    }}
                    onSelect={(item) => {
                      onChange(item.analyteCode)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        analyteCode: item.analyteCode,
                        analyteName: item.analyteName,
                        analyteDepartments: item.departments,
                        lab:item.lab,
                        picture: item.picture
                      })
                      masterAnalyteStore.updateMasterAnalyteList(
                        masterAnalyteStore.listMasterAnalyteCopy
                      )
                    }}
                  />
                )}
                name="analyte"
                rules={{ required: true }}
                defaultValue=""
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.department}
                    placeholder="Search by code or name"
                    data={{
                      list: departmentStore.listDepartment.filter((item)=> refernceRangesStore.referenceRanges?.analyteDepartments?.includes(item.code)),
                      displayKey: ["code", "name"],
                    }}
                    disable={refernceRangesStore.referenceRanges?.analyteCode ? false : true}
                    onFilter={(value: string) => {
                      departmentStore.DepartmentService.filterByFields({
                        input: {
                          filter: {
                            fields: ["code", "name"],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      })
                    }}
                    onSelect={(item) => {
                      onChange(item.code)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        department: item.code,
                      })
                      departmentStore.updateDepartmentList(
                        departmentStore.listDepartmentCopy
                      )
                    }}
                  />
                )}
                name="department"
                rules={{ required: true }}
                defaultValue=""
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <select
                    value={refernceRangesStore.referenceRanges?.species}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.species ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const species = e.target.value as string
                      onChange(species)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        species,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(routerStore.lookupItems, "SPECIES").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                )}
                name="species"
                rules={{ required: true }}
                defaultValue=""
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <select
                    value={refernceRangesStore.referenceRanges?.sex}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.sex ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const sex = e.target.value as string
                      onChange(sex)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        sex,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(routerStore.lookupItems, "SEX").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                )}
                name="sex"
                rules={{ required: true }}
                defaultValue=""
              />
            </td>  
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <select
                    value={refernceRangesStore.referenceRanges?.rangeSetOn}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.rangeSetOn ? "border-red-500  " : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const rangeSetOn = e.target.value as string
                      onChange(rangeSetOn)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        rangeSetOn,
                        equipmentType: rangeSetOn === 'L' ? undefined : refernceRangesStore.referenceRanges?.equipmentType,
                        lab:rangeSetOn === 'I' ? undefined : refernceRangesStore.referenceRanges?.lab
                      })
                    }}  
                  > 
                    <option selected>Select</option>
                    {lookupItems(routerStore.lookupItems, "RANGE_SET_ON").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                )}
                name="rangeSetOn"
                rules={{ required: true }}
                defaultValue=""
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    placeholder="Search by instrumentType"
                    hasError={errors.equipmentType}
                    disable={refernceRangesStore.referenceRanges?.rangeSetOn === 'L' ? true: false}
                    data={{
                      list: interfaceManagerStore.listInterfaceManager,
                      displayKey: ["instrumentType"],
                    }}
                    displayValue={refernceRangesStore.referenceRanges?.equipmentType}
                    onFilter={(value: string) => {
                      interfaceManagerStore.interfaceManagerService.filterByFields({
                        input: {
                          filter: {
                            fields: ["instrumentType"],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      })
                    }}
                    onSelect={(item) => {
                      onChange(item.instrumentType)
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        equipmentType: item.instrumentType,
                      })
                      interfaceManagerStore.updateInterfaceManagerList(
                        interfaceManagerStore.listInterfaceManagerCopy
                      )
                    }}
                  />
                )}
                name="equipmentType"
                rules={{ required: false }}
                defaultValue=""
              />
            </td>
           
          </tr>
        </tbody>
      </Table>
      <Buttons.Button
        size="medium"
        type="solid"
        onClick={handleSubmit(addItem)}
      >
        <Icons.EvaIcon icon="plus-circle-outline" />
        {`Add`}
      </Buttons.Button>
    </div>
  )
})
