/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

let containerCode
let containerName
let description
let environment

interface SampleContainerListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateImage?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

const SampleContainerList = (props: SampleContainerListProps) => {
  return (
    <LibraryComponents.Organisms.TableBootstrap
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
          dataField: "containerCode",
          text: "Container Code",
          headerClasses: "textHeader4",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter({
            getFilter: (filter) =>{
              containerCode = filter
            }
          }),
          editable: false,
        },
        {
          dataField: "containerName",
          text: "Container Name",
          headerClasses: "textHeader4",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter({
            getFilter: (filter) =>{
              containerName = filter
            }
          }),
          editable: false,
        },
        {
          dataField: "description",
          text: "Description",
          headerClasses: "textHeader4",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter({
            getFilter: (filter) =>{
              description = filter
            }
          }),
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
          headerClasses: "textHeader4",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter({
            getFilter: (filter) =>{
              environment = filter
            }
          }),
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(environment, column.dataField, row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    props.extraData.lookupItems,
                    "ENVIRONMENT"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
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
                <LibraryComponents.Atoms.Tooltip tooltipText="Delete" position="top">
                  <LibraryComponents.Atoms.Icons.IconContext
                    color="#fff"
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
          headerClasses: "sticky right-0  bg-gray-500 text-white",
          classes: (cell, row, rowIndex, colIndex) => {
            return "sticky right-0 bg-gray-500"
          },
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
      onPageSizeChange={(page, size) => {
        props.onPageSizeChange && props.onPageSizeChange(page, size)
      }}  
      onFilter={(type, filter, page, size) => {
        props.onFilter && props.onFilter(type, filter, page, size)
      }}
      clearAllFilter={()=>{
        containerCode("")
        containerName("")
        description("")
        environment("")
      }}
    />
  )
}
export default SampleContainerList
