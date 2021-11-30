/* eslint-disable */
import React from "react"
import dayjs from "dayjs"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface ReferenceRangesProps {
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
  onPageSizeChange?: (page: number, totalSize:number) =>void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const ReferenceRangesList = (props: ReferenceRangesProps) => {
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
              dataField: "analyteCode",
              text: "Analyte Code",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const analyte = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            analyte.analyteCode,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listMasterAnalyte &&
                        props.extraData.listMasterAnalyte.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.analyteCode} - ${item.analyteName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "analyteName",
              text: "Analayte Name",
              headerClasses: "textHeader4",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const analyte = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            analyte.analyteName,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listMasterAnalyte &&
                        props.extraData.listMasterAnalyte.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.analyteName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "department",
              text: "Department",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const department = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(department, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listDepartment &&
                        props.extraData.listDepartment.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
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
              dataField: "species",
              text: "Species",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const species = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(species, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SPECIES"
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
              dataField: "sex",
              text: "Sex",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sex = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(sex, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SEX"
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
              dataField: "rangeSetOn",
              text: "Range Set On",
              headerClasses: "textHeader4",
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Range Set On"
                    
                  >
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      onChange={(e) => {
                        const rangeSetOn = e.target.value as string
                        props.onUpdateItem && props.onUpdateItem(rangeSetOn,column.dataField,row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "RANGE_SET_ON"
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
              dataField: "equipmentType",
              text: "Equipment Type",
              headerClasses: "textHeader4",
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
                  {props.extraData.listInterfaceManager && (
                
                    <LibraryComponents.Atoms.Form.InputWrapper
                      label="Equipment Type"
                      
                    >
                      <select
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                        onChange={(e) => {
                          const eqType = e.target.value as string
                          props.onUpdateItem && props.onUpdateItem(eqType,column.dataField,row._id)
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
                    </LibraryComponents.Atoms.Form.InputWrapper>
                  
              )}
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const lab = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(lab, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listLabs.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "rangType",
              text: "Rang Type",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const rangType = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(rangType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "RANG_TYPE"
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
              dataField: "age",
              text: "Age",
               headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.numberFilter({
                numberStyle: { marginLeft: "2px" },
                style: { display: "inline" },
                defaultValue: {
                  comparator: LibraryComponents.Organisms.Utils.Comparator.EQ,
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "ageUnit",
              text: "Age Unit",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const ageUnit = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(ageUnit, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "AGE_UNIT"
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
              dataField: "low",
              text: "Low",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "high",
              text: "High",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "alpha",
              text: "Alpha",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "enteredBy",
              editable: false,
              text: "Entered By",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader2",
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
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
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
              editable: false,
              text: "Date Active",
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
                return <>{dayjs(row.dateActive).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "dateExpire",
              editable: false,
              text: "Date Expire",
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
                return <>{dayjs(row.dateExpire).format("YYYY-MM-DD")}</>
              },
            },
            {  
              dataField: "version",
              editable: false,
              text: "Version",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.numberFilter({
                numberStyle: { marginLeft: "2px" },
                style: { display: "inline" },
                defaultValue: {
                  comparator: LibraryComponents.Organisms.Utils.Comparator.EQ,
                },
              }),
            },
            {
              dataField: "deltaRangTeType",
              text: "Delta Rang Tetype",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "deltaInterval",
              text: "Delta Interval",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {   
              dataField: "intervalUnit",
              text: "Interval Unit",
              headerClasses: "textHeader5",
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const intervalUnit = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(intervalUnit, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "INTERVAL_UNIT"
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
              dataField: "formalResultUnit",
              text: "Formal Result Unit",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "reportDefault",
              text: "Report Default",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
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
          fileName="ReferenceRanges"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page,limit)=>{
            props.onPageSizeChange && props.onPageSizeChange(page,limit)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
        />
      </div>
    </>
  )
}
export default ReferenceRangesList
