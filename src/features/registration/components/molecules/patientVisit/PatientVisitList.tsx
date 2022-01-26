/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"  
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"
import {AutoCompleteFilterSingleSelectCollectionCenter,AutoCompleteFilterSingleSelectCorporateCode,AutoCompleteFilterSingleSelectDoctorId, AutoCompleteFilterSingleSelectDoctorName} from "../../orgransims"
interface PatientVisitProps {
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
let labId
let pId
let rLab
let visitId
let dateVisit
let registrationDate
let collectionDate
let dueDate
let birthDate
let age
let ageUnits
let collectionCenter
let corporateCode
let acClass
let doctorId
let doctorName
let deliveryType
let status

const PatientVisitList = observer((props: PatientVisitProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
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
              dataField: "labId",
              text: "Lab Id",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  labId = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: "pId",
              text: "Pid",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  pId = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: "rLab",
              text: "Rlab",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    rLab = filter
                  }
                }
              ),
              editable: false,
            },
            {
              dataField: "visitId",
              text: "Visit Id",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  visitId = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: "visitDate",
              text: "Visit Date",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (row.visitDate ? dayjs(row.visitDate).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  dateVisit = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.visitDate).format("YYYY-MM-DD")}</>
              },
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                  value={new Date(row.visitDate)}
                  onFocusRemove={(visitDate) => {
                    props.onUpdateItem && props.onUpdateItem(visitDate,"visitDate",row._id)
                  }}
                />
                </>
              )
            },
            {
              dataField: "registrationDate",
              text: "Registration Date",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (row.registrationDate ? dayjs(row.registrationDate).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  registrationDate = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.registrationDate).format("YYYY-MM-DD")}</>
              },
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                  value={new Date(row.registrationDate)}
                  onFocusRemove={(registrationDate) => {
                    props.onUpdateItem && props.onUpdateItem(registrationDate,column.dataField,row._id)
                  }}
                />
                </>
              )
            },
            {
              dataField: "collectionDate",
              text: "Collection Date",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (row.collectionDate ? dayjs(row.collectionDate).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  collectionDate = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.collectionDate).format("YYYY-MM-DD")}</>
              },
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                  value={new Date(row.collectionDate)}
                  onFocusRemove={(collectionDate) => {
                    props.onUpdateItem && props.onUpdateItem(collectionDate,column.dataField,row._id)
                  }}
                />
                </>
              )
            },
            {
              dataField: "dueDate",
              text: "Due Date",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (row.dueDate ? dayjs(row.dueDate).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  dueDate = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dueDate).format("YYYY-MM-DD")}</>
              },
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                  onFocusRemove={(dueDate) => {
                    props.onUpdateItem && props.onUpdateItem(dueDate,column.dataField,row._id)
                  }}
                />
                </>
              )
            },

            {
              dataField: "birthDate",
              text: "BithDate",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (row.birthDate ? dayjs(row.birthDate).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  birthDate = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.birthDate).format("YYYY-MM-DD")}</>
              },
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                  value={new Date(row.birthDate)}
                  onFocusRemove={(birthDate) => {
                    props.onUpdateItem && props.onUpdateItem(birthDate,column.dataField,row._id)
                  }}
                />
                </>
              )
            },
            {
              dataField: "age",
              text: "Age",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  age = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: "ageUnits",
              text: "Age Units",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    ageUnits = filter
                  }
                }
              ),
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
                    disabled={true}
                    value={row?.ageUnits}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                    onChange={(e) => {
                      const ageUnits = e.target.value
                      props.onUpdateItem && props.onUpdateItem(ageUnits,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "PATIENT VISIT - AGE_UNITS"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </>
              )
            },

            {
              dataField: "collectionCenter",
              text: "Collection Center",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    collectionCenter = filter
                  }
                }
              ),
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
                  <AutoCompleteFilterSingleSelectCollectionCenter
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.locationCode,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "corporateCode",
              text: "Corporate Code",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    corporateCode = filter
                  }
                }
              ),
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
                  <AutoCompleteFilterSingleSelectCorporateCode
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.corporateCode,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "acClass",
              text: "AC Class",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    acClass = filter
                  }
                }
              ),
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
                    value={row?.acClass}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                    onChange={(e) => {
                      const acClass = e.target.value
                      props.onUpdateItem && props.onUpdateItem(acClass,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "PATIENT VISIT - AC_CLASS"
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
              dataField: "doctorId",
              text: "Doctor Id",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    doctorId = filter
                  }
                }
              ),
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
                  <AutoCompleteFilterSingleSelectDoctorId
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.doctorCode,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "doctorName",
              text: "Doctor Name",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    doctorName = filter
                  }
                }
              ),
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
                  <AutoCompleteFilterSingleSelectDoctorName
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.doctorName,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "deliveryType",
              text: "Delivery Type",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    deliveryType = filter
                  }
                }
              ),
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
                    value={row.deliveryType}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                    onChange={(e) => {
                      const deliveryType = e.target.value as string
                      props.onUpdateItem && props.onUpdateItem(deliveryType,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "PATIENT VISIT - DELIVERY_TYPE"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>
                    ))}
                  </select>
                
                </>
              ),
            },
            {
              dataField: "history",
              text: "History",
              sort: true,
              csvFormatter: (col,row) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>  
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.history}
                      onChange={(history) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(history, "history", row._id)
                      }}
                    />
                  </>
                )
              },
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },

            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col,row) => (col ? col : false),
              filter: LibraryComponents.Organisms.Utils.textFilter(
                {
                  getFilter: (filter) =>{
                    status = filter
                  }
                }
              ),
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
                    value={row?.status}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                    onChange={(e) => {
                      const status = e.target.value
                      props.onUpdateItem && props.onUpdateItem(status,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "PATIENT VISIT - STATUS"
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
          fileName="Patient Visit"
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
            labId("")
            pId("")
            rLab("")
            visitId("")
            dateVisit()
            registrationDate()
            collectionDate()
            dueDate()
            birthDate()
            age("")
            ageUnits("")
            collectionCenter("")
            corporateCode("")
            acClass("")
            doctorId("")
            doctorName("")
            deliveryType("")
            status("")
          }}
        />
      </div>
    </>
  )
})
export default PatientVisitList
