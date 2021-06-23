/* eslint-disable */
import React, { useState ,useEffect} from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import Storage from "@lp/library/modules/storage"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores } from "../../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RootStore } from "@lp/library/stores"

interface PanelMasterListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const PanelMasterList = observer((props: PanelMasterListProps) => {
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
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
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
                  {LabStores.labStore.listLabs.map((item: any, index: number) => (
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
            dataField: "panelCode",
            text: "Panel Code",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            
          },
          {
            dataField: "panelName",
            text: "Panel Name",
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
                placeholder="Price"
                type="number"
                value={row.price}
                onChange={(price) => {
                  props.onUpdateItem &&
                  props.onUpdateItem(price,column.dataField,row._id)
                }}
              />
              </>
            )
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
                  label="autoRelease"
                  id="modeAuto Release"
                  value={row.autoRelease}
                  onChange={(autoRelease) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(autoRelease,column.dataField,row._id)       
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
            dataField: "reportOrder",
            text: "Report Order",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },

          {
            dataField: "sex",
            text: "sex",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sex = e.target.value as string
                    props.onUpdateItem && 
                      props.onUpdateItem(sex,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SEX"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            dataField: "sexAction",
            text: "Sex Action",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            formatter: (cell, row) => {
              return (
              <>
              {row.sexAction ? 'Yes' :'No'}
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
                  label="sexAction"
                  id="modeSexAction"
                  value={row.sexAction}
                  onChange={(sexAction) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(sexAction,column.dataField,row._id)       
                  }}
                />
                </>
              ) 
          },
          {
            dataField: "hiAge",
            text: "Hi Age",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "loAge",
            text: "Lo Age",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    const processing = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(processing,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "PROCESSING"
                      })
                      .arrValue.map((item: any, index: number) => (
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
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "CATEGORY"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            dataField: "suffix",
            text: "Suffix",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "serviceType",
            text: "Service Type",
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
                   <LibraryComponents.Atoms.Form.InputWrapper label="Service Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const serviceType = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(serviceType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "SERVICE_TYPE"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            dataField: "panelType",
            text: "Panel Type",
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
                <LibraryComponents.Atoms.Form.InputWrapper label="Panel Type">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const panelType = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(panelType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "PANEL_TYPE"
                      })
                      .arrValue.map((item: any, index: number) => (
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
            text: "TubeGroup",
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
                  label="pageBreak"
                  id="modePageBreak"
                  value={row.pageBreak}
                  onChange={(pageBreak) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(pageBreak,column.dataField,row._id)       
                  }}
                />
                </>
              ) 
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
            dataField: "workflow",
            text: "Workflow",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                  label="cumulative"
                  id="modeCumulative"
                  value={row.cumulative}
                  onChange={(cumulative) => {
                    props.onUpdateItem &&
                    props.onUpdateItem(cumulative,column.dataField,row._id)       
                  }}
                />
                </>
              )
          },

          {
            dataField: "reportTemplate",
            text: "Report Template",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "sampleType",
            text: "Sample Type",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "specalInstructions",
            text: "Specal Instructions",
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
                    const status = e.target.value as string
                    props.onUpdateItem &&
                    props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems.length > 0 &&
                    lookupItems
                      .find((item) => {
                        return item.fieldName === "STATUS"
                      })
                      .arrValue.map((item: any, index: number) => (
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
                        body: `Delete record!`,
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
        fileName="Panel Master"
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
export default PanelMasterList
