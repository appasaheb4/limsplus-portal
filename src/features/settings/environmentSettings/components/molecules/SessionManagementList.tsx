/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"

import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"
import { toJS } from "mobx"

interface SessionManagementListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const SessionManagementList = observer((props: SessionManagementListProps) => {
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
              dataField: "lab",
              text: "Labs",
              sort: true,
              //   filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.lab.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              dataField: "user",
              text: "Users",
              sort: true,
              //   filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.user.map((item, index) => (
                      <li key={index}>{item.fullName}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              dataField: "department",
              text: "Departments",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.department.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              dataField: "variable",
              text: "Variable",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "value",
              text: "Value",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "description",
              text: "Description",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
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
          fileName="Session_Environment_Settings"
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

export default SessionManagementList
