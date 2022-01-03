/* eslint-disable */
import React from "react"
import _ from "lodash"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import {
  AutoCompleteFilterSingleSelectTestCode,
  AutoCompleteFilterSingleSelectSampleCode,
  AutoCompleteFilterSingleSelectSampleType,
  AutoCompleteFilterSingleSelectSampleGroup,
  AutoCompleteFilterSingleSelectContainerCode,
  AutoCompleteFilterSingleSelectContainerName,
  AutoCompleteFilterSingleSelectDepartment
} from "../orgransims"
let testCode
let sampleCode
let sampleType
let sampleGroup
let collContainerCode
let collContainerName
let testContainerCode
let testContainerName
let minDrawVol
let minDrawVolUnit
let minTestVol
let minTestVolUnit
let condition
let repentionPeriod
let repentionUnits
let labelInst
let info
let environment

interface TestSampleMappingListProps {
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

const TestSampleMappingList = (props: TestSampleMappingListProps) => {
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
              dataField: "testCode",
              text: "Test Code",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  testCode = filter
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
                  <AutoCompleteFilterSingleSelectTestCode
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(item.testCode, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "sampleCode",
              text: "Sample Code",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  sampleCode = filter
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
                  <AutoCompleteFilterSingleSelectSampleCode
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.sampleCode,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "sampleType",
              text: "Sample Type",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  sampleType = filter
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
                  <AutoCompleteFilterSingleSelectSampleType
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.sampleType,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "sampleGroup",
              text: "Sample Group",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  sampleGroup = filter
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
                  <AutoCompleteFilterSingleSelectSampleGroup
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.sampleGroup,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "collContainerCode",
              text: "Coll Container Code",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  collContainerCode = filter
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
                  <AutoCompleteFilterSingleSelectContainerCode
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerCode,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "collContainerName",
              text: "Coll Container Name",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  collContainerName = filter
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
                  <AutoCompleteFilterSingleSelectContainerName
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerName,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "testContainerCode",
              text: "Test Container Code",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  testContainerCode = filter
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
                  <AutoCompleteFilterSingleSelectContainerCode
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerCode,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "testContainerName",
              text: "Test Container Name",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  testContainerName = filter
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
                  <AutoCompleteFilterSingleSelectContainerName
                    onSelect={(item) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          item.containerName,
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "primaryContainer",
              text: "Primary Container",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.primaryContainer}
                      onChange={(primaryContainer) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            primaryContainer,
                            "primaryContainer",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "uniqueContainer",
              text: "Unique Container",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.uniqueContainer}
                      onChange={(uniqueContainer) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            uniqueContainer,
                            "uniqueContainer",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },

            {
              dataField: "centerIfuge",
              text: "CenterIfuge",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.centerIfuge}
                      onChange={(centerIfuge) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(centerIfuge, "centerIfuge", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "aliquot",
              text: "Aliquot",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    {" "}
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.aliquot}
                      onChange={(aliquot) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(aliquot, "aliquot", row._id)
                      }}
                    />{" "}
                    {row.aliquot ? "Yes" : "No"}
                  </>
                )
              },
            },
            {
              dataField: "labSpecfic",
              text: "Lab Specfic",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.labSpecfic}
                      onChange={(labSpecfic) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(labSpecfic, "labSpecfic", row._id)
                      }}
                    />
                  </>
                )
              },
            },

            {
              dataField: "departmentSpecfic",
              text: "Department Specfic",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Department Specfic"
                      value={row.departmentSpecfic}
                      onChange={(departmentSpecfic) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            departmentSpecfic,
                            "departmentSpecfic",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "sharedSample",
              text: "Shared Sample",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      label="Shared Sample"
                      value={row.sharedSample}
                      onChange={(sharedSample) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(sharedSample, "sharedSample", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "minDrawVol",
              text: "Min Draw Vol",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  minDrawVol = filter
                },
              }),
            },

            {
              dataField: "minDrawVolUnit",
              text: "Min Draw Vol Unit",
              headerClasses: "textHeader5",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  minDrawVolUnit = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-00 rounded-md"
                    onChange={(e) => {
                      const minDrawVolUnit = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(minDrawVolUnit, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "MIN_DRAW_VOL_UNIT"
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
              dataField: "minTestVol",
              text: "Min Test Vol",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  minTestVol = filter
                },
              }),
            },
            {
              dataField: "minTestVolUnit",
              text: "Min Test Vol Unit",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  minTestVolUnit = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-00 rounded-md"
                    onChange={(e) => {
                      const minTestVolUnit = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(minTestVolUnit, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "MIN_TEST_VOL_UNIT"
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
              dataField: "condition",
              text: "Condition",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  condition = filter
                },
              }),
            },
            {
              dataField: "repentionPeriod",
              text: "Repention Period",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  repentionPeriod = filter
                },
              }),
            },

            {
              dataField: "repentionUnits",
              text: "Repention Units",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  repentionUnits = filter
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-00 rounded-md"
                    onChange={(e) => {
                      const repentionUnits = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(repentionUnits, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      props.extraData.lookupItems,
                      "RETENTION_UNITS"
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
              dataField: "labelInst",
              text: "Label Inst",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  labelInst = filter
                },
              }),
            },

            {
              dataField: "printLabels",
              text: "Print Labels",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.printLabels}
                      onChange={(printLabels) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(printLabels, "printLabels", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "info",
              text: "Info",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  info = filter
                },
              }),
            },
            {
              dataField: "departments",
              text: "Departments",
              headerClasses: "textHeader5",
              sort: true,
              // csvFormatter: (cell, row, rowIndex) =>
              //   `Value:${row.arrValue.map(
              //     (item) => item.value
              //   )} - Code:${row.arrValue.map((item) => item.code)}`,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  // arrValue = filter
                },
              }),
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.List
                    space={2}
                    direction="row"
                    justify="center"
                  >
                    {row.departments?.map((item) => (
                      <div className="mb-2">
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          onClick={() => {}}
                        >
                          {`${item.code} - ${item.name}`}
                          {`  ${item.prefrence}`}
                          {`  ${item.tatInMin}`}
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
                 <LibraryComponents.Atoms.Grid cols={3}>
                    <div className="mt-1">
                      <AutoCompleteFilterSingleSelectDepartment
                      onSelect={(item)=>{
                        props.extraData.updateDepartments({
                          ...props.extraData.departments,
                          code: item.code,
                          name: item.name,
                        })
                      }}
                      />
                    </div>
                        <LibraryComponents.Atoms.Form.Input
                          placeholder="Prefrence"
                          type="number"
                          value={row.prefrence}
                          onChange={(prefrence) => {
                            props.extraData.updateDepartments({
                              ...props.extraData.departments,
                              prefrence: parseFloat(prefrence),
                            })
                          }}
                        />
                        <LibraryComponents.Atoms.Form.Input
                          placeholder="TAT IN MIN"
                          type="number"
                          value={row.tatInMin}
                          onChange={(tatInMin) => {
                            props.extraData.updateDepartments({
                              ...props.extraData.departments,
                              tatInMin: parseFloat(tatInMin),
                            })
                          }}
                        />
                    <div className="mt-1 flex flex-row justify-between">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {
                          const code = props.extraData.departments?.code
                          console.log({code})
                          const name = props.extraData.departments?.name
                          console.log({name})
                          const prefrence =
                          row?.prefrence
                          const tatInMin =
                          row?.tatInMin
                          let departments =
                          row?.departments ||
                            []
                            // console.log({departments})
                          if (
                            code === undefined ||
                            prefrence === undefined ||
                            tatInMin === undefined
                          )
                            return alert("Please enter all values.")
                          if (code !== undefined) {
                            departments !== undefined
                              ? departments.push({
                                  code,
                                  name,
                                  prefrence,
                                  tatInMin,
                                })
                              : (departments = [
                                  {
                                    code,
                                    name,
                                    prefrence,
                                    tatInMin,
                                  },
                                ])
                                
                            props.onUpdateItem && props.onUpdateItem(departments,"departments",row._id)
                           props.extraData.updateDepartments({
                              code: undefined,
                              name: undefined,
                              prefrence: undefined,
                              tatInMin: undefined,
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
                      {row?.departments.map(
                        (item, index) => (
                          <div className="mb-2" key={index}>
                            <LibraryComponents.Atoms.Buttons.Button
                              size="medium"
                              type="solid"
                              icon={LibraryComponents.Atoms.Icon.Remove}
                              onClick={() => {
                                const firstArr =
                                  row?.departments?.slice(
                                    0,
                                    index
                                  ) || []
                                const secondArr =
                                  row?.departments?.slice(
                                    index + 1
                                  ) || []
                                const finalArray = [...firstArr, ...secondArr]
                                props.extraData.updateSampleType({
                                  ...props.extraData.testSampleMapping,
                                  departments: finalArray,
                                })
                              //   finalArray = _.map(finalArray, (o) =>
                              // _.pick(o, ["code", "value"])
                              //    )
                                props.onUpdateItem && props.onUpdateItem(finalArray,"departments",row._id)
                              }}
                            >
                              {`${item.code} - ${item.name}`}
                              {`  ${item.prefrence}`}
                              {`  ${item.tatInMin}`}
                            </LibraryComponents.Atoms.Buttons.Button>
                          </div>
                        )
                      )}
                    </div>
                  </LibraryComponents.Atoms.List>
                </>
              )
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader4",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  environment = filter
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
                    value={row.environment}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
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
                    <LibraryComponents.Atoms.Tooltip
                      tooltipText="Delete"
                      position="top"
                    >
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
          fileName="TestSampleMapping"
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
            testCode("")
            sampleCode("")
            sampleType("")
            sampleGroup("")
            collContainerCode("")
            collContainerName("")
            testContainerCode("")
            testContainerName("")
            minDrawVol("")
            minDrawVolUnit("")
            minTestVol("")
            minTestVolUnit("")
            condition("")
            repentionPeriod("")
            repentionUnits("")
            labelInst("")
            info("")
            environment("")
          }}
        />
      </div>
    </>
  )
}
export default TestSampleMappingList
