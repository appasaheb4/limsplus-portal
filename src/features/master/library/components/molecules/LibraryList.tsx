/* eslint-disable */
import React from "react"
import {lookupItems,lookupValue} from "@/library/utils"
import {TableBootstrap,Form,Tooltip,Icons,NumberFilter,textFilter,AutoCompleteCheckMultiFilterKeys,Buttons,customFilter} from "@/library/components"
import {Confirm} from "@/library/models"
import {AutoCompleteFilterSingleSelectDepartment,AutoCompleteFilterSingleSelectPlabs} from "../index"  

let code
let description
let usageType
let libraryType
let commentType
let lab
let department
let commentsTarget
let details
let parameter
let action
let results
let value
let reflex
let analyte
let rule
let status
let organismGroup
let organismClass
let loAge
let hiAge
let sex
let sexAction
let environment

interface LibraryListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const LibraryList = (props: LibraryListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <TableBootstrap
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
              dataField: "code",
              text: "Code",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  code = filter
                }
              }),
              editable: false,
            },
            {
              dataField: "description",
              text: "Description",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  description = filter
                }
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "usageType",
              text: "Usage Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  usageType = filter
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const usageType = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(usageType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "USAGE_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "libraryType",
              text: "Library Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  libraryType = filter
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const libraryType = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(libraryType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "LIBRARY_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "commentType",
              text: "Comment Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  commentType = filter
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const commentType = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(commentType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "COMMENT_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  lab = filter
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
                  <AutoCompleteFilterSingleSelectPlabs
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "department",
              text: "Department",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  department = filter
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
              dataField: "commentsTarget",
              text: "CommentsTarget",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  commentsTarget = filter
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const commentsTarget = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            commentsTarget,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "COMMENTS_TARGET"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "details",
              text: "Details",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  details = filter}
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "parameter",
              text: "Parameter",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: textFilter({
                getFilter: (filter) =>{
                  parameter = filter
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const parameter = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(parameter, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "PARAMETER"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "action",
              text: "Action",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  action = filter
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
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const action = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(action, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "ACTION"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "results",
              text: "Results",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  results = filter}
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const results = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(results, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "RESULTS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "value",
              text: "Value",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  value = filter}
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "reflex",
              text: "Reflex",
              headerClasses: "textHeader4",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (cell, row, rowIndex) => 
              `PanelCode${reflex.panelName} ,
               PanelName${reflex.panelCode}`,
              filter: textFilter({
                getFilter: (filter) =>{
                  reflex = filter}
              }),
              formatter: (cellContent, row) => (
                <>
                  <div className="flex flex-row">
                    {row.reflex.map((item) => (
                      <div className="mb-2 ml-2">
                        <Buttons.Button
                          size="medium"
                          type="solid"
                          onClick={() => {}}
                        >
                          {`Panel Name: ${item.panelName} 
                           Panel Code: ${item.panelCode}`}
                        </Buttons.Button>
                      </div>
                    ))}
                  </div>
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
                  
                    <AutoCompleteCheckMultiFilterKeys
                      placeholder="Search by panel name or panel code"
                      data={{
                        defulatValues: [],
                        list: props.extraData.listMasterPanel || [],
                        displayKey: ["panelName", "panelCode"],
                        findKey: ["panelName", "panelCode"],
                      }}
                      onUpdate={(items) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(items, column.dataField, row._id)
                      }}
                    />
                  
                </>
              ),
            },
            {
              dataField: "analyte",
              text: "Analyte",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  analyte = filter}
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "rule",
              text: "Rule",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  rule = filter}
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "abNormal",
              text: "AbNormal",
              sort: true,
              csvFormatter: (col,row) => `${row.abNormal ? row.abNormal ? "Yes" : "No" : "No"}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {" "}
                    <Form.Toggle
                    disabled={!editorCell(row)}
                      value={row.abNormal}
                      onChange={(abNormal) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(abNormal, "abNormal", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  status = filter}
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
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const status = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(status, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "organismGroup",
              text: "Organism Group",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  organismGroup = filter}
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "organismClass",
              text: "Organism Class",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  organismClass = filter}
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "loAge",
              text: "LO Age",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: customFilter({
                getFilter: (filter) =>{
                  loAge = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "hiAge",
              text: "HI Age",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: customFilter({
                getFilter: (filter) =>{
                  hiAge = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "sex",
              text: "Sex",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  sex = filter}
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sex = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(sex, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "SEX"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "sexAction",
              text: "Sex Action",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) =>{
                  sexAction = filter}
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
                  
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sexAction = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(sexAction, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "SEX_ACTION"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
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
              csvFormatter: col => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: textFilter({
                getFilter: (filter) =>{
                  environment = filter}
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
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(environment, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
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
                    <Tooltip
                      tooltipText="Delete"
                      position="top"
                    >
                      <Icons.IconContext
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
                        {Icons.getIconTag(
                          Icons.IconBs.BsFillTrashFill
                        )}
                      </Icons.IconContext>
                    </Tooltip>
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
          fileName="Library"
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
            code("")
            description("")
            usageType("")
            libraryType("")
            commentType("")
            lab("")
            department("")
            commentsTarget("")
            details("")
            parameter("")
            action("")
            results("")
            value("")
            reflex("")
            analyte("")
            rule("")
            status("")
            organismClass("")
            organismGroup("")
            loAge("")
            hiAge("")
            sex("")
            sexAction("")
            environment("")
          }}
        />
      </div>
    </>
  )
}
