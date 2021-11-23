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
                  headerClasses: "textHeader2",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "invoiceAc",
                  text: "Invoice Ac",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "billingMethod",
                  text: "Billing Method",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "billNumber",
                  text: "Bill Number",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "urgent",
                  text: "Urgent",
                  sort: true,
                  // filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "confindental",
                  text: "Confidental",
                  sort: true,
                  // filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "methodCollection",
                  text: " Method Collection",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "pendingDataEntry",
                  text: "Pending Data Entry",
                  sort: true,
                  // filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "receivedDate",
                  text: "Received Date",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "resultDate",
                  text: "Result Date",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "approvalDate",
                  text: "Approval Date",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "approvalStatus",
                  text: "Approval Status",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "reportStatus",
                  text: "Report Status",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "reportedDate",
                  text: "Reported Date",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "enteredBy",
                  text: "Entered By",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "gestation",
                  text: "Gestation",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "height",
                  text: "Height",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "weight",
                  text: "Weight",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "archieve",
                  text: "Archive",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "loginInterface",
                  text: "Login Interface",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "submittingSystem",
                  text: "Submitting System",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "submittindOn",
                  text: "Submitting On",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "balance",
                  text: "Balance",
                  headerClasses: "textHeader",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "environment",
                  text: "Environment",
                  headerClasses: "textHeader",
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