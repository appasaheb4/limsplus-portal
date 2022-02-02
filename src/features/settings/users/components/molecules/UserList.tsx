/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import {lookupItems} from "@lp/library/utils"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { AutoCompleteFilterMutiSelectRoles ,AutoCompleteFilterSingleSelectDefaultLabs,AutoCompleteFilterSingleSelectDegnisation,AutoCompleteFilterMutiSelectDepartment} from "../index"
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"
  
import { toJS } from "mobx"

let userId
let empCode
let defaultLab
let lab
let deginisation
let fullName
let mobileNo
let contactNo
let email
let dateOfBirth
let marriageAnniversary
let userDegree
let department
let exipreDate
let expireDays
let dateOfEntry
let role
let validationLevel
let createdBy
let status
let environment


interface UserListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateImage?: (value: any, dataField: string, id: string) => void
  onChangePassword?: (id: string, userId: string, email: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const UserList = observer((props: UserListProps) => {
  function priceFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filterElement}
        {column.text}
        {sortElement}
      </div>
    )
  }
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
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
              dataField: "userId",
              text: "UserId",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  userId = filter
                }
              }),
              headerClasses: "textHeader3",
              editable: false,
            },
            {
              dataField: "empCode",
              text: "Emp Code",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  empCode = filter
                }
              }),
              headerClasses: "textHeader3",
              editable: false,
            },
            {
              dataField: "defaultLab",
              text: "Default Lab",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  defaultLab = filter
                }
              }),
              headerClasses: "textHeader3",
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                 <AutoCompleteFilterSingleSelectDefaultLabs
                 onSelect={(item)=>{
                   props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                 }}
                 />
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (cell, row, rowIndex) => `${row.lab.map(item=>item.name)}`,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  lab = filter
                }
              }),
              headerClasses: "textHeader2",
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
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: toJS(row.lab),
                      list: props.extraData.listLabs,
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
              dataField: "deginisation",
              text: "Deginisation",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  deginisation = filter
                }
              }),
              headerClasses: "textHeader3",
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectDegnisation
                  onSelect={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                  }}
                  />
                </>
              ),
            },
            {
              dataField: "department",
              text: "Department",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (cell, row, rowIndex) => `${row.department.map(item=>item.name)}`,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  department = filter
                }
              }),
              headerClasses: "textHeader3",
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
                  <AutoCompleteFilterMutiSelectDepartment
                  selected={row.department}
                  onUpdate={(item)=>{
                    props.onUpdateItem && props.onUpdateItem(item.code,column.dataField,row._id)
                  }}
                  />
                  </>
              ),
            },
            {
              dataField: "validationLevel",
              text: "Validation Level",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  validationLevel = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: "textHeader7",
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
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 border-gray-300 rounded-md`}
                      onChange={(e) => {
                        const validationLevel = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            parseInt(validationLevel),
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
                        <option key={item.description} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },
            // {
            //   dataField: "workStation",
            //   text: "Work Station",
            //   sort: true,
            
            //   filter: LibraryComponents.Organisms.Utils.textFilter({
            //   headerClasses: "textHeader3",
            // },
            // {
            //   dataField: "ipAddress",
            //   text: "IP Address",
            //   sort: true,
            
            //   filter: LibraryComponents.Organisms.Utils.textFilter({
            //   headerClasses: "textHeader3",
            // },
            {
              dataField: "fullName",
              text: "Full Name",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  fullName = filter
                }
              }),
              headerClasses: "textHeader3",
              style: { textTransform: "uppercase" },
              editorStyle: { textTransform: "uppercase" },
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  mobileNo = filter
                }
              }),
              headerClasses: "textHeader3",
            },
            {
              dataField: "contactNo",
              text: "Contact No",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  contactNo = filter
                }
              }),
              headerClasses: "textHeader3",
            },
            {
              dataField: "email",
              text: "Email",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  email = filter
                }
              }),
              headerClasses: "textHeader3",
            },
            {
              dataField: "userDegree",
              text: "User Degree",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  userDegree = filter
                }
              }),
              headerClasses: "textHeader3",
            },
            {
              dataField: "dateOfBirth",
              text: "Date Of Birth",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (col,row) => (row.dateOfBirth ? dayjs(row.dateOfBirth).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  dateOfBirth = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: "textHeader6",
              formatter: (cell, row) => {
                return dayjs(row.dateOfBirth).format("YYYY-MM-DD")
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    value={new Date(row.dateOfBirth)}
                    onFocusRemove={(dateOfBirth) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(dateOfBirth, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "marriageAnniversary",
              text: "Marriage Anniversery Date",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (col,row) => (row.marriageAnniversary ? dayjs(row.marriageAnniversary).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  marriageAnniversary = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: "textHeader10",
              formatter: (cell, row) => {
                return dayjs(row.marriageAnniversary).format("YYYY-MM-DD")
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    value={new Date(row.marriageAnniversary)}
                    onFocusRemove={(marriageAnniversary) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(marriageAnniversary, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              text: "Exipre Date",
              dataField: "exipreDate",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (col,row) => (row.exipreDate ? dayjs(row.exipreDate).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  exipreDate = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: "textHeader6",
              formatter: (cell, row) => {
                return dayjs(row.exipreDate).format("YYYY-MM-DD")
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    value={new Date(row.exipreDate)}
                    onFocusRemove={(exipreDate) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(exipreDate, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "role",
              text: "Role",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: (cell, row, rowIndex) => `${row.role.map(item=>item.code)}`,
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  role = filter
                }
              }),
              headerClasses: "textHeader2",
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
                  <AutoCompleteFilterMutiSelectRoles
                    selected={row.role}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "confidential",
              text: "Confidential",
              sort: true,
              editable: false,
              csvFormatter: col => (col ? col : false),
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.confidential}
                    onChange={(confidential) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(confidential, "confidential", row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "dateOfEntry",
              text: "Date Creation",
              sort: true,
              csvFormatter: (col,row) => (row.dateOfEntry ? dayjs(row.dateOfEntry).format("YYYY-MM-DD") : ""),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) =>{
                  dateOfEntry = filter
                }
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              headerClasses: "textHeader6",
              editable: false,
              formatter: (cell, row) => {
                return <>{dayjs(row.dateOfEntry).format("YYYY-MM-DD")}</>
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    value={new Date(row.dateOfEntry)}
                    onFocusRemove={(dateOfEntry) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(new Date(dateOfEntry), column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },  
            {
              dataField: "createdBy",
              text: "Created  By",
              sort: true,
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  createdBy = filter
                }
              }),
              headerClasses: "textHeader3",
              editable: false,
            },
            {
              dataField: "signature",
              text: "Signature",
              csvExport: false,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.signature}
                      alt="signature"
                      className="object-fill h-35 w-40 rounded-md"
                    />
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
                  <LibraryComponents.Atoms.Form.InputFile
                    
                    placeholder="File"
                    onChange={(e) => {
                      const signature = e.target.files[0]
                      props.onUpdateImage &&
                        props.onUpdateImage(signature, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "picture",
              text: "Picture",
              csvExport: false,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.picture}
                      className="object-cover h-20 w-20 rounded-md"
                    />
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
                  <LibraryComponents.Atoms.Form.InputFile
                    
                    onChange={(e) => {
                      const picture = e.target.files[0]
                      props.onUpdateImage &&
                        props.onUpdateImage(picture, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              text: "Status",
              dataField: "status",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  status = filter
                }
              }),
              headerClasses: "textHeader3",
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
                    value={row.status}
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const status = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(status, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                 
                </>
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              csvFormatter: col => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) =>{
                  environment = filter
                }
              }),
              headerClasses: "textHeader3",
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
                      value={row.environment}
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(environment, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  
                </>
              ),
            },
            {
              dataField: "confirguration",
              text: "Confirguration",
              sort: true,
              editable: false,
              csvFormatter: col => (col ? col : false),
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Form.Toggle
                  disabled={!editorCell(row)}
                    value={row.confirguration}
                    onChange={(confirguration) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(confirguration, "confirguration", row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "systemInfo",
              text: "System Info",
              sort: true,
              editable: false,
              csvFormatter: (cell, row, rowIndex) => `Mobile:${
                row.systemInfo.accessInfo &&
                row.systemInfo.accessInfo?.mobile},Desktop:${
                  row.systemInfo.accessInfo &&
                  row.systemInfo.accessInfo?.desktop}`,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Access Permission"
                    style={{ fontWeight: "bold" }}
                  >
                    <div className="flex flex-row gap-4">
                      <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                        label="Mobile"
                        value={
                          row.systemInfo &&
                          row.systemInfo.accessInfo &&
                          row.systemInfo.accessInfo?.mobile
                        }
                        onChange={(mobile) => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              {
                                ...row.systemInfo,
                                accessInfo: {
                                  ...row.systemInfo?.accessInfo,
                                  mobile,
                                },
                              },
                              "systemInfo",
                              row._id
                            )
                        }}
                      />

                      <LibraryComponents.Atoms.Form.Toggle
                      disabled={!editorCell(row)}
                        label="Desktop"
                        value={
                          row.systemInfo &&
                          row.systemInfo.accessInfo &&
                          row.systemInfo.accessInfo?.desktop
                        }
                        onChange={(desktop) => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              {
                                ...row.systemInfo,
                                accessInfo: {
                                  ...row.systemInfo?.accessInfo,
                                  desktop,
                                },
                              },
                              "systemInfo",
                              row._id
                            )
                        }}
                      />
                    </div>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "opration",
              text: "Password Re-Send",
              editable: false,
              csvExport: false,  
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.ReSendPassword}
                    onClick={async () => {
                      props.extraData.userStore.UsersService.reSendPassword({
                        input: {
                          userId: row.userId,
                          lab: row.lab[0].code,
                          role: row.role[0].code,
                          email: row.email,
                        },
                      }).then((res) => {
                        console.log({ res })
                        if (res.reSendUserPassword.success) {
                          LibraryComponents.Atoms.Toast.success({
                            message: `😊 ${res.reSendUserPassword.message}`,
                          })
                        } else {
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 Password re-send not successfully please try again.`,
                          })
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
              text: "Change Password",
              csvExport: false,
              editable: false,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.ReSendPassword}
                    onClick={() => {
                      props.onChangePassword &&
                        props.onChangePassword(row._id, row.userId, row.email)
                    }}
                  >
                    Change Password
                  </LibraryComponents.Atoms.Buttons.Button>
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
                    <LibraryComponents.Atoms.Tooltip
                      tooltipText="Delete"
                      position="top"
                    >
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#fff"
                        size="20"
                        onClick={() => {
                          props.onDelete &&
                            props.onDelete({
                              type: "Delete",
                              show: true,
                              id: [row._id],
                              title: "Are you sure?",
                              body: `Delete item`,
                            })
                        }}
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </div>
                </>
              ),
              headerClasses: "sticky right-0  bg-gray-500 text-white",
              classes: (cell, row, rowIndex, colIndex) => {
                return "sticky right-0 bg-gray-500"
              },
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
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
          clearAllFilter={()=>{
            userId("")
            empCode("")
            defaultLab("")
            lab("")
            deginisation("")
            fullName("")
            mobileNo("")
            contactNo("")
            email("")
            dateOfBirth()
            dateOfEntry()
            marriageAnniversary()
            userDegree("")
            department("")
            exipreDate()
            role("")
            validationLevel("")
            createdBy("")
            status("")
            environment("")
          }}
        />
      </div>
    </>
  )
})
