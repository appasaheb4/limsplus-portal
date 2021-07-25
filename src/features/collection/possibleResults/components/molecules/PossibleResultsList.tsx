/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { Stores } from "../../stores"
interface PossibleResultsListProps {
  data: Array<any>
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

export const PossibleResultsList = observer((props: PossibleResultsListProps) => {
  return (
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
            dataField: "analyteCode",
            text: "Analyte Code",
            sort: true,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex
            ) => (
              <>
                <LibraryComponents.Atoms.Form.InputWrapper label="Analyte Code">
                  <select
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const analyte = JSON.parse(e.target.value)
                      // console.log('Analyte Value....',analyte.analyteCode)
                      Stores.possibleResultsStore.updatePossibleResults({
                        ...Stores.possibleResultsStore.possibleResults,
                        analyteCode: analyte.analyteCode,
                        analyteName: analyte.analyteName,
                      })
                      props.onUpdateItem &&
                      props.onUpdateItem(analyte.analyteCode,column.dataField,row._id)
                      
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
            text: "Analyte Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "conclusionResult",
            text: "Conclusion Result",
            sort: true,
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  {row.conclusionResult?.map((item) => (
                    <div className="mb-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {}}
                      >
                        {`Result: ${item.result} 
                         PossibleValue: ${item.code}
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
                      value={Stores.possibleResultsStore.possibleResults?.result}
                      onChange={(result) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          result,
                        })
                      }}
                />
                <LibraryComponents.Atoms.Form.Input
                      placeholder="Possible Value"
                      value={
                        Stores.possibleResultsStore.possibleResults?.possibleValue
                      }
                      onChange={(possibleValue) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          possibleValue,
                        })
                      }}
               />
                <LibraryComponents.Atoms.Form.Toggle
                      label="AB Normal"
                      value={Stores.possibleResultsStore.possibleResults?.abNormal}
                      onChange={(abNormal) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
                          abNormal,
                        })
                      }}
                    />
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Critical"
                      value={Stores.possibleResultsStore.possibleResults?.critical}
                      onChange={(critical) => {
                        Stores.possibleResultsStore.updatePossibleResults({
                          ...Stores.possibleResultsStore.possibleResults,
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
                            Stores.possibleResultsStore.possibleResults?.result
                          let possibleValue =
                            Stores.possibleResultsStore.possibleResults
                              ?.possibleValue
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
                              :  [
                                  {
                                    result,
                                    possibleValue,
                                    abNormal: false,
                                    critical: false,
                                  },
                                ]
                                props.onUpdateItem &&
                          props.onUpdateItem(conclusionResult, "conclusionResult", row._id)
                            // Stores.possibleResultsStore.updatePossibleResults({
                            //   ...Stores.possibleResultsStore.possibleResults,
                            //   conclusionResult,
                            // })
                            Stores.possibleResultsStore.updatePossibleResults({
                              ...Stores.possibleResultsStore.possibleResults,
                              conclusionResult,
                              result: "",
                              possibleValue: "",
                              abNormal: false,
                              critical: false,
                            })
                            
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
                      {row.conclusionResult?.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row?.conclusionResult?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row?.conclusionResult?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [
                                  ...firstArr,
                                  ...secondArr,
                                ] as typeof Stores.possibleResultsStore.possibleResults.conclusionResult
                                Stores.possibleResultsStore.updatePossibleResults({
                                  ...Stores.possibleResultsStore.possibleResults,
                                  conclusionResult: finalArray,
                                })
                                props.onUpdateItem &&
                                props.onUpdateItem(finalArray, "conclusionResult", row._id)
                              }}
                            >
                              {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AB Normal: ${item.abNormal}  
                              Critical: ${item.critical}`}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                    </LibraryComponents.Atoms.List>
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
                      color="#000"
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
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName="Lookup"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
        }}
      />
    </div>
  )
})
