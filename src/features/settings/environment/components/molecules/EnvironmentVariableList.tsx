/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"

let environmentVariable
let category
let description
let enteredBy

interface EnvironmentVariableProps {
  data: any
  extraData: any
  totalSize: number
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}
const EnvironmentVariableList = observer((props: EnvironmentVariableProps) => {
  return (
    <>
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
              dataField: "environmentVariable",
              text: "Environment Variable",
              headerClasses: "textHeader5",
              editable: false,
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  environmentVariable = filter
                },
              }),
            },
            {
              dataField: "category",
              text: "Category",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  category = filter
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const category = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(category, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "ENVIRONMENT_VARIABLES_CATEGORY"
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
              dataField: "description",
              text: "Description",
              headerClasses: "textHeader3",
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  description = filter
                },
              }),
              sort: true,
              csvFormatter: col => (col ? col : ""),
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              headerClasses: "textHeader3",
              editable: false,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  enteredBy = filter
                },
              }),
              sort: true,
              csvFormatter: col => (col ? col : ""),
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
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#fff"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "delete",
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
          fileName="Environement Variable"
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
          clearAllFilter={() => {
            environmentVariable("")
            category("")
            description("")
            enteredBy("")
          }}
        />
      </div>
    </>
  )
})

export default EnvironmentVariableList
