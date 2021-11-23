/* eslint-disable */
import React, { useEffect } from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes

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
            sort: true,
            formatter: (cell, row) => {
              return <>{`${row.documentName.children.name}`}</>
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Document Name">
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
                </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "fieldName",
            text: "Field Name",
            sort: true,
            style:{textTransform:"uppercase"},
            editorStyle:{textTransform:"uppercase"},
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "arrValue",
            text: "Value & code",
            sort: true,
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
                      props.extraData.updateLookup({
                        ...props.extraData.lookup,
                        code: code.toUpperCase(),
                      })
                    }}
                  />

                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Value"
                    value={row.value}
                    onChange={(value) => {
                      props.extraData.updateLookup({
                        ...props.extraData.lookup,
                        value,
                      })
                    }}
                  />

                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        const value = props.extraData.lookup?.value
                        const code = props.extraData.lookup?.code
                        let arrValue = row.arrValue || []
                        if (value === undefined || code === undefined)
                          return alert("Please enter value and code.")
                        if (value !== undefined) {
                          console.log({ len: arrValue.length })
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
                          props.onUpdateItem &&
                            props.onUpdateItem(arrValue, "arrValue", row._id)
                          props.extraData.updateLookup({
                            ...props.extraData.lookup,
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
                            const finalArray = [...firstArr, ...secondArr]
                            props.extraData.updateLookup({
                              ...props.extraData.lookup,
                              arrValue: finalArray,
                            })
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
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "defaultItem",
            text: "Default Item",
            headerClasses: "textHeader2",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
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
          },
          {
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader1",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
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
                </LibraryComponents.Atoms.Form.InputWrapper>
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
                  <LibraryComponents.Atoms.Tooltip tooltipText="Delete" position="top"> 
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
      />
    </div>
  )
}
export default LookupList
