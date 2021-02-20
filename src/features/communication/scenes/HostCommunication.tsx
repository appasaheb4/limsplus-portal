/* eslint-disable */
import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import moment from "moment"
import { Container } from "reactstrap"

import * as Models from "../models"
import * as Util from "../util"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../services"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const HostCommunication = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.IHostCommunication>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <Container>
        <LibraryComponents.Header>
          <LibraryComponents.PageHeading
            title="Host Communication"
            subTitle="Add, Edit & Delete"
          />
        </LibraryComponents.Header>
        <div className="mx-auto">
          <div className="p-2 rounded-lg shadow-xl">
            <LibraryComponents.Grid cols={2}>
              <LibraryComponents.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Grid cols={2}>
                  <LibraryComponents.Form.Toggle
                    label="Manual/Automatic  Mode"
                    id="manualAutomaticMode"
                    value={
                      rootStore.communicationStore.hostCommuication
                        ?.manualAutomaticMode
                    }
                    onChange={(manualAutomaticMode) => {
                      console.log({ manualAutomaticMode })

                      rootStore.communicationStore.updateHostCommuication({
                        ...rootStore.communicationStore.hostCommuication,
                        manualAutomaticMode,
                      })
                    }}
                  />
                  <div>
                    <label>
                      Connection Estabilished :{" "}
                      {`${
                        rootStore.communicationStore.hostCommuication
                          ?.manualAutomaticMode
                          ? `On`
                          : `Off`
                      }`}
                    </label>
                  </div>
                </LibraryComponents.Grid>
              </LibraryComponents.List>
            </LibraryComponents.Grid>
            <br />

            <LibraryComponents.List direction="row" space={3} align="center">
              <LibraryComponents.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Icons.Save}
                onClick={() => {
                  if (
                    Util.validate(
                      rootStore.departmentStore.department,
                      Util.constraintsDepartment
                    ) === undefined
                  ) {
                    rootStore.setProcessLoading(true)
                    Services.adddepartment({}).then(() => {
                      rootStore.setProcessLoading(false)
                      LibraryComponents.ToastsStore.success(`Department created.`)
                      rootStore.departmentStore.fetchListDepartment()
                      rootStore.departmentStore.clear()
                    })
                  } else {
                    LibraryComponents.ToastsStore.warning(
                      "Please enter all information!"
                    )
                  }
                }}
              >
                Save
              </LibraryComponents.Button>
              <LibraryComponents.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Icons.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Button>
            </LibraryComponents.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-auto">
            {/* <ToolkitProvider
              keyField="id"
              data={rootStore.departmentStore.listDepartment || []}
              columns={[
                {
                  dataField: "lab",
                  text: "Lab",
                  sort: true,
                },
                {
                  dataField: "code",
                  text: "Code",
                  sort: true,
                },
                {
                  dataField: "name",
                  text: "name",
                },
                {
                  dataField: "opration",
                  text: "Delete",
                  editable: false,
                  csvExport: false,
                  formatter: (cellContent, row) => (
                    <>
                      <LibraryComponents.Button
                        size="small"
                        type="outline"
                        icon={LibraryComponents.Icons.Remove}
                        onClick={() => {
                          setDeleteItem({
                            show: true,
                            id: row._id,
                            title: "Are you sure?",
                            body: `Delete ${row.name} lab!`,
                          })
                        }}
                      >
                        Delete
                      </LibraryComponents.Button>
                    </>
                  ),
                },
              ]}
              search
              exportCSV={{
                fileName: `department_${moment(new Date()).format(
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
                    // cellEdit={cellEditFactory({
                    //   mode: "dbclick",
                    //   blurToSave: true,
                    //   // afterSaveCell,
                    // })}
                  />
                </div>
              )}
            </ToolkitProvider> */}
          </div>
          <LibraryComponents.Modal.ModalConfirm
            {...deleteItem}
            click={() => {
              rootStore.setProcessLoading(true)
              Services.deletedepartment(deleteItem.id).then((res: any) => {
                rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.ToastsStore.success(`Department deleted.`)
                  setDeleteItem({ show: false })
                  rootStore.departmentStore.fetchListDepartment()
                }
              })
            }}
          />
        </div>
      </Container>
    </>
  )
})

export default HostCommunication
