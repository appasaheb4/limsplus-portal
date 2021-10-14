/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface PatientMangerProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const PatientMangerList = observer((props: PatientMangerProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
    <>
      <div style={{ position: "relative" }}>
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
              dataField: "pId",
              text: "Pid",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "birthDate",
              text: "Birth Date",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
                dataField: "title",
                text: "Title",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                      <LibraryComponents.Atoms.Form.InputWrapper>
              <select
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                onChange={(e) => {
                  const title = e.target.value
                  props.onUpdateItem && props.onUpdateItem(title,column.dataField,row._id)
                  
                }}
              >
                <option selected>Select</option>
                {LibraryUtils.lookupItems(
                  props.extraData.lookupItems,
                  "PATIENT MANAGER - TITLE"
                ).map((item: any, index: number) => (
                  <option key={index} value={item.code}>
                    {LibraryUtils.lookupValue(item)}
                  </option>  
                ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
                    </>
                  ),
            },
            {
                dataField: "firstName",
                text: "First Name",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
                dataField: "middleName",
                text: "Middle Name",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
                dataField: "lastName",
                text: "Last Name",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
                dataField: "sex",
                text: "Sex",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                      <LibraryComponents.Atoms.Form.InputWrapper>
                        <select
                          className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                          onChange={(e) => {
                            const sex = e.target.value
                            props.onUpdateItem &&
                              props.onUpdateItem(sex, column.dataField, row._id)
                          }}
                        >
                          <option selected>Select</option>
                          {LibraryUtils.lookupItems(
                            props.extraData.lookupItems,
                            "PATIENT MANAGER - SEX"
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                       {LibraryUtils.lookupValue(item)}
                      </option>
                          ))}
                        </select>
                      </LibraryComponents.Atoms.Form.InputWrapper>
                    </>
                  ),
            },
            {
              dataField: "species",
              text: "Species",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                  <LibraryComponents.Atoms.Form.InputWrapper>
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const species = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(species, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PATIENT MANAGER - SPECIES"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                       {LibraryUtils.lookupValue(item)}
                      </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
                dataField: "breed",
                text: "Breed",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
                dataField: "usualDoctor",
                text: "Usual Doctor",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
                dataField: "history",
                text: "Histroy",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                editable: (content, row, rowIndex, columnIndex) => editorCell(row),
                formatter: (cell, row) => {
                    return <><LibraryComponents.Atoms.Form.Toggle
                    value={row.history}
                    onChange={(history) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(history, 'history', row._id)
                    }}
                  /></>
                  },
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
                            type: "delete",
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
          fileName="AnalyteMaster"
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
export default PatientMangerList
