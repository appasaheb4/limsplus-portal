/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"

import Contexts from "@lp/library/stores"

import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const LoginActivity = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore)
  useEffect(() => {
    rootStore.loginActivityStore.fetchLoginActivity()

    console.log({ rooStore: rootStore.loginActivityStore.listLoginActivity })
  }, [])
  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Login Activity" />
      </LibraryComponents.Header>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <ToolkitProvider
            keyField="id"
            data={rootStore.loginActivityStore.listLoginActivity || []}
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
                dataField: "systemInfo.device",
                text: "Device",
              },
              {
                dataField: "systemInfo.v4",
                text: "Ip Information",
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
                  return moment(row.dateOfEntry).format("YYYY-MM-DD HH:mm:ss")
                },
              },
              {
                dataField: "lastUpdated",
                text: "Out",
                formatter: (cell, row) => {
                  return row.lastUpdated !== undefined
                    ? moment(row.lastUpdated).format("YYYY-MM-DD HH:mm:ss")
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
