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
                <LibraryComponents.Form.Input
                label="Lab"
                name="lab"
                placeholder="Lab"
                value={rootStore.labStore.labs?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Util.validate.single(name, Util.constraintsDepartment.name),
                  });
                  rootStore.labStore.updateLabs({
                    ...rootStore.labStore.labs,
                    name,
                  });
                }}
              />
              <LibraryComponents.Form.Input
                label="Code"
                id="code"
                placeholder="Code"
                value={rootStore.labStore.labs?.code}
                onChange={(code) => {
                  setErrors({
                    ...errors,
                    code: Util.validate.single(code, Util.constraintsDepartment.code),
                  });
                  rootStore.labStore.updateLabs({
                    ...rootStore.labStore.labs,
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
                value={rootStore.labStore.labs?.name}
                onChange={(name) => {
                  setErrors({
                    ...errors,
                    name: Util.validate.single(name, Util.constraintsDepartment.name),
                  });
                  rootStore.labStore.updateLabs({
                    ...rootStore.labStore.labs,
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
                    rootStore.labStore.labs,
                    Util.constraintsDepartment
                  ) === undefined
                ) {
                  rootStore.setProcessLoading(true);
                  Services.adddepartment(rootStore.labStore.labs).then((res) => {
                    rootStore.setProcessLoading(false);
                    LibraryComponents.ToastsStore.success(`Lab created.`);
                    rootStore.labStore.fetchListLab();
                    rootStore.labStore.clear();
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
                rootStore.labStore.clear();
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
                          body: `Delete ${row.fullName} lab!`,
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
              fileName: `labs_${moment(new Date()).format(
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
                LibraryComponents.ToastsStore.success(`User deleted.`);
                setDeleteItem({ show: false });
                // usersStore.loadUser();
              }
            });
          }}
        />
      </div>
    </>
  );
});

export default department;
