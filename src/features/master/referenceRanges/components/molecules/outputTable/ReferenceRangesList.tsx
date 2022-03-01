/* eslint-disable */
import React from "react"
// import moment from "moment"
import { lookupItems,lookupValue,moment } from "@/library/utils"
import {NumberFilter,DateFilter,TableBootstrap,textFilter,Icons,Tooltip,customFilter,Form,Toast} from "@/library/components"
import {Confirm} from "@/library/models"
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectDepartment,
  AutoCompleteFilterSingleSelectAnalyteCode,
  AutoCompleteFilterSingleSelectAnalyteName,
} from "../../index"
import { FormHelper } from "@/helper"

let analyteCode
let analyteName
let department
let species
let sex
let rangeSetOn
let equipmentType
let lab
let rangType
let age
let ageUnit
let low
let high
let alpha
let enteredBy
let status
let environment
let dateCreation
let dateActive
let dateExpire
let version
let deltaRangTeType
let deltaInterval
let intervalUnit

interface ReferenceRangesProps {
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

export const ReferenceRangesList = (props: ReferenceRangesProps) => {
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
              dataField: "rangeId",
              text: "Range Id",
              editable: false,
              csvExport: false,
              filter: customFilter({
                getFilter: (filter) => {
                  age = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: "analyteCode",
              text: "Analyte Code",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  analyteCode = filter
                },
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
                  <AutoCompleteFilterSingleSelectAnalyteCode
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.analyteCode,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "analyteName",
              text: "Analayte Name",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  analyteName = filter
                },
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
                  <AutoCompleteFilterSingleSelectAnalyteName
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.analyteName,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "department",
              text: "Department",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  department = filter
                },
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
                  analyteDepartments={row.analyteDepartments}
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.code, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "species",
              text: "Species",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  species = filter
                },
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
                      const species = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(species, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "SPECIES").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "sex",
              text: "Sex",
              headerClasses: "textHeader",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  sex = filter
                },
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
                    {lookupItems(props.extraData.lookupItems, "SEX").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "rangeSetOn",
              text: "Range Set On",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  rangeSetOn = filter
                },
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
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                    onChange={(e) => {
                      const rangeSetOn = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(rangeSetOn, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "RANGE_SET_ON").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "equipmentType",
              text: "Equipment Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  equipmentType = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row) ? row?.rangeSetOn === "L" ? false : true : false  ,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  {props.extraData.listInterfaceManager && (
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      onChange={(e) => {
                        const eqType = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(eqType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listInterfaceManager &&
                        props.extraData.listInterfaceManager.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.instrumentType}>
                              {`${item.instrumentType}`}
                            </option>
                          )
                        )}
                    </select>
                  )}
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader1",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  lab = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row) ? row?.rangeSetOn === "I" ? false : true : false,
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
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.code, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "rangeType",
              text: "Range Type",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  rangType = filter
                },
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
                      const rangType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(rangType, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "RANG_TYPE").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "ageFrom",
              text: "Age From",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: customFilter({
                getFilter: (filter) => {
                  age = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "ageTo",
              text: "Age To",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: customFilter({
                getFilter: (filter) => {
                  age = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "ageUnit",
              text: "Age Unit",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  ageUnit = filter
                },
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
                      const ageUnit = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(ageUnit, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "AGE_UNIT").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "low",
              text: "Low",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  low = filter
                },
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
                  <Form.Input
                    placeholder={row.low}
                    onBlur={(low) => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/)
                      if (regex.test(low) && FormHelper.isNumberAvailable(low)) {
                        props.onUpdateItem &&
                          props.onUpdateItem(low, column.dataField, row._id)
                      } else {
                        Toast.warning({
                          message: `😔 Only > and < sign and numbers should be allowed`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "high",
              text: "High",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  high = filter
                },
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
                  <Form.Input
                    placeholder={row.high}
                    onBlur={(high) => {
                      const regex = new RegExp(/^[0-9<>=\\-`.+,/"]*$/)
                      if (regex.test(high) && FormHelper.isNumberAvailable(high)) {  
                        props.onUpdateItem &&
                          props.onUpdateItem(high, column.dataField, row._id)
                      } else {
                        Toast.warning({
                          message: `😔 Only > and < sign and numbers should be allowed`,
                        })
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "alpha",
              text: "Alpha",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  alpha = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "deltaType",
              text: "Delta Type",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: textFilter({
                getFilter: (filter) => {
                  deltaRangTeType = filter
                },
              }),
            },
            {
              dataField: "deltaInterval",
              text: "Delta Interval",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: textFilter({
                getFilter: (filter) => {
                  deltaInterval = filter
                },
              }),
            },
            {
              dataField: "intervalUnit",
              text: "Interval Unit",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: textFilter({
                getFilter: (filter) => {
                  intervalUnit = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const intervalUnit = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(intervalUnit, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "INTERVAL_UNIT").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "colorLo",
              text: "Color Low",
              headerClasses: "textHeader5",
              sort: true,
              editable: false,

              csvFormatter: (col) => (col ? col : ""),
              // editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {
                      lookupItems(
                        props.extraData.lookupItems,
                        `${row.rangeType}_LW_COLOR`
                      ).filter((item) => item.code === row.colorLo)[0]?.value
                    }
                  </>
                )
              },
              // filter: textFilter({
              //   getFilter: (filter) => {
              //     intervalUnit = filter
              //   },
              // }),
            },
            {
              dataField: "colorHi",
              text: "Color High",
              headerClasses: "textHeader5",
              sort: true,
              editable: false,
              csvFormatter: (col) => (col ? col : ""),
              //editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {
                      lookupItems(
                        props.extraData.lookupItems,
                        `${row.rangeType}_HI_COLOR`
                      ).filter((item) => item.code === row.colorHi)[0]?.value
                    }
                  </>
                )
              },
              // filter: textFilter({
              //   getFilter: (filter) => {
              //     intervalUnit = filter
              //   },
              // }),
            },
            {
              dataField: "colorNormal",
              text: "Color Normal",
              headerClasses: "textHeader5",
              sort: true,
              editable: false,
              csvFormatter: (col) => (col ? col : ""),
              // editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {
                      lookupItems(
                        props.extraData.lookupItems,
                        `${row.rangeType}_NO_COLOR`
                      ).filter((item) => item.code === row.colorNormal)[0]?.value
                    }
                  </>
                )
              },  
              // filter: textFilter({
              //   getFilter: (filter) => {
              //     intervalUnit = filter
              //   },
              // }),
            },
            {
              dataField: "enterBy",
              editable: false,
              text: "Entered By",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  enteredBy = filter
                },
              }),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader2",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: textFilter({
                getFilter: (filter) => {
                  status = filter
                },
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
                    {lookupItems(props.extraData.lookupItems, "STATUS").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
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
              filter: textFilter({
                getFilter: (filter) => {
                  environment = filter
                },
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
                      const environment = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(environment, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "dateCreation",
              editable: false,
              text: "Date Creation",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col, row) =>
                row.dateCreation ? moment(row.dateCreation).format("YYYY-MM-DD") : "",
              filter: customFilter({
                getFilter: (filter) => {
                  dateCreation = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{moment(row.dateCreation).format("YYYY-MM-DD")}</>
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
                  <Form.InputDateTime
                    value={new Date(row.dateCreation)}
                    onFocusRemove={(dateCreation) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateCreation, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "dateActive",
              editable: false,
              text: "Date Active",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col, row) =>
                row.dateActive ? moment(row.dateActive).format("YYYY-MM-DD") : "",
              filter: customFilter({
                getFilter: (filter) => {
                  dateActive = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{moment(row.dateActive).format("YYYY-MM-DD")}</>
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
                  <Form.InputDateTime
                    value={new Date(row.dateActive)}
                    onFocusRemove={(dateActive) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateActive, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "dateExpire",
              editable: false,
              text: "Date Expire",
              headerClasses: "textHeader6",
              sort: true,
              csvFormatter: (col, row) =>
                row.dateExpire ? moment(row.dateExpire).format("YYYY-MM-DD") : "",
              filter: customFilter({
                getFilter: (filter) => {
                  dateExpire = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{moment(row.dateExpire).format("YYYY-MM-DD")}</>
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
                  <Form.InputDateTime
                    value={new Date(row.dateExpire)}
                    onFocusRemove={(dateExpire) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateExpire, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "version",
              editable: false,
              text: "Version",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: customFilter({
                getFilter: (filter) => {
                  version = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
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
                      position="bottom"
                    >
                      <Icons.IconContext
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
                        {Icons.getIconTag(
                          Icons.IconBs.BsFillTrashFill
                        )}
                      </Icons.IconContext>
                    </Tooltip>
                    {row.status !== "I" && (
                      <>
                        <Tooltip
                          className="ml-2"
                          tooltipText="Version Upgrade"
                          position="bottom"
                        >
                          <Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onVersionUpgrade && props.onVersionUpgrade(row)
                            }
                          >
                            {Icons.getIconTag(
                              Icons.Iconvsc.VscVersions
                            )}
                          </Icons.IconContext>
                        </Tooltip>
                        <Tooltip
                          className="ml-2"
                          tooltipText="Duplicate"
                          position="bottom"
                        >
                          <Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {Icons.getIconTag(
                              Icons.Iconio5
                                .IoDuplicateOutline
                            )}
                          </Icons.IconContext>
                        </Tooltip>
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
          fileName="ReferenceRanges"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page, limit) => {
            props.onPageSizeChange && props.onPageSizeChange(page, limit)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
          clearAllFilter={() => {
            analyteCode("")
            analyteName("")
            department("")
            species("")
            sex("")
            rangeSetOn("")
            equipmentType("")
            lab("")
            rangType("")
            age("")
            ageUnit("")
            low("")
            high("")
            alpha("")
            enteredBy("")
            status("")
            environment("")
            dateCreation()
            dateActive()
            dateExpire()
            version("")
            deltaRangTeType("")
            deltaInterval("")
            intervalUnit("")
          }}
        />
      </div>
    </>
  )
}
