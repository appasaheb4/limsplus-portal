/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface ExtraDataPatientVisitProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}

const ExtraDataPatientVisitList = observer((props:ExtraDataPatientVisitProps)=>{
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
                  dataField: "additionalInfo",
                  text: "Additional Information",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "invoiceAc",
                  text: "Invoice Ac",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "billingMethod",
                  text: "Billing Method",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "billNumber",
                  text: "Bill Number",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "urgent",
                  text: "Urgent",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "confindental",
                  text: "Confidental",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "methodCollection",
                  text: " Method Collection",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "pendingDataEntry",
                  text: "Pending Data Entry",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "receivedDate",
                  text: "Received Date",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "resultDate",
                  text: "Result Date",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "approvalDate",
                  text: "Approval Date",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "approvalStatus",
                  text: "Approval Status",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "reportStatus",
                  text: "Report Status",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "reportedDate",
                  text: "Reported Date",
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
                  dataField: "gestation",
                  text: "Gestation",
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
                  dataField: "archieve",
                  text: "Archive",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "loginInterface",
                  text: "Login Interface",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "submittingSystem",
                  text: "Submitting System",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "submittindOn",
                  text: "Submitting On",
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
                    fileName="ExtraDataPatientResult"
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
export default ExtraDataPatientVisitList