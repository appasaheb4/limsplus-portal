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
import { useStores } from "@lp/stores"
import { Stores } from "../stores"
import { stores } from "@lp/stores"

const LoginActivity = observer(() => {
  const { loginStore } = useStores()
  useEffect(() => {
    Stores.loginActivityStore.fetchLoginActivity()
  }, [])
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      <div className="mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <div style={{ position: "relative" }}>
            <LibraryComponents.Organisms.TableBootstrap
              id="_id"
              data={Stores.loginActivityStore.listLoginActivity || []}
              totalSize={Stores.loginActivityStore.listLoginActivityCount}
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
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                  editable: false,
                },
                {
                  dataField: "user.userId",
                  text: "User Id",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                },
                {
                  dataField: "user.lab",
                  text: "Lab",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                },
                {
                  dataField: "user.role",
                  text: "Role",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                },
                {
                  dataField: "systemInfo.device",
                  text: "Device",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                },
                {
                  dataField: "systemInfo.v4",
                  text: "Ip Information",
                  filter: LibraryComponents.Organisms.Utils.textFilter({
                    getFilter: (filter) => {
                      // qualityFilter was assigned once the component has been mounted.
                      //qualityFilter = filter;
                    },
                    onFilter: (filterValue) => {
                      if (filterValue) {
                      }
                    },
                  }),
                  headerStyle: { minWidth: "200px" },
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
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                  formatter: (cell, row) => {
                    return moment(row.dateOfEntry).format("YYYY-MM-DD h:mm:ss a")
                  },
                },
                {
                  dataField: "lastUpdated",
                  text: "Out",
                  sort: true,
                  formatter: (cell, row) => {
                    return row.lastUpdated !== undefined
                      ? moment(row.lastUpdated).format("YYYY-MM-DD h:mm:ss a")
                      : "Active User"
                  },
                },
              ]}
              onPageSizeChange={(size)=>{
                Stores.loginActivityStore.fetchLoginActivity(size);
              }}
              isEditModify={false}  
              isSelectRow={false}
              fileName="Login Activity"
            />
          </div>  
        </div>
      </div>
    </>
  )
})

export default LoginActivity
