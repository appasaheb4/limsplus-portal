/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import { lookupItems } from "@lp/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import _ from "lodash"
import { TableBootstrap } from "./TableBootstrap"

interface RefRangesInputTableProps {
  data: any
  onDelete?: (id: string) => void
}

export const RefRangesInputTable = observer(
  ({ data, onDelete }: RefRangesInputTableProps) => {
    return (
      <div style={{ position: "relative" }}>
        <TableBootstrap
          id="_id"
          data={data}
          columns={[
            {
              dataField: "_id",
              text: "Id",
              hidden: true,
              csvExport: false,
            },
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
              dataField: "rangeType",
              text: "Range Type",
              csvExport: false,
            },

            {
              dataField: "species",
              text: "Species",
              csvExport: false,
            },
            {
              dataField: "sex",
              text: "Sex",
              csvExport: false,
            },
            {
              dataField: "ageFrom",
              text: "ageFrom",
              csvExport: false,
            },
            {
              dataField: "ageTo",
              text: "Age To",
              csvExport: false,
            },
            {
              dataField: "ageUnit",
              text: "Age Unit",
              csvExport: false,
            },
            {
              dataField: "low",
              text: "Low",
              csvExport: false,
            },
            {
              dataField: "high",
              text: "High",
              csvExport: false,
            },
            {
              dataField: "alpha",
              text: "Allpha",
              csvExport: false,
            },
            {
              dataField: "deltaType",
              text: "Delta Type",
              csvExport: false,
            },
            {
              dataField: "deltaInterval",
              text: "Delta Interval",
              csvExport: false,
            },
            {
              dataField: "intervalUnit",
              text: "Interval Unit",
              csvExport: false,
            },
            {
              dataField: "colorLo",
              text: "Color Lo",
              csvExport: false,
            },
            {
              dataField: "colorHi",
              text: "Color Hi",
              csvExport: false,
            },
            {
              dataField: "colorNormal",
              text: "Color Normal",
              csvExport: false,
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
                    <LibraryComponents.Atoms.Tooltip
                      tooltipText="Delete"
                      position="top"
                    >
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#fff"
                        size="20"
                        onClick={() => onDelete && onDelete(row._id)}
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
