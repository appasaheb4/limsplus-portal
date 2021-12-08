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
                dataField: "extraData.address",
                text: "Address",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.postCode",
                text: "PostCode",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.city",
                text: "City",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.state",
                text: "State",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.country",
                text: "Country",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.email",
                text: "Email",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.isMobileAndWhatsApp",
                text: "IsMobileAndWhatsapp",
                sort: true,
              },
              {
                dataField: "extraData.permenant",
                text: "Permenant",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.vip",
                text: "Vip",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                },
              },
              {
                dataField: "signature",
                text: "Signature",
                headerClasses: "textHeader3",
                formatter: (cell, row) => {
                  return (
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
                },
              },
              {
                dataField: "extraData.bloodGroup",
                text: "BloodGroup",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.height",
                text: "Height",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.weight",
                text: "Weight",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.followUp",
                text: "FollowUp",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.comments",
                text: "Comments",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.fyiLine",
                text: "FyiLine",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.balance",
                text: "Balance",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.accountType",
                text: "Account Type",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.enteredBy",
                text: "Entered By",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.status",
                text: "Status",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
              },
              {
                dataField: "extraData.environment",
                text: "Environment",
                headerClasses: "textHeader3",
                sort: true,
                filter: LibraryComponents.Organisms.Utils.textFilter(),
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
            fileName="ExtraDataPatientManager"
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
  }
)
export default ExtraDataPatientManagerList
