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
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "postCode",
                        text: "PostCode",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "city",
                        text: "City",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "state",
                        text: "State",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "country",
                        text: "Country",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "email",
                        text: "Email",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "isMobileAndWhatsApp",
                        text: "IsMobileAndWhatsapp",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "permenant",
                        text: "Permenant",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "vip",
                        text: "Vip",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "confidental",
                        text: "Confidental",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "photograph",
                        text: "PhotoGraph",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "signature",
                        text: "Signature",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "bloodGroup",
                        text: "BloodGroup",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "height",
                        text: "Height",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "weight",
                        text: "Weight",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "followUp",
                        text: "FollowUp",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "comments",
                        text: "Comments",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "fyiLine",
                        text: "FyiLine",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "balance",
                        text: "Balance",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "accountType",
                        text: "Account Type",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "enteredBy",
                        text: "Entered By",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "status",
                        text: "Status",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "environment",
                        text: "Environment",
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