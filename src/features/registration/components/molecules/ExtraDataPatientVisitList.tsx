/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import { NumberFilter, DateFilter } from "@lp/library/components/Organisms"

interface ExtraDataPatientVisitProps {
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

const ExtraDataPatientVisitList = observer((props: ExtraDataPatientVisitProps) => {
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
              dataField: "additionalInfo",
              text: "Additional Information",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.additionalInfo}</>
              },
            },
            {
              dataField: "invoiceAc",
              text: "Invoice Ac",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.invoiceAc}</>
              },
            },
            {
              dataField: "billingMethod",
              text: "Billing Method",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.billingMethod}</>
              },
            },
            {
              dataField: "billNumber",
              text: "Bill Number",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.billNumber}</>
              },
            },
            {
              dataField: "methodCollection",
              text: "Method Collection",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.methodCollection}</>
              },
            },
            {
              dataField: "collectedBy",
              text: "Collection By",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.collectedBy}</>
              },
            },
            {
              dataField: "receivedDate",
              text: "Received Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                // getFilter: (filter) => {
                //   birthDate = filter
                // },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.extraData.receivedDate).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "resultDate",
              text: "Result Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                // getFilter: (filter) => {
                //   birthDate = filter
                // },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.extraData.birthDate).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "urgent",
              text: "Urgent",
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.extraData.urgent}
                      onChange={(urgent) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(urgent, "urgent", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "confidental",
              text: "Confidental",
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.extraData.confidental}
                      onChange={(confidental) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(confidental, "confidental", row._id)
                      }}
                    />
                  </>  
                )
              },
            },
            {
              dataField: "pendingDataEntry",
              text: "Pending Data Entry",
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.extraData.pendingDataEntry}
                      onChange={(pendingDataEntry) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            pendingDataEntry,
                            "pendingDataEntry",
                            row._id
                          )
                      }}
                    />
                  </>
                )
              },
            },

            {
              dataField: "approvalDate",
              text: "Approval Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                // getFilter: (filter) => {
                //   birthDate = filter
                // },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.extraData.approvalDate).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "approvalStatus",
              text: "Approval Status",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.approvalStatus}</>
              },
            },
            {
              dataField: "reportStatus",
              text: "Report Status",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.reportStatus}</>
              },
            },
            {
              dataField: "reportedDate",
              text: "Reported Date",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.customFilter({
                // getFilter: (filter) => {
                //   birthDate = filter
                // },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.extraData.reportedDate).format("YYYY-MM-DD")}</>
              },
            },
            {
              dataField: "enteredBy",
              text: "Entered By",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.enteredBy}</>
              },
            },
            {
              dataField: "height",
              text: "Height",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.height}</>
              },
            },
            {
              dataField: "weight",
              text: "Weight",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.weight}</>
              },
            },
            {
              dataField: "archieve",
              text: "Archive",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.archieve}</>
              },
            },
            {
              dataField: "loginInterface",
              text: "Login Interface",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.loginInterface}</>
              },
            },
            {
              dataField: "registrationInterface",
              text: "Registration Interface",
              headerClasses: "textHeader5",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.registrationInterface}</>
              },
            },
            {
              dataField: "submittingSystem",
              text: "Submitting System",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.submittingSystem}</>
              },
            },
            {
              dataField: "submittindOn",
              text: "Submitting On",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.submittindOn}</>
              },
            },
            {
              dataField: "balance",
              text: "Balance",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.balance}</>
              },
            },
            {
              dataField: "accountType",
              text: "Account Type",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.accountType}</>
              },
            },
            {
              dataField: "deliveryMethod",
              text: "Delivery Method",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.deliveryMethod}</>
              },
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return <>{row.extraData.environment}</>
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
          fileName="Patient Visit ExtraData"
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
        />
      </div>
    </>
  )
})
export default ExtraDataPatientVisitList
