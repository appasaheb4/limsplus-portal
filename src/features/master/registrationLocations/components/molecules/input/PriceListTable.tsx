/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
  Form,
} from "@/library/components"
import { observer } from "mobx-react"
import { useStores } from "@/stores"
import _ from "lodash"
import { useForm, Controller } from "react-hook-form"
import { RouterFlow } from "@/flows"

export const PriceListTable = observer(({}) => {
  const {
    loading,
    registrationLocationsStore,
    corporateClientsStore,
    priceListStore,
  } = useStores()

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
    let priceList = registrationLocationsStore.registrationLocations?.priceList
    priceList.push({
      id: registrationLocationsStore.registrationLocations?.priceList.length + 1,
      maxDis: 0,
    })
    registrationLocationsStore.updateRegistrationLocations({
      ...registrationLocationsStore.registrationLocations,
      priceList,
    })
  }

  const removeItem = (index: number) => {
    const firstArr =
      registrationLocationsStore.registrationLocations?.priceList?.slice(0, index) ||
      []
    const secondArr =
      registrationLocationsStore.registrationLocations?.priceList?.slice(
        index + 1
      ) || []
    const finalArray = [...firstArr, ...secondArr]
    registrationLocationsStore.updateRegistrationLocations({
      ...registrationLocationsStore.registrationLocations,
      priceList: finalArray,
    })
  }

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
              Max Dis%
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
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by priceGroup or description"
                        data={{
                          list: _.unionBy(
                            registrationLocationsStore.registrationLocations
                              ?.invoiceAc
                              ? priceListStore?.listPriceList
                              : priceListStore?.listPriceList.filter((item) => {
                                  if (item.priceGroup === "CSP001") return
                                  else return item
                                }),
                            "priceGroup"
                          ),
                          displayKey: ["priceGroup", "description"],
                        }}
                        displayValue={item.priceGroup}
                        hasError={errors.priceGroup}
                        onFilter={(value: string) => {
                          priceListStore.priceListService.filterByFields({
                            input: {
                              filter: {
                                fields: ["priceGroup", "description"],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          })
                        }}
                        onSelect={(item) => {
                          console.log({ item })
                          onChange(item.priceGroup)
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList
                          priceList[index] = {
                            ...priceList[index],
                            priceGroup: item.priceGroup,
                            priceList:
                              item.priceGroup !== "CSP001"
                                ? item.priceGroup
                                : registrationLocationsStore.registrationLocations
                                    ?.invoiceAc,
                            description: item.description,
                          }
                          registrationLocationsStore.updateRegistrationLocations({
                            ...registrationLocationsStore.registrationLocations,
                            priceList,
                          })
                          priceListStore.updatePriceListRecords(
                            priceListStore.listPriceListCopy
                          )
                        }}
                      />
                    )}
                    name="priceGroup"
                    rules={{ required: false }}
                    defaultValue={priceListStore.listPriceList}
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        placeholder="Search by invoiceAc or name"
                        data={{
                          list: corporateClientsStore?.listCorporateClients,
                          displayKey: ["invoiceAc", "corporateName"],
                        }}
                        displayValue={item?.priceList}
                        //disable={item?.priceGroup !== "CSP001" ? true : false}
                        disable={true}
                        hasError={errors.priceList}
                        onFilter={(value: string) => {
                          corporateClientsStore.corporateClientsService.filterByFields(
                            {
                              input: {
                                filter: {
                                  fields: ["invoiceAc", "corporateName"],
                                  srText: value,
                                },
                                page: 0,
                                limit: 10,
                              },
                            }
                          )
                        }}
                        onSelect={(item) => {
                          onChange(item.invoiceAc)
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList
                          priceList[index] = {
                            ...priceList[index],
                            priceList: item.invoiceAc,
                            description: item.corporateName,
                          }
                          registrationLocationsStore.updateRegistrationLocations({
                            ...registrationLocationsStore.registrationLocations,
                            priceList,
                          })
                          corporateClientsStore.updateCorporateClientsList(
                            corporateClientsStore.listCorporateClientsCopy
                          )
                        }}
                      />
                    )}
                    name="priceList"
                    rules={{ required: false }}
                    defaultValue={corporateClientsStore.listCorporateClients}
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
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList
                          priceList[index] = {
                            ...priceList[index],
                            priority: parseInt(priority),
                          }
                          registrationLocationsStore.updateRegistrationLocations({
                            ...registrationLocationsStore.registrationLocations,
                            priceList,
                          })
                        }}
                      />
                    )}
                    name="priority"
                    rules={{ required: false }}
                    defaultValue={item?.priority}
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
                          const priceList =
                            registrationLocationsStore.registrationLocations
                              ?.priceList
                          priceList[index] = {
                            ...priceList[index],
                            maxDis: parseFloat(maxDis),
                          }
                          registrationLocationsStore.updateRegistrationLocations({
                            ...registrationLocationsStore.registrationLocations,
                            priceList,
                          })
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
            )
          )}
        </tbody>
        {registrationLocationsStore.registrationLocations?.priceList?.length ===
          0 && (
          <Buttons.Button
            size="small"
            type="outline"
            onClick={handleSubmit(addItem)}
          >
            <Icons.EvaIcon icon="plus-circle-outline" color="#000" />
          </Buttons.Button>
        )}
      </Table>
    </div>
  )
})
