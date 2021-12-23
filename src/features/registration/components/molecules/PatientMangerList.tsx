/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { FormHelper } from "@lp/helper"
import { useForm, Controller } from "react-hook-form"
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"

interface PatientMangerProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}
let pId
let mobileNo
let birthDate
let title
let firstName
let middleName
let lastName
let sex
let species
let breed
let usualDoctor
const PatientMangerList = observer((props: PatientMangerProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const editorCell = (row: any) => {
    if (row.status === "I") return false
    if (row.extraData?.confidental && !props.extraData.confidental) return false
    return true
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
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  pId = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? "XXXXXXXX"
                    : col
                  : "",
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  mobileNo = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? "XXXXXXXX"
                      : row.mobileNo}
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
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <LibraryComponents.Atoms.Form.Input
                        placeholder={
                          errors.mobileNo ? "Please Enter MobileNo" : "Mobile No"
                        }
                        hasError={errors.mobileNo}
                        type="number"
                        defaultValue={row.mobileNo}
                        onChange={(mobileNo) => {
                          onChange(mobileNo)
                        }}
                        onBlur={(mobileNo) => {
                          props.onUpdateItem &&
                            props.onUpdateItem(mobileNo, column.dataField, row._id)
                        }}
                      />
                    )}
                    name="mobileNo"
                    rules={{ required: true, pattern: FormHelper.patterns.mobileNo }}
                    defaultValue=""
                  />
                </>
              ),
            },
            {
              dataField: "birthDate",
              text: "Birthdate",
              headerClasses: "textHeader11",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              filter: LibraryComponents.Organisms.Utils.customFilter({
                getFilter: (filter) => {
                  birthDate = filter
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.birthDate).format("YYYY-MM-DD")}</>
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
                  <LibraryComponents.Atoms.Form.InputDateTime
                    value={new Date(row.birthDate)}
                    onChange={(birthDate) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(birthDate, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "title",
              text: "Title",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  title = filter
                },
              }),
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
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                    onChange={(e) => {
                      const title = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(title, column.dataField, row._id)
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
                </>
              ),
            },
            {
              dataField: "firstName",
              text: "First Name",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? "XXXXXXXX"
                    : col
                  : "",
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  firstName = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? "XXXXXXXX"
                      : row.firstName}
                  </>
                )
              },
            },
            {
              dataField: "middleName",
              text: "Middle Name",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? "XXXXXXXX"
                    : col
                  : "",
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  middleName = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? "XXXXXXXX"
                      : row.middleName}
                  </>
                )
              },
            },
            {
              dataField: "lastName",
              text: "Last Name",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col, row) =>
                col
                  ? row.extraData?.confidental && !props.extraData.confidental
                    ? "XXXXXXXX"
                    : col
                  : "",
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  lastName = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.extraData?.confidental && !props.extraData.confidental
                      ? "XXXXXXXX"
                      : row.lastName}
                  </>
                )
              },
            },
            {
              dataField: "sex",
              text: "Sex",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  sex = filter
                },
              }),
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
                </>
              ),
            },
            {
              dataField: "species",
              text: "Species",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  species = filter
                },
              }),
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
                </>
              ),
            },
            {
              dataField: "breed",
              text: "Breed",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  breed = filter
                },
              }),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "usualDoctor",
              text: "Usual Doctor",
              headerClasses: "textHeader3",
              sort: true,
              csvFormatter: (col) => (col ? col : ""),
              filter: LibraryComponents.Organisms.Utils.textFilter({
                getFilter: (filter) => {
                  usualDoctor = filter
                },
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
                      const usualDoctor = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(usualDoctor, column.dataField, row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.listDoctors.map((item: any, index: number) => (
                      <option key={index} value={item.doctorCode}>
                        {`${item.doctorName} - ${item.doctorCode}`}
                      </option>
                    ))}
                  </select>
                </>
              ),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "history",
              text: "Histroy",
              sort: true,
              csvFormatter: (col) => (col ? col : false),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.history}
                      onChange={(history) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(history, "history", row._id)
                      }}
                    />
                  </>
                )
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
                        color="#fff"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "delete",
                            show: true,
                            id: [row._id],
                            title: "Are you sure?",
                            body: `Delete record`,
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
          fileName="Patient Manager"
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
          clearAllFilter={() => {
            pId("")
            mobileNo("")
            title("")
            firstName("")
            lastName("")
            middleName("")
            sex("")
            species("")
            breed("")
            usualDoctor("")
            birthDate()
          }}
        />
      </div>
    </>
  )
})
export default PatientMangerList
