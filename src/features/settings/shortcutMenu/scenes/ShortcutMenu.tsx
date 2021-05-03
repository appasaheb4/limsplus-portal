/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
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
import { Stores as LoginStore } from "@lp/features/login/stores"

import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const ShortcutMenu = observer(() => {
  useEffect(() => {
    const list: any[] = []
    router.filter((item) => {
      if (item.name !== "Dashboard") {
        item.children.filter((children: any) => {
          const userShortcutMenu = LoginStore.loginStore.login?.shortcutMenu?.filter(
            (userItem) =>
              userItem.category === item.name && userItem.name === children.name
          )
          if (userShortcutMenu && userShortcutMenu?.length > 0) {
            children.selected = true
          }
          children.category = item.name
          list.push(children)
        })
      }
    })
    Stores.shortcutMenuStore.updateShortcutMenu(list)
  }, [])

  const onItemSelect = (item: any, index: number) => {
    const list = Stores.shortcutMenuStore.shortcutMenuList
    if (list) {
      list[index].selected = !list[index].selected
    }
    Stores.shortcutMenuStore.updateShortcutMenu(list)
  }
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {LoginStore.loginStore.login?.shortcutMenu &&
        LoginStore.loginStore.login?.shortcutMenu?.length > 0 && (
          <div>
            <label className="mt-2">Active:</label>
            <ul className="grid grid-cols-8">
              {LoginStore.loginStore.login?.shortcutMenu?.map((item, index) => (
                <>
                  <div className="flex items-center bg-blue-500  p-2 m-2 rounded-md">
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#fff"
                      size="22"
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.getIcons(item.icon) ||
                          LibraryComponents.Atoms.Icons.IconBs.BsList
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                    <li className="m-2 text-white">{item.name}</li>
                  </div>
                </>
              ))}
            </ul>
          </div>
        )}

      <hr />
      <div className="flex-wrap">
        <label className="mt-2">List:</label>
        <ul className="grid grid-cols-8">
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
                  <li className="m-2 text-white">{item.name}</li>
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
              if (selectedList && selectedList?.length > 0) {
                Stores.shortcutMenuStore.ShortcutMenuService.updateShortcutMenu({
                  selectedList,
                  id: LoginStore.loginStore.login?._id,
                }).then((res) => {
                  if (res.status === 200) {
                    LibraryComponents.Atoms.ToastsStore.success(
                      `Shortcut Menu updated.`
                    )
                    LoginStore.loginStore.updateLogin({
                      ...LoginStore.loginStore.login,
                      shortcutMenu: selectedList,
                    })
                  } else {
                    LibraryComponents.Atoms.ToastsStore.error(`Please try agian.`)
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
