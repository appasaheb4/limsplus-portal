/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { Stores } from "../stores"
import { Stores as LoginStore } from "@lp/features/login/stores"

import { Stores as RootStore } from "@lp/library/stores"

const grid = 8
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "none",
  display: "flex",
  //flexWrap:'none',
  padding: grid,
  overflow: "auto",
})

const ShortcutMenu = observer(() => {
  useEffect(() => {
    const list: any[] = []
    RootStore.routerStore.userRouter?.filter((item) => {
      item.children.filter((children: any) => {
        const userShortcutMenu =
          LoginStore.loginStore.login?.shortcutMenu &&
          LoginStore.loginStore.login?.shortcutMenu[
            LoginStore.loginStore.login.role || ""
          ] &&
          LoginStore.loginStore.login?.shortcutMenu[
            LoginStore.loginStore.login.role || ""
          ].filter(
            (userItem) =>
              userItem.category === item.name && userItem.name === children.name
          )
        //console.log({ userShortcutMenu })
        if (userShortcutMenu && userShortcutMenu?.length > 0) {
          children.selected = true
        } else {
          children.selected = false
        }
        children.category = item.name
        list.push(children)
      })
    })
    Stores.shortcutMenuStore.updateShortcutMenu(list)
  }, [])

  const onItemSelect = (item: any, index: number) => {
    const list = Stores.shortcutMenuStore.shortcutMenuList
    if (list) {
      list[index].selected = !list[index].selected
    }
    console.log({ list })

    Stores.shortcutMenuStore.updateShortcutMenu(list)
  }

  const handleOnDragEnd = (result: any) => {
    console.log({ user: LoginStore.loginStore.login })

    const items = Array.from(
      (LoginStore.loginStore.login?.shortcutMenu &&
        LoginStore.loginStore.login?.shortcutMenu[
          LoginStore.loginStore.login.role || ""
        ]) ||
        []
    )
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log({ items })

    LoginStore.loginStore.updateLogin({
      ...LoginStore.loginStore.login,
      shortcutMenu: { [LoginStore.loginStore.login?.role || ""]: items },
    })
    Stores.shortcutMenuStore.updateDragDrop(true)
  }
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {LoginStore.loginStore.login?.shortcutMenu &&
        LoginStore.loginStore.login?.shortcutMenu[
          LoginStore.loginStore.login.role || ""
        ] &&
        LoginStore.loginStore.login?.shortcutMenu &&
        LoginStore.loginStore.login?.shortcutMenu[
          LoginStore.loginStore.login.role || ""
        ].length > 0 && (
          <div>
            <label className="mt-2">Active:</label>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters" direction="horizontal">
                {(provided, snapshot) => (
                  <ul
                    style={getListStyle(snapshot.isDraggingOver)}
                    // className="grid grid-cols-1 p-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {LoginStore.loginStore.login?.shortcutMenu &&
                      LoginStore.loginStore.login?.shortcutMenu[
                        LoginStore.loginStore.login.role || ""
                      ].map((item, index) => (
                        <>
                          <Draggable
                            key={item.title}
                            draggableId={item.title}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="flex items-center bg-blue-500  p-2 m-2 rounded-md"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <LibraryComponents.Atoms.Icons.IconContext
                                  color="#fff"
                                  size="22"
                                >
                                  {LibraryComponents.Atoms.Icons.getIconTag(
                                    LibraryComponents.Atoms.Icons.getIcons(
                                      item.icon
                                    ) || LibraryComponents.Atoms.Icons.IconBs.BsList
                                  )}
                                </LibraryComponents.Atoms.Icons.IconContext>
                                <li className="m-2 text-white">{item.title}</li>
                              </div>
                            )}
                          </Draggable>
                        </>
                      ))}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            {Stores.shortcutMenuStore.isDragDropList && (
              <div className="flex items-center justify-center">
                <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  type="solid"
                  icon={LibraryComponents.Atoms.Icon.Save}
                  onClick={() => {
                    Stores.shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({
                      userRole: LoginStore.loginStore.login?.role,
                      selectedList:
                        LoginStore.loginStore.login?.shortcutMenu &&
                        LoginStore.loginStore.login?.shortcutMenu[
                          LoginStore.loginStore.login.role || ""
                        ],
                      id: LoginStore.loginStore.login?._id,
                    }).then((res) => {
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                         message: `😊Shortcut Menu updated.`
                        })
                        Stores.shortcutMenuStore.updateDragDrop(false)
                      } else {
                        LibraryComponents.Atoms.Toast.error({
                         message: `😔Please try agian.`
                        })
                      }
                    })
                  }}
                >
                  Update
                </LibraryComponents.Atoms.Buttons.Button>
                <br /> <br />
              </div>
            )}
          </div>
        )}

      <hr />
      <div className="flex-wrap">
        <label className="mt-2">List:</label>
        <ul className="grid grid-cols-6 p-2">
          {Stores.shortcutMenuStore.shortcutMenuList &&
            Stores.shortcutMenuStore.shortcutMenuList?.map((item, index) => (
              <>
                <div className="flex items-center bg-gray-500  p-2 m-2 rounded-md">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={item.name}
                    value={item.name}
                    checked={item.selected}
                    onChange={() => onItemSelect(item, index)}
                  />

                  <LibraryComponents.Atoms.Icons.IconContext color="#fff" size="22">
                    {LibraryComponents.Atoms.Icons.getIconTag(
                      LibraryComponents.Atoms.Icons.getIcons(item.icon) ||
                        LibraryComponents.Atoms.Icons.IconBs.BsList
                    )}
                  </LibraryComponents.Atoms.Icons.IconContext>
                  <li className="m-2 text-white">{item.title}</li>
                </div>
              </>
            ))}
        </ul>
        <br />
        <LibraryComponents.Atoms.List direction="row" space={3} align="center">
          <LibraryComponents.Atoms.Buttons.Button
            size="medium"
            type="solid"
            icon={LibraryComponents.Atoms.Icon.Save}
            onClick={() => {
              const selectedList = Stores.shortcutMenuStore.shortcutMenuList?.filter(
                (item) => item.selected === true
              )
              console.log({ selectedList })

              const userRole = LoginStore.loginStore.login?.role
              if (selectedList && selectedList?.length > 0) {
                Stores.shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({
                  userRole,
                  selectedList: selectedList,
                  id: LoginStore.loginStore.login?._id,
                }).then((res) => {
                  console.log({ res })

                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                     message: `😊Shortcut Menu updated.`
                  })
                    LoginStore.loginStore.updateLogin({
                      ...LoginStore.loginStore.login,
                      shortcutMenu: res.data.data.user.shortcutMenu,
                    })
                  } else {
                    LibraryComponents.Atoms.Toast.error({message:`😔Please try agian.`})
                  }
                })
              }
            }}
          >
            Update
          </LibraryComponents.Atoms.Buttons.Button>
        </LibraryComponents.Atoms.List>
      </div>
    </>
  )
})

export default ShortcutMenu
