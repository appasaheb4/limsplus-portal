/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores } from "../../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RootStore } from "@lp/library/stores"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

interface UserListProps {
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
}

const UserList = observer((props: UserListProps) => {
  const [deleteUser, setDeleteUser] = useState<any>({})
  const afterSaveCell = (oldValue, newValue, row, column) => {
    if (oldValue !== newValue) {
      RootStore.rootStore.setProcessLoading(true)
      Services.updateUserSingleFiled({
        newValue,
        dataField: column.dataField,
        id: row._id,
      }).then((res) => {
        RootStore.rootStore.setProcessLoading(false)
        if (res.data) {
          Stores.userStore.loadUser()
          LibraryComponents.Atoms.ToastsStore.success(`User update.`)
        }
      })
    }
  }
  return (
    <>
      <ToolkitProvider
        keyField="id"
        data={Stores.userStore.userList || []}
        columns={[
          {
            dataField: "userId",
            text: "UserId",
            sort: true,
            editable: false,
          },
          {
            dataField: "lab",
            text: "Lab",
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
            editable: false,
            // editorRenderer: (
            //   editorProps,
            //   value,
            //   row,
            //   column,
            //   rowIndex,
            //   columnIndex
            // ) => (
            //   <>
            //     <select
            //       name="lab"
            //       className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //       onChange={(e) => {
            //         const lab = e.target.value
            //         Services.updateUserSingleFiled({
            //           newValue: lab,
            //           dataField: column.dataField,
            //           id: row._id,
            //         }).then((res) => {
            //           if (res.data) {
            //             rootStore.userStore.loadUser()
            //             LibraryComponents.Atoms.ToastsStore.success(`User update.`)
            //           }
            //         })
            //       }}
            //     >
            //       <option selected>{row.lab}</option>
            //       {rootStore.labStore.listLabs.map(
            //         (item: any, index: number) => (
            //           <option key={item.name} value={item.code}>
            //             {item.name}
            //           </option>
            //         )
            //       )}
            //     </select>
            //   </>
            // ),
          },
          {
            dataField: "fullName",
            text: "Full Name",
            headerStyle: { minWidth: "200px" },
          },
          {
            dataField: "mobileNo",
            text: "Mobile No",
            headerStyle: { minWidth: "200px" },
          },
          {
            dataField: "email",
            text: "Email",
            headerStyle: { minWidth: "200px" },
          },
          {
            dataField: "department",
            text: "Department",
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
            editable: false,
            // editorRenderer: (
            //   editorProps,
            //   value,
            //   row,
            //   column,
            //   rowIndex,
            //   columnIndex
            // ) => (
            //   <>
            //     <select
            //       name="department"
            //       className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //       onChange={(e) => {
            //         const department = e.target.value
            //         Services.updateUserSingleFiled({
            //           newValue: department,
            //           dataField: column.dataField,
            //           id: row._id,
            //         }).then((res) => {
            //           if (res.data) {
            //             rootStore.userStore.loadUser()
            //             LibraryComponents.Atoms.ToastsStore.success(`User update.`)
            //           }
            //         })
            //       }}
            //     >
            //       <option selected>{row.department}</option>
            //       {rootStore.departmentStore.listDepartment.map(
            //         (item: any, index: number) => (
            //           <option key={item.name} value={item.code}>
            //             {item.name}
            //           </option>
            //         )
            //       )}
            //     </select>
            //   </>
            // ),
          },
          {
            dataField: "deginisation",
            text: "Deginisation",
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
                    Services.updateUserSingleFiled({
                      newValue: deginisation,
                      dataField: column.dataField,
                      id: row._id,
                    }).then((res) => {
                      if (res.data) {
                        Stores.userStore.loadUser()
                        LibraryComponents.Atoms.ToastsStore.success(`User update.`)
                      }
                    })
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
            editable: false,
            // editorRenderer: (
            //   editorProps,
            //   value,
            //   row,
            //   column,
            //   rowIndex,
            //   columnIndex
            // ) => (
            //   <>
            //     <select
            //       name="role"
            //       className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
            //       onChange={(e) => {
            //         const role = e.target.value
            //         Services.updateUserSingleFiled({
            //           newValue: role,
            //           dataField: column.dataField,
            //           id: row._id,
            //         }).then((res) => {
            //           if (res.data) {
            //             rootStore.userStore.loadUser()
            //             LibraryComponents.Atoms.ToastsStore.success(`User update.`)
            //           }
            //         })
            //       }}
            //     >
            //       <option selected>{row.role}</option>
            //       {rootStore.roleStore.listRole.map(
            //         (item: any, index: number) => (
            //           <option key={item.description} value={item.code}>
            //             {item.description}
            //           </option>
            //         )
            //       )}
            //     </select>
            //   </>
            // ),
          },
          {
            text: "Exipre Date",
            dataField: "exipreDate",
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

                    Services.updateUserSingleFiled({
                      newValue: new Date(formatDate),
                      dataField: column.dataField,
                      id: row._id,
                    }).then((res) => {
                      if (res.data) {
                        Stores.userStore.loadUser()
                        LibraryComponents.Atoms.ToastsStore.success(`User update.`)
                      }
                    })
                  }}
                />
              </>
            ),
          },
          {
            text: "Status",
            dataField: "status",
            headerStyle: { minWidth: "200px" },
            editor: {
              type: Type.SELECT,
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
                  icon={LibraryComponents.Atoms.Icons.ReSendPassword}
                  onClick={async () => {
                    Services.reSendPassword({
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
            hidden: props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.Buttons.Button
                  size="small"
                  type="outline"
                  icon={LibraryComponents.Atoms.Icons.Remove}
                  onClick={() => {
                    props.onDelete &&
                      props.onDelete({
                        show: true,
                        id: row._id,
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
        search
        exportCSV={{
          fileName: `users_${moment(new Date()).format("YYYY-MM-DD HH:mm")}.csv`,
          noAutoBOM: false,
          blobType: "text/csv;charset=ansi",
        }}
      >
        {(tblprops) => (
          <div>
            <SearchBar {...tblprops.searchProps} />
            <ClearSearchButton
              className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
              {...tblprops.searchProps}
            />
            <ExportCSVButton
              className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
              {...tblprops.csvProps}
            >
              Export CSV!!
            </ExportCSVButton>
            <hr />
            <BootstrapTable
              {...tblprops.baseProps}
              noDataIndication="Table is Empty"
              hover
              pagination={paginationFactory()}
              cellEdit={
                props.isEditModify
                  ? cellEditFactory({
                      mode: "dbclick",
                      blurToSave: true,
                      afterSaveCell,
                    })
                  : undefined
              }
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  )
})

export default UserList
