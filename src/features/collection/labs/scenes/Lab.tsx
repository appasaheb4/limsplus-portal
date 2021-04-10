import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

import * as Models from "../models"
import * as Util from "../util"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Lab = observer(() => {
  const [errors, setErrors] = useState<Models.Labs>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title="Lab"
          subTitle="Add, Edit & Delete Lab"
        />
      </LibraryComponents.Atoms.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.labStore.labs?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(code, Util.constraintsLabs.code),
                  })
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.labStore.LabService.checkExitsCode(code).then((res) => {
                    console.log({ res })
                    if (res)
                      if (res.length > 0) Stores.labStore.setExitsCode(true)
                      else Stores.labStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
              {Stores.labStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}
              <LibraryComponents.Atoms.Form.Input
                label="Name"
                name="name"
                placeholder="Name"
                value={Stores.labStore.labs?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Util.validate.single(name, Util.constraintsLabs.name),
                  })
                  Stores.labStore.updateLabs({
                    ...Stores.labStore.labs,
                    name,
                  })
                }}
              />

              {errors?.name && (
                <span className="text-red-600 font-medium relative">
                  {errors.name}
                </span>
              )}
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icons.Save}
              onClick={() => {
                if (
                  Util.validate(Stores.labStore.labs, Util.constraintsLabs) ===
                    undefined &&
                  !Stores.labStore.checkExitsCode
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Services.addLab(Stores.labStore.labs).then(() => {
                    RootStore.rootStore.setProcessLoading(false)
                    LibraryComponents.Atoms.ToastsStore.success(`Lab created.`)
                    Stores.labStore.fetchListLab()
                    Stores.labStore.clear()
                  })
                } else {
                  LibraryComponents.Atoms.ToastsStore.warning(
                    "Please enter all information!"
                  )
                }
              }}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icons.Remove}
              onClick={() => {
                //rootStore.labStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <ToolkitProvider
            keyField="id"
            data={Stores.labStore.listLabs || []}
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
                    <LibraryComponents.Atoms.Buttons.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Atoms.Icons.Remove}
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
                    </LibraryComponents.Atoms.Buttons.Button>
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
                  pagination={paginationFactory()}
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
        <LibraryComponents.Molecules.ModalConfirm
          {...deleteItem}
          click={() => {
            RootStore.rootStore.setProcessLoading(true)
            Services.deleteLab(deleteItem.id).then((res: any) => {
              RootStore.rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.Atoms.ToastsStore.success(`Lab deleted.`)
                setDeleteItem({ show: false })
                Stores.labStore.fetchListLab()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default Lab
