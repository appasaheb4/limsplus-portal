/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"

import Storage from "@lp/library/modules/storage"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"


interface TestMasterProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const TestMasterList = observer((props: TestMasterProps) => {
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
            dataField: "rLab",
            text: "RLab",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="RLab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const rLab = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(rLab,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LabStore.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "pLab",
            text: "PLab",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="PLab">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const pLab = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(pLab,column.dataField,row._id)
                   
                  }}
                >
                  <option selected>Select</option>
                  {LabStore.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )

          },
          {
            dataField: "department",
            text: "Department",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Department">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const department = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(department,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.code} - ${item.name}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "section",
            text: "Section",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Section">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const section = e.target.value as string
                    props.onUpdateItem &&
                       props.onUpdateItem(section,column.dataField,row._id)

                  }}
                >
                  <option selected>Select</option>
                  {["Section 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "testCode",
            text: "Test Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
          },
          {
            dataField: "testName",
            text: "Test Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable:false
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
                  value={row.bill}
                  onChange={(bill) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(bill,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "price",
            text: "Price",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "schedule",
            text: "Schedule",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "tat",
            text: "TAT",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "autoFinish",
            text: "Auto Finish",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.autoFinish ? 'Yes' :'No'}
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
                  label="autoFinish"
                  id="modeAutoFinish"
                  value={row.autoFinish}
                  onChange={(autoFinish) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(autoFinish,column.dataField,row._id)                
                  }}
                />
                </>
              )
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
                  label="holdOOS"
                  id="modeHoldOOS"
                  value={row.holdOOS}
                  onChange={(holdOOS) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(holdOOS,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "validationLevel",
            text: "Validation Level",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Validation Level">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const validationLevel: any = e.target.value
                    props.onUpdateItem &&
                       props.onUpdateItem(validationLevel,column.dataField,row._id)

                  }}
                >
                  <option selected>Select</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )

          },
          {
            dataField: "confidential",
            text: "Confidential",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.confidential ? 'Yes' :'No'}
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
                  label="confidential"
                  id="modeConfidential"
                  value={row.confidential}
                  onChange={(confidential) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(confidential,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "urgent",
            text: "Urgent",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.urgent ? 'Yes' :'No'}
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
                  label="urgent"
                  id="modeUrgent"
                  value={row.urgent}
                  onChange={(urgent) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(urgent,column.dataField,row._id)                
                  }}
                />
                </>
              )
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
                  label="instantResult"
                  id="modeInstantResult"
                  value={row.instantResult}
                  onChange={(instantResult) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(instantResult,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "reportGroup",
            text: "Report Group",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "resultOrder",
            text: "Result Order",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "accredited",
            text: "Accredited",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.accredited ? 'Yes' :'No'}
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
                  label="accredited"
                  id="modeAccredited"
                  value={row.accredited}
                  onChange={(accredited) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(accredited,column.dataField,row._id)                
                  }}
                />
                </>
              )
              
          },
          {
            dataField: "cretical",
            text: "Cretical",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.cretical ? 'Yes' :'No'}
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
                  label="cretical"
                  id="modeCretical"
                  value={row.cretical}
                  onChange={(cretical) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(cretical,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },

          {
            dataField: "processing",
            text: "Processing",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Processing">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const processing = e.target.value as
                      | "MANUAL"
                      | "AEMI"
                      | "AUTOMATIC"
                      props.onUpdateItem &&
                         props.onUpdateItem(processing,column.dataField,row._id)

                  }}
                >
                  <option selected>Select</option>
                  {["MANUAL", "AEMI", "AUTOMATIC"].map(
                    (item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "repitation",
            text: "Repitation",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.repitation ? 'Yes' :'No'}
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
                  label="repitation"
                  id="modeRepitation"
                  value={row.repitation}
                  onChange={(repitation) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(repitation,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "tubeGroup",
            text: "Tube Group",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "printLabel",
            text: "Print Label",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.printLabel ? 'Yes' :'No'}
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
                  label="printLabel"
                  id="modePrintLabel"
                  value={row.printLabel}
                  onChange={(printLabel) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(printLabel,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "labelInstruction",
            text: "Label Instruction",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                  label="method"
                  id="modeMethod"
                  value={row.method}
                  onChange={(method) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(method,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },

          {
            dataField: "panelMethod",
            text: "Panel Method",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "sampleRunOn",
            text: "Sample Run On",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Sample Run On">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleRunOn = e.target.value as "LABID" | "SAMPLEID"
                    props.onUpdateItem &&
                       props.onUpdateItem(sampleRunOn,column.dataField,row._id)

                  }}
                >
                  <option selected>Select</option>
                  {["LABID", "SAMPLEID"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "workflow",
            text: "Workflow",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Workflow">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(workflow,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "WORKFLOW").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "cumulative",
            text: "Cumulative",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.cumulative ? 'Yes' :'No'}
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
                  label="cumulative "
                  id="modeCumulative "
                  value={row.cumulative }
                  onChange={(cumulative ) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(cumulative ,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },

          {
            dataField: "sampleType",
            text: "Sample Type",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "speicalInstructions",
            text: "Speical Instructions",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "disease",
            text: "disease",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Disease">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const disease = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(disease,column.dataField,row._id)
                   
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DISEASE").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "category",
            text: "Category",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Category">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(category,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CATEGORY").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "testType",
            text: "Test Type",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Test Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testType = e.target.value as string
                    props.onUpdateItem &&
                      props.onUpdateItem(testType,column.dataField,row._id)

                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "TEST_TYPE").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )

          },

          {
            dataField: "workflowCode",
            text: "Workflow Code",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Workflow Code">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const workflowCode = e.target.value as string
                    props.onUpdateItem &&
                      props.onUpdateItem(workflowCode,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {["Workflow Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "worklistCode",
            text: "Worklist Code",
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
            dataField: "qcHold",
            text: "QC Hold",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.qcHold ? 'Yes' :'No'}
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
                  label="qcHold "
                  id="modeQcHold "
                  value={row.qcHold }
                  onChange={(qcHold ) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(qcHold ,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "oosHold",
            text: "OOS Hold",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.oosHold ? 'Yes' :'No'}
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
                  label="oosHold  "
                  id="modeOOSHold "
                  value={row.oosHold  }
                  onChange={(oosHold ) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(oosHold  ,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "deltaHold",
            text: "Delta Hold",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.deltaHold ? 'Yes' :'No'}
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
                  label="deltaHold   "
                  id="modeDeltaHold  "
                  value={row.deltaHold  }
                  onChange={(deltaHold  ) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(deltaHold,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "prefix",
            text: "Prefix",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Prefix">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const prefix = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(prefix,column.dataField,row._id)
                   
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "PREFIX").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },

          {
            dataField: "sufix",
            text: "Sufix",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Sufix">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sufix = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(sufix,column.dataField,row._id)
                   
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SUFIX").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "deleverySchedule",
            text: "Delevery Schedule",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "allowPartial",
            text: "Allow Partial",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.allowPartial ? 'Yes' :'No'}
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
                  label="allowPartial"
                  id="modeAllowPartial"
                  value={row.allowPartial}
                  onChange={(allowPartial) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(allowPartial,column.dataField,row._id)                
                  }}
                />
                </>
              )
          },
          {
            dataField: "collectionContainer",
            text: "Collection Container",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "holdingDays",
            text: "Holding Days",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "status",
            text: "Status",
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                    props.onUpdateItem &&
                    props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            )
          },
          {
            dataField: "dateCreation",
            editable: false,
            text: "Date Creation",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
                <>
                  {LibraryUtils.moment
                    .unix(row.dateCreation || 0)
                    .format("YYYY-MM-DD")}
                </>
              )
            },
          },
          {
            dataField: "dateActive",
            editable: false,
            text: "Date Active",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "version",
            editable: false,
            text: "Version",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "keyNum",
            editable: false,
            text: "Key Num",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "enteredBy",
            editable: false,
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
                        body: `Delete ${row.name} lab!`,
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
        fileName="TestMaster"
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
export default TestMasterList
