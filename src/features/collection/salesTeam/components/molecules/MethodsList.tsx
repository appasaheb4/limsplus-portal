/* eslint-disable */
import React, { useState,useEffect } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Storage from "@lp/library/modules/storage"
import { Stores } from "../../stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface MethodsListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const MethodsList = observer((props: MethodsListProps) => {
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
      if (items) {
        setLookupItems(items)
      }  
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])
  return (
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
          dataField: "methodsCode",
          text: "Methods Code",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable:false
        },
        {
          dataField: "methodsName",
          text: "Methods Name",
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
          dataField: "status",
          text: "Status",
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
      fileName="Methods"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
})

export default MethodsList
