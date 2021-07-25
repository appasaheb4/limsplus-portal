/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface LibraryListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
}

export const LibraryList = observer((props: LibraryListProps) => {
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
              dataField: "code",
              text: "Code",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "description",
              text: "Description",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "usageType",
              text: "Usage Type",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "libraryType",
              text: "Library Type",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "commentType",
              text: "Comment Type",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "lab",
              text: "Lab",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "department",
              text: "Department",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "commentsTarget",
              text: "CommentsTarget",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "details",
              text: "Details",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "parameter",
              text: "Parameter",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "action",
              text: "Action",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "results",
              text: "Aesults",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "value",
              text: "Value",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "reflex",
              text: "Reflex",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cellContent, row) => (
                <>
                 <div className="flex flex-row">
                    {row.reflex.map((item) => (
                      <div className="mb-2 ml-2">
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          onClick={() => {}}
                        >
                          {`Panel Name: ${item.panelName} 
                           Panel Code: ${item.panelCode}`}
                        </LibraryComponents.Atoms.Buttons.Button>
                      </div>
                    ))}
                    </div>
                </>
              ),
            },
            {
              dataField: "analyte",
              text: "Analyte",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "rule",
              text: "Rule",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "abNormal",
              text: "AbNormal",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "status",
              text: "Status",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "organismGroup",
              text: "Organism Group",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "organismClass",
              text: "Organism Class",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "loAge",
              text: "LO Age",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "hiAge",
              text: "HI Age",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "sex",
              text: "Sex",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "sexAction",
              text: "Sex Action",
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
          fileName="Library"
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
