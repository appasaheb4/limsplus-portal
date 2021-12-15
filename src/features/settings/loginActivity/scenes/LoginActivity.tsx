/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import dayjs from "dayjs"
import { useStores } from "@lp/stores"
import { DateFilter } from "@lp/library/components/Organisms"


let userId
let systemInfo
let ipInfo

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
                  dataField: "userId",
                  text: "User details",
                  sort: true,
                  csvFormatter: (cell, row, rowIndex) =>
                    `UserId: ${row.user.userId}, User Name: ${row.user.fullName},  Lab: ${row.user.lab}, Role: ${row.user.role}`,
                  filter: LibraryComponents.Organisms.Utils.textFilter({
                    getFilter: (filter) =>{
                      userId = filter
                    }
                  }),
                  headerClasses: "textHeader5",
                  editable: false,
                  formatter: (cell, row) => {
                    return (
                      <div>
                        <h6>{`UserId: ${row.user.userId}`} </h6>
                        <h6>{`User Name: ${row.user.fullName}`}</h6>
                        <h6>{`Lab: ${row.user.lab}`}</h6>
                        <h6>{`Role: ${row.user.role}`}</h6>
                      </div>
                    )
                  },
                },
                {
                  dataField: "systemInfo",
                  text: "System info",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter({
                    getFilter: (filter) =>{
                      systemInfo = filter
                    }
                  }),
                  csvFormatter: (cell, row, rowIndex) =>
                    `Device:${row.systemInfo.device}, OS, name:${row.systemInfo?.workstation?.os?.name},  version:${row.systemInfo?.workstation?.os?.version}, Browser,name: ${row.systemInfo?.workstation?.browser?.name}
                    version:${row.systemInfo?.workstation?.browser?.version}`,
                  headerClasses: "textHeader5",
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
                  dataField: "ipInfo",
                  text: "Ip Information",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter({
                    getFilter: (filter) =>{
                      ipInfo = filter
                    }
                  }),
                  headerClasses: "textHeader3",
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
                  headerClasses: "textHeader4",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.customFilter(),
                  filterRenderer: (onFilter, column) => (
                    <DateFilter onFilter={onFilter} column={column} />
                  ),
                  formatter: (cell, row) => {
                    return dayjs(row.dateOfEntry).format("YYYY-MM-DD h:mm:ss a")
                  },
                },
                {
                  dataField: "lastUpdated",
                  text: "Out",
                  headerClasses: "textHeader4",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.customFilter(),
                  filterRenderer: (onFilter, column) => (
                    <DateFilter onFilter={onFilter} column={column} />
                  ),
                  formatter: (cell, row) => {
                    return row.lastUpdated
                      ? dayjs(row.lastUpdated).format("YYYY-MM-DD h:mm:ss a")
                      : "Active User"
                  },
                },
              ]}
              onPageSizeChange={(page, size) => {
                loginActivityStore.fetchLoginActivity(page, size)
              }}
              onFilter={(type, filter, page, limit) => {
                loginActivityStore.LoginActivityService.filter({
                  input: { type, filter, page, limit },
                })
              }}
              clearAllFilter={()=>{
                userId("")
                systemInfo("")
                ipInfo("")
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
