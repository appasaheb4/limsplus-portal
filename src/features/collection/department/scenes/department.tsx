import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import { Container } from "reactstrap"

import * as Models from "../models"
import * as Util from "../util"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as RootStore } from "@lp/library/stores"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Department = observer(() => {
  const [errors, setErrors] = useState<Models.IDepartment>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <Container>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title="Department"
            subTitle="Add, Edit & Delete Lab"
          />
        </LibraryComponents.Atoms.Header>
        <div className="mx-auto">
          <div className="p-2 rounded-lg shadow-xl">
            <LibraryComponents.Atoms.Grid cols={2}>
              <LibraryComponents.Atoms.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="lab">
                  <select
                    name="lab"
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const lab = e.target.value
                      setErrors({
                        ...errors,
                        lab: Util.validate.single(
                          lab,
                          Util.constraintsDepartment.lab
                        ),
                      })
                      Stores.departmentStore.updateDepartment({
                        ...Stores.departmentStore.department,
                        lab,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LabStore.labStore.listLabs.map((item: any) => (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>

                <LibraryComponents.Atoms.Form.Input
                  label="Code"
                  id="code"
                  placeholder="Code"
                  value={Stores.departmentStore.department?.code}
                  onChange={(code) => {
                    setErrors({
                      ...errors,
                      code: Util.validate.single(
                        code,
                        Util.constraintsDepartment.code
                      ),
                    })
                    Stores.departmentStore.updateDepartment({
                      ...Stores.departmentStore.department,
                      code,
                    })
                  }}
                  onBlur={(code) => {
                    Stores.departmentStore.DepartmentService.checkExitsCode(
                      code
                    ).then((res) => {
                      console.log({ res })
                      if (res)
                        if (res.length > 0) Stores.departmentStore.setExitsCode(true)
                        else Stores.departmentStore.setExitsCode(false)
                    })
                  }}
                />
                {errors?.code && (
                  <span className="text-red-600 font-medium relative">
                    {errors.code}
                  </span>
                )}
                {Stores.departmentStore.checkExitsCode && (
                  <span className="text-red-600 font-medium relative">
                    Code already exits. Please use other code.
                  </span>
                )}
                <LibraryComponents.Atoms.Form.Input
                  label="Name"
                  name="name"
                  placeholder="Name"
                  value={Stores.departmentStore.department?.name}
                  onChange={(name) => {
                    setErrors({
                      ...errors,
                      name: Util.validate.single(
                        name,
                        Util.constraintsDepartment.name
                      ),
                    })
                    Stores.departmentStore.updateDepartment({
                      ...Stores.departmentStore.department,
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
                    Util.validate(
                      Stores.departmentStore.department,
                      Util.constraintsDepartment
                    ) === undefined
                  ) {
                    RootStore.rootStore.setProcessLoading(true)
                    Services.adddepartment(Stores.departmentStore.department).then(
                      () => {
                        RootStore.rootStore.setProcessLoading(false)
                        LibraryComponents.Atoms.ToastsStore.success(`Department created.`)
                        Stores.departmentStore.fetchListDepartment()
                        Stores.departmentStore.clear()
                      }
                    )
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
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Atoms.Buttons.Button>
            </LibraryComponents.Atoms.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl">
            <ToolkitProvider
              keyField="id"
              data={Stores.departmentStore.listDepartment || []}
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
              Services.deletedepartment(deleteItem.id).then((res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.ToastsStore.success(`Department deleted.`)
                  setDeleteItem({ show: false })
                  Stores.departmentStore.fetchListDepartment()
                }  
              })
            }}  
          />
        </div>
      </Container>
    </>
  )
})

export default Department
