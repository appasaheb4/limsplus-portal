/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import dayjs from "dayjs"
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
  Form,
} from "@/library/components"
import { lookupItems, lookupValue } from "@/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import _ from "lodash"
import { useForm, Controller } from "react-hook-form"
import { RouterFlow } from "@/flows"

export const PriceListTable = observer(({}) => {
  const {
    loading,
    refernceRangesStore,
    registrationLocationsStore,
    departmentStore,
    routerStore,
  } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm()

  const [priceGroup, setPriceGroup] = useState<any>()

  useEffect(() => {
    ;(async function () {
      try {
        RouterFlow.getLookupValuesByPathNField(
          "/collection/priceList",
          "PRICE_GROUP"
        ).then((res) => {
          setPriceGroup(res)
        })
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <div className="flex flex-row gap-2 items-center overflow-auto">
      <Table striped bordered>
        <thead>
          <tr className="p-0 text-xs">
            <th className="text-white" style={{ minWidth: 150 }}>
              Price Group
            </th>
            <th className="text-white" style={{ minWidth: 150 }}>
              Price List
            </th>
            <th className="text-white" style={{ minWidth: 150 }}>
              Description
            </th>
            <th className="text-white" style={{ minWidth: 100 }}>
              Priority
            </th>
            <th className="text-white" style={{ minWidth: 100 }}>
              Max Dis
            </th>
            <th className="text-white sticky right-0 z-10">Action</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {registrationLocationsStore?.registrationLocations?.priceList?.map(
            (item, index) => (
              <tr>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <select
                        value={item?.priceGroup}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.priceGroup ? "border-red-500  " : "border-gray-300"
                        } rounded-md`}
                        onChange={(e) => {
                          const priceGroup = e.target.value as string
                          onChange(priceGroup)
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList
                          priceList[index] = { ...priceList[index], priceGroup }
                          console.log({priceList});
                          
                          registrationLocationsStore.updateRegistrationLocations({
                            ...registrationLocationsStore.registrationLocations,
                            priceList,
                          })
                        }}
                      >
                        <option selected>Select</option>
                        {priceGroup?.map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
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
                          list: departmentStore.listDepartment.filter((item) =>
                            refernceRangesStore.referenceRanges?.analyteDepartments?.includes(
                              item.code
                            )
                          ),
                          displayKey: ["code", "name"],
                        }}
                        disable={
                          refernceRangesStore.referenceRanges?.analyteCode
                            ? false
                            : true
                        }
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
                            equipmentType:
                              rangeSetOn === "L"
                                ? undefined
                                : refernceRangesStore.referenceRanges?.equipmentType,
                            lab:
                              rangeSetOn === "I"
                                ? undefined
                                : refernceRangesStore.referenceRanges?.lab,
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
                <td className="sticky right-0 z-10 bg-gray-500">
                  <div className="flex flex-col gap-1">
                    <Buttons.Button size="small" type="outline" onClick={() => {}}>
                      <Icons.EvaIcon icon="minus-circle-outline" color="#fff" />
                    </Buttons.Button>
                    <Buttons.Button size="small" type="outline" onClick={() => {}}>
                      <Icons.EvaIcon icon="plus-circle-outline" color="#fff" />
                    </Buttons.Button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  )
})
