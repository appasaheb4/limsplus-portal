/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface DepartmentListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const DepartmentList = observer((props: DepartmentListProps) => {
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
          dataField: "lab",
          text: "Lab",
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
          text: "name",
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
          dataField: "hod",
          text: "HOD",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "mobileNo",
          text: "Mobile No",
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
          dataField: "autoRelease",
          text: "Auto Release",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },

        {
          dataField: "requireReceveInLab",
          text: "Require Receve In Lab",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "requireScainIn",
          text: "Require Scain In",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "routingDept",
          text: "Routing Dept",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "openingTime",
          text: "Opening Time",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "closingTime",
          text: "Closing Time",
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
      fileName="Department"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
})
export default DepartmentList
