/* eslint-disable */
import React from "react"
import {lookupItems} from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import {AutoCompleteFilterSingleSelectAnalyteCode}  from "../index"
let analyteCode
let analyteName
let conclusionResult
let defaultConclusion
let environment
interface PossibleResultsListProps {
  data: Array<any>
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  updatePossibleResults?: (values: any) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const PossibleResultsList = (props: PossibleResultsListProps) => {
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
            dataField: "analyteCode",
            text: "Analyte Code",
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                analyteCode = filter
              }
            }),
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
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
                onSelect={(item)=>{
                  props.onUpdateItem && props.onUpdateItem(item.analyteCode,column.dataField,row._id)
                }}
                />
              </>
            ),
          },
          {
            dataField: "analyteName",
            text: "Analyte Name",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                analyteName = filter
              }
            }),
            editable: false,
          },
          {
            dataField: "conclusionResult",
            text: "Conclusion Result",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: (cell, row, rowIndex) =>
              `Result:${row.conclusionResult.map(item => item.result)} - PossibleValue: ${row.conclusionResult.map(item => item.possibleValue)} - Ab Normal: ${row.conclusionResult.map(item => item.abNormal)},Critical: ${row.conclusionResult.map(item => item.critical)}`,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                conclusionResult = filter
              }
            }),
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  {row.conclusionResult.map((item) => (
                    <div className="mb-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {}}
                      >
                        {`Result: ${item.result}
                         PossibleValue: ${item.possibleValue}
                         Ab Normal: ${item.abNormal}
                         Critical: ${item.critical}`}
                      </LibraryComponents.Atoms.Buttons.Button>
                    </div>
                  ))}
                </LibraryComponents.Atoms.List>
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
                <LibraryComponents.Atoms.Grid cols={5}>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Result"
                    value={
                      props.extraData.possibleResultsStore?.possibleResults.result
                    }
                    onChange={(result) => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore.possibleResults,
                          result,
                        })
                    }}
                  />
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Possible Value"
                    value={
                      props.extraData.possibleResultsStore?.possibleResults
                        .possibleValue
                    }
                    onChange={(possibleValue) => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore.possibleResults,
                          possibleValue,
                        })
                    }}
                  />
                  <LibraryComponents.Atoms.Form.Toggle
                    label="AbNormal"
                    value={
                      props.extraData.possibleResultsStore?.possibleResults.abNormal
                    }
                    onChange={(abNormal) => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore.possibleResults,
                          abNormal,
                        })
                    }}
                  />
                  <LibraryComponents.Atoms.Form.Toggle
                    label="Critical"
                    value={
                      props.extraData.possibleResultsStore?.possibleResults.critical
                    }
                    onChange={(critical) => {
                      props.updatePossibleResults &&
                        props.updatePossibleResults({
                          ...props.extraData.possibleResultsStore.possibleResults,
                          critical,
                        })
                    }}
                  />

                  <div className="mt-2">
                    <LibraryComponents.Atoms.Buttons.Button
                      size="medium"
                      type="solid"
                      onClick={() => {
                        let result =
                          props.extraData.possibleResultsStore?.possibleResults
                            .result
                        let possibleValue =
                          props.extraData.possibleResultsStore?.possibleResults
                            .possibleValue
                        let conclusionResult = row.conclusionResult || []
                        if (result === undefined || possibleValue === undefined)
                          return alert("Please enter value and code.")
                        if (result !== undefined) {
                          conclusionResult !== undefined
                            ? conclusionResult.push({
                                result,
                                possibleValue,
                                abNormal: false,
                                critical: false,
                              })
                            : [
                                {
                                  result,
                                  possibleValue,
                                  abNormal: false,
                                  critical: false,
                                },
                              ]
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              conclusionResult,
                              "conclusionResult",
                              row._id
                            )
                        }
                      }}
                    >
                      <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                      {`Add`}
                    </LibraryComponents.Atoms.Buttons.Button>
                  </div>
                  <div className="clearfix"></div>
                </LibraryComponents.Atoms.Grid>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  <div>
                    {row.conclusionResult?.map((item, index) => (
                      <div className="mb-2" key={index}>
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          icon={LibraryComponents.Atoms.Icon.Remove}
                          onClick={() => {
                            const firstArr =
                              row?.conclusionResult?.slice(0, index) || []
                            const secondArr =
                              row?.conclusionResult?.slice(index + 1) || []
                            const finalArray = [
                              ...firstArr,
                              ...secondArr,
                            ] as typeof props.extraData.possibleResultStore.conclusionResult
                            props.updatePossibleResults &&
                              props.updatePossibleResults({
                                ...props.extraData.possibleResultsStore
                                  .possibleResults,
                                conclusionResult: finalArray,
                              })
                            props.onUpdateItem &&
                              props.onUpdateItem(
                                finalArray,
                                "conclusionResult",
                                row._id
                              )
                          }}
                        >
                          {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                        </LibraryComponents.Atoms.Buttons.Button>
                      </div>
                    ))}
                  </div>
                </LibraryComponents.Atoms.List>
              </>
            ),
          },
          {
            dataField: "defaultConclusion",
            text: "Defualt Conclusion",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: (cell, row, rowIndex) =>
              `Result:${row.defaultConclusion && row.defaultConclusion.result} - PossibleValue: ${row.defaultConclusion&&row.defaultConclusion.possibleValue} - Ab Normal: ${row.defaultConclusion&&row.defaultConclusion.abNormal},Critical: ${row.defaultConclusion&&row.defaultConclusion.critical}`,
            filter: LibraryComponents.Organisms.Utils.textFilter({
              getFilter: (filter) =>{
                defaultConclusion = filter
              }
            }),
            formatter: (cellContent, row) => (
              <>
                {row.defaultConclusion && (
                  <label>
                    {`Result: ${row.defaultConclusion.result || ""} 
                       PossibleValue: ${row.defaultConclusion.possibleValue|| ""}
                       Ab Normal: ${row.defaultConclusion.abNormal || false}
                       Critical: ${row.defaultConclusion.critical || false}`}
                  </label>
                )}
              </>
            ),
          },
          {
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader4",
            sort: true,
            csvFormatter: col => (col ? col : ""),
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
        fileName="PossibleResult"
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
          analyteCode("")
          analyteName("")
          conclusionResult("")
          defaultConclusion("")
          environment("")
        }}
      />
    </div>
  )
}
