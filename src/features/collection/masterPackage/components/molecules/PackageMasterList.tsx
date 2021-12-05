/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"
import {AutoCompleteFilterSingleSelectLabs} from '../orgransims'
interface PackageMasterListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const PackageMasterList = (props: PackageMasterListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }

  return (
    <>
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
            dataField: "lab",
            text: "Lab",
            headerClasses: "textHeader",
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
                <AutoCompleteFilterSingleSelectLabs
                onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                }}
                />
              </>
            ),
          },
          {
            dataField: "packageCode",
            text: "Package Code",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },

          {
            dataField: "packageName",
            text: "Package Name",
            headerClasses: "textHeader4",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editor: false,
            editable: false,
          },
          {
            dataField: "panelCode",
            text: "Panel Code",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "panelName",
            text: "Panel Name",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "bill",
            text: "Bill",
            sort: true,
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <>
                  <LibraryComponents.Atoms.Form.Toggle
                    value={row.bill}
                    onChange={(bill) => {
                      props.onUpdateItem && props.onUpdateItem(bill, "bill", row._id)
                    }}
                  />
                </>
              )
            },
          },
          {
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader1",
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const status = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(status, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "STATUS"
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
            dataField: "enteredBy",
            text: "Entered By",
            headerClasses: "textHeader2",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "dateCreation",
            editable: false,
            text: "Date Creation",
            headerClasses: "textHeader6",
            sort: true,  
            filter: LibraryComponents.Organisms.Utils.dateFilter({
              comparators: [
                LibraryComponents.Organisms.Utils.Comparator.EQ,
                LibraryComponents.Organisms.Utils.Comparator.GE,
                LibraryComponents.Organisms.Utils.Comparator.LT,
              ],
              dateStyle: { marginLeft: "2px" },
              defaultValue: {
                comparator: LibraryComponents.Organisms.Utils.Comparator.EQ,
              },
              style: { display: "inline" },
            }),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateCreation).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "dateActive",
            text: "Date Active",
            headerClasses: "textHeader6",
            sort: true,
            editable: false,
            filter: LibraryComponents.Organisms.Utils.dateFilter({
              comparators: [
                LibraryComponents.Organisms.Utils.Comparator.EQ,
                LibraryComponents.Organisms.Utils.Comparator.GE,
                LibraryComponents.Organisms.Utils.Comparator.LT,
              ],
              dateStyle: { marginLeft: "2px" },
              defaultValue: {
                comparator: LibraryComponents.Organisms.Utils.Comparator.EQ,
              },
              style: { display: "inline" },
            }),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateActive).format("YYYY-MM-DD")}</>
            },
          },
          {
            dataField: "version",
            text: "Version",
            headerClasses: "textHeader5",
            sort: true,
            editable: false,
            filter: LibraryComponents.Organisms.Utils.numberFilter({
              numberStyle: { marginLeft: "2px" },
              style: { display: "inline" },
              defaultValue: {
                comparator: LibraryComponents.Organisms.Utils.Comparator.EQ,
              },
            }),
          },
          {
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader3",
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
                  {row.status !== "I" && (
                    <>
                      <LibraryComponents.Atoms.Tooltip
                        className="ml-2"
                        tooltipText="Version Upgrade"
                      >
                        <LibraryComponents.Atoms.Icons.IconContext
                          color="#fff"
                          size="20"
                          onClick={() =>
                            props.onVersionUpgrade && props.onVersionUpgrade(row)
                          }
                        >
                          {LibraryComponents.Atoms.Icons.getIconTag(
                            LibraryComponents.Atoms.Icons.Iconvsc.VscVersions
                          )}
                        </LibraryComponents.Atoms.Icons.IconContext>
                      </LibraryComponents.Atoms.Tooltip>
                      <LibraryComponents.Atoms.Tooltip
                        className="ml-2"
                        tooltipText="Duplicate"
                      >
                        <LibraryComponents.Atoms.Icons.IconContext
                          color="#fff"
                          size="20"
                          onClick={() => props.onDuplicate && props.onDuplicate(row)}
                        >
                          {LibraryComponents.Atoms.Icons.getIconTag(
                            LibraryComponents.Atoms.Icons.Iconio5.IoDuplicateOutline
                          )}
                        </LibraryComponents.Atoms.Icons.IconContext>
                      </LibraryComponents.Atoms.Tooltip>
                    </>
                  )}
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
        fileName="Package Master"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
        }}
        onPageSizeChange={(page, size) => {
          props.onPageSizeChange && props.onPageSizeChange(page, size)
        }}
        onFilter={(type, filter, page, size) => {
          props.onFilter && props.onFilter(type, filter, page, size)
        }}
      />
    </>
  )
}
export default PackageMasterList
