/* eslint-disable */
import React, { useState } from "react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as LibraryUtils from "@lp/library/utils"

interface BannerListProps {
  data: any
  totlaSize:number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateImage?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
}   

const BannerList = (props: BannerListProps) => {
  return (
    <LibraryComponents.Organisms.TableBootstrap
      id="_id"
      data={props.data}
      totalSize={props.totlaSize}
      columns={[
        {
          dataField: "_id",
          text: "Id",
          hidden: true,
          csvExport: false,
        },
        {
          dataField: "title",
          text: "Title",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          headerStyle: { minWidth: "200px" },
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
                  alt="banner"
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
              <LibraryComponents.Atoms.Form.InputFile
                label="File"
                placeholder="File"
                onChange={(e) => {
                  const image = e.target.files[0]
                  props.onUpdateImage &&
                    props.onUpdateImage(image, column.dataField, row._id)
                }}
              />
            </>
          ),
        },
        {
          dataField: "environment",
          text: "Environment",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <>
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={row.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                    
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
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
      fileName="Banner"
      onSelectedRow={(rows) => {
        props.onSelectedRow && props.onSelectedRow(rows.map((item: any) => item._id))
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        props.onUpdateItem && props.onUpdateItem(value, dataField, id)
      }}
      onPageSizeChange={(page,size)=>{
        props.onPageSizeChange && props.onPageSizeChange(page,size)
      }}
    />
  )
}
export default BannerList
