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

const Role = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.IRole>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Role"
          subTitle="Add, Edit & Delete Lab"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  flex-wrap">
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={Stores.roleStore.role?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(code, Util.constraintsRole.code),
                  })
                  Stores.roleStore.updateRole({
                    ...Stores.roleStore.role,
                    code,
                  })
                }}
                onBlur={(code) => {
                  Stores.roleStore.RoleService.checkExitsCode(code).then((res) => {
                    console.log({res});
                    if (res)
                      if (res.length > 0)  Stores.roleStore.setExitsCode(true)
                      else Stores.roleStore.setExitsCode(false)
                  })
                }}
              />
              {errors?.code && (
                <span className="text-red-600 font-medium relative">
                  {errors.code}
                </span>
              )}
               {Stores.roleStore.checkExitsCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
              <LibraryComponents.Form.Input
                label="Description"
                name="description"
                placeholder="Description"
                value={Stores.roleStore.role?.description}
                onChange={(description) => {
                  setErrors({
                    ...errors,
                    description: Util.validate.single(
                      description,
                      Util.constraintsRole.description
                    ),
                  })
                  Stores.roleStore.updateRole({
                    ...Stores.roleStore.role,
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
                  Util.validate(Stores.roleStore.role, Util.constraintsRole) ===
                  undefined && !Stores.roleStore.checkExitsCode
                ) {
                  rootStore.setProcessLoading(true)
                  Services.addrole(Stores.roleStore.role).then(() => {
                    rootStore.setProcessLoading(false)
                    LibraryComponents.ToastsStore.success(`Role created.`)
                    Stores.roleStore.fetchListRole()
                    Stores.roleStore.clear()
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
                //rootStore.roleStore.clear();
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
            data={Stores.roleStore.listRole || []}
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
                          body: `Delete ${row.description} lab!`,
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
              fileName: `roles_${moment(new Date()).format("YYYY-MM-DD HH:mm")}.csv`,
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
            Services.deleterole(deleteItem.id).then((res: any) => {
              rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.ToastsStore.success(`Role deleted.`)
                setDeleteItem({ show: false })
                Stores.roleStore.fetchListRole()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default Role
