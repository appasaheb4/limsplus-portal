/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface ExtraDataPatientManagerProps {
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

const ExtraDataPatientManagerList = observer(
  (props: ExtraDataPatientManagerProps) => {
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
                dataField: "address",
                text: "Address",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.address}</span>
                },
              },
              {
                dataField: "postCode",
                text: "PostCode",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.postCode}</span>
                },
              },
              {
                dataField: "city",
                text: "City",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.city}</span>
                },
              },
              {
                dataField: "state",
                text: "State",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.state}</span>
                },
              },
              {
                dataField: "country",
                text: "Country",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.country}</span>
                },
              },
              {
                dataField: "email",
                text: "Email",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.email}</span>
                },
              },
              {
                dataField: "extraData.isMobileAndWhatsApp",
                text: "IsMobileAndWhatsapp",
                sort: true,
              },
              {
                dataField: "extraData.confidental",
                text: "Confidental",
                sort: true,
              },
              {
                dataField: "photograph",
                text: "PhotoGraph",
                headerClasses: "textHeader3",
                formatter: (cell, row) => {
                  return (
                    row.extraData.photograph && (
                      <div>
                         
                        <div
                          style={{
                            background: `transparent url(${row.extraData.photograph}) no-repeat`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                          className="object-cover h-20 w-20 rounded-md"
                        />
                      </div>
                    )
                  )
                },
              },
              {
                dataField: "signature",
                text: "Signature",
                headerClasses: "textHeader3",
                formatter: (cell, row) => {
                  return (
                    row.extraData.signature && (
                      <div>
                        <div
                          style={{
                            background: `transparent url(${row.extraData.signature}) no-repeat`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                          className="object-cover h-20 w-20 rounded-md"
                        />
                      </div>
                    )
                  )
                },
              },
              {
                dataField: "bloodGroup",
                text: "BloodGroup",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.bloodGroup}</span>
                },
              },
              {
                dataField: "height",
                text: "Height",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.height}</span>
                },
              },
              {
                dataField: "weight",
                text: "Weight",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.weight}</span>
                },
              },
              {
                dataField: "followUp",
                text: "FollowUp",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.followUp}</span>
                },
              },
              {
                dataField: "comments",
                text: "Comments",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.comments}</span>
                },
              },
              {
                dataField: "fyiLine",
                text: "FyiLine",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.fyiLine}</span>
                },
              },
              {
                dataField: "balance",
                text: "Balance",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.balance}</span>
                },
              },
              {
                dataField: "accountType",
                text: "Account Type",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.accountType}</span>
                },
              },
              {
                dataField: "enteredBy",
                text: "Entered By",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.enteredBy}</span>
                },
              },
              {
                dataField: "status",
                text: "Status",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.status}</span>
                },
              },
              {
                dataField: "environment",
                text: "Environment",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
                formatter: (cell, row) => {
                  return <span>{row.extraData.environment}</span>
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
            fileName="ExtraDataPatientManager"
            onSelectedRow={(rows) => {
              props.onSelectedRow &&
                props.onSelectedRow(rows.map((item: any) => item._id))
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              props.onUpdateItem && props.onUpdateItem(value, dataField, id)
            }}
            onFilter={(type, filter, page, size) => {
              props.onFilter && props.onFilter(type, filter, page, size)
            }}
          />
        </div>
      </>
    )
  }
)
export default ExtraDataPatientManagerList
