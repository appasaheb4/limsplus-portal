/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from 'react-bootstrap-table2-paginator';

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport  

import {Stores} from '../stores';

const LoginActivity = observer(() => {
  useEffect(() => {
    Stores.loginActivityStore.fetchLoginActivity()

    console.log({ rooStore: Stores.loginActivityStore.listLoginActivity })
  }, [])
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading title="Login Activity" />
      </LibraryComponents.Atoms.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <ToolkitProvider
            keyField="id"
            data={Stores.loginActivityStore.listLoginActivity || []}
            columns={[
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
            search
            exportCSV={{
              fileName: `LoginActivity_${moment(new Date()).format(
                "YYYY-MM-DD HH:mm"
              )}.csv`,
              noAutoBOM: false,
              blobType: "text/csv;charset=ansi",
            }}
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <ClearSearchButton
                  className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                  {...props.searchProps}
                />
                <ExportCSVButton
                  className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                  {...props.csvProps}
                >
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  noDataIndication="Table is Empty"
                  hover
                  pagination={ paginationFactory() }
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    </>
  )
})

export default LoginActivity
