/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import dayjs from "dayjs"
import { useStores } from "@lp/stores"

const LoginActivity = observer(() => {
  const { loginStore, loginActivityStore, routerStore } = useStores()
  useEffect(() => {
    loginActivityStore.fetchLoginActivity()
  }, [])
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      <div className="mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <div style={{ position: "relative" }}>
            <LibraryComponents.Organisms.TableBootstrap
              id="_id"
              data={loginActivityStore.listLoginActivity || []}
              totalSize={loginActivityStore.listLoginActivityCount}
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
                  dataField: "systemInfo",
                  text: "System info",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  headerStyle: { minWidth: "200px" },
                  formatter: (cell, row) => {
                    return (
                      <div>
                        <h6>{`Device: ${row.systemInfo.device}`} </h6>
                        <h6> OS:</h6>
                        <h6 className="ml-4">
                          {`name: ${row.systemInfo?.workstation?.os?.name}
                                      version:${row.systemInfo?.workstation?.os?.version}`}
                        </h6>
                        <h6> Browser:</h6>
                        <h6 className="ml-4">
                          {`name: ${row.systemInfo?.workstation?.browser?.name}
                                      version:${row.systemInfo?.workstation?.browser?.version}`}
                        </h6>
                      </div>
                    )
                  },
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
                    return dayjs(row.dateOfEntry).format("YYYY-MM-DD h:mm:ss a")
                  },
                },
                {
                  dataField: "lastUpdated",
                  text: "Out",
                  sort: true,
                  formatter: (cell, row) => {
                    return row.lastUpdated
                      ? dayjs(row.lastUpdated).format("YYYY-MM-DD h:mm:ss a")
                      : "Active User"
                  },
                },
              ]}
              onPageSizeChange={(size) => {
                loginActivityStore.fetchLoginActivity(size)
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
