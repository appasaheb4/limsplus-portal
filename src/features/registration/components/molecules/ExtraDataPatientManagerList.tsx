/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
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
const ExtraDataPatientManagerList = observer((props:ExtraDataPatientManagerProps)=>{
    return(
        <>
            <div style={{position:'relative'}}>
                <LibraryComponents.Organisms.TableBootstrap
                  id='_id'
                  data={props.data}
                  totalSize={props.totalSize}
                  columns={[
                    {
                        dataField: "_id",
                        text: "Id",
                        hidden: true,
                        csvExport: false
                    },
                    {
                        dataField: "address",
                        text: "Address",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "postCode",
                        text: "PostCode",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "city",
                        text: "City",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "state",
                        text: "State",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "country",
                        text: "Country",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "email",
                        text: "Email",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "isMobileAndWhatsApp",
                        text: "IsMobileAndWhatsapp",
                        sort: true,
                    },
                    {
                        dataField: "permenant",
                        text: "Permenant",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "vip",
                        text: "Vip",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "confidental",
                        text: "Confidental",
                        sort: true,
                    },
                    {
                        dataField: "photograph",
                        text: "PhotoGraph",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "signature",
                        text: "Signature",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "bloodGroup",
                        text: "BloodGroup",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "height",
                        text: "Height",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "weight",
                        text: "Weight",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "followUp",
                        text: "FollowUp",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "comments",
                        text: "Comments",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "fyiLine",
                        text: "FyiLine",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "balance",
                        text: "Balance",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "accountType",
                        text: "Account Type",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "enteredBy",
                        text: "Entered By",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "status",
                        text: "Status",
                        headerClasses: "textHeader3",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "environment",
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
})
export default ExtraDataPatientManagerList;