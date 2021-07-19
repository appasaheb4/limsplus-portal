/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface SectionListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

export const SectionList = observer((props: SectionListProps) => {
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
          dataField: "departmentCode",
          text: "Department Code",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "code",
          text: "Code",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "name",
          text: "Name",
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
          dataField: "sectionInCharge",
          text: "Section In Charge",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "mobieNo",
          text: "Mobie No",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "contactNo",
          text: "Contact No",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "fyiLine",
          text: "Fyi Line",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "workLine",
          text: "Work Line",
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
          text: "Action",
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
                      body: `Delete ${row.description} section!`,
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
      fileName="Section"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
})
