/* eslint-disable */
import React, { useEffect } from "react"
import _ from "lodash"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes

let documentName
let fieldName
let arrValue
let description
let defaultItem
let environment

interface LookupListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const LookupList = (props: LookupListProps) => {
  useEffect(() => {
    router = router.filter((item: any) => {
      if (item.name !== "Dashboard") {
        item.toggle = false
        item.title = item.name
        item = item.children.filter((childernItem) => {
          childernItem.title = childernItem.name
          childernItem.toggle = false
          return childernItem
        })
        return item
      }
    })
  }, [])
  return (
    <div style={{ position: "relative" }}>
      <LibraryComponents.Organisms.TableBootstrap
        id="_id"
        data={props.data}
        totalSize={props.totalSize}
        columns={[
          {
            dataField: "_id",
            text: "Id",
            hidden: true,
            csvExport: false,
          },
          {
            dataField: "documentName",
            text: "Document Name",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (cell, row, rowIndex) =>
              `${row.documentName.children.title}`,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                documentName = filter
              },
            }),
            formatter: (cell, row) => {
              return <>{`${row.documentName.children.title}`}</>
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
                
                  <LibraryComponents.Molecules.AutocompleteGroupBy
                    data={router}
                    onChange={async (item: any, children: any) => {
                      const documentName = {
                        name: item.name,
                        title: item.title,
                        path: item.path,
                        children,
                      }
                      props.onUpdateItem &&
                        props.onUpdateItem(documentName, column.dataField, row._id)
                    }}
                  />
               
              </>
            ),
          },
          {
            dataField: "fieldName",
            text: "Field Name",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            style: { textTransform: "uppercase" },
            editorStyle: { textTransform: "uppercase" },
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                fieldName = filter
              },
            }),
          },
          {
            dataField: "arrValue",
            text: "Value & code",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (cell, row, rowIndex) =>
              `Value:${row.arrValue.map(
                (item) => item.value
              )} - Code:${row.arrValue.map((item) => item.code)}`,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                arrValue = filter
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  {row.arrValue.map((item) => (
                    <div className="mb-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {}}
                      >
                        {`${item.value} - ${item.code}`}
                      </LibraryComponents.Atoms.Buttons.Button>
                    </div>
                  ))}
                </LibraryComponents.Atoms.List>
              </>
            ),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                <LibraryComponents.Atoms.Grid cols={3}>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Code"
                    value={row.code}
                    onChange={(code) => {
                      props.extraData.updateLocalInput({
                        ...props.extraData.localInput,
                        code: code.toUpperCase(),
                      })
                    }}
                  />

                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Value"
                    value={row.value}
                    onChange={(value) => {
                      props.extraData.updateLocalInput({
                        ...props.extraData.localInput,
                        value,
                      })
                    }}
                  />

                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const value = props.extraData.localInput?.value
                        const code = props.extraData.localInput?.code
                        let arrValue = row?.arrValue || []
                        if (value === undefined || code === undefined)
                          return alert("Please enter value and code.")
                        if (value !== undefined) {
                          arrValue !== undefined
                            ? arrValue.push({
                                value,
                                code,
                              })
                            : (arrValue = [
                                {
                                  value,
                                  code,
                                },
                              ])
                          arrValue = _.map(arrValue, (o) =>
                            _.pick(o, ["code", "value"])
                          )
                          props.onUpdateItem &&
                            props.onUpdateItem(arrValue, "arrValue", row._id)
                          props.extraData.updateLocalInput({
                            ...props.extraData.localInput,
                            value: "",
                            code: "",
                          })
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                  <div className="clearfix"></div>
                </LibraryComponents.Atoms.Grid>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  <div>
                    {row.arrValue?.map((item, index) => (
                      <div className="mb-2" key={index}>
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          icon={LibraryComponents.Atoms.Icon.Remove}
                          onClick={() => {
                            const firstArr = row?.arrValue?.slice(0, index) || []
                            const secondArr = row.arrValue?.slice(index + 1) || []
                            let finalArray = [...firstArr, ...secondArr]
                            props.extraData.updateLookup({
                              ...props.extraData.lookup,
                              arrValue: finalArray,
                            })
                            finalArray = _.map(finalArray, (o) =>
                              _.pick(o, ["code", "value"])
                            )
                            props.onUpdateItem &&
                              props.onUpdateItem(finalArray, "arrValue", row._id)
                          }}
                        >
                          {`${item.value} - ${item.code}`}
                        </LibraryComponents.Atoms.Buttons.Button>
                      </div>
                    ))}
                  </div>
                </LibraryComponents.Atoms.List>
              </>
            ),
          },
          {
            dataField: "description",
            text: "Description",
            headerClasses: "textHeader2",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                description = filter
              },
            }),
          },
          {
            dataField: "defaultItem",
            text: "Default Item",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (cell, row, rowIndex) =>
              `Value:${row.defaultItem.map(
                (item) => item.value
              )} - Code:${row.defaultItem.map((item) => item.code)}`,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                defaultItem = filter
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  {row.defaultItem &&
                    row.defaultItem.map((item) => (
                      <div className="mb-2">
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          onClick={() => {}}
                        >
                          {`${item.value} - ${item.code}`}
                        </LibraryComponents.Atoms.Buttons.Button>
                      </div>
                    ))}
                </LibraryComponents.Atoms.List>
              </>
            ),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                  onChange={(e) => {
                    let defaultItem = JSON.parse(e.target.value)
                    defaultItem = [
                      {
                        code: defaultItem.code,
                        value: defaultItem.value,
                      },
                    ]
                    props.onUpdateItem &&
                      props.onUpdateItem(defaultItem, "defaultItem", row._id)
                  }}
                >
                  <option selected>Select</option>
                  {row.arrValue.map((item: any, index: number) => (
                    <option key={item.name} value={JSON.stringify(item)}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </>
            ),
          },
          {
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: (col) => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) => {
                environment = filter
              },
            }),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                
                  <select
                    value={row.environment}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const environment = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(environment, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "ENVIRONMENT"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
               
              </>
            ),
          },
          {
            dataField: "opration",
            text: "Action",
            editable: false,
            csvExport: false,
            hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className="flex flex-row">
                  <LibraryComponents.Atoms.Tooltip
                    tooltipText="Delete"
                    position="top"
                  >
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#fff"
                      size="20"
                      onClick={() =>
                        props.onDelete &&
                        props.onDelete({
                          type: "Delete",
                          show: true,
                          id: [row._id],
                          title: "Are you sure?",
                          body: `Delete item`,
                        })
                      }
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </LibraryComponents.Atoms.Tooltip>
                </div>
              </>
            ),
            headerClasses: "sticky right-0  bg-gray-500 text-white",
            classes: (cell, row, rowIndex, colIndex) => {
              return "sticky right-0 bg-gray-500"
            },
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName="Lookup"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
        }}
        onPageSizeChange={(page, size) =>
          props.onPageSizeChange && props.onPageSizeChange(page, size)
        }
        onFilter={(type, filter, page, size) => {
          props.onFilter && props.onFilter(type, filter, page, size)
        }}
        clearAllFilter={() => {
          documentName("")
          fieldName("")
          arrValue("")
          description("")
          defaultItem("")
          environment("")
        }}
      />
    </div>
  )
}
export default LookupList
