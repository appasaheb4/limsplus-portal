/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import Storage from "@lp/library/modules/storage"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as SampleTypeStore } from "@lp/features/collection/sampleType/stores"
import { Stores as SampleContainerStore } from "@lp/features/collection/sampleContainer/stores"
import { Stores } from "../../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RootStore } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

interface TestSampleMappingListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const TestSampleMappingList = observer((props: TestSampleMappingListProps) => {
  const [lookupItems, setLookupItems] = useState<any[]>([])
  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      setLookupItems(items)
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])
  return (
    <>
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
            dataField: "testCode",
            text: "Test Code",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testCode = e.target.value as string
                      props.onUpdateItem && 
                        props.onUpdateItem(testCode,column.dataField,row._id);
                  }}
                >
                  <option selected>Select</option>
                  {TestMasterStore.testMasterStore.listTestMaster &&
                    TestMasterStore.testMasterStore.listTestMaster.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleCode = e.target.value as string
                    props.onUpdateItem && 
                    props.onUpdateItem(sampleCode,column.dataField,row._id);
                  }}
                >
                  <option selected>Select</option>
                  {SampleTypeStore.sampleTypeStore.listSampleType &&
                    SampleTypeStore.sampleTypeStore.listSampleType.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    props.onUpdateItem && 
                    props.onUpdateItem(sampleType,column.dataField,row._id);
                 
                  }}
                >
                  <option selected>Select</option>
                  {SampleTypeStore.sampleTypeStore.listSampleType &&
                    SampleTypeStore.sampleTypeStore.listSampleType.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleGroup = e.target.value as string
                    props.onUpdateItem && 
                    props.onUpdateItem(sampleGroup,column.dataField,row._id);
                  }}
                >
                  <option selected>Select</option>
                  {SampleTypeStore.sampleTypeStore.listSampleType &&
                    SampleTypeStore.sampleTypeStore.listSampleType.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collContainerCode = e.target.value as string
                    props.onUpdateItem && 
                    props.onUpdateItem(collContainerCode,column.dataField,row._id);
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collContainerName = e.target.value as string
                      props.onUpdateItem &&
                        props.onUpdateItem(collContainerName,column.dataField,row._id);
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testContainerCode = e.target.value as string
                      props.onUpdateItem && 
                        props.onUpdateItem(testContainerCode,column.dataField,row._id);
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testContainerName = e.target.value as string
                      props.onUpdateItem && 
                        props.onUpdateItem(testContainerName,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
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
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.primaryContainer ? 'Yes' :'No'}
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
                  label="Primary Container"
                  value={
                    row.primaryContainer
                  }
                  onChange={(primaryContainer) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(primaryContainer,column.dataField,row._id)
                  }}
                />
                  </>
                ),  
          },
          {
            dataField: "uniqueContainer",
            text: "Unique Container",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.uniqueContainer ? 'Yes' :'No'}
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
                  label="Unique Container"
                  value={
                    row.uniqueContainer
                  }
                  onChange={(uniqueContainer) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(uniqueContainer,column.dataField,row._id)
                  }}
                />
                  </>
                ),  
          },

          {
            dataField: "centerIfuge",
            text: "CenterIfuge",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.centerIfuge ? 'Yes' :'No'}
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
                  label="CenterIfuge"
                  value={
                    row.centerIfuge
                  }
                  onChange={(centerIfuge) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(centerIfuge,column.dataField,row._id)
                  }}
                />
                  </>
                ),
          },
          {
            dataField: "aliquot",
            text: "Aliquot",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.aliquot ? 'Yes' :'No'}
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
                  label="Aliquot"
                  value={
                    row.aliquot
                  }
                  onChange={(aliquot) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(aliquot,column.dataField,row._id)
                  }}
                />
                  </>
                ),
          },
          {
            dataField: "labSpecfic",
            text: "Lab Specfic",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.labSpecfic ? 'Yes' :'No'}
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
                  label="Lab Specfic"
                  value={
                    row.labSpecfic
                  }
                  onChange={(labSpecfic) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(labSpecfic,column.dataField,row._id)
                  }}
                />
                  </>
                ),
          },

          {
            dataField: "departmentSpecfic",
            text: "Department Specfic",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.departmentSpecfic ? 'Yes' :'No'}
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
                  label="Department Specfic"
                  value={
                    row.departmentSpecfic
                  }
                  onChange={(departmentSpecfic) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(departmentSpecfic,column.dataField,row._id)
                  }}
                />
                  </>
                ),
          },
          {
            dataField: "sharedSample",
            text: "Shared Sample",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.sharedSample ? 'Yes' :'No'}
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
                  label="Shared Sample"
                  value={
                    row.sharedSample
                  }
                  onChange={(sharedSample) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(sharedSample,column.dataField,row._id)
                  }}
                />
                  </>
                ),
          },
          {
            dataField: "minDrawVol",
            text: "Min Draw Vol",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },

          {
            dataField: "minDrawVolUnit",
            text: "Min Draw Vol Unit",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const minDrawVolUnit = e.target.value as string
                      props.onUpdateItem && 
                        props.onUpdateItem(minDrawVolUnit,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "MIN_DRAW_VOL_UNIT"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {    
            dataField: "minTestVolUnit",
            text: "Min Test Vol Unit",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const minTestVolUnit = e.target.value as string
                    props.onUpdateItem && 
                      props.onUpdateItem(minTestVolUnit,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "MIN_TEST_VOL_UNIT"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "repentionPeriod",
            text: "Repention Period",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },

          {
            dataField: "repentionUnits",
            text: "Repention Units",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const repentionUnits = e.target.value as string
                      props.onUpdateItem && 
                      props.onUpdateItem(repentionUnits,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "RETENTION_UNITS"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            
          },

          {
            dataField: "printLabels",
            text: "Print Labels",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.printLabels ? 'Yes' :'No'}
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
                  label="Print Labels"
                  value={
                    row.printLabels
                  }
                  onChange={(printLabels) => {
                    props.onUpdateItem && 
                      props.onUpdateItem(printLabels,column.dataField,row._id)
                  }}
                />
                  </>
                ),
          },
          {
            dataField: "info",
            text: "Info",
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
                        body: `Delete record`,
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
        fileName="Sample Type"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
        }}
      />
    </>
  )
})
export default TestSampleMappingList
