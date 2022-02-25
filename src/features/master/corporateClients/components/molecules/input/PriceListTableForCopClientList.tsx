/* eslint-disable */
import React, { useEffect, useState, useRef } from "react"
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
interface PriceListTableForCopClientListProps {
  data?: any
  onUpdate?: (item: any) => void
}

export const PriceListTableForCopClientList = observer(
  ({ data, onUpdate }: PriceListTableForCopClientListProps) => {
    const { loading, corporateClientsStore } = useStores()

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm()

    const [priceGroupLookupItems, setPriceGroupLookupItems] = useState<any>()

    useEffect(() => {
      ;(async function () {
        try {
          RouterFlow.getLookupValuesByPathNField(
            "/collection/priceList",
            "PRICE_GROUP"
          ).then((res) => {
            setPriceGroupLookupItems(res)
          })
        } catch (e) {
          console.error(e)
        }
      })()
    }, [])

    const addItem = () => {
      let priceList = data
      priceList.push({
        id: data.length + 1,
        maxDis: 0,
      })
      data = {
        ...data,
        priceList,
      }
    }

    const removeItem = (index: number) => {
      const firstArr = data?.slice(0, index) || []
      const secondArr = data?.slice(index + 1) || []
      const finalArray = [...firstArr, ...secondArr]
      data = {
        ...data,
        priceList: finalArray,
      }
    }

    return (
      <div className="flex flex-col gap-2 items-center overflow-auto">
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
                Max Dis%
              </th>
              <th className="text-white sticky right-0 z-10">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {data?.map((item, index) => (
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
                          const priceList = data
                          priceList[index] = {
                            ...priceList[index],
                            priceGroup,
                            priceList: priceGroup,
                            description: _.first(
                              priceGroupLookupItems.filter(
                                (item) => item.code === priceGroup
                              )
                            ).value,
                          }
                          data = {
                            ...data,
                            priceList,
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {priceGroupLookupItems?.map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    )}
                    name="priceGroup"
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
                        posstion="relative"
                        placeholder="Search by code or name"
                        data={{
                          list: corporateClientsStore?.listCorporateClients,
                          displayKey: ["corporateCode", "corporateName"],
                        }}
                        displayValue={item?.priceList}
                        disable={item?.priceGroup !== "CSP001" ? true : false}
                        hasError={errors.priceList}
                        onFilter={(value: string) => {
                          corporateClientsStore.corporateClientsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ["corporateCode", "corporateName"],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            }
                          )
                        }}
                        onSelect={(item) => {
                          onChange(item.corporateCode)
                          const priceList = data
                          priceList[index] = {
                            ...priceList[index],
                            priceList: item.corporateCode,
                            description: item.corporateName,
                          }
                          data = {
                            ...data,
                            priceList,
                          }
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy
                          )
                        }}
                      />
                    )}
                    name="priceList"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.MultilineInput
                        rows={2}
                        label=""
                        disabled={true}
                        placeholder={
                          errors.description
                            ? "Please Enter description"
                            : "Description"
                        }
                        hasError={errors.description}
                        value={item?.description}
                        onChange={(description) => {
                          onChange(description)
                        }}
                      />
                    )}
                    name="description"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        label=""
                        value={item?.priority}
                        type="number"
                        placeholder="Priority"
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                        hasError={errors.priority}
                        onChange={(priority) => {
                          onChange(priority)
                          const priceList = data
                          priceList[index] = {
                            ...priceList[index],
                            priority,
                          }
                          data = {
                            ...data,
                            priceList,
                          }
                        }}
                      />
                    )}
                    name="priority"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Form.Input
                        label=""
                        type="number"
                        placeholder={item?.maxDis?.toString()}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                        hasError={errors.maxDis}
                        onChange={(maxDis) => {
                          onChange(maxDis)
                          const priceList = data
                          priceList[index] = {
                            ...priceList[index],
                            maxDis,
                          }
                          data = {
                            ...data,
                            priceList,
                          }
                        }}
                      />
                    )}
                    name="maxDis"
                    rules={{ required: false }}
                    defaultValue=""
                  />
                </td>
                <td className="sticky right-0 z-10 bg-gray-500">
                  <div className="flex flex-col gap-1">
                    <Buttons.Button
                      size="small"
                      type="outline"
                      onClick={() => {
                        removeItem(index)
                      }}
                    >
                      <Icons.EvaIcon icon="minus-circle-outline" color="#fff" />
                    </Buttons.Button>
                    <Buttons.Button
                      size="small"
                      type="outline"
                      onClick={handleSubmit(addItem)}
                    >
                      <Icons.EvaIcon icon="plus-circle-outline" color="#fff" />
                    </Buttons.Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {data?.length === 0 && (
            <Buttons.Button
              size="small"
              type="outline"
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon="plus-circle-outline" color="#000" />
            </Buttons.Button>
          )}
         
        </Table>
        <Buttons.Button
            size="small"
            type="solid"
            onClick={() => onUpdate && onUpdate(data)}
          >
            Update
          </Buttons.Button>
      </div>
    )
  }
)
