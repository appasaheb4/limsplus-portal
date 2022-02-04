/* eslint-disable */
import React from "react"
import {lookupItems} from "@lp/library/utils"
import {TableBootstrap,textFilter,List,Tooltip,Icons,Buttons} from "@lp/library/components"
import {Confirm} from "@lp/library/models"
import "react-accessible-accordion/dist/fancy-example.css"

let country
let state
let district
let city
let area
let postalCode
let sbu
let zone
let environment

interface AdminstrativeDivListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const AdminstrativeDivList = (props: AdminstrativeDivListProps) => {
  return (
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
            dataField: "country",
            text: "Country",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editorStyle: { textTransform: "uppercase" },
            style: { textTransform: "uppercase" },
            filter: textFilter({
              getFilter: (filter) =>{
                country = filter
              }
            }),
          },
          {
            dataField: "state",
            text: "State",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editorStyle: { textTransform: "uppercase" },
            style: { textTransform: "uppercase" },
            filter: textFilter({
              getFilter: (filter) =>{
                state = filter
              }
            }),
          },
          {
            dataField: "district",
            text: "District",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editorStyle: { textTransform: "uppercase" },
            style: { textTransform: "uppercase" },
            filter: textFilter({
              getFilter: (filter) =>{
                district = filter
              }
            }),
          },
          {
            dataField: "city",
            text: "City",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editorStyle: { textTransform: "uppercase" },
            style: { textTransform: "uppercase" },
            filter: textFilter({
              getFilter: (filter) =>{
                city = filter
              }
            }),
          },
          {
            dataField: "area",
            text: "Area",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            editorStyle: { textTransform: "uppercase" },
            style: { textTransform: "uppercase" },
            filter: textFilter({
              getFilter: (filter) =>{
                area = filter
              }
            }),
          },
          {
            dataField: "postalCode",
            text: "Postcode",
            headerClasses: "textHeader5",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                postalCode = filter
              }
            }),
            formatter: (cellContent, row) => (
              <>
                <List
                  space={2}
                  direction="row"
                  justify="center"
                >
                  {row.postalCode.map((item) => (
                    <div className="mb-2">
                      <Buttons.Button
                        size="medium"
                        type="solid"
                        onClick={() => {}}
                      >
                        {`${item}`}
                      </Buttons.Button>
                    </div>
                  ))}
                </List>
              </>
            ),
          },
          {
            dataField: "sbu",
            text: "SBU",
            headerClasses: "textHeader",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                sbu = filter
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
                
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 
                       rounded-md`}
                    onChange={(e) => {
                      const sbu = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(sbu, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "SBU"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                
              </>
            ),
          },
          {
            dataField: "zone",
            text: "Zone",
            headerClasses: "textHeader1",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
              getFilter: (filter) =>{
                zone = filter
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
                
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md`}
                    onChange={(e) => {
                      const zone = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(zone, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      "ZONE"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                
              </>
            ),
          },
          {
            dataField: "environment",
            text: "Environment",
            headerClasses: "textHeader3",
            sort: true,
            csvFormatter: col => (col ? col : ""),
            filter: textFilter({
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
                    {lookupItems(
                      props.extraData.lookupItems,
                      "ENVIRONMENT"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                
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
                  <Tooltip
                    tooltipText="Delete"
                    position="top"
                  >
                    <Icons.IconContext
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
                      {Icons.getIconTag(
                        Icons.IconBs.BsFillTrashFill
                      )}
                    </Icons.IconContext>
                  </Tooltip>
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
        fileName="AdminstrativeDivisions"
        onSelectedRow={(rows) => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id))
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
          country("")
          state("")
          district("")
          city("")
          area("")
          postalCode("")
          sbu("")
          zone("")
          environment("")
        }}
      />
    </div>
  )
}
