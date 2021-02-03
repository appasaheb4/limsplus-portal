/* eslint-disable */  
import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Contexts from "@lp/library/stores"
import * as Services from "../services"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Checkbox from "@material-ui/core/Checkbox"
import * as Router from "@lp/routes"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const UserMapping = observer(() => {
  const option = [{ title: "Add" }, { title: "Delete" }, { title: "Edit/Update" }]
  const rootStore = React.useContext(Contexts.rootStore)
  const [deleteItem, setDeleteItem] = useState<any>({})
  const userList: any = rootStore.userStore.userList || []
  const fullName = userList[0].fullName
  const [value, setValue] = React.useState<string | null>(fullName)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>()

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="User Mapping"
          subTitle="Add, Edit & Delete User Roles"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedUserInfo(newValue)
                  setValue(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  console.log({ newInputValue })
                  setInputValue(newInputValue)
                }}
                id="fullName"
                options={userList}
                getOptionLabel={(option: any) => option.fullName}
                renderInput={(params) => (
                  <TextField {...params} label="Full Name" variant="outlined" />
                )}
              />
              <LibraryComponents.Form.Input
                label="User Id"
                id="userId"
                placeholder="User Id"
                disabled={true}
                value={selectedUserInfo?.userId}
              />
              <LibraryComponents.Form.Input
                label="Role"
                id="role"
                placeholder="Role"
                disabled={true}
                value={selectedUserInfo?.role}
              />
            </LibraryComponents.List>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <Autocomplete
                multiple
                id="pages"
                options={Router.UserPermission}
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  rootStore.userMappingStore.updatePages(newValue)
                }}
                groupBy={(option) => option.path}
                getOptionLabel={(option) => option.name}
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
                    label="Pages"
                    placeholder="Pages"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="userPermision"
                options={option}
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  rootStore.userMappingStore.updateUserPermision(newValue)
                }}
                getOptionLabel={(option) => option.title}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option.title}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="User Permission"
                    placeholder="User Permission"
                  />
                )}
              />
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
                  selectedUserInfo !== undefined &&
                  rootStore.userMappingStore.arrPages !== undefined &&
                  rootStore.userMappingStore.arrUserPermision !== undefined
                ) {
                  Services.addUserMapping({
                    user: selectedUserInfo,
                    pages: rootStore.userMappingStore.arrPages,
                    userPermissions: rootStore.userMappingStore.arrUserPermision,
                  }).then((res) => {
                    if (res.status === LibraryModels.StatusCode.CREATED) {
                      LibraryComponents.ToastsStore.success(`Created.`)
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000)
                    } else {
                      alert("Not added data.")
                    }
                  })
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
                rootStore.userStore.clear()
              }}
            >
              Clear
            </LibraryComponents.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <ToolkitProvider
            keyField="id"
            data={rootStore.userMappingStore.userMappingList || []}
            columns={[
              {
                dataField: "user.fullName",
                text: "User name",
                sort: true,
                editable: false,
              },
              {
                dataField: "user.userId",
                text: "User Id",
              },
              {
                dataField: "user.role",
                text: "Role",
              },
              {
                dataField: "pages",
                text: "Pages",
                style: { width: 200 },
                csvFormatter: (cell, row, rowIndex) =>
                  `${row.pages.map((item) => item.name)}`,
                formatter: (cellContent, row) => (
                  <>
                    {/* <Autocomplete
                      disabled
                      multiple
                      id="pages"
                      options={row.pages}
                      disableCloseOnSelect
                      onChange={(event, newValue) => {
                        rootStore.userMappingStore.updatePages(newValue)
                      }}
                      groupBy={(option: any) => option.path}
                      getOptionLabel={(option) => option.name}
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
                          label="Pages"
                          placeholder="Pages"
                        />
                      )}
                    />*/}
                    <ul>
                      {row.pages.map((item) => (
                        <li>{item.name}</li>
                      ))}
                    </ul>
                  </>
                ),
              },
              {
                dataField: "userPermissions",
                text: "User Permissions",
                csvFormatter: (cell, row, rowIndex) =>
                  `${row.userPermissions.map((item) => item.title)}`,
                formatter: (cellContent, row) => (
                  <>
                    {/* <Autocomplete
                      multiple
                      disabled
                      id="userPermision"
                      options={option}
                      disableCloseOnSelect
                      onChange={(event, newValue) => {
                        rootStore.userMappingStore.updateUserPermision(newValue)
                      }}
                      getOptionLabel={(option) => option.title}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox style={{ marginRight: 8 }} checked={selected} />
                          {option.title}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="User Permission"
                          placeholder="User Permission"
                        />
                      )}
                    /> */}
                    <ul>
                      {row.userPermissions.map((item) => (
                        <li>{item.title}</li>
                      ))}
                    </ul>
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
                        setDeleteItem({
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete this user mapping!`,
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
              fileName: `usersMapping_${moment(new Date()).format(
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
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            Services.deleteUserMapping(deleteItem.id).then((res: any) => {
              if (res.status === LibraryModels.StatusCode.SUCCESS) {
                LibraryComponents.ToastsStore.success(`Deleted.`)
                setDeleteItem({ show: false })
                rootStore.userMappingStore.fetchUserMappingList()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default UserMapping
