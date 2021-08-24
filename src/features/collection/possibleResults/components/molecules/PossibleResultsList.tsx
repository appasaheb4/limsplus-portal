/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface PossibleResultsListProps {
  data: Array<any>
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const analyte = JSON.parse(e.target.value)
                      props.onUpdateItem &&
                        props.onUpdateItem(analyte.analyteCode, column.dataField, row._id)
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
                  {row.conclusionResult.map((item) => (
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
                      value={props.extraData.possibleResultStore?.result}
                      onChange={(result) => {
                        props.extraData. updatePossibleResultStore({
                          ...props.extraData.possibleResultStore,
                          result,
                        })
                      }}
                />
                <LibraryComponents.Atoms.Form.Input
                      placeholder="Possible Value"
                      value={
                        props.extraData.possibleResultStore?.possibleValue
                      }
                      onChange={(possibleValue) => {
                        props.extraData. updatePossibleResultStore({
                          ...props.extraData.possibleResultStore,
                          possibleValue,
                        })
                      }}
               />
                <LibraryComponents.Atoms.Form.Toggle
                      label="AbNormal"
                      value={props.extraData.possibleResultStore?.abNormal}
                      onChange={(abNormal) => {
                        props.extraData. updatePossibleResultStore({
                          ...props.extraData.possibleResultStore,
                          abNormal,
                        })
                      }}
                    />
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Critical"
                      value={props.extraData.possibleResultStore?.critical}
                      onChange={(critical) => {
                        props.extraData. updatePossibleResultStore({
                          ...props.extraData.possibleResultStore,
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
                          props.extraData.possibleResultStore?.result
                          let possibleValue =
                          props.extraData.possibleResultStore
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
                            props.extraData. updatePossibleResultStore({
                              ...props.extraData.possibleResultStore,
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
                                ] as typeof props.extraData.possibleResultStore.conclusionResult
                                props.extraData. updatePossibleResultStore({
                                  ...props.extraData.possibleResultStore,
                                  conclusionResult: finalArray,
                                })
                                props.onUpdateItem &&
                                props.onUpdateItem(finalArray, "conclusionResult", row._id)
                              }}
                            >
                              {`Result: ${item.result}  
                              Possible Value: ${item.possibleValue}  
                              AbNormal: ${item.abNormal}  
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
        onPageSizeChange={(page,size)=>{
          props.onPageSizeChange && props.onPageSizeChange(page,size)
        }}
      />
    </div>
  )
})
