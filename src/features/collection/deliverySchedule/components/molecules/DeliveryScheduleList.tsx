/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
let schCode
let pStartTime
let pEndTime
let cutofTime
let secoundCutofTime
let processingType
let reportOn
let dynamicRT
let dynamicTU
let fixedRT
let schForDept
let schForPat
let environment
interface DeliverySchduleListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const DeliverySchduleList = (props: DeliverySchduleListProps) => {
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
              dataField: "schCode",
              text: "Sch Code",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  schCode = filter
                }
              }),
              editable:false
            },
            {
              dataField: "sundayProcessing",
              text: "Sunday Processing",
              sort: true,
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
               
                value={row.sundayProcessing}
                onChange={(sundayProcessing) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(sundayProcessing,'sundayProcessing',row._id)
                }}
              /></>
              },
            },
            {
              dataField: "holidayProcessing",
              text: "Holiday Processing",
              headerClasses: "textHeader5",
              sort: true,
              // filter: LibraryComponents.Organisms.Utils.textFilter({
              //   getFilter: (filter) =>{
              //     holidayProcessing = filter
              //   }
              // }),
              editable: false,
            },
            {
              dataField: "sundayReporting",
              text: "Sunday Reporting",
              headerClasses: "textHeader3",
              sort: true,
              // filter: LibraryComponents.Organisms.Utils.textFilter({
              //   getFilter: (filter) =>{
              //     schCode = filter
              //   }
              // }),
              editable: false,
            },
            {
              dataField: "holidayReporting",
              text: "Holiday Reporting",
              sort: true,
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
               
                value={row.holidayReporting}
                onChange={(holidayReporting) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(holidayReporting,'holidayReporting',row._id)
                }}
              /></>
              },
            },

            {
              dataField: "pStartTime",
              text: "P Start Time",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  pStartTime = filter
                }
              }),
            },
            {
              dataField: "pEndTime",
              text: "P End Time",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  pEndTime = filter
                }
              }),
            },
            {
              dataField: "cutofTime",
              text: "Cutof Time",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  cutofTime = filter
                }
              }),
            },
            {
              dataField: "secoundCutofTime",
              text: "Secound Cutof Time",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  secoundCutofTime = filter
                }
              }),
            },
            {
              dataField: "processingType",
              text: "Processing Type",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  processingType = filter
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Processing Type"
                    
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const processingType = e.target.value as string
                        props.onUpdateItem && props.onUpdateItem(processingType,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PROCESSING_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {LibraryUtils.lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "schFrequency",
              text: "Sch Frequency",
              headerClasses: "textHeader3",
              sort: true,
              //filter: LibraryComponents.Organisms.Utils.textFilter({})
              formatter: (cell, row) => {
                return <>{JSON.stringify(row.schFrequency)}</>
              },
            },
            {
              dataField: "reportOn",
              text: "Report On",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  reportOn = filter
                }
              }),
            },
            {
              dataField: "dynamicRT",
              text: "Dynamic RT",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  dynamicRT = filter
                }
              }),
            },
            {
              dataField: "dynamicTU",
              text: "Dynamic TU",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  dynamicTU = filter
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Dynamic TU"
              
                  >
                    <select
                      value={row.dynamicTU}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const dynamicTU = e.target.value
                        props.onUpdateItem && props.onUpdateItem(dynamicTU,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "DYNAMIC_TU"
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
              dataField: "fixedRT",
              text: "Fixed RT",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  fixedRT = filter
                }
              }),
            },
            {
              dataField: "onTime",
              text: "On Time",
              sort: true,
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
               
                value={row.onTime}
                onChange={(onTime) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(onTime,'onTime',row._id)
                }}
              /></>
              },
            },
            {
              dataField: "schForDept",
              text: "Sch For Dept",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  schForDept = filter
                }
              }),
            },
            {
              dataField: "schForPat",
              text: "Sch For Pat",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  schForPat = filter
                }
              }),
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
          fileName="Delivery Schedule"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page,size)=>{
            props.onPageSizeChange && props.onPageSizeChange(page,size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
          clearAllFilter={()=>{
            schCode("")
            pStartTime("")
            pEndTime("")
            cutofTime("")
            secoundCutofTime("")
            processingType("")
            reportOn("")
            dynamicRT("")
            dynamicTU("")
            fixedRT("")
            schForDept("")
            schForPat("")
            environment("")
          }}
        />
      </div>
    </>
  )
}

export default DeliverySchduleList
