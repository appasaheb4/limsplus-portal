/* eslint-disable */
import React, { useState } from "react"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface BannerListProps {
  data: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const BannerList = (props: BannerListProps) => {
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
                  style={{ width: 200, height: 150 }}
                  alt="banner"
                />
              </>
            )
          },
        },
        {
          dataField: "operation",
          text: "Delete",
          editable: false,
          csvExport: false,
          hidden: !props.isDelete,
          formatter: (cellContent, row) => (
            <>
              <LibraryComponents.Atoms.Buttons.Button
                size="small"
                type="outline"
                icon={LibraryComponents.Atoms.Icons.Remove}
                onClick={() => {
                  props.onDelete &&
                    props.onDelete({
                      show: true,
                      type: "Delete",
                      id: [row._id],
                      title: "Are you sure?",
                      body: `Delete ${row.title} banner!`,
                    })
                }}
              >
                Delete
              </LibraryComponents.Atoms.Buttons.Button>
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
    />
  )
}
export default BannerList
