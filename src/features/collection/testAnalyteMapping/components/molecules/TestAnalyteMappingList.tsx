/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"


import Storage from "@lp/library/modules/storage"

import { Stores } from "../../stores"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface TestAnalyteMappingListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const TestAnalyteMappingList = observer((props: TestAnalyteMappingListProps) => {
  const [lookupItems, setLookupItems] = useState<any[]>([])
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
          Stores.testAnalyteMappingStore.updateTestAnalyteMapping({
            ...Stores.testAnalyteMappingStore.testAnalyteMapping,
            status: status.code,
          })
        }
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  return (
    <>
      <LibraryComponents.Organisms.TableBootstrap
        id="_id"
        data={props.data}
        columns={[
          {
            dataField: "_id",
            text: "Id",
            hidden: true,
            csvExport: false,
          },
          {
            dataField: "lab",
            text: "Lab",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                  <select
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(lab, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LabStores.labStore.listLabs.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "testCode",
            text: "Test Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "testName",
            text: "Test Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "analyteCode",
            text: "Analyte Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {    
            dataField: "analyteName",
            text: "Analyte Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "description",
            text: "Description",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "bill",
            text: "Bill",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return <>{row.bill ? "Yes" : "No"}</>
            },
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  value={row.bill}
                  onChange={(bill) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(bill, column.dataField, row._id)
                  }}
                />
              </>
            ),
          },
          {
            dataField: "status",
            text: "Status",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  value={row.status}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                      props.onUpdateItem && 
                        props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),

          },
          {
            dataField: "dateCreation",
            editable:false,
            text: "Date Creation",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
                <>
                  {LibraryUtils.moment
                    .unix(row.dateCreation || 0)
                    .format("YYYY-MM-DD")}
                </>
              )
            },
          },
          {
            dataField: "dateActive",
            editable:false,
            text: "Date Active",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "version",
            editable:false,
            text: "Version",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "keyNum",
            editable:false,
            text: "Key Num",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "enteredBy",
            editable:false,
            text: "Entered By",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "opration",
            text: "Delete",
            editable: false,
            csvExport: false,
            hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.Buttons.Button
                  size="small"
                  type="outline"
                  icon={LibraryComponents.Atoms.Icon.Remove}
                  onClick={() => {
                    props.onDelete &&
                      props.onDelete({
                        type: "Delete",
                        show: true,
                        id: [row._id],
                        title: "Are you sure?",
                        body: `Delete record!`,
                      })
                  }}
                >
                  Delete
                </LibraryComponents.Atoms.Buttons.Button>
              </>
            ),
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName="Test Analyte Mapping"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
        }}
      />
    </>
  )
})
export default TestAnalyteMappingList
