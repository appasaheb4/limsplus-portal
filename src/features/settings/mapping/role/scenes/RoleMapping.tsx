/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Contexts from "@lp/library/stores"
import * as Services from "../services"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from 'react-bootstrap-table2-paginator';
import DropdownTreeSelect from "react-dropdown-tree-select"
import "react-dropdown-tree-select/dist/styles.css"
import "./style.css"
import data from "./pages.json"

import {Stores as RoleStore} from '@lp/features/collection/roles/stores';

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const RoleMapping = observer(() => {
  const option = [{ title: "Add" }, { title: "Delete" }, { title: "Edit/Update" }]
  const rootStore = React.useContext(Contexts.rootStore)
  const [deleteItem, setDeleteItem] = useState<any>({})
  const roleList: any = RoleStore.roleStore.listRole || []
  const description = roleList[0].description
  const [value, setValue] = React.useState<string | null>(description)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedRole, setSelectedUserRole] = useState<any>()

  const onChange = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes)
  }
  const onAction = (node, action) => {
    console.log("onAction::", action, node)
  }
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode)
  }

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Role Mapping"
          subTitle="Add, Edit & Delete User Roles"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                  setSelectedUserRole(newValue)
                  setValue(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  console.log({ newInputValue })
                  setInputValue(newInputValue)
                }}
                id="role"
                options={roleList}
                getOptionLabel={(option: any) => option.description}
                renderInput={(params) => (
                  <TextField {...params} label="Role" variant="outlined" />
                )}
              />
            </LibraryComponents.List>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <DropdownTreeSelect
                data={data}
                className="mdl-demo leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                texts={{ placeholder: "Set Permission" }}
                onChange={(currentNode, selectedNodes) => {
                  let selectedItem: [any] = [{}]
                  selectedNodes.forEach((item, index) => {
                    if (item._children) {
                      selectedItem.push({
                        category: item.value,
                        children: ["Add", "Edit/Modify", "Delete"],
                      })
                    } else {
                      selectedItem.forEach((selectedItem) => {
                        if (selectedItem.category === item.value) {
                          const addedArray = selectedItem.children
                          addedArray.push(item.label)
                          selectedItem = [{ ...selectedItem, children: addedArray }]
                        }
                      })
                      const found = selectedItem.some(
                        (el) => el.category === item.value
                      )
                      if (!found)
                        selectedItem.push({
                          category: item.value,
                          children: [item.label],
                        })
                    }
                  })
                  selectedItem.shift()
                  rootStore.roleMappingStore.updateRolePermission(selectedItem)
                }}
              />
              {/* <Autocomplete
                multiple
                id="pages"
                options={Router.UserPermission}
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  rootStore.roleMappingStore.updatePages(newValue)
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
                  rootStore.roleMappingStore.updateUserPermision(newValue)
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
                  selectedRole !== undefined &&
                  rootStore.roleMappingStore.rolePermission !== undefined
                ) {
                  Services.addRoleMapping({
                    role: selectedRole,
                    rolePermission: rootStore.roleMappingStore.rolePermission,
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
                //rootStore.userStore.clear()
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <ToolkitProvider
            keyField="id"
            data={rootStore.roleMappingStore.roleMappingList || []}
            columns={[
              {
                dataField: "role.description",
                text: "Role",
                sort: true,
                editable: false,
              },
              {
                dataField: "rolePermission",
                text: "Role Permission",
                style: { width: 200 },
                formatter: (cellContent, row) => (
                  <>
                    <ul>
                      {row.rolePermission.map((item) => (
                        <li>
                          {item.category}
                          <ul style={{ marginLeft: 20 }}>
                            {item.children.map((permission) => (
                              <li>{permission}</li>
                            ))}
                          </ul>
                        </li>
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
              fileName: `roleMapping_${moment(new Date()).format(
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
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            Services.deleteRoleMapping(deleteItem.id).then((res: any) => {
              if (res.status === LibraryModels.StatusCode.SUCCESS) {
                LibraryComponents.ToastsStore.success(`Deleted.`)
                setDeleteItem({ show: false })
                rootStore.roleMappingStore.fetchUserMappingList()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default RoleMapping
