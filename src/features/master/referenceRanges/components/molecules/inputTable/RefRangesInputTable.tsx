/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import { lookupItems, getDefaultLookupItem } from "@lp/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import _ from "lodash"
import { TableBootstrap } from "./TableBootstrap"

interface RefRangesInputTableProps {
  data: any
  extraData?: any
  onDelete?: (id: number) => void
  onUpdateItems?: (item: any, id) => void
}

export const RefRangesInputTable = observer(
  ({ data, extraData, onDelete, onUpdateItems }: RefRangesInputTableProps) => {
    return (
      <div style={{ position: "relative" }}>
        <TableBootstrap
          id="id"
          data={data}
          columns={[
            {
              dataField: "id",
              text: "Range Id",
              csvExport: false,
            },
            {
              dataField: "analyteCode",
              text: "Analyte Code",
              csvExport: false,
            },
            {
              dataField: "rangeSetOn",
              text: "Range Set On",
              csvExport: false,
            },
            {
              dataField: "equipmentType",
              text: "Equipment Type",
              csvExport: false,
            },
            {
              dataField: "lab",
              text: "Lab",
              csvExport: false,
            },
            {
              dataField: "species",
              text: "Species",
              csvExport: false,
            },
            {
              dataField: "rangeType",
              text: "Range Type",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                  value={row.rangeType}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const rangeType = e.target.value
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            rangeType,
                            colorLo: getDefaultLookupItem(
                              extraData.lookupItems,
                              `${rangeType}_LW_COLOR`
                            ),
                            colorHi: getDefaultLookupItem(
                              extraData.lookupItems,
                              `${rangeType}_HI_COLOR`
                            ),
                            colorNormal:getDefaultLookupItem(
                              extraData.lookupItems,
                              `${rangeType}_NO_COLOR`
                            ),
                          },
                          row.id
                        )
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, "RANGE_TYPE").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "sex",
              text: "Sex",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                      onUpdateItems && onUpdateItems({ sex }, row.id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, "SEX").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "ageFrom",
              text: "Age From",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Age From"
                    type="number"
                    value={row?.ageFrom}
                    onBlur={(ageFrom) => {
                      onUpdateItems && onUpdateItems({ ageFrom }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "ageTo",
              text: "Age To",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Age To"
                    type="number"
                    value={row?.ageTo}
                    onBlur={(ageTo) => {
                      onUpdateItems && onUpdateItems({ ageTo }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "ageUnit",
              text: "Age Unit",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                      const ageUnit = e.target.value
                      onUpdateItems && onUpdateItems({ ageUnit }, row.id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, "AGE_UNIT").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "low",
              text: "Low",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Low"
                    type="number"
                    value={row?.low}
                    onBlur={(low) => {
                      onUpdateItems && onUpdateItems({ low }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "high",
              text: "High",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="High"
                    type="number"
                    value={row?.high}
                    onBlur={(high) => {
                      onUpdateItems && onUpdateItems({ high }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "alpha",
              text: "Allpha",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Alpha"
                    value={row?.alpha}
                    onBlur={(alpha) => {
                      onUpdateItems && onUpdateItems({ alpha }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "deltaType",
              text: "Delta Type",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Delta Type"
                    value={row?.deltaType}
                    onBlur={(deltaType) => {
                      onUpdateItems && onUpdateItems({ deltaType }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "deltaInterval",
              text: "Delta Interval",
              headerClasses: "textHeaderm",
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.Input
                    placeholder="Delta Interval"
                    value={row?.deltaInterval}
                    onBlur={(deltaInterval) => {
                      onUpdateItems && onUpdateItems({ deltaInterval }, row.id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "intervalUnit",
              text: "Interval Unit",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                      const intervalUnit = e.target.value
                      onUpdateItems && onUpdateItems({ intervalUnit }, row.id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, "INTERVAL_UNIT").map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "colorLo",
              text: "Color Lo",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                    value={row.colorLo}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const colorLo = e.target.value
                      onUpdateItems && onUpdateItems({ colorLo }, row.id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      extraData.lookupItems,
                      `${row.rangeType}_LW_COLOR`
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "colorHi",
              text: "Color Hi",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                    value={row.colorHi}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const colorHi = e.target.value
                      onUpdateItems && onUpdateItems({ colorHi }, row.id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      extraData.lookupItems,
                      `${row.rangeType}_HI_COLOR`
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "colorNormal",
              text: "Color No",
              headerClasses: "textHeaderm",
              csvExport: false,
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
                    value={row.colorNormal}
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const colorNormal = e.target.value
                      onUpdateItems && onUpdateItems({ colorNormal }, row.id)
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(
                      extraData.lookupItems,
                      `${row.rangeType}_NO_COLOR`
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: "version",
              text: "Version",
              csvExport: false,
            },
            {
              dataField: "dateCreation",
              text: "Date Creation",
              csvExport: false,
            },
            {
              dataField: "dateActive",
              text: "Date Active",
              csvExport: false,
            },
            {
              dataField: "dateExpire",
              text: "Date Expire",
              csvExport: false,
            },
            {
              dataField: "enterBy",
              text: "Enter By",
              csvExport: false,
            },
            {
              dataField: "environment",
              text: "Environment",
              csvExport: false,
            },
            {
              dataField: "opration",
              text: "Action",
              editable: false,
              csvExport: false,
              hidden: false,
              formatter: (cellContent, row) => (
                <>
                  <div className="flex flex-row">
                    <LibraryComponents.Atoms.Icons.IconContext
                      color="#fff"
                      size="20"
                      onClick={() => onDelete && onDelete(row.id)}
                    >
                      {LibraryComponents.Atoms.Icons.getIconTag(
                        LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                      )}
                    </LibraryComponents.Atoms.Icons.IconContext>
                  </div>
                </>
              ),
              headerClasses: "sticky right-0  bg-gray-500 text-white",
              classes: (cell, row, rowIndex, colIndex) => {
                return "sticky right-0 bg-gray-500"
              },
            },
          ]}
          isEditModify={true}
          isSelectRow={true}
          fileName="Doctors"
          onSelectedRow={(rows) => {
            {
            }
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            {
            }
          }}
          onPageSizeChange={(page, size) => {
            {
            }
          }}
          onFilter={(type, filter, page, size) => {
            {
            }
          }}
          clearAllFilter={() => {
            {
            }
          }}
        />
      </div>
    )
  }
)
