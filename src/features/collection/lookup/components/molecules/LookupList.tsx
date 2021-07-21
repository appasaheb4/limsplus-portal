/* eslint-disable */
import React,{useEffect} from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { dashboardRouter as dashboardRoutes } from "@lp/routes"
let router = dashboardRoutes

interface LookupListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const LookupList = observer((props: LookupListProps) => {
  useEffect(() => {
    router = router.filter((item: any) => {
      if (item.name !== "Dashboard") {
        item.toggle = false
        item.title = item.name
        item = item.children.filter((childernItem) => {
          childernItem.title = childernItem.name
          childernItem.toggle = false
          return childernItem
        })
        return item
      }
    })
  }, [])
  return (
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
            dataField: "documentName",
            text: "Document Name",
            sort: true,
            formatter: (cell, row) => {
              return <>{`${row.documentName.children.name}`}</>
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
                 <LibraryComponents.Atoms.Form.InputWrapper label="Document Name">
                  <LibraryComponents.Molecules.AutocompleteGroupBy
                    data={router}
                    onChange={async (item: any, children: any) => {
                      const documentName = {
                        name: item.name,
                        title: item.title,
                        path: item.path,
                        children,
                      }
                      props.onUpdateItem &&
                        props.onUpdateItem(documentName,column.dataField,row._id)
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: "fieldName",
            text: "Field Name",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
          },
          {
            dataField: "arrValue",
            text: "Value & code",
            sort: true,
            editable: false,
            formatter: (cellContent, row) => (
              <>
                <LibraryComponents.Atoms.List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  {row.arrValue.map((item) => (
                    <div className="mb-2">
                      <LibraryComponents.Atoms.Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {}}
                      >
                        {`${item.value} - ${item.code}`}
                      </LibraryComponents.Atoms.Buttons.Button>
                    </div>
                  ))}
                </LibraryComponents.Atoms.List>
              </>
            ),
          },
          {
            dataField: "description",
            text: "Description",
            sort: true,
            filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "Delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete item`,
                          })
                        }
                      >
                        {LibraryComponents.Atoms.Icons.getIconTag(
                          LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                        )}
                      </LibraryComponents.Atoms.Icons.IconContext>
                    </LibraryComponents.Atoms.Tooltip>
                  </div>
              </>
            ),
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName="Lookup"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
        }}
      />
    </div>
  )
})
export default LookupList
