/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import {AutoCompleteFilterSingleSelectDepartment} from '../organsims'

let departmentCode
let code
let name
let shortName
let sectionInCharge
let mobileNo
let contactNo
let fyiLine
let workLine
let status
let environment

interface SectionListProps {
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

export const SectionList = (props: SectionListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
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
            dataField: "departmentCode",
            text: "Department Code",
            headerClasses: "textHeader5",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                departmentCode = filter
              }
            }),
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
               <AutoCompleteFilterSingleSelectDepartment
               onSelect={(item)=>{
                props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
               }}
               />
              </>
            ),
          },
          {
            dataField: "code",
            text: "Code",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                code = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "name",
            text: "Name",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                name = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "shortName",
            text: "Short Name",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                shortName = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            style:{textTransform:"uppercase"},
              editorStyle:{textTransform:"uppercase"}
          },
          {
            dataField: "sectionInCharge",
            text: "Section In Charge",
            headerClasses: "textHeader5",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                sectionInCharge = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "mobileNo",
            text: "Mobie No",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                mobileNo = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "contactNo",
            text: "Contact No",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                contactNo = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "fyiLine",
            text: "Fyi Line",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                fyiLine = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workLine",
            text: "Work Line",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                workLine = filter
              }
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "status",
            text: "Status",
            headerClasses: "textHeader1",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                status = filter
              }
            }),
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
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader3",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                environment = filter
              }
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                  <select
                    value={row.environment}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
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
        fileName="Section"
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
        clearAllFilter={()=>{
          departmentCode("")
          code("")
          name("")
          shortName("")
          sectionInCharge("")
          mobileNo("")
          contactNo("")
          fyiLine("")
          workLine("")
          status("")
          environment("")
        }}
      />   
    </div>
  )
}
