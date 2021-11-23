/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

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
              headerClasses: "textHeader",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Test Code">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const testCode = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(testCode, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listTestMaster &&
                        props.extraData.listTestMaster.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.testCode}>
                              {item.testCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "sampleCode",
              text: "Sample Code",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Sample Code">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sampleCode = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(sampleCode, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listSampleType &&
                        props.extraData.listSampleType.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.sampleCode}>
                              {item.sampleCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "sampleType",
              text: "Sample Type",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Sample Type">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sampleType = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(sampleType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listSampleType &&
                        props.extraData.listSampleType.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.sampleType}>
                              {item.sampleType}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "sampleGroup",
              text: "Sample Group",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Sample Group">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const sampleGroup = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(sampleGroup, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listSampleType &&
                        props.extraData.listSampleType.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.sampleGroup}>
                              {item.sampleGroup}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "collContainerCode",
              text: "Coll Container Code",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Coll Container Code">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const collContainerCode = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            collContainerCode,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData
                        .listSampleContainer &&
                        props.extraData.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerCode}>
                              {item.containerCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "collContainerName",
              text: "Coll Container Name",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Coll Container Name">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const collContainerName = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            collContainerName,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData
                        .listSampleContainer &&
                        props.extraData.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerName}>
                              {item.containerName}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "testContainerCode",
              text: "Test Container Code",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Test Container Code">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const testContainerCode = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            testContainerCode,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData
                        .listSampleContainer &&
                        props.extraData.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerCode}>
                              {item.containerCode}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "testContainerName",
              text: "Test Container Name",
              headerClasses: "textHeader3",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Test Container Name">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const testContainerName = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            testContainerName,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData
                        .listSampleContainer &&
                        props.extraData.listSampleContainer.map(
                          (item: any, index: number) => (
                            <option key={index} value={item.containerName}>
                              {item.containerName}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "primaryContainer",
              text: "Primary Container",
              sort: true,
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
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "minDrawVolUnit",
              text: "Min Draw Vol Unit",
              headerClasses: "textHeader2",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Min Draw Vol Unit">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const minDrawVolUnit = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            minDrawVolUnit,
                            column.dataField,
                            row._id
                          )
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "minTestVol",
              text: "Min Test Vol",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "minTestVolUnit",
              text: "Min Test Vol Unit",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Min Test Vol Unit">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const minTestVolUnit = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            minTestVolUnit,
                            column.dataField,
                            row._id
                          )
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "condition",
              text: "Condition",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "repentionPeriod",
              text: "Repention Period",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "repentionUnits",
              text: "Repention Units",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Repention Units">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const repentionUnits = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            repentionUnits,
                            column.dataField,
                            row._id
                          )
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "labelInst",
              text: "Label Inst",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },

            {
              dataField: "printLabels",
              text: "Print Labels",
              sort: true,
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
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader1",
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
          fileName="Sample Type"
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
        />
      </div>
    </>
  )
}
export default TestSampleMappingList
