import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import moment from "moment"

import * as Models from "../models"
import * as Util from "../util"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../services"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Lab = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.Labs>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Lab"
          subTitle="Add, Edit & Delete Lab"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={rootStore.labStore.labs?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(code, Util.constraintsLabs.code),
                  })
                  rootStore.labStore.updateLabs({
                    ...rootStore.labStore.labs,
                    code,
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Name"
                name="name"
                placeholder="Name"
                value={rootStore.labStore.labs?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Util.validate.single(name, Util.constraintsLabs.name),
                  })
                  rootStore.labStore.updateLabs({
                    ...rootStore.labStore.labs,
                    name,
                  })
                }}
              />

              {errors?.name && (
                <span className="text-red-600 font-medium relative">
                  {errors.name}
                </span>
              )}
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
                  Util.validate(rootStore.labStore.labs, Util.constraintsLabs) ===
                  undefined
                ) {
                  rootStore.setProcessLoading(true)
                  Services.addLab(rootStore.labStore.labs).then(() => {
                    rootStore.setProcessLoading(false)
                    LibraryComponents.ToastsStore.success(`Lab created.`)
                    rootStore.labStore.fetchListLab()
                    rootStore.labStore.clear()
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
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <ToolkitProvider
            keyField="id"
            data={rootStore.labStore.listLabs || []}
            columns={[
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
              fileName: `labs_${moment(new Date()).format("YYYY-MM-DD HH:mm")}.csv`,
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
                <br />
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
          </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            rootStore.setProcessLoading(true)
            Services.deleteLab(deleteItem.id).then((res: any) => {
              rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.ToastsStore.success(`Lab deleted.`)
                setDeleteItem({ show: false })
                rootStore.labStore.fetchListLab()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default Lab
