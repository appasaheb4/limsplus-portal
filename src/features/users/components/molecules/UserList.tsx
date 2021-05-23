/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"

import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"
import { Stores } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"
import { toJS } from "mobx"

interface UserListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const UserList = observer((props: UserListProps) => {
  const [labs, setLabs] = useState<any>()
  let count = 0

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
              dataField: "userId",
              text: "UserId",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editable: false,
            },
            {
              dataField: "defaultLab",
              text: "Default Lab",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editable: false,
            },
            {
              dataField: "lab",
              text: "Lab",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.lab.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Molecules.AutocompleteChecked
                    data={{
                      defulatValues: toJS(row.lab),
                      list: LabStore.labStore.listLabs,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "fullName",
              text: "Full Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "email",
              text: "Email",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "department",
              text: "Department",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.department.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Molecules.AutoCompleteCheckedByTitleKey
                    data={{
                      defulatValues: toJS(row.department),
                      list: DepartmentStore.departmentStore.listDepartment,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    titleKey={{ key1: "code", key2: "name" }}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "deginisation",
              text: "Deginisation",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="deginisation"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const deginisation = e.target.value

                      props.onUpdateItem &&
                        props.onUpdateItem(deginisation, column.dataField, row._id)
                    }}
                  >
                    <option selected>{row.deginisation}</option>
                    {DeginisationStore.deginisationStore.listDeginisation.map(
                      (item: any, index: number) => (
                        <option key={item.description} value={item.code}>
                          {item.description}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "role",
              text: "Role",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.role.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Molecules.AutocompleteChecked
                    data={{
                      defulatValues: toJS(row.role),
                      list: RoleStore.roleStore.listRole,
                      displayKey: "description",
                      findKey: "code",
                    }}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              text: "Exipre Date",
              dataField: "exipreDate",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cell, row) => {
                return moment(row.exipreDate).format("YYYY-MM-DD")
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
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Exipre Date"
                    id="exipreData"
                    value={moment(row.exipreDate).format("YYYY-MM-DD")}
                    onChange={(e: any) => {
                      let date = new Date(e.target.value)
                      date = new Date(moment(date).format("YYYY-MM-DD HH:mm"))
                      const formatDate = moment(date).format("YYYY-MM-DD HH:mm")
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          new Date(formatDate),
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              text: "Status",
              dataField: "status",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editor: {
                type: LibraryComponents.Organisms.Utils.Type.SELECT,
                getOptions: () => {
                  return [
                    {
                      value: "Active",
                      label: "Active",
                    },
                    {
                      value: "Retired",
                      label: "Retired",
                    },
                    {
                      value: "Disable",
                      label: "Disable",
                    },
                  ]
                },
              },
            },
            {
              dataField: "opration",
              text: "Password Re-Send",
              headerStyle: { minWidth: "200px" },
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.ReSendPassword}
                    onClick={async () => {
                      Stores.userStore.UsersService.reSendPassword({
                        userId: row.userId,
                        lab: row.lab[0].code,
                        role: row.role[0].code,
                        email: row.email,
                      }).then((res) => {
                        console.log({ res })
                        if (res.status === 200) {
                          LibraryComponents.Atoms.ToastsStore.success(
                            `Password re-send successfully.`
                          )
                        } else {
                          LibraryComponents.Atoms.ToastsStore.error(
                            `Password re-send not successfully please try again.`
                          )
                        }
                      })
                    }}
                  >
                    Send
                  </LibraryComponents.Atoms.Buttons.Button>
                </>
              ),
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
                          body: `Delete ${row.fullName} user!`,
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
          fileName="User"
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

export default UserList
