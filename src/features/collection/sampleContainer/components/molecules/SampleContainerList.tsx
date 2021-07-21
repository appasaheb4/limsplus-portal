/* eslint-disable */
import React, { useState } from "react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface SampleContainerListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const SampleContainerList = (props: SampleContainerListProps) => {
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
          dataField: "containerCode",
          text: "Container Code",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
        },
        {
          dataField: "containerName",
          text: "Container Name",
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
          dataField: "image",
          text: "Image",
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <>
                <img
                  src={row.image}
                  style={{ width: 200, height: 150 }}
                  alt="sampleContainer"
                  className="object-contain"
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
                <LibraryComponents.Atoms.Form.InputFile
                label="Image"
                placeholder="Image"
                onChange={(e) => {
                  const image = e.target.files[0]
                      props.onUpdateItem && 
                        props.onUpdateItem(image,column.dataField,row._id)
                }}
              />
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
      fileName="SampleContainer"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
    />
  )
}
export default SampleContainerList
