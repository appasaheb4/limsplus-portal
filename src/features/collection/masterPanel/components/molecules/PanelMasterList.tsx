/* eslint-disable */
import React, { useState ,useEffect} from "react"
import { observer } from "mobx-react"

import * as Config from "@lp/config"

import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import Storage from "@lp/library/modules/storage"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface PanelMasterListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void

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

  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }

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
            editable: false,
          },
          {
            dataField: "panelName",
            text: "Panel Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "description",
            text: "Description",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "shortName",
            text: "Short Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "bill",
            text: "Bill",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "tat",
            text: "TAT",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "autoRelease",
            text: "Auto Release",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "confidential",
            text: "Confidential",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "reportOrder",
            text: "Report Order",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "sex",
            text: "sex",
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
                  {LibraryUtils.lookupItems(lookupItems, "SEX").map((item: any, index: number) => (
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "loAge",
            text: "Lo Age",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "processing",
            text: "Processing",
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
                  {LibraryUtils.lookupItems(lookupItems, "PROCESSING").map((item: any, index: number) => (
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
            dataField: "suffix",
            text: "Suffix",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "serviceType",
            text: "Service Type",
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
                  {LibraryUtils.lookupItems(lookupItems, "SERVICE_TYPE").map((item: any, index: number) => (
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
                  {LibraryUtils.lookupItems(lookupItems, "PANEL_TYPE").map((item: any, index: number) => (
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "printLabel",
            text: "Print Label",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "pageBreak",
            text: "Page Break",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "workflow",
            text: "Workflow",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "cumulative",
            text: "Cumulative",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "sampleType",
            text: "Sample Type",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: "specalInstructions",
            text: "Specal Instructions",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: "status",
            text: "Status",
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
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value as string
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
            text: "Date Creation",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
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
            text: "Date Active",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  {LibraryUtils.moment
                    .unix(row.dateActive || 0)
                    .format("YYYY-MM-DD")}
                </>
              )
            },
          },
          {
            dataField: "version",
            text: "Version",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "keyNum",
            text: "Key Num",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "enteredBy",
            text: "Entered By",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
            editable: false,
          },
          {
            dataField: "opration",
            text: "Delete",
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
                {row.status !== "I" && (
                  <>
                    <LibraryComponents.Atoms.Tooltip
                      className="ml-2"
                      tooltipText="Version Upgrade"
                    >
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
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
                        color="#000"
                        size="20"
                        onClick={() =>
                          props.onDuplicate && props.onDuplicate(row)
                        }
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconGr.GrDuplicate
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </>
                )}
              </div>
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
