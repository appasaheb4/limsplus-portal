/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"

import Storage from "@lp/library/modules/storage"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { Stores as MasterPanelStore } from "@lp/features/collection/masterPanel/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

interface DeliverySchduleListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
}

const DeliverySchduleList = observer((props: DeliverySchduleListProps) => {
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
          totalSize={props.totalSize}
          columns={[
            {
              dataField: "_id",
              text: "Id",
              hidden: true,
              csvExport: false,
            },
            {
              dataField: "schCode",
              text: "Sch Code",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "sundayProcessing",
              text: "Sunday Processing",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
               
                value={row.sundayProcessing}
                onChange={(sundayProcessing) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(sundayProcessing,'sundayProcessing',row._id)
                }}
              /></>
              },
            },
            {
              dataField: "holidayProcessing",
              text: "Holiday Processing",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: false,
            },
            {
              dataField: "sundayReporting",
              text: "Sunday Reporting",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: false,
            },
            {
              dataField: "holidayReporting",
              text: "Holiday Reporting",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
               
                value={row.holidayReporting}
                onChange={(holidayReporting) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(holidayReporting,'holidayReporting',row._id)
                }}
              /></>
              },
            },

            {
              dataField: "pStartTime",
              text: "P Start Time",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "pEndTime",
              text: "P End Time",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "cutofTime",
              text: "Cutof Time",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "secoundCutofTime",
              text: "Secound Cutof Time",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "processingType",
              text: "Processing Type",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "schFrequency",
              text: "Sch Frequency",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{JSON.stringify(row.schFrequency)}</>
              },
            },
            {
              dataField: "reportOn",
              text: "Report On",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "dynamicRT",
              text: "Dynamic RT",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "dynamicTU",
              text: "Dynamic TU",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "fixedRT",
              text: "Fixed RT",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "onTime",
              text: "On Time",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <> <LibraryComponents.Atoms.Form.Toggle
               
                value={row.onTime}
                onChange={(onTime) => {
                    props.onUpdateItem &&
                     props.onUpdateItem(onTime,'onTime',row._id)
                }}
              /></>
              },
            },
            {
              dataField: "schForDept",
              text: "Sch For Dept",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "schForPat",
              text: "Sch For Pat",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
          fileName="Delivery Schedule"
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
    </>
  )
})

export default DeliverySchduleList
