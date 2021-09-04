/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { unionBy } from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryModels from "@lp/library/models"
import * as Services from "../services"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import "react-dropdown-tree-select/dist/styles.css"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
const router = dashboardRoutes
import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const grid = 8
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "none",
  display: "flex",
  padding: grid,
  overflow: "auto",
})

const RoleMapping = observer(() => {
  const { loginStore } = useStores()

  const [hideRole, setHideRole] = useState<boolean>(false)
  const [modalConfirm, setModalConfirm] = useState<any>()
  let roleList: any = RoleStore.roleStore.listRole || []
  for (const router of Stores.roleMappingStore.roleMappingList || []) {
    if (router) {
      roleList = roleList.filter((item) => {
        return item.code !== router.role.code
      })
    }
  }
  //console.log({ roleList })

  const description = roleList.length > 0 ? roleList[0].description : undefined
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
      stores.routerStore.updateRouter(routers)
    }
  }, [])

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(
        toJS(stores.routerStore.userPermission),
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
          <LibraryComponents.Atoms.Form.InputWrapper label="Role" id="role">
            <select
              name="defualtLab"
              disabled={hideRole}
              value={Stores.roleMappingStore.selectedRole as any}
              className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
              onChange={(e) => {
                const role = roleList[e.target.value]
                if (role.code !== "SYSADMIN") {
                  const routers: any = stores.routerStore.router.filter(
                    (item: any) => {
                      const children = item.children.filter((childernItem) => {
                        if (
                          childernItem.name !== "Role" &&
                          childernItem.name !== "User" &&
                          childernItem.name !== "Login Activity" &&
                          childernItem.name !== "Role Mapping" &&
                          childernItem.name !== "Environment Settings" &&
                          childernItem.name !== "Notice Boards"
                        ) {
                          childernItem.title = childernItem.name
                          childernItem.toggle = false
                          childernItem.permission = permission
                          childernItem.icon = childernItem.icon
                          return childernItem
                        }
                      })
                      item.children = children
                      return item
                    }
                  )
                  if (routers) {
                    stores.routerStore.updateRouter(routers)
                  }
                }
                Stores.roleMappingStore.updateSelectedRole(toJS(role))
              }}
            >
              <option selected>
                {Stores.roleMappingStore.selectedRole
                  ? Stores.roleMappingStore.selectedRole.description
                  : `Select`}
              </option>
              {roleList.map((item: any, index: number) => (
                <option key={index} value={index}>
                  {item.description}
                </option>
              ))}
            </select>
          </LibraryComponents.Atoms.Form.InputWrapper>

          <div className="mt-4 overflow-auto">
            {stores.routerStore.router && (
              <DragDropContext
                onDragEnd={(result: any) => {
                  console.log({ result })
                  const items = Array.from(stores.routerStore.router || [])
                  const [reorderedItem] = items.splice(result.source.index, 1)
                  items.splice(result.destination.index, 0, reorderedItem)
                  stores.routerStore.updateRouter(items)
                }}
              >
                <Droppable droppableId="parent" direction="vertical">
                  {(provided, snapshot) => (
                    <ul
                      className="nav nav-stacked characters"
                      id="accordion1"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {stores.routerStore.router.map((item, index) => (
                        <Draggable
                          key={item.name}
                          draggableId={item.name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className="flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item.toggle ? (
                                <input
                                  type="text"
                                  className="leading-4 p-2 m-2 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-sm"
                                  value={item.title}
                                  onChange={(e) => {
                                    const title = e.target.value
                                    const routers = toJS(stores.routerStore.router)
                                    routers[index].title = title
                                    stores.routerStore.updateRouter(routers)
                                  }}
                                  onBlur={() => {
                                    const routers = toJS(stores.routerStore.router)
                                    routers[index].toggle = false
                                    stores.routerStore.updateRouter(routers)
                                  }}
                                />
                              ) : (
                                <p
                                  className="font-bold"
                                  onDoubleClick={() => {
                                    const routers = toJS(stores.routerStore.router)
                                    routers[index].toggle = true
                                    stores.routerStore.updateRouter(routers)
                                  }}
                                >
                                  {item.title}
                                </p>
                              )}
                              {item.children ? (
                                <DragDropContext
                                  onDragEnd={(result: any) => {
                                    const items = Array.from(item.children || [])
                                    const [reorderedItem] = items.splice(
                                      result.source.index,
                                      1
                                    )
                                    items.splice(
                                      result.destination.index,
                                      0,
                                      reorderedItem
                                    )
                                    const router = [...stores.routerStore.router]
                                    router[index].children = items
                                    stores.routerStore.updateRouter(router)
                                  }}
                                >
                                  <Droppable
                                    droppableId="characters"
                                    direction="horizontal"
                                  >
                                    {(provided, snapshot) => (
                                      <ul
                                        className="flex flex-row ml-1 text-white characters"
                                        id={item.name}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                      >
                                        {item.children.map(
                                          (children, indexChildren) => (
                                            <Draggable
                                              key={children.name}
                                              draggableId={children.name}
                                              index={indexChildren}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  className="bg-blue-600 ml-4 p-2 rounded-md"
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                >
                                                  {children.toggle ? (
                                                    <input
                                                      type="text"
                                                      className="leading-4 p-2 m-2 focus:outline-none focus:ring block text-black  shadow-sm sm:text-base border border-gray-300 rounded-sm"
                                                      value={children.title}
                                                      onChange={(e) => {
                                                        const title = e.target.value
                                                        const routers = toJS(
                                                          stores.routerStore.router
                                                        )
                                                        routers[index].children[
                                                          indexChildren
                                                        ].title = title
                                                        stores.routerStore.updateRouter(
                                                          routers
                                                        )
                                                      }}
                                                      onBlur={() => {
                                                        const routers = toJS(
                                                          stores.routerStore.router
                                                        )
                                                        routers[index].children[
                                                          indexChildren
                                                        ].toggle = false
                                                        stores.routerStore.updateRouter(
                                                          routers
                                                        )
                                                      }}
                                                    />
                                                  ) : (
                                                    <p
                                                      className="font-bold"
                                                      onDoubleClick={() => {
                                                        const routers = toJS(
                                                          stores.routerStore.router
                                                        )
                                                        routers[index].children[
                                                          indexChildren
                                                        ].toggle = true
                                                        stores.routerStore.updateRouter(
                                                          routers
                                                        )
                                                      }}
                                                    >
                                                      {children.title}
                                                    </p>
                                                  )}

                                                  <ul className="ml-2">
                                                    {children.permission.map(
                                                      (
                                                        permission,
                                                        indexPermission
                                                      ) => (
                                                        <li
                                                          onClick={async () => {
                                                            const routers = toJS(
                                                              stores.routerStore
                                                                .router
                                                            )
                                                            const modifyPermission =
                                                              item.children[
                                                                indexChildren
                                                              ].permission[
                                                                indexPermission
                                                              ]
                                                            modifyPermission.checked = modifyPermission.checked
                                                              ? false
                                                              : true
                                                            if (
                                                              modifyPermission.title ===
                                                                "Edit/Modify" ||
                                                              modifyPermission.title ===
                                                                "Delete"
                                                            ) {
                                                              routers[
                                                                index
                                                              ].children[
                                                                indexChildren
                                                              ].permission[1].checked = true
                                                              console.log("check")
                                                            }
                                                            routers[index].children[
                                                              indexChildren
                                                            ].permission[
                                                              indexPermission
                                                            ] = toJS(
                                                              modifyPermission
                                                            )
                                                            stores.routerStore.updateRouter(
                                                              routers
                                                            )
                                                          }}
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            checked={
                                                              permission.checked
                                                            }
                                                            className="m-2 w-4 h-4"
                                                          />
                                                          {permission.title}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </li>
                                              )}
                                            </Draggable>
                                          )
                                        )}
                                        {provided.placeholder}
                                      </ul>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              ) : (
                                <li>{item.title}</li>
                              )}
                            </li>
                          )}
                        </Draggable>
                      ))}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                if (
                  Stores.roleMappingStore.selectedRole?.description !== undefined &&
                  stores.routerStore.router !== undefined
                ) {
                  let router: any[] = []
                  stores.routerStore.router.filter((item) => {
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
                          role: Stores.roleMappingStore.selectedRole,
                          router: JSON.stringify(router),
                        })
                        .then((res) => {
                          if (res.status === LibraryModels.StatusCode.SUCCESS) {
                            if (
                              Stores.roleMappingStore.selectedRole?.code ===
                              LoginStore.loginStore.login?.role
                            ) {
                              stores.routerStore.updateUserRouter(router)
                            }
                            LibraryComponents.Atoms.Toast.success({
                              message: `😊 Role mapping updated.`,
                            })
                            setTimeout(() => {
                              window.location.reload()
                            }, 2000)
                          } else {
                            alert("Data not update. Please try again")
                          }
                        })
                    : Stores.roleMappingStore.roleMappingService
                        .addRoleMapping({
                          role: Stores.roleMappingStore.selectedRole,
                          router: JSON.stringify(router),
                        })
                        .then((res) => {
                          if (res.status === LibraryModels.StatusCode.CREATED) {
                            LibraryComponents.Atoms.Toast.success({
                              message: `😊 Role mapping created.`,
                            })
                            setTimeout(() => {
                              window.location.reload()
                            }, 2000)
                          } else {
                            alert("Not added data.")
                          }
                        })
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: "😔 Please enter all information!",
                  })
                }
              }}
            >
              {isModify.status ? "Update" : "Save"}
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icon.Remove}
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
            totalSize={Stores.roleMappingStore.roleMappingListCount}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Edit/Modify"
            )}
            onDelete={(selectedUser) => setModalConfirm(selectedUser)}
            onDuplicate={(selectedItem: any) => {
              if (selectedItem.code !== "SYSADMIN") {
                const routers: any = stores.routerStore.router.filter(
                  (item: any) => {
                    const children = item.children.filter((childernItem) => {
                      if (    
                        childernItem.name !== "Role" &&
                        childernItem.name !== "User" &&
                        childernItem.name !== "Login Activity" &&
                        childernItem.name !== "Role Mapping" &&
                        childernItem.name !== "Environment Settings" &&
                        childernItem.name !== "Notice Boards"
                      ) {
                        return childernItem
                      }
                    })
                    item.children = children
                    return item
                  }
                )
                if (routers) {
                  stores.routerStore.updateRouter(routers)
                }
              }
              setHideAddRoleMapping(!hideAddRoleMapping)
              setHideRole(true)
              Stores.roleMappingStore.updateSelectedRole(toJS(selectedItem))
              setIsModify({ status: true, id: selectedItem.id })
            }}
            onPageSizeChange={(page, limit) => {
              Stores.roleMappingStore.fetchRoleMappingList(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.roleMappingStore.roleMappingService
                .deleteRoleMapping(modalConfirm.id)
                .then((res: any) => {
                  if (res.status === LibraryModels.StatusCode.SUCCESS) {
                    LibraryComponents.Atoms.Toast.success({ message: `😊Deleted.` })
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
