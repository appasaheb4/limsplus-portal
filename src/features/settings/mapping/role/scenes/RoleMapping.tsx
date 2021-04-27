/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { unionBy } from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryModels from "@lp/library/models"
import * as Services from "../services"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import "react-dropdown-tree-select/dist/styles.css"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
const router = dashboardRoutes

import { Stores } from "../stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"

import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const RoleMapping = observer(() => {
  const [modalConfirm, setModalConfirm] = useState<any>()
  let roleList: any = RoleStore.roleStore.listRole || []
  for (const router of Stores.roleMappingStore.roleMappingList || []) {
    if (router) {
      roleList = roleList.filter((item) => {
        return item.code !== router.role.code
      })
    }
  }
  const description = roleList.length > 0 ? roleList[0].description : undefined
  const [value, setValue] = React.useState<string | null>(description)
  const [inputValue, setInputValue] = React.useState("")
  const [selectedRole, setSelectedUserRole] = useState<any>()
  const [isModify, setIsModify] = useState<any>({ status: false })
  const [hideAddRoleMapping, setHideAddRoleMapping] = useState<boolean>(true)

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
      if (item.name !== "Dashboard") {
        item.toggle = false
        item.title = item.name
        item = item.children.filter((childernItem) => {
          childernItem.title = childernItem.name
          childernItem.toggle = false
          childernItem.permission = permission
          childernItem.icon = childernItem.icon
          return childernItem
        })
        return item
      }
    })
    if (routers) {
      RootStore.routerStore.updateRouter(routers)
    }
  }, [])

  const handleOnDragEnd = async (result) => {
    console.log({ result })
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
          subTitle="Add, Edit & Delete"
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(RootStore.routerStore.userPermission),
        "Add"
      ) && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddRoleMapping}
          onClick={(status) => setHideAddRoleMapping(!hideAddRoleMapping)}
        />
      )}
      <div className=" mx-auto  flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddRoleMapping ? "hidden" : "shown")
          }
        >
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
              <ul className="nav nav-stacked characters" id="accordion1">
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
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="characters">
                          {(provided) => (
                            <ul
                              className="flex flex-row ml-1 text-white characters"
                              id={item.name}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {item.children.map((children, indexChildren) => (
                                <Draggable
                                  key={children.name}
                                  draggableId={children.name}
                                  index={indexChildren}
                                >
                                  {(provided) => (
                                    <li
                                      className="bg-blue-600 ml-4 p-2 rounded-md"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {children.toggle ? (
                                        <input
                                          type="text"
                                          className="leading-4 p-2 m-2 focus:ring-indigo-500 focus:border-indigo-500 block text-black  shadow-sm sm:text-base border border-gray-300 rounded-sm"
                                          value={children.title}
                                          onChange={(e) => {
                                            const title = e.target.value
                                            const routers = toJS(
                                              RootStore.routerStore.router
                                            )
                                            routers[index].children[
                                              indexChildren
                                            ].title = title
                                            RootStore.routerStore.updateRouter(
                                              routers
                                            )
                                          }}
                                          onBlur={() => {
                                            const routers = toJS(
                                              RootStore.routerStore.router
                                            )
                                            routers[index].children[
                                              indexChildren
                                            ].toggle = false
                                            RootStore.routerStore.updateRouter(
                                              routers
                                            )
                                          }}
                                        />
                                      ) : (
                                        <p
                                          className="font-bold"
                                          onDoubleClick={() => {
                                            const routers = toJS(
                                              RootStore.routerStore.router
                                            )
                                            routers[index].children[
                                              indexChildren
                                            ].toggle = true
                                            RootStore.routerStore.updateRouter(
                                              routers
                                            )
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
                                                    item.children[indexChildren]
                                                      .permission[indexPermission]
                                                  modifyPermission.checked = modifyPermission.checked
                                                    ? false
                                                    : true
                                                  if (
                                                    modifyPermission.title ===
                                                      "Edit/Modify" ||
                                                    modifyPermission.title ===
                                                      "Delete"
                                                  ) {
                                                    routers[index].children[
                                                      indexChildren
                                                    ].permission[1].checked = true
                                                    console.log("check")
                                                  }
                                                  routers[index].children[
                                                    indexChildren
                                                  ].permission[
                                                    indexPermission
                                                  ] = toJS(modifyPermission)
                                                  RootStore.routerStore.updateRouter(
                                                    routers
                                                  )
                                                }}
                                              />
                                              {permission.title}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      </DragDropContext>
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
          <FeatureComponents.Molecules.RoleMappingList
            data={Stores.roleMappingStore.roleMappingList || []}
            isDelete={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(RootStore.routerStore.userPermission),
              "Edit/Modify"
            )}
            onDelete={(selectedUser) => setModalConfirm(selectedUser)}
            onDuplicate={(selectedItem: any) => {
              setHideAddRoleMapping(!hideAddRoleMapping)
              setValue(selectedItem.description)
              setSelectedUserRole(selectedItem.description)
              setInputValue(selectedItem.description)
              setIsModify({ status: true, id: selectedItem.id })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Services.deleteRoleMapping(modalConfirm.id).then((res: any) => {
                if (res.status === LibraryModels.StatusCode.SUCCESS) {
                  LibraryComponents.Atoms.ToastsStore.success(`Deleted.`)
                  setModalConfirm({ show: false })
                  Stores.roleMappingStore.fetchRoleMappingList()
                }
              })
            }
          }}
          onClose={() => {
            setModalConfirm({
              show: false,
            })
          }}
        />
      </div>
    </>
  )
})

export default RoleMapping
