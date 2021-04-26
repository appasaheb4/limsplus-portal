/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

const LoginActivity = observer(() => {
  useEffect(() => {
    Stores.loginActivityStore.fetchLoginActivity()
  }, [])
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />   
      </LibraryComponents.Atoms.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <LibraryComponents.Organisms.TableBootstrap
            id="_id"
            data={Stores.loginActivityStore.listLoginActivity || []}
            columns={[
              {
                dataField: "_id",
                text: "Id",
                hidden: true,
                csvExport: false,
              },
              {
                dataField: "user.fullName",
                text: "User name",
                sort: true,
                editable: false,
              },
              {
                dataField: "user.userId",
                text: "User Id",
              },
              {
                dataField: "user.lab",
                text: "Lab",
              },
              {
                dataField: "user.role",
                text: "Role",
              },
              {
                dataField: "systemInfo.device",
                text: "Device",
              },
              {
                dataField: "systemInfo.v4",
                text: "Ip Information",
                csvFormatter: (cell, row, rowIndex) =>
                  `Ip:${row.systemInfo.ipInfo.ip}, Address:${row.systemInfo.ipInfo.city}, ${row.systemInfo.ipInfo.region}, ${row.systemInfo.ipInfo.country}, Location:${row.systemInfo.ipInfo.ll}`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <div>
                        <h6>Ip: {row.systemInfo.ipInfo.ip}</h6>
                        {row.systemInfo.ipInfo.city && (
                          <>
                            <h6>
                              Address:{" "}
                              {`${row.systemInfo.ipInfo.city}, ${row.systemInfo.ipInfo.region}, ${row.systemInfo.ipInfo.country}`}
                            </h6>
                            <h6>Location: {`${row.systemInfo.ipInfo.ll}`}</h6>
                          </>
                        )}
                      </div>
                    </>
                  )
                },
              },

              {
                dataField: "dateOfEntry",
                text: "In",
                formatter: (cell, row) => {
                  return moment(row.dateOfEntry).format("YYYY-MM-DD h:mm:ss a")
                },
              },
              {
                dataField: "lastUpdated",
                text: "Out",
                formatter: (cell, row) => {
                  return row.lastUpdated !== undefined
                    ? moment(row.lastUpdated).format("YYYY-MM-DD h:mm:ss a")
                    : "Active User"
                },
              },
            ]}
            isEditModify={false}
            isSelectRow={false}
            fileName="Login Activity"
            // onSelectedRow={(rows) => {
            //   props.onSelectedRow &&
            //     props.onSelectedRow(rows.map((item: any) => item._id))
            // }}
            // onUpdateItem={(value: any, dataField: string, id: string) => {
            //   props.onUpdateItem && props.onUpdateItem(value, dataField, id)
            // }}
          />
        </div>
      </div>
    </>
  )
})

export default LoginActivity
