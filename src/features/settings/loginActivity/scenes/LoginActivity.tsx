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
                dataField: "systemInfo.v4",
                text: "Ip address(v4)",
              },
              {
                dataField: "systemInfo.v6",
                text: "Ip address(v6)",
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
                  return moment(row.lastUpdated).format("YYYY-MM-DD HH:mm:ss")
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
