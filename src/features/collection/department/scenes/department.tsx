import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import * as LibraryComponents from "@lp/library/components";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import moment from "moment";

import * as Models from "../models";
import * as Util from "../util";
import RootStoreContext from "@lp/library/stores";
import * as Services from "../services";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const department = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore);
  const [errors, setErrors] = useState<Models.IDepartment>();
  const [deleteItem, setDeleteItem] = useState<any>({});

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Department"
          subTitle="Add, Edit & Delete Lab"
        />
      </LibraryComponents.Header>
      <div className=" mx-auto  p-4  flex-wrap">
        <div className="m-1 p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Form.InputWrapper label="Lab" id="lab">
                <select
                  name="lab"
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value;
                    setErrors({
                      ...errors,
                      lab: Util.validate.single(
                        lab,
                        Util.constraintsDepartment.lab
                      ),
                    });
                    rootStore.departmentStore.updateDepartment({
                      ...rootStore.departmentStore.department,
                      lab,
                    });
                  }}
                >
                  <option selected>Select</option>
                  {rootStore.labStore.listLabs.map(
                    (item: any, index: number) => (
                      <option key={item.name} value={item.code}>
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>

              <LibraryComponents.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={rootStore.departmentStore.department?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(
                      code,
                      Util.constraintsDepartment.code
                    ),
                  });
                  rootStore.departmentStore.updateDepartment({
                    ...rootStore.departmentStore.department,
                    code,
                  });
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
                value={rootStore.departmentStore.department?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Util.validate.single(
                      name,
                      Util.constraintsDepartment.name
                    ),
                  });
                  rootStore.departmentStore.updateDepartment({
                    ...rootStore.departmentStore.department,
                    name,
                  });
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
                  Util.validate(
                    rootStore.departmentStore.department,
                    Util.constraintsDepartment
                  ) === undefined
                ) {
                  rootStore.setProcessLoading(true);
                  Services.adddepartment(
                    rootStore.departmentStore.department
                  ).then((res) => {
                    rootStore.setProcessLoading(false);
                    LibraryComponents.ToastsStore.success(
                      `Department created.`
                    );
                    rootStore.departmentStore.fetchListDepartment();
                    rootStore.departmentStore.clear();
                  });
                } else {
                  LibraryComponents.ToastsStore.warning(
                    "Please enter all information!"
                  );
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
                rootStore.departmentStore.clear();
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
                        });
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
          </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            Services.deletedepartment(deleteItem.id).then((res: any) => {
              if (res.status) {
                LibraryComponents.ToastsStore.success(`Department deleted.`);
                setDeleteItem({ show: false });
                rootStore.departmentStore.fetchListDepartment();
              }
            });
          }}
        />
      </div>
    </>
  );
});

export default department;
