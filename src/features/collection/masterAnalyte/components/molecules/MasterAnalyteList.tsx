/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment, { normalizeUnits } from "moment"
import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores } from "../../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RootStore } from "@lp/library/stores"


interface MasterAnalyteProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const MasterAnalyteList = observer((props: MasterAnalyteProps) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <LibraryComponents.Organisms.TableBootstrap
          id="_id"
          data={props.data}
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                    <select
                      className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const lab = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(lab, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LabStores.labStore.listLabs.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "analyteCode",
              text: "Analyte Code",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "analyteName",
              text: "Analyte Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "description",
              text: "Description",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "shortName",
              text: "Short Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "bill",
              text: "Bill",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.bill ? 'Yes' :'No'}
                </>
                )
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
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  value={Stores.masterAnalyteStore.masterAnalyte?.bill}
                  onChange={(bill) => {
                    props.onUpdateItem &&
                          props.onUpdateItem(bill, column.dataField, row._id)
                  }}
                />
                  </>
                ),
            },
            {
              dataField: "price",
              text: "Price",
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
                  <LibraryComponents.Atoms.Form.Input
                label="Price"
                name="txtPrice"
                placeholder="Price"
                type="number"
                value={Stores.masterAnalyteStore.masterAnalyte?.price}
                onChange={(price) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(price, column.dataField, row._id)
                }}
              />
                </>
              ),
            },
            {
              dataField: "schedule",
              text: "Schedule",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "autoRelease",
              text: "Auto Release",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.autoRelease ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="AutoRelease"
                  id="modeAutoRelease"
                  value={Stores.masterAnalyteStore.masterAnalyte?.autoRelease}
                  onChange={(autoRelease) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(autoRelease, column.dataField, row._id)
                  }}
                  />
                  </>
                ),
            },
            {
              dataField: "holdOOS",
              text: "Hold OOS",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.holdOOS ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="Hold OOS"
                  id="modeHoldOOS"
                  value={Stores.masterAnalyteStore.masterAnalyte?.holdOOS}
                  onChange={(holdOOS) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(holdOOS, column.dataField, row._id)
                  }}
                  />
                  </>
                ), 
            },
            {
              dataField: "instantResult",
              text: "Instant Result",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.instantResult ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="InstantResult"
                  id="modeInstantResult"
                  value={Stores.masterAnalyteStore.masterAnalyte?.instantResult}
                  onChange={(instantResult) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(instantResult, column.dataField, row._id)
                  }}
                  />
                  </>
                ),    
            },
            {
              dataField: "tubeGroups",
              text: "Tube Groups",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "pageBreak",
              text: "Page Break",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.pageBreak ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="PageBreak"
                  id="modePageBreak"
                  value={Stores.masterAnalyteStore.masterAnalyte?.pageBreak}
                  onChange={(pageBreak) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(pageBreak, column.dataField, row._id)
                  }}
                  />
                  </>
                ),    
            },
            {
              dataField: "method",
              text: "Method",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.method ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="Method"
                  id="modeMethod"
                  value={Stores.masterAnalyteStore.masterAnalyte?.method}
                  onChange={(method) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(method, column.dataField, row._id)
                  }}
                  />
                  </>
                ),    
            },
            {
              dataField: "analyteMethod",
              text: "Analyte Method",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "workflow",
              text: "Workflow",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "sampleType",
              text: "sampleType",
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                label="Sample Type"
                id="optionSampleType"
              >
                <select
                  name="optionSampleTypes"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                      props.onUpdateItem && 
                        props.onUpdateItem(sampleType,column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {["sampleType1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),    
            },
            {
              dataField: "display",
              text: "Display",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.display ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="Display"
                  id="modeDisplay"
                  value={Stores.masterAnalyteStore.masterAnalyte?.display}
                  onChange={(display) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(display, column.dataField, row._id)
                  }}
                  />
                  </>
                ),    
            },
            {
              dataField: "calculationFlag",
              text: "Calculation Flag",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.calculationFlag ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="CalculationFlag"
                  id="modeCalculationFlag"
                  value={Stores.masterAnalyteStore.masterAnalyte?.calculationFlag}
                  onChange={(calculationFlag) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(calculationFlag, column.dataField, row._id)
                  }}
                  />
                  </>
                ),    

            },
            {
              dataField: "calcyName",
              text: "Calcy Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "high",
              text: "High",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "low",
              text: "Low",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "repetition",
              text: "Repetition",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                <>
                {row.repetition ? 'Yes' :'No'}
                </>
                )
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
                 <LibraryComponents.Atoms.Form.Toggle
                  label="Repetition"
                  id="modeRepetition"
                  value={Stores.masterAnalyteStore.masterAnalyte?.instantResult}
                  onChange={(repetition) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(repetition, column.dataField, row._id)
                  }}
                  />
                  </>
                ),    
            },
            {
              dataField: "picture",
              text: "picture",
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
                  <LibraryComponents.Atoms.Form.InputWrapper
                label="Picture"
              >
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const picture = e.target.value as "0" | "1" | "2" | "3"
                    props.onUpdateItem && 
                      props.onUpdateItem(picture,column.dataField,row._id)
                    
                  }}
                >
                  <option selected>Select</option>
                  {["0", "1", "2", "3"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "units",
              text: "Units",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
               editorRenderer: (
                 editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex  
              // ) => (
              //   <>
              //     <LibraryComponents.Atoms.Form.InputWrapper label="Units">
              //   <select
              //     className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
              //     onChange={(e) => {
              //       const units = e.target.value as string
              //         props.onUpdateItem && 
              //           props.onUpdateItem(units,column.dataField,row._id)
              //     }}
              //   >
              //     <option selected>Select</option>
              //     {/* {lookupItems.length > 0 &&
              //       lookupItems
              //         .find((item) => {
              //           return item.fieldName === "UNITS"
              //         })
              //         .arrValue.map((item: any, index: number) => (
              //           <option key={index} value={item.code}>
              //             {`${item.value} - ${item.code}`}
              //           </option>
              //         ))} */}
              //   </select>
              // </LibraryComponents.Atoms.Form.InputWrapper>
              //   </>
              ),
            },
            {
              dataField: "usage",
              text: "Usage",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "cptCode",
              text: "CPT Code",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "status",
              text: "Status",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "dateCreation",
              text: "Date Creation",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "dateActive",
              text: "Date Active",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "version",
              text: "Version",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "keyNum",
              text: "Key Num",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "opration",
              text: "Delete",
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
                          body: `Delete item`,
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
          fileName="AnalyteMaster"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
        />
      </div>
    </>
  )
})
export default MasterAnalyteList
