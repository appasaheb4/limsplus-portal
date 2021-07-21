/* eslint-disable */
import React from "react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface ConversationMappingListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const ConversationMappingList = (props: ConversationMappingListProps) => {
  return (
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
          dataField: "hexadecimal",
          text: "Hexa Decimal",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.hexadecimal !== undefined
                ? row.hexadecimal
                    .toString()
                    .replaceAll(/&amp;/g, "&")
                    .replaceAll(/&gt;/g, ">")
                    .replaceAll(/&lt;/g, "<")
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/â/g, "’")
                    .replaceAll(/â¦/g, "…")
                    .toString()
                : undefined}
            </>
          ),
        },
        {
          dataField: "binary",
          text: "Binary",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.binary !== undefined
                ? row.binary
                    .toString()
                    .replaceAll(/&amp;/g, "&")
                    .replaceAll(/&gt;/g, ">")
                    .replaceAll(/&lt;/g, "<")
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/â/g, "’")
                    .replaceAll(/â¦/g, "…")
                    .toString()
                : undefined}
            </>
          ),
        },
        {
          dataField: "ascii",
          text: "ASCII",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          formatter: (cellContent, row) => (
            <>
              {row.ascii !== undefined
                ? row.ascii
                    .toString()
                    .replaceAll(/&amp;/g, "&")
                    .replaceAll(/&gt;/g, ">")
                    .replaceAll(/&lt;/g, "<")
                    .replaceAll(/&quot;/g, '"')
                    .replaceAll(/â/g, "’")
                    .replaceAll(/â¦/g, "…")
                    .toString()
                : undefined}
            </>
          ),
        },
        {
          dataField: "operation",
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
      fileName="Conversation Mapping"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
}
export default ConversationMappingList
