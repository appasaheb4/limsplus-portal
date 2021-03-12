import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from "moment"

import * as Models from "../models"
import * as Util from "../util"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../services"

import {Stores} from '../stores';

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Deginisation = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.IDeginisation>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Deginisation"
          subTitle="Add, Edit & Delete Deginisation"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.deginisationStore.deginisation?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(
                      code,
                      Util.constraintsDeginisation.code
                    ),
                  })
                  Stores.deginisationStore.updateDescription({
                    ...Stores.deginisationStore.deginisation,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.deginisationStore.DeginisationService.checkExitsCode(code).then((res) => {
                    console.log({res});
                    if (res)
                      if (res.length > 0)  Stores.deginisationStore.setExitsCode(true)
                      else Stores.deginisationStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
               {Stores.deginisationStore.checkExitsCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
              <LibraryComponents.Form.Input
                label="Description"
                name="description"
                placeholder="description"
                value={Stores.deginisationStore.deginisation?.description}
                onChange={(description) => {
                  setErrors({
                    ...errors,
                    description: Util.validate.single(
                      description,
                      Util.constraintsDeginisation.description
                    ),
                  })
                  Stores.deginisationStore.updateDescription({
                    ...Stores.deginisationStore.deginisation,
                    description,
                  })
                }}
              />
              {errors?.description && (
                <span className="text-red-600 font-medium relative">
                  {errors.description}
                </span>
              )}
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <br />

          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                if (
                  Util.validate(
                    Stores.deginisationStore.deginisation,
                    Util.constraintsDeginisation
                  ) === undefined && !Stores.deginisationStore.checkExitsCode
                ) {
                  rootStore.setProcessLoading(true)
                  Services.addDeginisation(
                    Stores.deginisationStore.deginisation
                  ).then((res) => {
                    rootStore.setProcessLoading(false)
                    if (res.status === 200) {
                      LibraryComponents.ToastsStore.success(`Deginisation created.`)
                      Stores.deginisationStore.fetchListDeginisation()
                      Stores.deginisationStore.clear()
                    } else {
                      LibraryComponents.ToastsStore.error("Please try again")
                    }
                  })
                } else {
                  LibraryComponents.ToastsStore.warning(
                    "Please enter all information!"
                  )
                }
              }}
            >
              Save
            </LibraryComponents.Buttons.Button>
            <LibraryComponents.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Icons.Remove}
              onClick={() => {
                //rootStore.deginisationStore.clear();
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Buttons.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <ToolkitProvider
            keyField="id"
            data={Stores.deginisationStore.listDeginisation || []}
            columns={[
              {
                dataField: "code",
                text: "Code",
                sort: true,
              },
              {
                dataField: "description",
                text: "Description",
              },
              {
                dataField: "opration",
                text: "Delete",
                editable: false,
                csvExport: false,
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.Buttons.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Icons.Remove}
                      onClick={() => {
                        setDeleteItem({
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete ${row.description} deginisation!`,
                        })
                      }}
                    >
                      Delete
                    </LibraryComponents.Buttons.Button>
                  </>
                ),
              },
            ]}
            search
            exportCSV={{
              fileName: `deginisation_${moment(new Date()).format(
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
            Services.deleteDeginisation(deleteItem.id).then((res: any) => {
              rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.ToastsStore.success(`Deginisation deleted.`)
                setDeleteItem({ show: false })
                Stores.deginisationStore.fetchListDeginisation()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default Deginisation
