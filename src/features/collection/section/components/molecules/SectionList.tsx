/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Storage from "@lp/library/modules/storage"
import { Stores } from "../../stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
interface SectionListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
}

export const SectionList = observer((props: SectionListProps) => {
 
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Department Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const departmentCode = e.target.value as string
                      props.onUpdateItem && 
                        props.onUpdateItem(departmentCode,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment &&
                    DepartmentStore.departmentStore.listDepartment.map(
                      (item: any, key: number) => (
                        <option key={key} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "code",
          text: "Code",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "name",
          text: "Name",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "shortName",
          text: "Short Name",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "sectionInCharge",
          text: "Section In Charge",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "mobieNo",
          text: "Mobie No",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "contactNo",
          text: "Contact No",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "fyiLine",
          text: "Fyi Line",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "workLine",
          text: "Work Line",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    props.onUpdateItem && 
                      props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "environment",
          text: "Environment",
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
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                    
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
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
                      body: `Delete ${row.description} section!`,
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
      fileName="Section"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
      onPageSizeChange={(page,size)=>{
        props.onPageSizeChange && props.onPageSizeChange(page,size)
      }}
    />
  )
})
