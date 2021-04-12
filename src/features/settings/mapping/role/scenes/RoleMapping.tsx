/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { unionBy } from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as Services from "../services"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import DropdownTreeSelect from "react-dropdown-tree-select"
import "react-dropdown-tree-select/dist/styles.css"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
const router = dashboardRoutes

import { Stores } from "../stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"

import { Stores as RootStore } from "@lp/library/stores"

import { toJS } from "mobx"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const RoleMapping = observer(() => {
  const [deleteItem, setDeleteItem] = useState<any>({})
  let roleList: any = RoleStore.roleStore.listRole || []
  for (const router of Stores.roleMappingStore.roleMappingList || []) {
    roleList = roleList.filter((item) => {
      return item.code !== router.role.code
    })
  }
  const description = roleList.length > 0 ? roleList[0].description : undefined
  const [value, setValue] = React.useState<string | null>(description)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedRole, setSelectedUserRole] = useState<any>()
  const [isModify, setIsModify] = useState<any>({ status: false })

  const permission = [
    {
      title: "Add",
      checked: false,
    },
    {
      title: "View",
      checked: false,
    },
    {
      title: "Edit/Modify",
      checked: false,
    },
    {
      title: "Delete",
      checked: false,
    },
  ]

  useEffect(() => {
    const routers: any = router.filter((item: any) => {
      item.toggle = false
      item.title = item.name
      item = item.children.filter((childernItem) => {
        childernItem.title = childernItem.name
        childernItem.toggle = false
        childernItem.permission = permission
        return childernItem
      })
      return item
    })
    if (routers) {
      RootStore.routerStore.updateRouter(routers)
    }
  }, [])

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title="Role Mapping"
          subTitle="Add, Edit & Delete User Roles"
        />
      </LibraryComponents.Atoms.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setSelectedUserRole(newValue)
              setValue(newValue)
            }}
            disabled={isModify.status ? true : false}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            id="role"
            options={roleList}
            getOptionLabel={(option: any) => option.description}
            renderInput={(params) => (
              <TextField {...params} label="Role" variant="outlined" />
            )}
          />
          <div className="mt-4">
            {RootStore.routerStore.router && (
              <ul className="nav nav-stacked" id="accordion1">
                {RootStore.routerStore.router.map((item, index) => (
                  <li className="flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md">
                    {item.toggle ? (
                      <input
                        type="text"
                        className="leading-4 p-2 m-2 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border border-gray-300 rounded-sm"
                        value={item.title}
                        onChange={(e) => {
                          const title = e.target.value
                          const routers = toJS(RootStore.routerStore.router)
                          routers[index].title = title
                          RootStore.routerStore.updateRouter(routers)
                        }}
                        onBlur={() => {
                          const routers = toJS(RootStore.routerStore.router)
                          routers[index].toggle = false
                          RootStore.routerStore.updateRouter(routers)
                        }}
                      />
                    ) : (
                      <p
                        className="font-bold"
                        onDoubleClick={() => {
                          const routers = toJS(RootStore.routerStore.router)
                          routers[index].toggle = true
                          RootStore.routerStore.updateRouter(routers)
                        }}
                      >
                        {item.title}
                      </p>
                    )}
                    {item.children ? (
                      <ul
                        className="flex flex-row ml-1 text-white " //collapse
                        id={item.name}
                      >
                        {item.children.map((children, indexChildren) => (
                          <li className="bg-blue-600 ml-4 p-2 rounded-md">
                            {children.toggle ? (
                              <input
                                type="text"
                                className="leading-4 p-2 m-2 focus:ring-indigo-500 focus:border-indigo-500 block text-black  shadow-sm sm:text-base border border-gray-300 rounded-sm"
                                value={children.title}
                                onChange={(e) => {
                                  const title = e.target.value
                                  const routers = toJS(RootStore.routerStore.router)
                                  routers[index].children[
                                    indexChildren
                                  ].title = title
                                  RootStore.routerStore.updateRouter(routers)
                                }}
                                onBlur={() => {
                                  const routers = toJS(RootStore.routerStore.router)
                                  routers[index].children[
                                    indexChildren
                                  ].toggle = false
                                  RootStore.routerStore.updateRouter(routers)
                                }}
                              />
                            ) : (
                              <p
                                className="font-bold"
                                onDoubleClick={() => {
                                  const routers = toJS(RootStore.routerStore.router)
                                  routers[index].children[
                                    indexChildren
                                  ].toggle = true
                                  RootStore.routerStore.updateRouter(routers)
                                }}
                              >
                                {children.title}
                              </p>
                            )}

                            <ul className="ml-2">
                              {children.permission.map(
                                (permission, indexPermission) => (
                                  <li>
                                    <input
                                      type="checkbox"
                                      checked={permission.checked}
                                      className="m-2"
                                      onChange={async () => {
                                        const routers = toJS(
                                          RootStore.routerStore.router
                                        )
                                        const modifyPermission =
                                          item.children[indexChildren].permission[
                                            indexPermission
                                          ]
                                        modifyPermission.checked = modifyPermission.checked
                                          ? false
                                          : true
                                        if (
                                          modifyPermission.title === "Edit/Modify" ||
                                          modifyPermission.title === "Delete"
                                        ) {
                                          routers[index].children[
                                            indexChildren
                                          ].permission[1].checked = true
                                          console.log("check")
                                        }
                                        routers[index].children[
                                          indexChildren
                                        ].permission[indexPermission] = toJS(
                                          modifyPermission
                                        )
                                        RootStore.routerStore.updateRouter(routers)
                                      }}
                                    />
                                    {permission.title}
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <li>{item.title}</li>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icons.Save}
              onClick={() => {
                if (
                  selectedRole !== undefined &&
                  RootStore.routerStore.router !== undefined
                ) {
                  let router: any[] = []
                  RootStore.routerStore.router.filter((item) => {
                    return item.children.filter((childern, indexChildern) => {
                      childern.permission.filter((permission, indexPermission) => {
                        if (permission.checked) {
                          const isRouter = router.find(
                            (routerItem) => routerItem.name === item.name
                          )
                          console.log({ isRouter })
                          if (isRouter) {
                            router = router.filter(function (obj) {
                              return obj.name !== item.name
                            })
                            let children = isRouter.children.concat([
                              toJS(item.children[indexChildern]),
                            ])
                            children = children.reduce((filtered, item) => {
                              if (
                                !filtered.some(
                                  (filteredItem) =>
                                    JSON.stringify(filteredItem) ==
                                    JSON.stringify(item)
                                )
                              )
                                filtered.push(item)
                              return filtered
                            }, [])
                            router.push({
                              path: item.path,
                              name: item.name,
                              icon: item.icon,
                              title: item.title,
                              toggle: item.toggle,
                              children,
                            })
                          } else {
                            router.push({
                              path: item.path,
                              name: item.name,
                              icon: item.icon,
                              title: item.title,
                              toggle: item.toggle,
                              children: [toJS(item.children[indexChildern])],
                            })
                          }
                        }
                      })
                    })
                  })
                  //console.log({ router })
                  isModify.status
                    ? Stores.roleMappingStore.roleMappingService
                        .updateRoleMapping({
                          id: isModify.id,
                          role: selectedRole,
                          router: JSON.stringify(router),
                        })
                        .then((res) => {
                          if (res.status === LibraryModels.StatusCode.SUCCESS) {
                            LibraryComponents.Atoms.ToastsStore.success(
                              `Role mapping updated.`
                            )
                            setTimeout(() => {
                              window.location.reload()
                            }, 2000)
                          } else {
                            alert("Data not update.Please try again")
                          }
                        })
                    : Services.addRoleMapping({
                        role: selectedRole,
                        router: JSON.stringify(router),
                      }).then((res) => {
                        if (res.status === LibraryModels.StatusCode.CREATED) {
                          LibraryComponents.Atoms.ToastsStore.success(`Created.`)
                          setTimeout(() => {
                            window.location.reload()
                          }, 2000)
                        } else {
                          alert("Not added data.")
                        }
                      })
                } else {
                  LibraryComponents.Atoms.ToastsStore.warning(
                    "Please enter all information!"
                  )
                }
              }}
            >
              {isModify.status ? "Update" : "Save"}
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icons.Remove}
              onClick={() => {
                //rootStore.userStore.clear()
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <ToolkitProvider
            keyField="id"
            data={Stores.roleMappingStore.roleMappingList || []}
            columns={[
              {
                dataField: "role.description",
                text: "Role",
                sort: true,
                editable: false,
              },
              {
                dataField: "router",
                text: "Role Permission",
                // style: { width: 200 },
                formatter: (cellContent, row) => (
                  <>
                    {row.router && (
                      <ul className="nav nav-stacked" id="accordion1">
                        {JSON.parse(row.router).map((item, index) => (
                          <li className="flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion1"
                              //href={`#${item.name}`}
                              className="font-bold"
                            >
                              {item.title}
                            </a>
                            {item.children ? (
                              <ul
                                className="flex flex-row ml-1 text-white " //collapse
                                id={item.name}
                              >
                                {item.children.map((children, indexChildren) => (
                                  <li className="bg-blue-600 ml-4 p-2 rounded-md">
                                    {children.title}
                                    <ul className="ml-2">
                                      {children.permission.map(
                                        (permission, indexPermission) => (
                                          <li>
                                            <input
                                              type="checkbox"
                                              checked={permission.checked}
                                              className="m-2"
                                            />
                                            {permission.title}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <li>{item.title}</li>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
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
                    <LibraryComponents.Atoms.Buttons.Button
                      size="small"
                      type="outline"
                      //icon={LibraryComponents.Atoms.Icons.Remove}
                      onClick={() => {
                        setValue(row.role.description)
                        setSelectedUserRole(row.role.description)
                        setInputValue(row.role.description)
                        const router = toJS(RootStore.routerStore.router)
                        const roleRouter = JSON.parse(row.router)
                        roleRouter.filter((item, index) => {
                          router.filter((routerItem, indexRouter) => {
                            if (routerItem.name === item.name) {
                              routerItem.children.filter(
                                (childrenItem, indexChildren) => {
                                  const itemChildren = item.children
                                  for (const children of itemChildren) {
                                    if (childrenItem.name == children.name) {
                                      router[indexRouter].children[
                                        indexChildren
                                      ] = children  
                                      router[indexRouter].title = item.title
                                      //console.log({ children, indexChildren })
                                    }
                                  }
                                }
                              )
                            }
                          })
                        })
                        console.log({ router })
                        setIsModify({ status: true, id: row._id })
                        RootStore.routerStore.updateRouter(router)
                      }}
                    >
                      <LibraryComponents.Atoms.Icons.EvaIcon
                        icon="edit-outline"
                        size="medium"
                        color="#000"
                      />
                      Edit/Modify
                    </LibraryComponents.Atoms.Buttons.Button>
                    <br />
                    <br />
                    <LibraryComponents.Atoms.Buttons.Button
                      size="small"
                      type="outline"
                      //icon={LibraryComponents.Atoms.Icons.Remove}
                      onClick={() => {
                        setDeleteItem({
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete this role mapping!`,
                        })
                      }}
                    >
                      <LibraryComponents.Atoms.Icons.EvaIcon
                        icon="trash-2-outline"
                        size="medium"
                        color="#000"
                      />
                      Delete
                    </LibraryComponents.Atoms.Buttons.Button>
                  </>
                ),
              },
            ]}
            search
            exportCSV={{
              fileName: `Role Mapping_${moment(new Date()).format(
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
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...deleteItem}
          click={() => {
            Services.deleteRoleMapping(deleteItem.id).then((res: any) => {
              if (res.status === LibraryModels.StatusCode.SUCCESS) {
                LibraryComponents.Atoms.ToastsStore.success(`Deleted.`)
                setDeleteItem({ show: false })
                Stores.roleMappingStore.fetchRoleMappingList()
              }
            })
          }}
          close={() => {
            setDeleteItem({
              show: false,
            })
          }}
        />
      </div>
    </>
  )
})

export default RoleMapping
