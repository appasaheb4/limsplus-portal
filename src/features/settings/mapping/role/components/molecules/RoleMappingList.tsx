/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores } from "../../stores"
import { Stores as DeginisationStore } from "@lp/features/collection/deginisation/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { toJS } from "mobx"

interface RoleMappingListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onDuplicate?: (selectedItem: any) => void
}

const RoleMappingList = observer((props: RoleMappingListProps) => {
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
              dataField: "role.description",
              text: "Role",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editable: false,
            },
            {
              dataField: "router",
              text: "Role Permission",
              editable: false,
              formatter: (cellContent, row) => (
                <>
                  {row.router && (
                    <ul className="nav nav-stacked" id="accordion1">
                      {JSON.parse(row.router).map((item, index) => (
                        <li className="flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion1"
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
                    onClick={() => {
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
                                  }
                                }
                              }
                            )
                          }
                        })
                      })
                      RootStore.routerStore.updateRouter(router)
                      props.onDuplicate &&
                        props.onDuplicate({
                          router,
                          id: row._id,
                          description: row.role.description,
                          code: row.role.code
                        })
                    }}
                  >
                    <LibraryComponents.Atoms.Icon.EvaIcon
                      icon="edit-outline"
                      size="medium"
                      color="#000"
                    />
                    Edit/Modify
                  </LibraryComponents.Atoms.Buttons.Button>
                  {props.isDelete && (
                    <>
                      <br />
                      <br />
                      <LibraryComponents.Atoms.Buttons.Button
                        size="small"
                        type="outline"
                        //icon={LibraryComponents.Atoms.Icon.Remove}
                        onClick={() => {
                          props.onDelete &&
                            props.onDelete({
                              type: "Delete",
                              show: true,
                              id: [row._id],
                              title: "Are you sure?",
                              body: `Delete this role mapping!`,
                            })
                        }}
                      >
                        <LibraryComponents.Atoms.Icon.EvaIcon
                          icon="trash-2-outline"
                          size="medium"
                          color="#000"
                        />  
                        Delete
                      </LibraryComponents.Atoms.Buttons.Button>
                    </>
                  )}
                </>
              ),
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName="Role Mapping"
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

export default RoleMappingList
