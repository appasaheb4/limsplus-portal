/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as Config from "@lp/config"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"

import Storage from "@lp/library/modules/storage"


import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

interface PackageMasterListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
}

const PackageMasterList = observer((props: PackageMasterListProps) => {
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
      setLookupItems(items)
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }

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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                    {LabStores.labStore.listLabs.map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "packageCode",
            text: "Package Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },

          {
            dataField: "packageName",
            text: "Package Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editor:false,
            editable:false
          },
          {
            dataField: "panelCode",
            text: "Panel Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "panelName",
            text: "Panel Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "bill",
            text: "Bill",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            ) => <>
                   <LibraryComponents.Atoms.Form.Toggle
                label="Bill"
                id="modeBill"
                value={row.bill}
                onChange={(bill) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(bill,column.dataField,row._id)
                }}
              />
            </>,
          },
          {
            dataField: "status",
            text: "Status",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const status = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id)
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
            editable: false,
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
            text: "Date Active",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "version",
            text: "Version",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "keyNum",
            text: "Key Num",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "enteredBy",
            text: "Entered By",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
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
                <div className="mb-2" />
                  {row.status !== "I" && (
                    <>
                      <LibraryComponents.Atoms.Buttons.Button
                        size="small"
                        type="outline"
                        onClick={() => {
                          props.onVersionUpgrade && props.onVersionUpgrade(row)
                        }}
                      >
                        <LibraryComponents.Atoms.Icons.IconContext
                          color="#000"
                          size="20"
                        >
                          {LibraryComponents.Atoms.Icons.getIconTag(
                            LibraryComponents.Atoms.Icons.Iconvsc.VscVersions
                          )}
                        </LibraryComponents.Atoms.Icons.IconContext>
                        Version Upgrade
                      </LibraryComponents.Atoms.Buttons.Button>
                      <div className="mb-2" />
                      <LibraryComponents.Atoms.Buttons.Button
                        size="small"
                        type="outline"
                        onClick={() => {
                          props.onDuplicate && props.onDuplicate(row)
                        }}
                      >
                        <LibraryComponents.Atoms.Icon.EvaIcon
                          icon="copy-outline"
                          size="medium"
                          color={Config.Styles.COLORS.BLACK}
                        />
                        Duplicate
                      </LibraryComponents.Atoms.Buttons.Button>
                    </>
                  )}
              </>
            ),
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName="Package Master"
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
export default PackageMasterList
