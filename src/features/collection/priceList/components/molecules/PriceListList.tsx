/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface PriceListProps {
  data: any
  extraData: any
  isDelete?: boolean
  totalSize: number
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page:number,totalSize:number) => void
}
  
const MasterAnalyteList = (props: PriceListProps) => {
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
              dataField: "panelCode",
              text: "Panel Code",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Panel Code">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            panel.panelCode,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listMasterPanel &&
                        props.extraData.listMasterPanel.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.panelCode} - ${item.panelName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "panelName",
              text: "Panel Name",
              headerClasses: "textHeader1",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Panel Code">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const panel = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            panel.panelName,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listMasterPanel &&
                        props.extraData.listMasterPanel.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.panelName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "priority",
              text: "Priority",
              headerClasses: "textHeader",
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const priority = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(priority, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PRIORIITY"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "priceGroup",
              text: "Price Group",
              headerClasses: "textHeader1",
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const priceGroup = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(priceGroup, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "PRICE_GROUP"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "billTo",
              text: "Bill To",
              headerClasses: "textHeader",
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const corporateClientsInfo = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            corporateClientsInfo.corporateCode,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listCorporateClients &&
                        props.extraData.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.corporateCode}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "clientName",
              text: "Client Name",
              headerClasses: "textHeader1",
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const corporateClientsInfo = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            corporateClientsInfo.corporateName,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listCorporateClients &&
                        props.extraData.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.corporateName}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "invoiceAc",
              text: "Invoice Ac",
              headerClasses: "textHeader1",
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const corporateClientsInfo = JSON.parse(e.target.value)
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            corporateClientsInfo.invoiceAc,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listCorporateClients &&
                        props.extraData.listCorporateClients.map(
                          (item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>
                              {`${item.invoiceAc}`}
                            </option>
                          )
                        )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const lab = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(lab, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {props.extraData.listLabs.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "price",
              text: "Price",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "fixedPrice",
              text: "Fixed Price",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "minSp",
              text: "Min Sp",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "maxSp",
              text: "Max Sp",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "anyScheme",
              text: "Any Scheme",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.anyScheme}
                      onChange={(anyScheme) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(anyScheme, "anyScheme", row._id)
                      }}
                    />
                  </>
                )
              },
            },
            {
              dataField: "specialScheme",
              text: "Special Scheme",
              headerClasses: "textHeader1",
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
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2"
                      onChange={(e) => {
                        const speicalScheme = e.target.value as string
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            speicalScheme,
                            column.dataField,
                            row._id
                          )
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "SPECIAL_SCHEME"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "schemePrice",
              text: "Scheme Price",
              headerClasses: "textHeader",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "disOnScheme",
              text: "Dis On Scheme",
              sort: true,
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              formatter: (cell, row) => {
                return (
                  <>
                    <LibraryComponents.Atoms.Form.Toggle
                      value={row.disOnScheme}
                      onChange={(disOnScheme) => {
                        props.onUpdateItem &&
                          props.onUpdateItem(disOnScheme, "disOnScheme", row._id)
                      }}
                    />
                  </>
                )
              },
            },

            {
              dataField: "enteredBy",
              editable: false,
              text: "Entered By",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader",
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
                          props.onUpdateItem(status, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader",
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
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem &&
                          props.onUpdateItem(environment, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "dateCreation",
              editable: false,
              text: "Date Creation",
              sort: true,
              // filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                  <>
                    {LibraryUtils.moment
                      .unix(row.dateCreation || 0)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "dateActiveFrom",
              editable: false,
              text: "Date Active",
              sort: true,
              // filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                  <>
                    {LibraryUtils.moment
                      .unix(row.dateActiveFrom || 0)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "dateActiveTo",
              editable: false,
              text: "Date Expire",
              sort: true,
              // filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cell, row) => {
                return (
                  <>
                    {LibraryUtils.moment
                      .unix(row.dateActiveTo || 0)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "version",
              editable: false,
              text: "Version",
              sort: true,
              // filter: LibraryComponents.Organisms.Utils.textFilter(),
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
                    {row.status !== "I" && (
                      <>
                        <LibraryComponents.Atoms.Tooltip
                          className="ml-2"
                          tooltipText="Version Upgrade"
                        >
                          <LibraryComponents.Atoms.Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onVersionUpgrade && props.onVersionUpgrade(row)
                            }
                          >
                            {LibraryComponents.Atoms.Icons.getIconTag(
                              LibraryComponents.Atoms.Icons.Iconvsc.VscVersions
                            )}
                          </LibraryComponents.Atoms.Icons.IconContext>
                        </LibraryComponents.Atoms.Tooltip>
                        <LibraryComponents.Atoms.Tooltip
                          className="ml-2"
                          tooltipText="Duplicate"
                        >
                          <LibraryComponents.Atoms.Icons.IconContext
                            color="#fff"
                            size="20"
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {LibraryComponents.Atoms.Icons.getIconTag(
                              LibraryComponents.Atoms.Icons.Iconio5.IoDuplicateOutline
                            )}
                          </LibraryComponents.Atoms.Icons.IconContext>
                        </LibraryComponents.Atoms.Tooltip>
                      </>
                    )}
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
          fileName="PriceList"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page,limit)=>{
            props.onPageSizeChange &&  props.onPageSizeChange(page,limit)
          }}
        />
      </div>
    </>
  )
}
export default MasterAnalyteList
