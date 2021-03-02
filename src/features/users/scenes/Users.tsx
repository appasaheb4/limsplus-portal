/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as Models from "../models"
import * as Utils from "@lp/library/utils"
import moment from "moment"
import * as Features from "@lp/features"
import Contexts from "@lp/library/stores"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from 'react-bootstrap-table2-paginator';
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Checkbox from "@material-ui/core/Checkbox"

import * as Services from "../services"
import { Container } from "reactstrap"

import {Stores} from '../stores';
import {Stores as DeginisationStore} from '@lp/features/collection/deginisation/stores';
import {Stores as LabStore} from '@lp/features/collection/labs/stores';
import {Stores as RoleStore} from '@lp/features/collection/roles/stores';
import {Stores as DepartmentStore} from '@lp/features/collection/department/stores';

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Users = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore)
  const [errors, setErrors] = useState<Models.Users>()
  const [deleteUser, setDeleteUser] = useState<any>({})

  useEffect(() => {
    Stores.userStore.loadUser()
  }, [Stores.userStore])

  const afterSaveCell = (oldValue, newValue, row, column) => {
    if (oldValue !== newValue) {
      rootStore.setProcessLoading(true)
      Services.updateUserSingleFiled({
        newValue,
        dataField: column.dataField,
        id: row._id,
      }).then((res) => {
        rootStore.setProcessLoading(false)
        if (res.data) {
          Stores.userStore.loadUser()
          LibraryComponents.ToastsStore.success(`User update.`)
        }
      })
    }
  }

  return (
    <>
      <Container fluid>
        <LibraryComponents.Header>
          <LibraryComponents.PageHeading
            title="User"
            subTitle="Add, Edit & Delete User"
          />
        </LibraryComponents.Header>
        <div className=" mx-auto  flex-wrap">
          <div className="p-2 rounded-lg shadow-xl">
            <LibraryComponents.Grid cols={2}>
              <LibraryComponents.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Form.Input
                  label="User Id"
                  id="userId"
                  placeholder="User Id"
                  value={Stores.userStore.user.userId}
                  onChange={(userId) => {
                    setErrors({
                      ...errors,
                      userId: Utils.validate.single(
                        userId,
                        Utils.constraintsUser.userId
                      ),
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      userId,
                    })
                  }}
                  onBlur={(userId) => {
                    Services.checkExitsUserId(userId).then((res) => {
                      if (res)
                        if (res.length > 0) Stores.userStore.setExitsUserId(true)
                        else Stores.userStore.setExitsUserId(false)
                    })
                  }}
                />
                {errors?.userId && (
                  <span className="text-red-600 font-medium relative">
                    {errors.userId}
                  </span>
                )}
                {Stores.userStore.checkExitsUserId && (
                  <span className="text-red-600 font-medium relative">
                    UserId already exits. Please use other userid.
                  </span>
                )}
                <LibraryComponents.Form.InputWrapper
                  label="Default Lab"
                  id="defaultLab"
                >
                  <select
                    name="defualtLab"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const defaultLab = e.target.value
                      setErrors({
                        ...errors,
                        defaultLab: Utils.validate.single(
                          defaultLab,
                          Utils.constraintsUser.defaultLab
                        ),
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        defaultLab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LabStore.labStore.listLabs.map((item: any, index: number) => (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Form.InputWrapper>
                {errors?.defaultLab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.defaultLab}
                  </span>
                )}
                <Autocomplete
                  multiple
                  id="labs"
                  options={LabStore.labStore.listLabs}
                  disableCloseOnSelect
                  onChange={(event, newValue) => {
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      lab: newValue,
                    })
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Labs"
                      placeholder="Labs"
                    />
                  )}
                />
                {errors?.lab && (
                  <span className="text-red-600 font-medium relative">
                    {errors.lab}
                  </span>
                )}
                <LibraryComponents.Form.Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={Stores.userStore.user.password}
                  onChange={(password) => {
                    setErrors({
                      ...errors,
                      password: Utils.validate.single(
                        password,
                        Utils.constraintsUser.password
                      ),
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      password,
                    })
                  }}
                />
                {errors?.password && (
                  <span className="text-red-600 font-medium relative">
                    {errors.password}
                  </span>
                )}
                <LibraryComponents.Form.InputWrapper
                  label="Deginisation"
                  id="deginisation"
                >
                  <select
                    name="deginisation"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const deginisation = e.target.value
                      setErrors({
                        ...errors,
                        deginisation:
                          deginisation !== ""
                            ? Utils.validate.single(
                                deginisation,
                                Utils.constraintsUser.deginisation
                              )
                            : "Deginisation requried",
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        deginisation,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {DeginisationStore.deginisationStore.listDeginisation.map(
                      (item: any) => (
                        <option key={item.description} value={item.code}>
                          {item.description}
                        </option>
                      )
                    )}
                  </select>
                </LibraryComponents.Form.InputWrapper>
                {errors?.deginisation && (
                  <span className="text-red-600 font-medium relative">
                    {errors.deginisation}
                  </span>
                )}
                <LibraryComponents.Form.InputRadio
                  label="Status"
                  name="status"
                  values={["Active", "Retired", "Disable"]}
                  value={Stores.userStore.user.status}
                  onChange={(status) => {
                    setErrors({
                      ...errors,
                      status:
                        status !== ""
                          ? Utils.validate.single(
                              status,
                              Utils.constraintsUser.status
                            )
                          : "Status requried",
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      status,
                    })
                  }}
                />
              </LibraryComponents.List>
              <LibraryComponents.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Form.Input
                  label="Full Name"
                  id="fullName"
                  placeholder="Full Name"
                  value={Stores.userStore.user.fullName}
                  onChange={(fullName) => {
                    setErrors({
                      ...errors,
                      fullName:
                        fullName !== ""
                          ? Utils.validate.single(
                              fullName,
                              Utils.constraintsUser.fullName
                            )
                          : "Full Name required!",
                    })
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      fullName,
                    })
                  }}
                />
                {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {errors.fullName}
                  </span>
                )}

                <LibraryComponents.Form.Input
                  label="Mobile No"
                  id="mobileNo"
                  placeholder="Mobile No"
                  value={Stores.userStore.user.mobileNo}
                  onChange={(mobileNo) => {
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      mobileNo,
                    })
                  }}
                />
                <LibraryComponents.Form.Input
                  type="mail"
                  label="Email"
                  id="email"
                  placeholder="Email"
                  value={Stores.userStore.user.email}
                  onChange={(email) => {
                    Stores.userStore.updateUser({
                      ...Stores.userStore.user,
                      email,
                    })
                  }}
                />

                <Autocomplete
                  multiple
                  id="department"
                  options={DepartmentStore.departmentStore.listDepartment}
                  disableCloseOnSelect
                  value={Stores.userStore.user.department}
                  onChange={(event, newValue) => {
                    setErrors({
                      ...errors,
                      department: Utils.validate.single(
                        newValue,
                        Utils.constraintsUser.department
                      ),
                    })
                    if (newValue.length > 2) {
                      alert("Please select max 2 department")
                    } else {
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        department: newValue,
                      })
                    }
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                        disabled={true}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Department"
                      placeholder="Department"
                    />
                  )}
                />

                {errors?.department && (
                  <span className="text-red-600 font-medium relative">
                    {errors.department}
                  </span>
                )}

                <LibraryComponents.List space={3} direction="row">
                  <LibraryComponents.Form.InputDate
                    label="Exipre Date"
                    id="exipreData"
                    value={moment(Stores.userStore.user.exipreDate).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e: any) => {
                      let date = new Date(e.target.value)
                      date = new Date(
                        moment(date)
                          .add(Stores.userStore.user.exipreDays, "days")
                          .format("YYYY-MM-DD HH:mm")
                      )
                      const formatDate = moment(date).format("YYYY-MM-DD HH:mm")
                      setErrors({
                        ...errors,
                        exipreDate: Utils.validate.single(
                          formatDate,
                          Utils.constraintsUser.exipreDate
                        ),
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        exipreDate: new Date(formatDate),
                      })
                    }}
                  />
                  {errors?.exipreDate && (
                    <span className="text-red-600 font-medium relative">
                      {errors.exipreDate}
                    </span>
                  )}

                  <LibraryComponents.Form.Input
                    type="number"
                    label="Exipre Days"
                    id="exipreDays"
                    placeholder="Exipre Days"
                    value={Stores.userStore.user.exipreDays}
                    onChange={(exipreDays) => {
                      setErrors({
                        ...errors,
                        exipreDays:
                          exipreDays !== ""
                            ? Utils.validate.single(
                                exipreDays,
                                Utils.constraintsUser.exipreDays
                              )
                            : "Exipre Days required!",
                      })
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        exipreDays,
                      })
                    }}
                  />

                  <LibraryComponents.Button
                    size="small"
                    type="solid"
                    onClick={() => {
                      const date = new Date(
                        moment(Stores.userStore.user.exipreDate)
                          .add(Stores.userStore.user.exipreDays, "days")
                          .format("YYYY-MM-DD HH:mm")
                      )
                      const exipreDate = new Date(
                        moment(date).format("YYYY-MM-DD HH:mm")
                      )
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        exipreDate,
                      })
                    }}
                  >
                    Apply Days
                  </LibraryComponents.Button>
                  {errors?.exipreDays && (
                    <span className="text-red-600 font-medium relative">
                      {errors.exipreDays}
                    </span>
                  )}
                </LibraryComponents.List>
                <Autocomplete
                  multiple
                  id="role"
                  options={RoleStore.roleStore.listRole}
                  disableCloseOnSelect
                  value={Stores.userStore.user.role}
                  onChange={(event, newValue) => {
                    setErrors({
                      ...errors,
                      role: Utils.validate.single(
                        newValue,
                        Utils.constraintsUser.role
                      ),
                    })
                    if (newValue.length > 2) {
                      alert("Please select max 2 labs")
                    } else {
                      Stores.userStore.updateUser({
                        ...Stores.userStore.user,
                        role: newValue,
                      })
                    }
                  }}
                  getOptionLabel={(option) => option.description || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      {option.description}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Role"
                      placeholder="Role"
                    />
                  )}
                />
                {errors?.role && (
                  <span className="text-red-600 font-medium relative">
                    {errors.role}
                  </span>
                )}
              </LibraryComponents.List>
            </LibraryComponents.Grid>
            <br />

            <LibraryComponents.List direction="row" space={3} align="center">
              <LibraryComponents.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Icons.Save}
                onClick={() => {
                  if (
                    Utils.validate(
                      Stores.userStore.user,
                      Utils.constraintsLogin
                    ) === undefined &&
                    !Stores.userStore.checkExitsUserId
                  ) {
                    rootStore.setProcessLoading(true)
                    // Features.Users.Pipes.addUser(Stores.userStore).then(() => {
                    //   rootStore.setProcessLoading(false)
                    //   LibraryComponents.ToastsStore.success(`User created.`)
                    //   Stores.userStore.clear()
                    //   Stores.userStore.loadUser()
                    // })
                  } else {
                    LibraryComponents.ToastsStore.warning(
                      "Please enter all information!"
                    )
                  }
                }}
              >
                Save
              </LibraryComponents.Button>
              <LibraryComponents.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Icons.Remove}
                onClick={() => {
                  //rootStore.userStore.clear()
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Button>
            </LibraryComponents.List>
          </div>
          <br />
          <div
            className="p-2 rounded-lg shadow-xl overflow-auto"
            style={{ overflowX: "scroll" }}
          >
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
                        {row.lab.map((item) => (
                          <li>{item.code}</li>
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
                  //             LibraryComponents.ToastsStore.success(`User update.`)
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
                        {row.department.map((item) => (
                          <li>{item.code}</li>
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
                  //             LibraryComponents.ToastsStore.success(`User update.`)
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
                              LibraryComponents.ToastsStore.success(`User update.`)
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
                        {row.role.map((item) => (
                          <li>{item.code}</li>
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
                  //             LibraryComponents.ToastsStore.success(`User update.`)
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
                      <LibraryComponents.Form.InputDate
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
                              LibraryComponents.ToastsStore.success(`User update.`)
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
                      <LibraryComponents.Button
                        size="small"
                        type="outline"
                        icon={LibraryComponents.Icons.ReSendPassword}
                        onClick={async () => {
                          Services.reSendPassword({
                            userId: row.userId,
                            lab: row.lab[0].code,
                            role: row.role[0].code,
                            email: row.email,
                          }).then((res) => {
                            console.log({ res })
                            if (res.status === 200) {
                              LibraryComponents.ToastsStore.success(
                                `Password re-send successfully.`
                              )
                            } else {
                              LibraryComponents.ToastsStore.error(
                                `Password re-send not successfully please try again.`
                              )
                            }
                          })
                        }}
                      >
                        Send
                      </LibraryComponents.Button>
                    </>
                  ),
                },
                {
                  dataField: "opration",
                  text: "Delete",
                  editable: false,
                  csvExport: false,
                  formatter: (cellContent, row) => (
                    <>
                      <LibraryComponents.Button
                        size="small"
                        type="outline"
                        icon={LibraryComponents.Icons.Remove}
                        onClick={() => {
                          setDeleteUser({
                            show: true,
                            id: row._id,
                            title: "Are you sure?",
                            body: `Delete ${row.fullName} user!`,
                          })
                        }}
                      >
                        Delete
                      </LibraryComponents.Button>
                    </>
                  ),
                },
              ]}
              search
              exportCSV={{
                fileName: `users_${moment(new Date()).format(
                  "YYYY-MM-DD HH:mm"
                )}.csv`,
                noAutoBOM: false,
                blobType: "text/csv;charset=ansi",
              }}
            >
              {(props) => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <ClearSearchButton
                    className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                    {...props.searchProps}
                  />
                  <ExportCSVButton
                    className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                    {...props.csvProps}
                  >
                    Export CSV!!
                  </ExportCSVButton>
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    noDataIndication="Table is Empty"
                    hover
                    pagination={ paginationFactory() }
                    cellEdit={cellEditFactory({
                      mode: "dbclick",
                      blurToSave: true,
                      afterSaveCell,
                    })}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
          <LibraryComponents.Modal.ModalConfirm
            {...deleteUser}
            click={() => {
              rootStore.setProcessLoading(true)
              Services.deleteUser(deleteUser.id).then((res: any) => {
                if (res.status === 200) {
                  rootStore.setProcessLoading(false)
                  LibraryComponents.ToastsStore.success(`User deleted.`)
                  setDeleteUser({ show: false })
                  Stores.userStore.loadUser()
                }
              })
            }}
          />
        </div>
      </Container>
    </>
  )
})

export default Users
