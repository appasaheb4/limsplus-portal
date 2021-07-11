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
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
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
          fileName="Delivery Schedule"
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

export default DeliverySchduleList
