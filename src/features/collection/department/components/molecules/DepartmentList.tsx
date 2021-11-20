/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface DepartmentListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
}

const DepartmentList = (props: DepartmentListProps) => {
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
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
          dataField: "lab",
          text: "Lab",
          headerClasses: 'textHeader',
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="lab">
                  <select
                    name="lab"
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                        props.onUpdateItem &&
                        props.onUpdateItem(lab,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.listLabs.map((item: any) => (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "code",
          text: "Code",
          headerClasses: 'textHeader',
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable:false
        },
        {
          dataField: "name",
          text: "Name",
          headerClasses: 'textHeader',
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          
        },

        {
          dataField: "shortName",
          text: "Short Name",
          headerClasses: 'textHeader2',
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "hod",
          text: "HOD",
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
              <LibraryComponents.Atoms.Form.InputWrapper label="HOD">
                  <select
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const hod = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(hod,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.userStore && props.extraData.userList
                    &&props.extraData.userList.map((item: any, key: number) => (
                        <option key={key} value={item.fullName}>
                          {item.fullName}
                        </option>
                      ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
            </>
          ),
        },
        {
          dataField: "mobileNo",
          text: "Mobile No",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "contactNo",
          text: "Contact No",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "autoRelease",
          text: "Auto Release",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          formatter: (cell, row) => {
            return <><LibraryComponents.Atoms.Form.Toggle
            value={row.autoRelease}
            onChange={(autoRelease) => {
              props.onUpdateItem &&
                props.onUpdateItem(autoRelease, 'autoRelease', row._id)
            }}
          /></>
          },
        
        },

        {
          dataField: "requireReceveInLab",
          text: "Require Receve In Lab",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          formatter: (cell, row) => {
            return <><LibraryComponents.Atoms.Form.Toggle
            value={row.requireReceveInLab}
            onChange={(requireReceveInLab) => {
              props.onUpdateItem &&
                props.onUpdateItem(requireReceveInLab, 'requireReceveInLab', row._id)
            }}
          /></>
          },
          
        },
        {
          dataField: "requireScainIn",
          text: "Require Scain In",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          formatter: (cell, row) => {
            return <><LibraryComponents.Atoms.Form.Toggle
            value={row.requireScainIn}
            onChange={(requireScainIn) => {
              props.onUpdateItem &&
                props.onUpdateItem(requireScainIn,'requireScainIn', row._id)
            }}
          /></>
          },
         
        },
        {
          dataField: "routingDept",
          text: "Routing Dept",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          formatter: (cell, row) => {
            return <><LibraryComponents.Atoms.Form.Toggle
            value={row.routingDept}
            onChange={(routingDept) => {
              props.onUpdateItem &&
                props.onUpdateItem(routingDept, 'routingDept', row._id)
            }}
          /></>
          },
        },
        {
          dataField: "openingTime",
          text: "Opening Time",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "closingTime",
          text: "Closing Time",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },

        {
          dataField: "fyiLine",
          text: "Fyi Line",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "workLine",
          text: "Work Line",
          sort: true,
          filter: LibraryComponents.Organisms.Utils.textFilter(),
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
        },
        {
          dataField: "status",
          text: "Status",
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                  <select
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const status = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(status,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(props.extraData.lookupItems, "STATUS").map(
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
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
          dataField: "opration",
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
      fileName="Department"
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
    </div>
  )
}
export default DepartmentList
