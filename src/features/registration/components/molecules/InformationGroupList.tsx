/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import { lookupItems, lookupValue } from "@/library/utils"
import { TableBootstrap, textFilter,Form,Icons,Tooltip } from "@/library/components"
import { Confirm } from "@/library/models"
interface InformationGroupProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

export const InformationGroupList = observer((props: InformationGroupProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <TableBootstrap
          id="_id"
          data={props.data}
          totalSize={props.totalSize}
          columns={[
            {
              dataField: "_id",
              text: "Id",
              hidden: true,
              csvExport: false,
            },
            {
              dataField: "infoDate",
              text: "Information Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "infoRelatedTo",
              text: "Informatiom Related To",
              headerClasses: "textHeader5",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2
                                         rounded-md`}
                    onChange={(e) => {
                      const infoRelatedTo = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(infoRelatedTo, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "INFORMATION GROUP - INFO_RELATED_TO"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "keyField",
              text: "Key Field",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "infoType",
              text: "Information Type",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <>
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const infoType = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(infoType, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "INFORMATION GROUP - INFO_TYPE"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </>
                </>
              ),
            },
            {
              dataField: "infoLookup",
              text: "Information Lookup",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.infoLookup}
                      onChange={(infoLookup) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(infoLookup, "infoLookup", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "lookupValue",
              text: "LookupValue",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "information",
              text: "Information",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "attachment",
              text: "Attachment",
              headerClasses: "textHeader4",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.attachment}
                      alt="attachment"
                      className="object-fill h-35 w-40 rounded-md"
                    />
                  </>
                )
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
                  <Form.InputFile
                    onChange={(e) => {
                      const attachment = e.target.files[0]
                      props.onUpdateItem &&
                        props.onUpdateItem(attachment, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader3",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <>
                    <select
                      value={row.environment}
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(environment, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "INFORMATION GROUP - ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </>
                </>
              ),
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              headerClasses: "textHeader1",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader1",
              sort: true,
              filter: textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <>
                    <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                      onChange={(e) => {
                        const status = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(status, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        "INFORMATION GROUP - STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </>
                </>
              ),
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
                    <Tooltip tooltipText="Delete">
                      <Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete item`,
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                    </Tooltip>
                  </div>
                </>
              ),
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName="InformationGroup"
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
